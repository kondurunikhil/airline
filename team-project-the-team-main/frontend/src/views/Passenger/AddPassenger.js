import * as React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import axios from "axios";
import backendServer from "../../webConfig";

export default class AddPassenger extends React.Component {
  constructor() {
    super();
    this.state = {
      passengers: [
        {
          firstName: "",
          lastName: "",
          age: "",
          govtId: "",
          govtIdNum: "",
          seatNumber: "",
        },
      ],
      flightDetails: "",
      redirectFlag: "",
      redirectBackFlag: false,
      seatList: [],
      errors: "",
      errorMsg: ''
    };
  }

  componentDidMount() {
    const flight = JSON.parse(localStorage.getItem("flight"));
    const passengers = JSON.parse(localStorage.getItem("passengers"));
    this.setState({ flightDetails: flight });
    const { seatList } = this.state;
    if (passengers != null && passengers !== undefined) {
      this.setState({ passengers: passengers });
    }
    const flightId = flight.id;
    console.log("flightId: " + flightId);
    axios
      .get(`${backendServer}/seatsForFLight`, {
        params: {
          flightId,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          this.setState({
            seatList: seatList.concat(response.data),
          });
        } else {
          this.setState({ errorMsg: response.data });
        }
      })
      .catch((err) => {
        this.setState({ errorMsg: err });
      });
  }

  handleChange(i, e) {
    let passengers = this.state.passengers;
    console.log(passengers);
    passengers[i][e.target.name] = e.target.value;
    this.setState({ passengers });
    this.setState({
      errors: "",
    });
  }

  handleChangeSeat(i, e) {
    let passengers = this.state.passengers;
    console.log(passengers);
    let errorFlag = false;
    this.setState({errorMsg: ''});
    passengers.some((pas) =>{
      if(pas.seatNumber === e.target.value){
        errorFlag = true;
        this.setState({errorMsg: 'Please select different seats'});
        passengers[i][e.target.name] = "";
        this.setState({ passengers });
      }
    }
    );
    if(!errorFlag){
      passengers[i][e.target.name] = e.target.value;
      this.setState({ passengers });
      this.setState({
        errors: "",
      });
    }
  }

  findFormErrors = () => {
    let { passengers, errors } = this.state;
    passengers.map((pas) => {
      if (
        !pas.firstName ||
        pas.firstName === "" ||
        !pas.lastName ||
        pas.lastName === "" ||
        !pas.age ||
        pas.age === "" ||
        !pas.govtId ||
        pas.govtId === "" ||
        !pas.govtIdNum ||
        pas.govtIdNum === "" ||
        !pas.seatNumber ||
        pas.seatNumber === ""
      ) {
        errors = "Please enter all the required passenger information";
      }
    });

    return errors;
  };

  handleBack = (e) => {
    e.preventDefault();
    this.props.setPage("search");
    //this.setState({ redirectBackFlag: true });
  };

  addFormFields() {
    this.setState({
      passengers: [
        ...this.state.passengers,
        {
          firstName: "",
          lastName: "",
          age: "",
          govtId: "",
          govtIdNum: "",
          seatNumber: "",
        },
      ],
    });
  }

