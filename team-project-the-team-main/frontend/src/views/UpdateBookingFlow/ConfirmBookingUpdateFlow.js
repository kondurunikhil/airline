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

export default class ConfirmBookingUpdateFlow extends React.Component {
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
      rewards: 0.0,
      oldBooking : {},
      oldBookingId: 0,
      passengers: [
        {
          firstName: "",
          lastName: "",
          age: "",
          govtId: "",
          govtIdNum: "",
          seatNumber: "",
        },
      ],
    };
  }

  componentDidMount() {
    const flight = JSON.parse(localStorage.getItem("latestFlight"));
    const oldPassengers = JSON.parse(localStorage.getItem("bookingDetailsUpdateFlow")).passengers;
    const payment = JSON.parse(localStorage.getItem("bookingDetailsUpdateFlow")).transaction.payment;
   // const rewards = payment.user.mileage.points;
    const oldBookingId = JSON.parse(localStorage.getItem("bookingDetailsUpdateFlow")).id;
    let {seatCharges, totalAmt } = this.state;
    const oldFlight = JSON.parse(localStorage.getItem("oldFlight"));
    
    totalAmt = flight.price;
    totalAmt= totalAmt-oldFlight.price
    let {passengers } = this.state;    
    oldPassengers.map((pas, i)=>{
      passengers[i].firstName =pas.firstName;
      passengers[i].lastName =pas.lastName;
      passengers[i].age =pas.age;
      passengers[i].govtId=pas.govtId;
      passengers[i].govtIdNum=pas.govtIdNum;
      passengers[i].seatNumber=pas.seatNumber;
      this.setState({ passengers });
    })
    console.log(payment.cardDetails.nameOnCard);
    //totalAmt -= parseFloat(rewards);
    
    console.log(totalAmt);
    this.setState({
      flightDetails: flight,
      paymentDetails: payment,
      seatCharges,
      totalAmt,
     // rewards,
      oldBookingId :oldBookingId,
    });
  }
  onEdit = (booking) => {
    localStorage.setItem("bookingDetailsUpdateFlow", JSON.stringify(booking));
    
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { flightDetails, passengers, paymentDetails, totalAmt, rewards } = this.state;
    const user = JSON.parse(localStorage.getItem("user"));
    let inputData = "";
    if (paymentDetails.payment_type === "Credit Card") {
      inputData = {
        flight: flightDetails,
        payment_type: paymentDetails.payment_type,
        cardNumber:paymentDetails.cardDetails.cardNumber,
        nameOnCard: paymentDetails.cardDetails.nameOnCard,
        expirationDate: paymentDetails.cardDetails.expirationDate,
        user: user,
        passengers:passengers,
        totalAmt,
        rewards,
        oldBookingId: this.state.oldBookingId,
        
      };
    }

    console.log(inputData);
    axios
      .post(`${backendServer}/updateBooking`, inputData)
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
          localStorage.setItem("bookingLatest", JSON.stringify(response.data));
          this.props.setPage("successPage");
         
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
    //console.log("rewards" + rewards);
    const oldFlight = JSON.parse(localStorage.getItem("oldFlight"));
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
          <Card.Header>Previous Flight Details</Card.Header>
          <Card.Body>
            <Card.Body>
              <Row>
                <Col>
                  Flight Name: <b>{oldFlight.flightName}</b>
                </Col>
                
              </Row>
              <Row>
                <Col>
                  Departure Date:{" "}
                  <b>
                    {new Date(oldFlight.departureTime).toLocaleString()}
                  </b>
                </Col>
                <Col>
                  Arrival Date:{" "}
                  <b>{new Date(oldFlight.arrivalTime).toLocaleString()}</b>
                </Col>
                <Col>
                  Price:{" $"}
                  <b>{oldFlight.price}</b>
                </Col>
              </Row>
            </Card.Body>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>Latest Flight Details</Card.Header>
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
                  Card Number
                    :{" "}
                  <b>
                    
                    {paymentDetails.cardDetails.cardNumber}
                  </b>
                </Col>
                <Col>
                  Name on Card: <b>{paymentDetails.cardDetails.nameOnCard}</b>
                </Col>
                <Col>
                  Valid thru(mm/yy):{" "}
                  <b>
                    
                    {paymentDetails.cardDetails.expirationDate}
                  </b>
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
            {/* <Row>
              <Col>
                <h5>Availed reward points:</h5>
              </Col>
              <Col>
                <h5>{rewards}</h5>
              </Col>
            </Row> */}
            <Row>
              <Col>
                <h5>Old Flight Charges:</h5>
              </Col>
              <Col>
                <h5>-{oldFlight.price}</h5>
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
            <Button variant="danger" type="submit" onClick={this.handleSubmit}>
              Confirm Booking
            </Button>{" "}
          </Form>
        </div>
      </>
    );
  }
}
ConfirmBookingUpdateFlow.protoTypes = { setPage: PropTypes.func.isRequired };
