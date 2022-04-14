import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Avatar from "@mui/material/Avatar";
import TakeOff from "@mui/icons-material/FlightTakeoff";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import TripDetails from "./TripDetails";
import Landing from "@mui/icons-material/FlightLand";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";
export default class HistoryItinerary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { booking: props.data };
  }
  getBookings= () => {
    this.props.getBookings();
  };
  render() {
    return (
      <>
        {" "}
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Col md={2}>
                <Avatar sx={{ width: 24, height: 24 }}>
                  <TakeOff fontSize="sm" />
                </Avatar>
                <Typography>{this.state.booking.flight.tripSource}</Typography>
              </Col>
              <Col md={2}>
                <Avatar sx={{ width: 24, height: 24 }}>
                  <Landing fontSize="sm" />
                </Avatar>
                <Typography>
                  {this.state.booking.flight.tripDestination}{" "}
                </Typography>
              </Col>

              <Col md={2}>
                {" "}
                <Typography>Departure </Typography>
                <Typography>
                  {" "}
                  {new Date(
                    this.state.booking.flight.departureTime
                  ).toLocaleDateString()}
                </Typography>
              </Col>
              <Col md={2}>
                {" "}
                <Typography>Arrival </Typography>
                <Typography>
                  {" "}
                  {new Date(
                    this.state.booking.flight.arrivalTime
                  ).toLocaleDateString()}
                </Typography>
              </Col>
              <Col md={2}>
                {" "}
                <Typography>Duration</Typography>
                <Typography> {this.state.booking.flight.duration}</Typography>
              </Col>
              <Col md={2}>
                {" "}
                <Typography>Status</Typography>
                <Typography> {this.state.booking.status}</Typography>
              </Col>
            </AccordionSummary>
            <AccordionDetails>
              <TripDetails data={this.state.booking } getBookings={this.getBookings} />
            </AccordionDetails>
          </Accordion>
        </div>
      </>
    );
  }
}
HistoryItinerary.protoTypes = { getBookings: PropTypes.func.isRequired}