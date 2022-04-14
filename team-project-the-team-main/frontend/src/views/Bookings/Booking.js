import * as React from "react";
import HistoryItinerary from "./HistoryItinerary";
import UpcomingItinerary from "./UpcomingItinerary";
import axios from "axios";
import backendServer from "../../webConfig";
import PropTypes from "prop-types";

export default class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
      user: JSON.parse(localStorage.getItem("user")),
    };
  }

  componentDidMount = () => {
    this.setState({
      user: JSON.parse(localStorage.getItem("user")),
    });
    this.getBookings();
  };

  getBookings = () => {
    axios
      .get(`${backendServer}/bookings?userId=${this.state.user.id}`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);

          this.setState({
            bookings: response.data,
          });
        } else {
          this.setState({ errorMsg: response.data });
        }
      })
      .catch((err) => {
        this.setState({ errorMsg: err });
      });
  };

  //update flow
  setPage = (page) => {
    //this.setState({ page: this.props.setPage("searchFlightUpdateFlow") });
    this.props.setPage(page);
  };
  
    //this.setState({ page: this.props.setPage("searchFlightUpdateFlow") });
 
  
  handleTabChange = (e) => {
    this.setState = {
      selectedTab: e,
    };
  };

  render() {
    return (
      <>
        {" "}
        <div>Upcoming Trip</div>
        {this.state.bookings.length > 0 ? (
          <>
            {this.state.bookings.map((d) =>
              d.status === "Scheduled" ? (
                <>
                  <div>&nbsp;</div>
                  <UpcomingItinerary data={d} setPage={this.setPage} getBookings={this.getBookings}/>
                </>
              ) : null
            )}
          </>
        ) : (
          "No Upcoming Flights"
        )}
        <div>&nbsp;</div>
        <div>Previous Trips</div>
        {this.state.bookings.length > 0 ? (
          <>
            {this.state.bookings.map((d) =>
              d.status !== "Scheduled" ? (
                <>
                  <div>&nbsp;</div>
                  <HistoryItinerary data={d} setPage={this.setPage} getBookings={this.getBookings}/>
                </>
              ) : null
            )}{" "}
          </>
        ) : (
          "No Previous Flights"
        )}
        
      </>
    );
  }
}
Booking.protoTypes = { setPage: PropTypes.func.isRequired ,getBookings: PropTypes.func.isRequired}