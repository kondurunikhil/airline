import * as React from "react";
import { Container, Col, Row, ListGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { BsArrowRight } from 'react-icons/bs';
import { CgAirplane } from 'react-icons/cg';


class DisplayFlights extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const flightList = this.props.location.request.flightList;
    const deptDetails = flightList.filter((flight) => flight.tripSource === this.props.location.request.source);
    const arrDetails = flightList.filter((flight) => flight.tripSource === this.props.location.request.destination);
    console.log(deptDetails);
    console.log(arrDetails);

    const deptDetailsDisplay = deptDetails.map((flight) => (
      <ListGroup>
        <ListGroup.Item>
          <Row>
          <Col>
          <h5>{new Date(flight.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          {' '}<BsArrowRight />{' '}{new Date(flight.arrivalTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</h5>
          </Col>
          <Col> 
          {flight.stops}
          </Col>
          <Col>
          {flight.duration}
          </Col>
          <Col>
          {flight.price}
          </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>

    ));

    const arrDetailsDisplay = arrDetails.map((flight) => (
      <ListGroup>
        <ListGroup.Item>
          <Row>
          <Col>
          <h5>{new Date(flight.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          {' '}<BsArrowRight />{' '}{new Date(flight.arrivalTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</h5>
          </Col>
          <Col> 
          {flight.stops}
          </Col>
          <Col>
          {flight.duration}
          </Col>
          <Col>
          {flight.price}
          </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>

    ));
    return (
      <>
        <Container>
          <Form>
          <Col md={12}>
            < br/>
            <Row>
            <h3>Depart:{' '}{this.props.location.request.source}{' '}<CgAirplane />{' '}{this.props.location.request.destination}</h3>
            <h4>{this.props.location.request.departDate.toDateString()}</h4>
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
          </Row>
        </ListGroup.Item>
      </ListGroup>
            {deptDetailsDisplay}< br/>< br/>
            {this.props.location.request.tripType === 'Round trip' &&
            <div>  
            <Row>
            <br/>
            <h3>Arrive:{' '}{this.props.location.request.destination}{' '}<CgAirplane />{' '}{this.props.location.request.source}</h3>
            <h4>{this.props.location.request.arriveDate.toDateString()}</h4>
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
          </Row>
        </ListGroup.Item>
      </ListGroup>
            {arrDetailsDisplay}</div>}
            </Col>
          </Form>
        </Container>
      </>
    );
  }
}
export default DisplayFlights;
