import * as React from "react";
import { Container, Form, Row, Col, Button, ListGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import backendServer from "../../webConfig";
import { BsArrowRight } from "react-icons/bs";
import { CgAirplane } from "react-icons/cg";
import { Redirect } from "react-router";
import PropTypes from "prop-types";

export default class SearchFlightUpdateFlow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source: "",
      destination: "",
      tripType: "One-way",
      errorMsg: "",
      departDate: "",
      arriveDate: "",
      adults: 0,
      children: 0,
      successMsg: "",
      flightList: [],
      redirectFlag: false,
      errors: {},
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    this.setState({
      errors: {},
    });
  };

  handleChangeDeptDate = (val) => {
    this.setState({ departDate: val });
    this.setState({
      errors: {},
    });
  };

  handleChangeArrDate = (val) => {
    this.setState({ arriveDate: val });
  };

  findFormErrors = () => {
    const { source, destination, departDate, adults, errors } = this.state;
    if (!departDate || departDate === '' || departDate === null) errors.departDate = 'Please select departure date';
    if (!adults || adults === 0) errors.adults = 'Number of adults should not be zero';
    
    return errors;
  }

  onSelect = (flight) => {
    localStorage.setItem("latestFlight", JSON.stringify(flight));
    this.props.setPage("confirmBookingUpdateFlow");
    
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = this.findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      this.setState({
        errors: newErrors,
      });
    } else {
      const {
        source,
        destination,
        departDate,
        flightList,
        adults,
        children,
      } = this.state;
      
      const flight = {
        tripSource: source,
        tripDestination:  destination,
        tripType: "One-way",
        adults: parseInt(adults),
        children: parseInt(children),
        departureTime: departDate,
        arrivalTime: "",
      };
      console.log("flight: ",flight);
      axios
        .post(`${backendServer}/searchFlights`, flight)
        .then((response) => {
          if (response.data.length > 0) {
            console.log('axios respomse:  ',response.data);
            this.setState({
              flightList: flightList.concat(response.data),
              errorMsg: ''
            });
            console.log('flightList:  ',this.state.flightList);
          } else {
            this.setState({ errorMsg: "No results found" });
          }
        })
        .catch((err) => {
          this.setState({ errorMsg: err });
        });
      }
  };
componentDidMount=()=>{
  const details = JSON.parse(localStorage.getItem("bookingDetailsUpdateFlow"));
  const { flight } = details;
  localStorage.setItem("oldFlight", JSON.stringify(flight));
  
  this.setState({
    tripType: flight.tripType,
    source: flight.tripSource,
    destination: flight.tripDestination,
    tripType: flight.tripType,
    adults:"",
    children: "",
    departureTime: flight.departTime,
    arrivalTime: flight.arrivalTime,  
  }); 
}
 
  render() {
    const {
      flightList,
      tripType,
      source,
      redirectFlag,
      destination,
      departDate,
      arriveDate,
      errorMsg,
      successMsg,
      adults,
      children,
      errors
    } = this.state;
    
    let redirectVar = null;
    if (redirectFlag) {
      redirectVar = <Redirect to="/addpassenger" />;
    }
    const deptDetails = flightList.filter(
      (flight) => flight.tripSource === source
    );
    const arrDetails = flightList.filter(
      (flight) => flight.tripSource === destination
    );
    console.log(errors.departDate);
    console.log(arrDetails);

    const deptDetailsDisplay = deptDetails.map((flight) => (
      <ListGroup>
        <ListGroup.Item>
          <Row>
            <Col>
              <h5>
                {new Date(flight.departureTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                <BsArrowRight />{" "}
                {new Date(flight.arrivalTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </h5>
            </Col>
            <Col>{flight.stops}</Col>
            <Col>{flight.duration}</Col>
            <Col>${flight.price}</Col>
            <Col>
              <Button onClick={() => this.onSelect(flight)}>Select</Button>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    ));

    const arrDetailsDisplay = flightList.map((flight) => (
      <ListGroup>
        <ListGroup.Item>
          <Row>
            <Col>
              <h5>
                {new Date(flight.departureTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                <BsArrowRight />{" "}
                {new Date(flight.arrivalTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </h5>
            </Col>
            <Col>{flight.stops}</Col>
            <Col>{flight.duration}</Col>
            <Col>{flight.price}</Col>
            <Col>
              <Button onClick={() => this.onSelect(flight)}>Select</Button>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    ));
    return (
      <>
        
        {redirectVar}
        <br/>
        <br/>
        <br/>
        
        <div>
          <Container style={{ display: "flex", width: "75rem" }}>
            <br />
            <Form onSubmit={this.handleSubmit}>

              <Row>
                <h2>Update your Booking Date</h2>
              </Row>
              <Row>
                <Col>
                  {successMsg !== undefined && successMsg != null ? (
                    <h4 style={{ color: "green" }}>{successMsg}</h4>
                  ) : null}
                  {errorMsg !== undefined && errorMsg != null ? (
                    <h4 style={{ color: "brown" }}>{errorMsg}</h4>
                  ) : null}
                </Col>
              </Row>
              <Row>
                  <Col><b>Trip Source</b></Col>
                  <Col>
                    {this.state.source}
                  </Col>
              </Row>

              <br/>
              <Row>
                 <Col><b>Trip Destination</b></Col>
                  <Col>
                    {this.state.destination}
                  </Col>
              </Row>
              <br/>
              <Row>
                <Col>
                  {}
                  <Col>Number of adults</Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Control
                        name="adults"
                        type="text"
                        className="mr-sm-2"
                        onChange={this.handleChange}
                        value={adults}
                        placeholder="Number of adults"
                        isInvalid={!!errors.adults}
                      />
                      <Form.Control.Feedback type="invalid">
                    { errors.adults }
                  </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>Number of children</Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Control
                        name="children"
                        type="text"
                        className="mr-sm-2"
                        onChange={this.handleChange}
                        value={children}
                        placeholder="Number of children"
                      />
                    </Form.Group>
                  </Col>
                </Col>
              </Row>
                          
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    Depart Date
                    <DatePicker
                      selected={departDate ? new Date(departDate) : null}
                      onChange={this.handleChangeDeptDate}
                      name="departDate"
                      dateFormat="MM/dd/yyyy"
                      label="Depart Date"
                      isInvalid={!!errors.departDate}
                    />
                    <span style={{color: "#de404d"}}> { errors.departDate }</span>
                  </Form.Group>
                </Col>
                {}
              </Row>
              <Row>
                <Col>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => this.handleSubmit(e)}
                  >
                    Search
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
          {flightList.length > 0 && (
            <Container>
              <Form>
                <Col md={12}>
                  <br />
                  <Row>
                    <h3>
                      Depart: {this.state.source} <CgAirplane /> {this.state.destination}
                    </h3>
                    <h4>{departDate.toDateString()}</h4>
                  </Row>
                  <br />
                  <ListGroup>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <b>Departing Flights</b>
                        </Col>
                        <Col>
                          <b>Number of stops</b>
                        </Col>
                        <Col>
                          <b>Duration</b>
                        </Col>
                        <Col>
                          <b>Price</b>
                        </Col>
                        <Col></Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                  {deptDetailsDisplay}
                  <br />
                  <br />
                  
                </Col>
              </Form>
            </Container>
          )}
        </div>
      </>
    );
  }
}
SearchFlightUpdateFlow.protoTypes = { setPage: PropTypes.func.isRequired };