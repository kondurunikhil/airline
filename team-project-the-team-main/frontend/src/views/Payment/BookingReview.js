import * as React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { Redirect } from "react-router";
import axios from "axios";
import backendServer from "../../webConfig";
import PropTypes from "prop-types";

export default class BookingReview extends React.Component {
  constructor() {
    super();
    this.state = {
      flightDetails: "",
      passengers: [],
      paymentDetails: "",
      redirectBackFlag: false,
      bookingConfirm: "",
      errorMsg: "",
      seatCharges: 0.0,
      totalAmt: 0.0,
      rewards: 0.0
    };
  }

  componentDidMount() {
    const flight = JSON.parse(localStorage.getItem("flight"));
    const passengers = JSON.parse(localStorage.getItem("passengers"));
    const payment = JSON.parse(localStorage.getItem("payment"));
    const rewards = localStorage.getItem("rewards");
    let {seatCharges, totalAmt } = this.state;
    totalAmt = flight.price;
    passengers.map((pas) => {
      seatCharges += parseInt((pas.seatNumber).split('-')[1]);
    })
    totalAmt += seatCharges;
    totalAmt -= parseFloat(rewards);
    console.log(totalAmt);
    this.setState({
      flightDetails: flight,
      passengers: passengers,
      paymentDetails: payment,
      seatCharges,
      totalAmt,
      rewards
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { flightDetails, passengers, paymentDetails, totalAmt, rewards } = this.state;
    const user = JSON.parse(localStorage.getItem("user"));
    const passengersNew = passengers.map(o => ({ ...o, seatNumber: o.seatNumber.split('-')[0] }));
    console.log("passengers :"+passengersNew[0].seatNumber);

    let inputData = "";
    if (paymentDetails.payment_type === "Credit Card") {
      inputData = {
        flight: flightDetails,
        payment_type: paymentDetails.payment_type,
        cardNumber:
          paymentDetails.firstFour +
          "-" +
          paymentDetails.secondFour +
          "-" +
          paymentDetails.middleFour +
          "-" +
          paymentDetails.lastFour,
        nameOnCard: paymentDetails.nameOnCard,
        expirationDate: paymentDetails.month + "/" + paymentDetails.year,
        user: user,
        passengers:passengersNew,
        totalAmt,
        rewards
      };
    }else{
      inputData = {
        flight: flightDetails,
        payment_type: paymentDetails.payment_type,
        bankName: paymentDetails.bankName, 
        IFSCCode: paymentDetails.ifscCode,
        accountNumber: parseInt(paymentDetails.accNumber),
        user: user,
        passengers:passengersNew,
        totalAmt,
        rewards
      };
    }

    console.log(inputData);
    axios
      .post(`${backendServer}/addBooking`, inputData)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          this.setState({
            bookingConfirm: response.data,
          });
          console.log("Booking confirm: "+response.data);
          localStorage.removeItem("payment");
          localStorage.removeItem("passengers");
          localStorage.removeItem("flight");
          localStorage.setItem("bookingid", JSON.stringify(response.data));
          this.props.setPage("bookingSuccess");
        } else {
          this.setState({ errorMsg: response.data });
        }
      })
      .catch((err) => {
        this.setState({ errorMsg: err });
      });
  };

  handleBack = (e) => {
    e.preventDefault();
    this.props.setPage("addpayment");
    //this.setState({ redirectBackFlag: true });
  };

  render() {
    const {
      flightDetails,
      passengers,
      paymentDetails,
      redirectBackFlag,
      totalAmt,
      seatCharges,
      rewards
    } = this.state;
    let redirectVar = null;
    console.log("rewards" + rewards);
    if (redirectBackFlag) {
      redirectVar = <Redirect to="/bookingpayment" />;
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
                  <b>{new Date(flightDetails.arrivalTime).toLocaleString()}</b>
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
            {paymentDetails.payment_type === "Credit Card" && (
              <Row>
                <Col>
                  Card Number:{" "}
                  <b>
                    {paymentDetails.firstFour}
                    {"-"}
                    {paymentDetails.secondFour}
                    {"-"}
                    {paymentDetails.middleFour}
                    {"-"}
                    {paymentDetails.lastFour}
                  </b>
                </Col>
                <Col>
                  Name on Card: <b>{paymentDetails.nameOnCard}</b>
                </Col>
                <Col>
                  Valid thru(mm/yy):{" "}
                  <b>
                    {paymentDetails.month}
                    {"/"}
                    {paymentDetails.year}
                  </b>
                </Col>
                <Col>
                  CVV: <b>{paymentDetails.cvv}</b>
                </Col>
              </Row>
            )}
            {paymentDetails.payment_type === "Bank Account" && (
              <Row>
                <Col>
                  Bank Name: <b>{paymentDetails.bankName}</b>
                </Col>
                <Col>
                  Account Number: <b>{paymentDetails.accNumber}</b>
                </Col>
                <Col>
                  IFSC Code: <b>{paymentDetails.ifscCode}</b>
                </Col>
                <Col>
                  CVV: <b>{paymentDetails.cvv}</b>
                </Col>
              </Row>
            )}
            <br />
            <Row>
              <Col>
                <h5>Flight charges:</h5>
              </Col>
              <Col>
                <h5>{flightDetails.price}</h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>Extra seat charges:</h5>
              </Col>
              <Col>
                <h5>{seatCharges}</h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>Availed reward points:</h5>
              </Col>
              <Col>
                <h5>{rewards}</h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>Total Amount to pay:</h5>
              </Col>
              <Col>
                <h5>{totalAmt}</h5>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        &nbsp;
        <div>
          <Form>
            <Button variant="danger" type="submit" onClick={this.handleBack}>
              <ChevronLeftIcon />
              Edit Payment
            </Button>{" "}
            <Button variant="danger" type="submit" onClick={this.handleSubmit}>
              Confirm Booking
            </Button>{" "}
          </Form>
        </div>
      </>
    );
  }
}
BookingReview.protoTypes = { setPage: PropTypes.func.isRequired };
