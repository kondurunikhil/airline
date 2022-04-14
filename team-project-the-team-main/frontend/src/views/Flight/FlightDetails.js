import * as React from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Form, Button } from "react-bootstrap";
import DateTimePicker from "@mui/lab/DateTimePicker";
import TextField from "@mui/material/TextField";
import axios from "axios";
import backendServer from "../../webConfig";
import Alert from "react-bootstrap/Alert";

export default class FlightDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flight: props.data,
      newFlight: "",
      pilots: props.pilots,
      successMsg: "",
      errorMsg: "",
    };
  }

  componentDidMount = () => {
    const newflight = this.state.flight;
    this.setState({
      pilots: this.props.pilots,
      newFlight: newflight,
    });

    this.getPilot();
  };

  getPilot = () => {
    axios
      .get(`${backendServer}/v1/user/users?userType=Employee`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          this.setState({
            pilots: response.data,
          });
        } else {
          this.setState({ errorMsg: response.data });
        }
      })
      .catch((err) => {
        this.setState({ errorMsg: err });
      });
  };

  handleChange = (e) => {
    this.setState((prevState) => {
      let newFlight = Object.assign({}, prevState.flight);
      newFlight[e.target.name] = e.target.value;
      return { newFlight };
    });
  };

  handleSave = () => {
    if (!this.validateForm()) {
      return;
    }
    let flight = this.state.newFlight;
    axios
      .post(`${backendServer}/updateFlight`, flight)
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data.entity);
          this.setState({
            successMsg: response.data.statusInfo.reasonPhrase,
            redirectFlag: true,
          });
        } else {
          this.setState({ errorMsg: response.data.statusInfo.reasonPhrase });
        }
      })
      .catch((err) => {
        this.setState({ errorMsg: err });
      });
  };

  handleDepartDate = (newValue) => {
    const nFlight = this.state.newFlight;
    nFlight.departureTime = newValue;
    this.setState({
      newFlight: nFlight,
    });
  };
  handleArriveDate = (newValue) => {
    const nFlight = this.state.newFlight;
    nFlight.arrivalTime = newValue;
    this.setState({
      newFlight: nFlight,
    });
  };

  validateForm = () => {
    const {
      tripSource,
      tripDestination,
      arrivalTime,
      departureTime,
      stops,
      price,
      pilot1,
      pilot2,
    } = this.state.newFlight;

    if (tripSource === null || tripSource === "") {
      this.setState({ errorMsg: "Source can not be blank" });
      return false;
    } else if (tripSource.match("^[a-zA-Z]{3}$") === null) {
      this.setState({ errorMsg: "Please enter valid Source" });
      return false;
    }
    if (tripDestination === null || tripDestination === "") {
      this.setState({ errorMsg: "Destination can not be blank" });
      return false;
    } else if (tripDestination.match("^[a-zA-Z]{3}$") === null) {
      this.setState({ errorMsg: "Please enter valid Destination" });
      return false;
    }
    if (departureTime === null || departureTime === "") {
      this.setState({ errorMsg: "Departure date can not be blank" });
      return false;
    }
    if (arrivalTime === null || arrivalTime === "") {
      this.setState({ errorMsg: "Arrival date can not be blank" });
      return false;
    }
    if (stops === null || stops === "") {
      this.setState({ errorMsg: "Stops can not be blank" });
      return false;
    } else if (stops.match("^[0-9]$") === null) {
      this.setState({ errorMsg: "Please enter valid stops" });
      return false;
    }
    if (price === null || price === "") {
      this.setState({ errorMsg: "Price can not be blank" });
      return false;
    } else if (price.toString().match("^[0-9]*$") === null) {
      this.setState({ errorMsg: "Please enter valid price" });
      return false;
    }
    /*if (pilot1 === null || pilot1 === "" || pilot1 === "0") {
      this.setState({ errorMsg: "Pilot1 can not be blank" });
      return false;
    } else if (pilot1.match("^[0-9]*$") === null) {
      this.setState({ errorMsg: "Please enter valid pilot1" });
      return false;
    }
    if (pilot2 === null || pilot2 === "" || pilot2 === "Select Pilot 2") {
      this.setState({ errorMsg: "Pilot2 can not be blank" });
      return false;
    } else if (pilot2.match("^[0-9]*$") === null) {
      this.setState({ errorMsg: "Please enter valid pilot2" });
      return false;
    }
    if (pilot1 === pilot2) {
      this.setState({ errorMsg: "Pilot1 and Pilot2 can not be same" });
      return false;
    }*/
    this.setState({ errorMsg: "" });
    return true;
  };

  render() {
    return (
      <>
        {this.state.successMsg !== undefined &&
        this.state.successMsg != null &&
        this.state.successMsg !== "" ? (
          <Alert variant="success" size="sm">
            {this.state.successMsg}
          </Alert>
        ) : null}
        {this.state.errorMsg !== undefined &&
        this.state.errorMsg != null &&
        this.state.errorMsg !== "" ? (
          <Alert variant="danger" size="sm">
            {this.state.errorMsg}
          </Alert>
        ) : null}
        <Row>
          <Col md={3}>
            {" "}
            <Form.Group className="mb-3">
              <Form.Label>Source</Form.Label>
              <Form.Control
                name="tripSource"
                type="text"
                className="mr-sm-2"
                onChange={this.handleChange}
                value={this.state.newFlight.tripSource}
                placeholder="Source"
                disabled="true"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            {" "}
            <Form.Label>Destination</Form.Label>
            <Form.Group className="mb-3">
              <Form.Control
                name="tripDestination"
                type="text"
                className="mr-sm-2"
                onChange={this.handleChange}
                value={this.state.newFlight.tripDestination}
                placeholder="Destination"
                disabled="true"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            {" "}
            <Form.Label>Airline</Form.Label>
            <Form.Group className="mb-3">
              <Form.Control
                name="flightName"
                type="text"
                className="mr-sm-2"
                onChange={this.handleChange}
                value={this.state.newFlight.flightName}
                placeholder="Airline"
                disabled="true"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            {" "}
            <Form.Group className="mb-3">
              <Form.Label>Depart Date</Form.Label>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label=""
                  name="departDate"
                  value={this.state.newFlight.departureTime}
                  onChange={this.handleDepartDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            {" "}
            <Form.Group className="mb-3">
              <Form.Label>Arrive Date</Form.Label>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label=""
                  name="arriveDate"
                  value={this.state.newFlight.arrivalTime}
                  onChange={this.handleArriveDate}
                  renderInput={(params) => <TextField {...params} />}
                  minDateTime={this.state.departDate}
                />
              </LocalizationProvider>
            </Form.Group>
          </Col>
          <Col md={3}>
            {" "}
            <Form.Label>Stops</Form.Label>
            <Form.Group className="mb-3">
              <Form.Control
                name="stops"
                type="text"
                className="mr-sm-2"
                onChange={this.handleChange}
                value={this.state.newFlight.stops}
                placeholder="Stops"
                disabled="true"
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            {" "}
            <Form.Label>Price</Form.Label>
            <Form.Group className="mb-3">
              <Form.Control
                name="price"
                type="text"
                className="mr-sm-2"
                onChange={this.handleChange}
                value={this.state.newFlight.price}
                placeholder="Price"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={3}>&nbsp;</Col>
          <Col md={3}>&nbsp;</Col>
          <Col md={3}>&nbsp;</Col>
          <Col md={3}>
            <Button variant="danger" type="button" onClick={this.handleSave}>
              Save
            </Button>
          </Col>
        </Row>
      </>
    );
  }
}
