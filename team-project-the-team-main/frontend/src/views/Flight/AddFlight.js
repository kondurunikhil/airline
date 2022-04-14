import * as React from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Form, Row, Col, Button } from "react-bootstrap";
import DateTimePicker from "@mui/lab/DateTimePicker";
import TextField from "@mui/material/TextField";
import Card from "react-bootstrap/Card";
import axios from "axios";
import backendServer from "../../webConfig";
import Alert from "react-bootstrap/Alert";
export default class AddFlight extends React.Component {
  constructor() {
    super();
    this.state = {
      source: "",
      destination: "",
      airline: "Southwest",
      departDate: "",
      arriveDate: "",
      duration: "",
      stops: "",
      seats: "",
      price: "",
      pilots: [],
      pilot1: "",
      pilot2: "",
      successMsg: "",
      errorMsg: "",
    };
  }

  componentDidMount = () => {
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
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleDepartDate = (newValue) => {
    this.setState({
      departDate: newValue,
    });
  };
  handleArriveDate = (newValue) => {
    this.setState({
      arriveDate: newValue,
    });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  clear = () => {
    this.setState({
      source: "",
      destination: "",
      departDate: "",
      arriveDate: "",
      stops: "",
      price: "",
      pilot1: "",
      pilot2: "",
      seats: "",
      errorMsg: "",
    });
  };

  handleAdd = () => {
    this.setState({ successMsg: "" });
    if (!this.validateForm()) {
      return;
    }
    const {
      source,
      destination,
      airline,
      departDate,
      arriveDate,
      stops,
      price,
      pilot1,
      pilot2,
      seats,
    } = this.state;

    if (source === destination) {
      this.setState({ errorMsg: "Source and destination cant be same!" });
      return;
    } else {
      this.setState({ errorMsg: "" });
    }
    const flight = {
      tripSource: source,
      tripDestination: destination,
      flightName: airline,
      departureTime: departDate,
      arrivalTime: arriveDate,
      stops: parseInt(stops),
      price: parseFloat(price),
      pilot1: pilot1,
      pilot2: pilot2,
      seats: parseInt(seats),
    };
    console.log(flight);
    axios
      .post(`${backendServer}/addFlight`, flight)
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data.entity);
          this.setState({
            successMsg: response.data.statusInfo.reasonPhrase,
            redirectFlag: true,
          });
          this.clear();
        } else {
          this.setState({ errorMsg: response.data.statusInfo.reasonPhrase });
        }
      })
      .catch((err) => {
        this.setState({ errorMsg: err });
      });
  };

  validateForm = () => {
    const {
      source,
      destination,
      airline,
      departDate,
      arriveDate,
      stops,
      price,
      pilot1,
      pilot2,
      seats,
    } = this.state;

    if (source === null || source === "") {
      this.setState({ errorMsg: "Source can not be blank" });
      return false;
    } else if (source.match("^[a-zA-Z]{3}$") === null) {
      this.setState({ errorMsg: "Please enter valid Source" });
      return false;
    }
    if (destination === null || destination === "") {
      this.setState({ errorMsg: "Destination can not be blank" });
      return false;
    } else if (destination.match("^[a-zA-Z]{3}$") === null) {
      this.setState({ errorMsg: "Please enter valid Destination" });
      return false;
    }
    if (departDate === null || departDate === "") {
      this.setState({ errorMsg: "Departure date can not be blank" });
      return false;
    }
    if (arriveDate === null || arriveDate === "") {
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
    } else if (price.match("^[0-9]*$") === null) {
      this.setState({ errorMsg: "Please enter valid price" });
      return false;
    }
    if (pilot1 === null || pilot1 === "" || pilot1 === "0") {
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
    if (seats === null || seats === "") {
      this.setState({ errorMsg: "Seats can not be blank" });
      return false;
    } else if (seats.match("^[0-9]*$") === null) {
      this.setState({ errorMsg: "Please enter valid seats" });
      return false;
    }
    if (pilot1 === pilot2) {
      this.setState({ errorMsg: "Pilot1 and Pilot2 can not be same" });
      return false;
    }
    this.setState({ errorMsg: "" });
    return true;
  };
  render() {
    const { pilots } = this.state;

    let pilotList =
      pilots.length > 0 &&
      pilots.map((item, i) => {
        return (
          <option key={item.id} value={item.id}>
            {item.first_name}
          </option>
        );
      }, this);

    return (
      <>
        <Card>
          <Card.Header>Add Flight</Card.Header>
          <Card.Body>
            {this.state.successMsg !== undefined &&
            this.state.successMsg != null &&
            this.state.successMsg !== "" ? (
              <Alert variant="success" size="small">
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
                <Form.Group className="sm-3">
                  <Form.Label>Source</Form.Label>
                  <Form.Control
                    name="source"
                    type="text"
                    className="mr-sm-2"
                    onChange={this.handleChange}
                    value={this.state.source}
                    placeholder="Source"
                    size="sm"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                {" "}
                <Form.Label>Destination</Form.Label>
                <Form.Group className="sm-3">
                  <Form.Control
                    name="destination"
                    type="text"
                    className="mr-sm-2"
                    onChange={this.handleChange}
                    value={this.state.destination}
                    placeholder="Destination"
                    size="sm"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                {" "}
                <Form.Label>Airline</Form.Label>
                <Form.Group className="sm-3">
                  <Form.Control
                    name="airline"
                    type="text"
                    className="mr-sm-2"
                    onChange={this.handleChange}
                    value={this.state.airline}
                    placeholder="Airline"
                    disabled
                    size="sm"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                {" "}
                <Form.Group className="sm-3">
                  <Form.Label>Depart Date</Form.Label>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      label=""
                      name="departDate"
                      value={this.state.departDate}
                      onChange={this.handleDepartDate}
                      renderInput={(params) => <TextField {...params} />}
                      style={{ "max-height": "12px" }}
                    />
                  </LocalizationProvider>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                {" "}
                <Form.Group className="sm-3">
                  <Form.Label>Arrival Date</Form.Label>
                  <LocalizationProvider dateAdapter={AdapterDateFns} size="sm">
                    <DateTimePicker
                      label=""
                      size="small"
                      style={{ "max-height": "10 px !important" }}
                      name="arriveDate"
                      value={this.state.arriveDate}
                      onChange={this.handleArriveDate}
                      renderInput={(params) => (
                        <TextField {...params} size="sm" />
                      )}
                      minDateTime={this.state.departDate}
                      fontSize="small"
                    />
                  </LocalizationProvider>
                </Form.Group>
              </Col>
              <Col md={3}>
                {" "}
                <Form.Label>Stops</Form.Label>
                <Form.Group className="sm-3">
                  <Form.Control
                    name="stops"
                    type="text"
                    className="mr-sm-2"
                    onChange={this.handleChange}
                    value={this.state.stops}
                    placeholder="Stops"
                    size="sm"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Label>Pilot 1</Form.Label>

                <select
                  className="form-control"
                  name="pilot1"
                  value={this.state.pilot1}
                  onChange={this.handleInputChange}
                  size="sm"
                >
                  <option key="0" value="">
                    Select Pilot 1
                  </option>
                  {pilotList}
                </select>
              </Col>
              <Col md={3}>
                <Form.Label>Pilot 2</Form.Label>
                <select
                  className="form-control"
                  name="pilot2"
                  value={this.state.pilot2}
                  onChange={this.handleInputChange}
                  size="sm"
                >
                  <option key="0" value="">
                    Select Pilot 2
                  </option>
                  {pilotList}
                </select>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <Form.Label>Seats</Form.Label>
                <Form.Group className="sm-3">
                  <Form.Control
                    name="seats"
                    type="number"
                    className="mr-sm-2"
                    onChange={this.handleChange}
                    value={this.state.seats}
                    placeholder="Seats"
                    size="sm"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                {" "}
                <Form.Label>Price</Form.Label>
                <Form.Group className="sm-3">
                  <Form.Control
                    name="price"
                    type="text"
                    className="mr-sm-2"
                    onChange={this.handleChange}
                    value={this.state.price}
                    placeholder="Price"
                    size="sm"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={3}>&nbsp;</Col>
              <Col md={3}>&nbsp;</Col>
              <Col md={3}>&nbsp;</Col>
              <Col md={3}>
                <Button
                  variant="danger"
                  type="submit"
                  onClick={this.handleAdd}
                  size="sm"
                >
                  Add
                </Button>
                &nbsp; &nbsp;
                <Button
                  variant="danger"
                  type="submit"
                  onClick={this.clear}
                  size="sm"
                >
                  Clear
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </>
    );
  }
}
