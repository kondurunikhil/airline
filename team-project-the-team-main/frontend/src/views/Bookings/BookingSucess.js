import * as React from "react";
import { Container, Card, Button, Col } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import { CgAirplane } from "react-icons/cg";

class BookingSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleBooking = (e) => {
    e.preventDefault();
    this.props.setPage("booking");
    //this.setState({ redirectBackFlag: true });
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.props.setPage("search");
    //this.setState({ redirectBackFlag: true });
  };

  render() {
    const booking = JSON.parse(localStorage.getItem("bookingid"));
    return (
      <>
        <Container>
          <Card>
            <Card.Title>Your Flight Booking with Booking Id {' '}<b>{ booking.id }{' '}</b> is successful!! </Card.Title>
            <Card.Body>
            <Typography color="text.secondary">
              {booking.flight.tripSource}
            </Typography>
            <Typography fontSize="10px" color="text.secondary"></Typography>
            <CgAirplane /> 
            <Typography color="text.secondary">
              {" "}
              {booking.flight.tripDestination}
            </Typography>
            <Typography fontSize="10px" color="text.secondary"></Typography>
            <Typography>Trip Details:</Typography>
            <Typography fontSize="12px" color="text.secondary">
              {booking.flight.flightName}
            </Typography>
            <Typography fontSize="12px" color="text.secondary">
              Number of Stops: {booking.flight.stops}
            </Typography>
            <Typography fontSize="12px" color="text.secondary">
              Duration: {booking.flight.duration}
            </Typography>
            <Typography fontSize="12px" color="text.secondary">
              Departure Time:{" "}
              {new Date(
                booking.flight.departureTime
              ).toLocaleString()}
            </Typography>
            <Typography fontSize="12px" color="text.secondary">
              Arrival Time:{" "}
              {new Date(booking.flight.arrivalTime).toLocaleString()}
            </Typography>
            <Typography>Passenger Details:</Typography>
            {booking.passengers !== null &&
              booking.passengers.map((p, index) => (
                <>
                  <Typography fontSize="14px" color="text.secondary">
                    {index + 1}. {p.firstName} {p.lastName} {p.age}
                    &nbsp;{p.seatNumber}
                  </Typography>
                  <Typography color="text.secondary">
                    {p.first_name}
                    {p.last_name}
                  </Typography>
                </>
              ))}
            <Typography fontSize="14px" color="text.secondary">
              Booking ID: {booking.id}
            </Typography>
            <Typography>
              Payment Details:
            </Typography>{" "}
            <Typography fontSize="12px" color="text.secondary">
              Transaction ID: {booking.transaction.id}
            </Typography>
            <Typography fontSize="12px" color="text.secondary">
              Payment Mode:{" "}
              {booking.transaction.payment.payment_type}
            </Typography>
            {booking.transaction.payment.payment_type ===
            "Credit Card" ? (
              <>
                <Typography fontSize="14px" color="text.secondary">
                  Card Details:{" "}
                </Typography>
                <Typography fontSize="12px" color="text.secondary">
                  Name on Card:
                  {
                    booking.transaction.payment.cardDetails
                      .nameOnCard
                  }
                </Typography>
                <Typography fontSize="12px" color="text.secondary">
                  Card Number:
                  {
                    booking.transaction.payment.cardDetails
                      .cardNumber
                  }
                </Typography>
              </>
            ) : null}
            <Typography>
              Price Details
            </Typography>
            <Typography fontSize="14px" color="text.secondary">
              {" "}
              Total: ${booking.transaction.total_amt}
            </Typography>
            <Button variant="danger" type="submit" onClick={this.handleBooking}>
              View Booking
            </Button>{" "}
            <Button variant="danger" type="submit" onClick={this.handleSearch}>
              Select Flight
            </Button>{" "}
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  }
}
export default BookingSuccess;
