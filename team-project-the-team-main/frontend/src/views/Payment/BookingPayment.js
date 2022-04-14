import * as React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import AddCard from "./AddCard";
import AddBank from "./AddBank";
import { Redirect } from "react-router";
import Switch from "@material-ui/core/Switch";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

export default class BookingPayment extends React.Component {
  constructor() {
    super();
    this.state = {
      flightDetails: "",
      passengers: [],
      paymentDetails: "",
      redirectFlag: false,
      redirectBackFlag: false,
      paymentType: "Credit Card",
      checked: false,
      rewards: 0,
      user: JSON.parse(localStorage.getItem("user")),
      errors: '',
    };
  }

  handleCallback = (paymentData) => {
    this.setState({ paymentDetails: paymentData });
  };

  componentDidMount() {
    const flight = JSON.parse(localStorage.getItem("flight"));
    const user = JSON.parse(localStorage.getItem("user"));
    const passengers = JSON.parse(localStorage.getItem("passengers"));
    this.setState({
      flightDetails: flight,
      passengers: passengers,
      user: user,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { paymentDetails} = this.state;
    if(paymentDetails === ""){
      this.setState({errors : "Please enter payment details"})
    }
    else if(paymentDetails.payment_type === 'Bank Account'){
      if(paymentDetails.bankName === '' ||
         paymentDetails.accNumber === '' ||
         paymentDetails.ifscCode === '' ||
         paymentDetails.cvv === '' || paymentDetails.cvv.length !==3){
          this.setState({errors : "Invalid Bank account"})
        }else{
            localStorage.setItem("payment", JSON.stringify(this.state.paymentDetails));
            localStorage.setItem("rewards", this.state.rewards);
            this.props.setPage("reviewBooking");
            //this.setState({ redirectFlag: true });
        }
    }
    else if(paymentDetails.payment_type === 'Credit Card'){
      if(paymentDetails.firstFour === '' || paymentDetails.firstFour.length !== 4 ||
         paymentDetails.secondFour === '' || paymentDetails.secondFour.length !== 4 ||
         paymentDetails.middleFour === '' || paymentDetails.middleFour.length !==4 ||
         paymentDetails.lastFour === '' || paymentDetails.lastFour.length !== 4 ||
         paymentDetails.nameOnCard === '' || paymentDetails.month === '' ||
         paymentDetails.year === '' || paymentDetails.year.length !==2 ||
         paymentDetails.cvv === '' || paymentDetails.cvv.length !==3){
          this.setState({errors : "Invalid card details"})
        }else{
            localStorage.setItem("payment", JSON.stringify(this.state.paymentDetails));
            localStorage.setItem("rewards", this.state.rewards);
            this.props.setPage("reviewBooking");
            //this.setState({ redirectFlag: true });
        }
    }
  };

  handleBack = (e) => {
    e.preventDefault();
    this.props.setPage("addpassenger");
    //this.setState({ redirectBackFlag: true });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleMileage = (e) => {
    var mileage = this.state.checked;
    this.setState({ checked: !mileage });
    if (!mileage) {
      this.getRewards();
    }
  };

  getRewards = () => {
    let availRewards = this.state.user.mileage.availableRewards;
    console.log("availRewards: "+availRewards);
    this.setState({
      rewards: (availRewards / 10).toFixed(2)
    });
  };

  render() {
    const {
      flightDetails,
      passengers,
      redirectFlag,
      redirectBackFlag,
      paymentType,
      errors
    } = this.state;
    let showCard = false;
    if (paymentType === "Credit Card") {
      showCard = true;
    } else {
      showCard = false;
    }
    let redirectVar = null;
    console.log("redirectFlag" + redirectFlag);
    if (redirectFlag) {
      redirectVar = <Redirect to="/bookingreview" />;
    }
    if (redirectBackFlag) {
      redirectVar = <Redirect to="/addpassenger" />;
    }
    const passengerDetails = passengers.map((pas, index) => (
      <Row>
        {index + 1}
        {"."}

        <Col>{pas.firstName}</Col>
        <Col>{pas.lastName}</Col>
        <Col>{pas.govtId}</Col>
        <Col>{pas.govtIdNum}</Col>
        <Col>{pas.age}</Col>
        <Col>{pas.seatNumber.split('-')[0]}</Col>
      </Row>
    ));
    return (
      <>
        {redirectVar}{" "}
        <Form>
          <Card>
            <Card.Header>Flight Details</Card.Header>
            <Card.Body>
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
                    <b>
                      {new Date(flightDetails.departureTime).toLocaleString()}
                    </b>
                  </Col>
                  <Col>
                    Arrival Date:{" "}
                    <b>
                      {new Date(flightDetails.arrivalTime).toLocaleString()}
                    </b>
                  </Col>
                  <Col>
                    Price:{" $"}
                    <b>{flightDetails.price}</b>
                  </Col>
                </Row>
              </Card.Body>
            </Card.Body>
          </Card>
          &nbsp;
          <Card>
            <Card.Header>Passenger Details</Card.Header>
            <Card.Body>
              {" "}
              <Row>
                <Col>
                  <b>First Name</b>
                </Col>
                <Col>
                  <b>Last Name</b>
                </Col>
                <Col>
                  <b>Government ID</b>
                </Col>
                <Col>
                  <b>Government ID Number</b>
                </Col>
                <Col>
                  <b>Age</b>
                </Col>
                <Col>
                  <b>Seat Number</b>
                </Col>
              </Row>
              {passengerDetails}
            </Card.Body>
          </Card>
          &nbsp;
          <Card>
            <Card.Header>Payment Details</Card.Header>
            <Card.Body>
              <Row>
                <Col md={4}>
                  Avail Mileage Points{" "}
                  {this.state.user.mileage.availableRewards !== 0 ? (
                    <Typography fontSize="12px" color="text.secondary">
                      Available Rewards Points: {' '}
                      {this.state.user.mileage.availableRewards}
                      (You can redeem upto 10% of Available Reward Points )
                    </Typography>
                  ) : (
                    <Typography fontSize="12px" color="text.secondary">
                      Available Points 0 (You can redeem upto 10% of Available
                      Reward Points )
                    </Typography>
                  )}
                </Col>

                <Col md={4}>
                  <Switch
                    checked={this.state.checked}
                    onChange={this.handleMileage}
                    name="mileage"
                  />
                </Col>
                <Col md={4}>
                  {this.state.checked === true ? (
                    <Typography>
                      Points availed {this.state.rewards}
                      <Typography fontSize="12px" color="text.secondary">
                        (You will see final amount on payment review page
                        {this.state.user.mileage.availablerewards})
                      </Typography>
                    </Typography>
                  ) : (
                    <Typography
                      fontSize="12px"
                      color="text.secondary"
                    ></Typography>
                  )}
                </Col>
              </Row>
              <Row>&nbsp;</Row>
              <Row>
                <Col>
                  <Form.Check
                    className="mr-sm-2"
                    inline
                    value="Credit Card"
                    defaultChecked="true"
                    label="Credit Card"
                    name="paymentType"
                    type="radio"
                    id="Credit Card"
                    onChange={this.handleChange}
                  />
                  <Form.Check
                    className="mr-sm-2"
                    inline
                    value="Bank Account"
                    label="Bank Account"
                    name="paymentType"
                    type="radio"
                    id="Bank Account"
                    onChange={this.handleChange}
                  />
                  <span style={{color: "#de404d"}}>{errors}</span>
                  {showCard && <AddCard parentCallback={this.handleCallback} />}
                  {!showCard && (
                    <AddBank parentCallback={this.handleCallback}></AddBank>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Form>
        &nbsp;
        <div>
          <Form>
            <Button variant="danger" type="submit" onClick={this.handleBack}>
              <ChevronLeftIcon />
              Edit Passenger
            </Button>{" "}
            <Button variant="danger" type="submit" onClick={this.handleSubmit}>
              Review <ChevronRightIcon />
            </Button>{" "}
          </Form>
        </div>
      </>
    );
  }
}
BookingPayment.protoTypes = { setPage: PropTypes.func.isRequired };
