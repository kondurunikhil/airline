import * as React from "react";

import Box from "@mui/material/Box";
import { ReactComponent as Logo } from "../../../swa_logo_dark.svg";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Search from "@mui/icons-material/Search";
import Loyalty from "@mui/icons-material/Loyalty";
import PaymentIcon from "@mui/icons-material/Payment";
import Logout from "@mui/icons-material/Logout";
import MyProfile from "@mui/icons-material/AccountBox";
import MyBookings from "@mui/icons-material/FlightTakeoff";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SearchFlight from "../../Search/SearchFlight";
import Payment from "../../Payment/Payment";
import Booking from "../../Bookings/Booking";
import Mileage from "../../Rewards/Mileage";
import Profile from "../../Profile/Profile";
import AddPassenger from "../../Passenger/AddPassenger";
import BookingPayment from "../../Payment/BookingPayment";
import { Redirect } from "react-router";
import FlightIcon from "@mui/icons-material/Flight";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddFlight from "../../Flight/AddFlight";
import EditFlight from "../../Flight/EditFlight";
import SearchFlightUpdateFlow from "../../UpdateBookingFlow/SearchFlightUpdateFlow";
import ConfirmBookingUpdateFlow from "../../UpdateBookingFlow/ConfirmBookingUpdateFlow";
import SuccessPage from "../../UpdateBookingFlow/SuccessPage";
import BookingReview from "../../Payment/BookingReview";
import Header from "../../Header/header";
import BookingSuccess from "../../Bookings/BookingSucess";
//import Profile from "../../";
const drawerWidth = 240;
class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: props.page,
      user: "",
      redirectFlag: false,
    };
  }

  setPage = (page) => {
    this.setState({ page: page, redirectFlag: false });
  };

  componentDidMount = () => {
    if (localStorage.getItem("user") == null) {
      this.setState({ redirectFlag: true });
      return;
    }

    let user = JSON.parse(localStorage.getItem("user"));
    let userType = user.user_type;
    let page = "";
    if (userType === "Customer") {
      page = "search";
    } else if (userType === "Employee") {
      page = "addFlight";
    }
    this.setState({ user: user, page: page });
  };
  handlePageChange = (e) => {
    if (e.target.innerText === "My Profile") {
      this.setState({
        page: "profile",
      });
    }
    if (e.target.innerText === "Search Flight") {
      this.setState({
        page: "search",
      });
    }
  };

  handlePayment = () => {
    this.setState({
      page: "payment",
    });
  };

  handleBooking = () => {
    this.setState({
      page: "booking",
    });
  };

  handleRewards = () => {
    this.setState({
      page: "rewards",
    });
  };

  handleAddFlight = () => {
    this.setState({
      page: "addFlight",
    });
  };

  handleEditFlight = () => {
    this.setState({
      page: "editFlight",
    });
  };

  handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("payment");
    localStorage.removeItem("passengers");
    localStorage.removeItem("flight");
    localStorage.removeItem("bookingid");
    this.setState({ user: null });
    this.setState({ redirectFlag: true });
  };

  render() {
    let redirectVar = null;
    if (this.state.redirectFlag) {
      redirectVar = <Redirect to={{ pathname: "/" }} />;
    }
    return (
      <div>
        {redirectVar}
        <Header></Header>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              {this.state.user !== null &&
              this.state.user.user_type === "Customer" ? (
                <>
                  <ListItem
                    button
                    key="SearchFlight"
                    onClick={this.handlePageChange}
                  >
                    <ListItemIcon>
                      <Search />
                    </ListItemIcon>
                    <ListItemText primary="Search Flight" />
                  </ListItem>
                  <ListItem
                    button
                    onClick={this.handlePageChange}
                    key="MyProfile"
                  >
                    <ListItemIcon>
                      <MyProfile />
                    </ListItemIcon>
                    <ListItemText primary="My Profile" />
                  </ListItem>
                  <ListItem button key="Rewards" onClick={this.handleRewards}>
                    <ListItemIcon>
                      <Loyalty />
                    </ListItemIcon>
                    <ListItemText primary="Rewards" />
                  </ListItem>
                  <ListItem
                    button
                    key="MyBookings"
                    onClick={this.handleBooking}
                  >
                    <ListItemIcon>
                      <MyBookings />
                    </ListItemIcon>
                    <ListItemText primary="My Bookings" />
                  </ListItem>
                  <ListItem button key="Payment" onClick={this.handlePayment}>
                    <ListItemIcon>
                      <PaymentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Payments" />
                  </ListItem>
                  <ListItem button key="Notifications">
                    <ListItemIcon>
                      <NotificationsActiveIcon />
                    </ListItemIcon>
                    <ListItemText primary="Notifications" />
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem
                    button
                    key="Add+Flight"
                    onClick={this.handleAddFlight}
                  >
                    <ListItemIcon>
                      <AddCircleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Flight" />
                  </ListItem>
                  <ListItem
                    button
                    key="EditFlight"
                    onClick={this.handleEditFlight}
                  >
                    <ListItemIcon>
                      <FlightIcon />
                    </ListItemIcon>
                    <ListItemText primary="Edit Flight" />
                  </ListItem>
                  <ListItem
                    button
                    onClick={this.handlePageChange}
                    key="MyProfile"
                  >
                    <ListItemIcon>
                      <MyProfile />
                    </ListItemIcon>
                    <ListItemText primary="My Profile" />
                  </ListItem>
                </>
              )}
            </List>
            <Divider />
            <List>
              {["Logout"].map((text, index) => (
                <ListItem button key={text} onClick={this.handleLogout}>
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
          style={{ "padding-left": "250px", "padding-top": "100px" }}
        >
          {this.state.page === "search" ? (
            <SearchFlight setPage={this.setPage} />
          ) : null}
          {this.state.page === "payment" ? <Payment /> : null}
          {this.state.page === "booking" ? (
            <Booking setPage={this.setPage} />
          ) : null}
          {this.state.page === "profile" ? <Profile /> : null}
          {this.state.page === "rewards" ? (
            <Mileage setPage={this.setPage} />
          ) : null}
          {this.state.page === "addFlight" ? <AddFlight /> : null}
          {this.state.page === "editFlight" ? <EditFlight /> : null}
          {this.state.page === "searchFlightUpdateFlow" ? (
            <SearchFlightUpdateFlow setPage={this.setPage} />
          ) : null}
          {this.state.page === "confirmBookingUpdateFlow" ? (
            <ConfirmBookingUpdateFlow setPage={this.setPage} />
          ) : null}
          {this.state.page === "successPage" ? (
            <SuccessPage setPage={this.setPage} />
          ) : null}

          {/* {this.state.page === "tripDetails" ? <TripDetails setPage={this.setPage} /> : null} */}
          {this.state.page === "addpassenger" ? (
            <AddPassenger setPage={this.setPage} />
          ) : null}
          {this.state.page === "addpayment" ? (
            <BookingPayment setPage={this.setPage} />
          ) : null}
          {this.state.page === "reviewBooking" ? (
            <BookingReview setPage={this.setPage} />
          ) : null}
          {this.state.page === "bookingSuccess" ? (
            <BookingSuccess setPage={this.setPage} />
          ) : null}
        </Box>
      </div>
    );
  }
}

export default DashBoard;
