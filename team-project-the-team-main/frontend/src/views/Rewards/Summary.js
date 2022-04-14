import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Divider from "@mui/material/Divider";
import backendServer from "../../webConfig";
import axios from "axios";
import PropTypes from "prop-types";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));
export default class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingId: "",
      bookings: [],
      errorMsg: "",
      successMsg: "",
      user: JSON.parse(localStorage.getItem("user")),
    };
  }

  componentDidMount = () => {
    this.setState({ user: JSON.parse(localStorage.getItem("user")) });
    this.getBookings();
  };

  getUser = () => {
    const userId = this.state.user.id;
    axios
      .get(`${backendServer}/v1/user/getUser`, {
        params: { userId },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          this.setState({
            user: response.data,
          });
          localStorage.setItem("user", this.state.user);
        } else {
          this.setState({ errorMsg: response.data });
        }
      })
      .catch((err) => {
        this.setState({ errorMsg: err });
      });
  };
  handleAvailBooking = (e) => {
    if (
      this.state.bookingId.length === 0 ||
      this.state.bookingId.trim().length === 0 ||
      this.state.bookingId === null ||
      this.state.bookingId.match("^[0-9]*$") === null
    ) {
      this.setState({
        errorMsg: "Invalid Booking ID",
      });
      return;
    } else {
      this.setState({
        errorMsg: "",
      });
    }
    e.preventDefault();
    const { bookingId } = this.state;
    const booking = {
      bookingId: parseInt(bookingId),
    };
    console.log(booking);
    axios
      .post(`${backendServer}/availBooking`, booking)
      .then((response) => {
        if (response.data.status === 200) {
          // this.setState({ errorMsg: response.data.statusInfo.reasonPhrase });
          console.log(response.data);
          this.setState({ successMsg: response.data.entity });
          this.props.getMileage();
          this.getUser();
        } else {
          this.setState({ errorMsg: response.data.statusInfo.reasonPhrase });
        }
      })
      .catch((err) => {
        this.setState({ errorMsg: err });
      });
  };

  getBookings = () => {
    axios
      .get(`${backendServer}/bookings?userId=1`)
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

  handleBookingId = (e) => {
    if (e.target.value.match("^[0-9]*$") != null) {
      this.setState({ bookingId: e.target.value, errorMsg: "" });
    } else {
      this.setState({
        bookingId: e.target.value,
        errorMsg: "Invalid Booking ID",
      });
    }
    // this.setState({ bookingId: e.target.value });
  };
  render() {
    return (
      <>
        {" "}
        <Card>
          <Card.Header>Summary</Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <Row>
                <Col md={3}>
                  {" "}
                  <Typography
                    sx={{ fontSize: 12 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Mileage Account
                  </Typography>{" "}
                  <Typography
                    sx={{ fontSize: 12 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {this.state.user.mileage.id}
                  </Typography>{" "}
                  <Divider light />
                  <Typography
                    sx={{ fontSize: 12 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Total Earned Points till now
                  </Typography>{" "}
                  <Typography
                    sx={{ fontSize: 12 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {this.state.user.mileage.id}
                  </Typography>{" "}
                  <Divider light />
                  <Typography
                    sx={{ fontSize: 12 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Valid Till
                  </Typography>
                  <Typography
                    sx={{ fontSize: 12 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {new Date(
                      this.state.user.mileage.memberSince
                    ).toLocaleDateString()}
                  </Typography>
                </Col>

                <Col md={5}>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Here's what you've earned toward A-List
                  </Typography>
                  <Typography
                    sx={{ fontSize: 12 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Earn while you fly!
                  </Typography>{" "}
                  <BorderLinearProgress
                    variant="determinate"
                    value={this.state.bookings.length}
                  />{" "}
                  <Typography
                    sx={{ fontSize: 10 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {this.state.bookings.length % 10} out of 10 flights
                  </Typography>{" "}
                  &nbsp;
                  <Typography
                    sx={{ fontSize: 12 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Get points and earn more!
                  </Typography>{" "}
                  <BorderLinearProgress
                    variant="determinate"
                    value={this.state.user.mileage.earnedPoints}
                  />{" "}
                  <Typography
                    sx={{ fontSize: 10 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {this.state.user.mileage.earnedPoints} out of 100 points
                  </Typography>{" "}
                </Col>
                <Col md={4}>
                  <Typography
                    sx={{ fontSize: 12 }}
                    color="text.secondary"
                    gutterBottom
                  ></Typography>{" "}
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Want more rewards! Here's how you can get.
                  </Typography>
                  <Typography
                    sx={{ fontSize: 12 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    * Get 10% rewards of your booking price on every booking.
                  </Typography>{" "}
                  <Typography
                    sx={{ fontSize: 12 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    * Earn extra 100 mileage point on after every 10 bookings
                  </Typography>{" "}
                  <Typography
                    sx={{ fontSize: 12 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    * 20% points on your travel aniversary with Southwest.
                  </Typography>{" "}
                  <Typography
                    sx={{ fontSize: 10 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    (*T&C apply)
                  </Typography>{" "}
                </Col>
              </Row>
            </blockquote>
          </Card.Body>
        </Card>
        &nbsp;
        <Card>
          <Card.Header>Avail Mileage Points</Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <Row>
                <Col md={12}>
                  {" "}
                  <InputGroup className="mb-3">
                    <FormControl
                      placeholder="Booking ID"
                      aria-label="Booking ID"
                      aria-describedby="basic-addon2"
                      value={this.state.bookingId}
                      onChange={this.handleBookingId}
                      pattern="[0-9]*"
                    />
                    <Button
                      variant="outline-secondary"
                      id="button-addon2"
                      onClick={this.handleAvailBooking}
                    >
                      Avail
                    </Button>
                  </InputGroup>
                </Col>
              </Row>
            </blockquote>
            {this.state.successMsg !== undefined &&
            this.state.successMsg != null ? (
              <h4 style={{ color: "green", fontSize: "12px" }}>
                {this.state.successMsg}
              </h4>
            ) : null}
            {this.state.errorMsg !== undefined &&
            this.state.errorMsg != null ? (
              <h4 style={{ color: "brown", fontSize: "12px" }}>
                {this.state.errorMsg}
              </h4>
            ) : null}
          </Card.Body>
        </Card>
      </>
    );
  }
}
Summary.protoTypes = { setPage: PropTypes.func.isRequired };
