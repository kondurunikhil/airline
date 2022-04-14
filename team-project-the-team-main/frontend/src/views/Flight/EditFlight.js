import * as React from "react";
import { Container, Form, Row, Col, Button, ListGroup } from "react-bootstrap";
import Button1 from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import backendServer from "../../webConfig";
import FlightDetails from "./FlightDetails";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Landing from "@mui/icons-material/FlightLand";
import TakeOff from "@mui/icons-material/FlightTakeoff";
import Alert from "react-bootstrap/Alert";

export default class EditFlight extends React.Component {
  constructor() {
    super();
    this.state = {
      source: "",
      destination: "",
      departDate: "",
      flights: [],
      page: "",
      pilots: [],
      errorMsg: "",
      successMsg: "",
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

  handleEdit = (e, value) => {
    this.setState({ page: e });
  };

  handleCancel = (f) => {
    const flight = {
      id: f.id,
    };
    console.log(flight);
    axios
      .post(`${backendServer}/cancelFlight`, flight)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          this.handleSearch();
        } else {
          this.setState({ errorMsg: response.data });
        }
      })
      .catch((err) => {
        this.setState({ errorMsg: err });
      });
  };

  handleSearch = () => {
    if (!this.validateForm()) {
      return;
    }
    const { source, destination, departDate } = this.state;
    const flight = {
      tripSource: source,
      tripDestination: destination,
      departureDate: departDate,
    };
    console.log(flight);
    axios
      .post(`${backendServer}/getFlightByCriteria`, flight)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          this.setState({
            flights: response.data,
          });
        } else {
          this.setState({ errorMsg: response.data });
        }
      })
      .catch((err) => {
        this.setState({ errorMsg: err });
      });
  };

  handleChangeDeptDate = (val) => {
    this.setState({ departDate: val });
  };

  validateForm = () => {
    const { source, destination, departDate } = this.state;

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
    this.setState({ errorMsg: "" });
    return true;
  };

  render() {
    return (
      <>
        <Card>
          <Card.Header>Edit Flight</Card.Header>
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
            ) : null}{" "}
            <Row>
              <Col md={3}>
                {" "}
                <Form.Group className="mb-3">
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
                <Form.Group className="mb-3">
                  <Form.Label>Destination</Form.Label>
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
                <Form.Group className="mb-3">
                  <Form.Label>Departure Date</Form.Label>
                  <DatePicker
                    selected={
                      this.state.departDate
                        ? new Date(this.state.departDate)
                        : null
                    }
                    onChange={this.handleChangeDeptDate}
                    name="departDate"
                    dateFormat="MM/dd/yyyy"
                    label="Depart Date"
                    size="sm"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Button
                  variant="danger"
                  type="submit"
                  onClick={this.handleSearch}
                  style={{ "margin-top": "30px" }}
                  fontSize="small"
                  size="sm"
                >
                  Search
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        {this.state.flights.length > 0
          ? this.state.flights.map((f, index) => (
              <>
                <div>&nbsp;</div>
                <Accordion>
                  {f.status !== "Cancelled" ? (
                    <>
                      <AccordionSummary>
                        <Col md={1}>
                          <Avatar sx={{ width: 24, height: 24 }}>
                            <TakeOff fontSize="sm" />
                          </Avatar>
                          <Typography>{f.tripSource}</Typography>
                        </Col>
                        <Col md={1}>
                          <Avatar sx={{ width: 24, height: 24 }}>
                            <Landing fontSize="sm" />
                          </Avatar>
                          <Typography>{f.tripDestination}</Typography>
                        </Col>
                        <Col md={2}>
                          {" "}
                          <Typography>Departure</Typography>
                          <Typography>
                            {new Date(f.departureTime).toLocaleDateString()}
                          </Typography>
                        </Col>
                        <Col md={2}>
                          {" "}
                          <Typography>Arrival</Typography>
                          <Typography>
                            {new Date(f.arrivalTime).toLocaleDateString()}
                          </Typography>
                        </Col>
                        <Col md={1}>
                          {" "}
                          <Typography>Duration</Typography>
                          <Typography>{f.duration}</Typography>
                        </Col>
                        <Col md={2}>
                          {" "}
                          <Typography>Status</Typography>
                          <Typography>{f.status}</Typography>
                        </Col>
                        {f.status !== "Cancelled" ? (
                          <Col md={2}>
                            <Button1
                              variant="contained"
                              endIcon=""
                              size="small"
                              style={{ width: "80px" }}
                              onClick={() => this.handleEdit(index)}
                              fontSize="small"
                            >
                              Edit
                            </Button1>
                          </Col>
                        ) : null}
                        {f.status !== "Cancelled" ? (
                          <Col md={2}>
                            <Button1
                              variant="contained"
                              endIcon=""
                              size="small"
                              style={{ width: "80px" }}
                              onClick={() => this.handleCancel(f)}
                              fontSize="small"
                            >
                              Cancel
                            </Button1>
                          </Col>
                        ) : null}
                      </AccordionSummary>
                    </>
                  ) : (
                    <AccordionSummary>
                      <Col md={1}>
                        <Avatar sx={{ width: 24, height: 24 }}>
                          <TakeOff fontSize="sm" />
                        </Avatar>
                        <Typography>{f.tripSource}</Typography>
                      </Col>
                      <Col md={1}>
                        <Avatar sx={{ width: 24, height: 24 }}>
                          <Landing fontSize="sm" />
                        </Avatar>
                        <Typography>{f.tripDestination}</Typography>
                      </Col>
                      <Col md={3}>
                        {" "}
                        <Typography>Departure</Typography>
                        <Typography>
                          {new Date(f.departureTime).toLocaleDateString()}
                        </Typography>
                      </Col>
                      <Col md={3}>
                        {" "}
                        <Typography>Arrival</Typography>
                        <Typography>
                          {new Date(f.arrivalTime).toLocaleDateString()}
                        </Typography>
                      </Col>
                      <Col md={3}>
                        {" "}
                        <Typography>Duration</Typography>
                        <Typography>{f.duration}</Typography>
                      </Col>
                      <Col md={3}>
                        {" "}
                        <Typography>Status</Typography>
                        <Typography>{f.status}</Typography>
                      </Col>
                    </AccordionSummary>
                  )}
                  {f.status !== "Cancelled" ? (
                    <AccordionDetails>
                      {this.state.page === index && f.status !== "Cancelled" ? (
                        <Col md={12}>
                          <FlightDetails data={f} pilots={this.state.pilots} />
                        </Col>
                      ) : null}
                    </AccordionDetails>
                  ) : null}
                </Accordion>
              </>
            ))
          : "No flights Found"}
      </>
    );
  }
}