  removeFormFields(i) {
    let passengers = this.state.passengers;
    passengers.splice(i, 1);
    this.setState({ passengers });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = this.findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      this.setState({
        errors: newErrors,
      });
    } else {
      localStorage.setItem("passengers", JSON.stringify(this.state.passengers));
      this.props.setPage("addpayment");
      //this.setState({ redirectFlag: true });
    }
  };

  render() {
    const {
      flightDetails,
      redirectFlag,
      redirectBackFlag,
      seatList,
      errors,
      errorMsg
    } = this.state;
    console.log(seatList);
    let redirectVar = null;
    if (redirectFlag) {
      redirectVar = <Redirect to="/bookingpayment" />;
    }
    if (redirectBackFlag) {
      redirectVar = <Redirect to="/dashboard" />;
    }
    return (
      <>
        {redirectVar}{" "}
        <Card>
          <Card.Header>Flight Details</Card.Header>
          <Card.Body>
            <Row>
              <Col>
                Flight Name: <b>{flightDetails.flightName}</b>
              </Col>
              <Col>
                Number of stops: <b>{flightDetails.stops}</b>
              </Col>
              <Col>
                Duration: <b>{flightDetails.duration}</b>
              </Col>
            </Row>
            <Row>
              <Col>
                Departure Date:{" "}
                <b>{new Date(flightDetails.departureTime).toLocaleString()}</b>
              </Col>
              <Col>
                Arrival Date:{" "}
                <b>{new Date(flightDetails.arrivalTime).toLocaleString()}</b>
              </Col>
              <Col>
                Price:{" $"}
                <b>{flightDetails.price}</b>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        &nbsp;
        <Card>
          <Card.Header>
            Add Passenger Details<small>(*All fields are mandatory)</small>
          </Card.Header>
          <Card.Body>
            {" "}
            <span style={{ color: "#de404d" }}>{errors}</span>
            <span style={{ color: "#de404d" }}>{errorMsg}</span>
            <Form>
              {this.state.passengers.map((element, index) => (
                <div key={index}>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        name="firstName"
                        value={element.firstName || ""}
                        onChange={(e) => this.handleChange(index, e)}
                        required
                        type="text"
                        placeholder="First name"
                        size="sm"
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        name="lastName"
                        value={element.lastName || ""}
                        onChange={(e) => this.handleChange(index, e)}
                        required
                        type="text"
                        placeholder="Last name"
                        size="sm"
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                      <Form.Label>Age</Form.Label>
                      <Form.Control
                        name="age"
                        value={element.age || ""}
                        onChange={(e) => this.handleChange(index, e)}
                        required
                        type="number"
                        placeholder="Age"
                        size="sm"
                      />
                    </Form.Group>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustom01"
                      >
                        <Form.Label>ID</Form.Label>
                        <select
                          className="form-control"
                          name="govtId"
                          onChange={(e) => this.handleChange(index, e)}
                        >
                          <option key="0" value="">
                            Select ID
                          </option>
                          <option key="passport" value="Passport">
                            Passport
                          </option>
                          <option key="realid" value="RealID">
                            Real ID
                          </option>
                          <option key="drivinglicense" value="Driving License">
                            Driving License
                          </option>
                        </select>
                        <Form.Control.Feedback>
                          Looks good!
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustom01"
                      >
                        <Form.Label>ID number</Form.Label>
                        <Form.Control
                          name="govtIdNum"
                          value={element.govtIdNum || ""}
                          onChange={(e) => this.handleChange(index, e)}
                          required
                          type="text"
                          placeholder="ID Number"
                          size="sm"
                        />
                      </Form.Group>
                      <Form.Label>Seat Number</Form.Label>
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustom01"
                      >
                        <Form.Control
                          as="select"
                          name="seatNumber"
                          value={element.seatNumber || ""}
                          onChange={(e) => this.handleChangeSeat(index, e)}
                        >
                          <option value="">Select Seat </option>
                          {seatList.map((seat) => {
                            return (
                              <option value={seat.seatNumber + "-" + seat.rate}>
                                {seat.seatNumber}
                                {" - "}
                                {seat.type}
                                {" - Extra charges: $"}
                                {seat.rate}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Form.Group>
                    </Row>
                    {index ? (
                      <Col>
                        <Button onClick={() => this.removeFormFields(index)}>
                          Remove passenger
                        </Button>
                      </Col>
                    ) : null}
                  </Row>
                </div>
              ))}
              <Button onClick={() => this.addFormFields()}>
                + Add Passenger
              </Button>
            </Form>
          </Card.Body>
        </Card>
        &nbsp;
        <Form>
          <div>
            <Button variant="danger" type="submit" onClick={this.handleBack}>
              <ChevronLeftIcon />
              Select Flight
            </Button>{" "}
            <Button variant="danger" type="submit" onClick={this.handleSubmit}>
              Payment <ChevronRightIcon />
            </Button>{" "}
          </div>
        </Form>
      </>
    );
  }
}
AddPassenger.protoTypes = { setPage: PropTypes.func.isRequired };
