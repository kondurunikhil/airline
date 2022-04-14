import * as React from "react";
import Avatar from "@mui/material/Avatar";
import TakeOff from "@mui/icons-material/FlightTakeoff";
import Landing from "@mui/icons-material/FlightLand";
import Typography from "@mui/material/Typography";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/EditRounded";
import DeleteIcon from "@mui/icons-material/CancelOutlined";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import axios from "axios";
import backendServer from "../../webConfig";
export default class  TripDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      booking: props.data, 
      redirectFlag: false,
      page:"",
    };
  }

  getBookings= () => {
    this.props.getBookings();
  };
  onEdit = (booking) => {
    localStorage.setItem("bookingDetailsUpdateFlow", JSON.stringify(booking));
    this.props.setPage("searchFlightUpdateFlow");
    //this.setState({ redirectFlag: true });
    //this.props.parentCallback("searchFlightUpdateFlow");
  }
  onCancel = (id) => {
    let deleteBookingRequest={
      id:id,
    }
    axios
      .post(`${backendServer}/deleteBooking`, deleteBookingRequest)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          this.props.setPage("booking");
          this.props.getBookings();
        } else {
          this.setState({ errorMsg: response.data });
        }
      })
      
    
  }
  render() {
    return this.state.booking !== undefined ? (
      <>
        <Row>
          <Col md={2}>
            <Typography color="text.secondary">
              {this.state.booking.flight.tripSource}
            </Typography>
            <Avatar>
              <TakeOff />
            </Avatar>
            <Typography fontSize="10px" color="text.secondary"></Typography>


            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <Typography color="text.secondary">
              {" "}
              {this.state.booking.flight.tripDestination}
            </Typography>
            <Avatar>
              <Landing />
            </Avatar>
            <Typography fontSize="10px" color="text.secondary"></Typography>
          </Col>
          <Col md={4}>
            <Typography color="text.secondary">Trip Details:</Typography>
            <Typography fontSize="12px" color="text.secondary">
              {this.state.booking.flight.flightName}
            </Typography>
            <Typography fontSize="12px" color="text.secondary">
              Number of Stops: {this.state.booking.flight.stops}
            </Typography>
            <Typography fontSize="12px" color="text.secondary">
              Duration: {this.state.booking.flight.duration}
            </Typography>
            <Typography fontSize="12px" color="text.secondary">
              Departure Time:{" "}
              {new Date(
                this.state.booking.flight.departureTime
              ).toLocaleString()}
            </Typography>
            <Typography fontSize="12px" color="text.secondary">
              Arrival Time:{" "}
              {new Date(this.state.booking.flight.arrivalTime).toLocaleString()}
            </Typography>
            <Typography color="text.secondary">Passenger Details:</Typography>
            {this.state.booking.passengers !== undefined &&
              this.state.booking.passengers.map((p, index) => (
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
          </Col>
          <Col md={4}>
            <Typography fontSize="14px" color="text.secondary">
              Booking ID: {this.state.booking.id}
            </Typography>
            <Typography fontSize="14px" color="text.secondary">
              Payment Details:
            </Typography>{" "}
            <Typography fontSize="12px" color="text.secondary">
              Transaction ID: {this.state.booking.transaction.id}
            </Typography>
            <Typography fontSize="12px" color="text.secondary">
              Payment Mode:{" "}
              {this.state.booking.transaction.payment.payment_type}
            </Typography>
            {this.state.booking.transaction.payment.payment_type ===
            "Credit Card" ? (
              <>
                <Typography fontSize="12px" color="text.secondary">
                  Card Details:{" "}
                </Typography>
                <Typography fontSize="12px" color="text.secondary">
                  Name on Card:
                  {
                    this.state.booking.transaction.payment.cardDetails
                      .nameOnCard
                  }
                </Typography>
                <Typography fontSize="12px" color="text.secondary">
                  Card Number:
                  {
                    this.state.booking.transaction.payment.cardDetails
                      .cardNumber
                  }
                </Typography>
              </>
            ) : null}
            <Typography fontSize="14px" color="text.secondary">
              Price
            </Typography>
            <Typography fontSize="14px" color="text.secondary">
              {" "}
              Total: ${this.state.booking.transaction.total_amt}
            </Typography>
          </Col>
          <Col md={2}>
            <Button
              variant="contained"
              endIcon={<SendIcon size="small" />}
              size="small"
              style={{ width: "80px" }}
              onClick={() => this.onEdit(this.state.booking)}
            >
              Edit
            </Button>
            <div>&nbsp;</div>
            <Button
              size="small"
              variant="outlined"
              endIcon={<DeleteIcon size="small" />}
              style={{ width: "100px" }}
              onClick={() => this.onCancel(this.state.booking.id)}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </>
    ) : null;
  }
}
TripDetails.protoTypes = { setPage: PropTypes.func.isRequired, getBookings: PropTypes.func.isRequired };
