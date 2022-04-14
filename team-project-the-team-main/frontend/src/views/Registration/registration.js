import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DatePicker from "react-datepicker";
import Card from "react-bootstrap/Card";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import backendServer from "../../webConfig";
import Alert from "react-bootstrap/Alert";
export default class Registration extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      address1: "",
      address2: "",
      city: "",
      zip: "",
      state: "",
      country: "",
      userType: "",
      user: "",
      phone: "",
      validated: false,
      errorMsg: "",
      successMsg: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleChangeUserType = (e) => {
    this.setState({ userType: e.target.value });
  };

  handleChangeDateofBirth = (val) => {
    this.setState({ dateOfBirth: val });
  };

  clear = () => {
    this.setState({
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      address1: "",
      address2: "",
      city: "",
      zip: "",
      state: "",
      country: "",
      userType: "",
      phone: "",
      errorMsg: "",
    });
  };
  handleSubmit = (e) => {
    this.setState({ successMsg: "" });
    if (!this.validateForm()) {
      return;
    }

    const {
      username,
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      address1,
      address2,
      city,
      zip,
      state,
      country,
      userType,
      phone,
    } = this.state;
    const user = {
      username: username,
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
      dob: dateOfBirth,
      add_line2: address2,
      city: city,
      add_line1: address1,
      zip: zip,
      state: state,
      country: country,
      user_type: userType,
      phone_number: phone,
    };
    console.log(user);
    axios
      .post(`${backendServer}/v1/user/register`, user)
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data.entity);
          this.setState({
            redirectFlag: true,
            user: response.data,
          });
          this.setState({
            successMsg: "User Registered Successfully! Please Login.",
          });
          this.clear();
        } else {
          this.setState({ errorMsg: response.data.statusInfo.reasonPhrase });
        }
      })
      .catch((err) => {
        this.setState({ errorMsg: err });
      });
  };
  validateForm = () => {
    const {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      address1,
      city,
      zip,
      state,
      country,
      userType,
      phone,
    } = this.state;
    if (firstName === null || firstName === "") {
      this.setState({ errorMsg: "First Name can not be blank" });
      return false;
    } else if (firstName.match("^[a-zA-Z ]*$") === null) {
      this.setState({ errorMsg: "Please enter valid First Name" });
      return false;
    }
    if (lastName === null || lastName === "") {
      this.setState({ errorMsg: "Last Name can not be blank" });
      return false;
    } else if (lastName.match("^[a-zA-Z ]*$") === null) {
      this.setState({ errorMsg: "Please enter valid Last Name" });
      return false;
    }
    if (dateOfBirth === null || dateOfBirth === "") {
      this.setState({ errorMsg: "Date Of Birth can not be blank" });
      return false;
    }
    if (address1 === null || address1 === "") {
      this.setState({ errorMsg: "Address1 can not be blank" });
      return false;
    } else if (address1.match("^[a-zA-Z 0-9]*$") === null) {
      this.setState({ errorMsg: "Please enter valid address" });
      return false;
    }
    if (city === null || city === "") {
      this.setState({ errorMsg: "City can not be blank" });
      return false;
    } else if (city.match("^[a-zA-Z ]*$") === null) {
      this.setState({ errorMsg: "Please enter valid city" });
      return false;
    }
    if (zip === null || zip === "" || zip === "0") {
      this.setState({ errorMsg: "Zip can not be blank" });
      return false;
    } else if (zip.match("^[0-9]*$") === null) {
      this.setState({ errorMsg: "Please enter valid zip" });
      return false;
    }
    if (state === null || state === "" || state === "Select Pilot 2") {
      this.setState({ errorMsg: "State can not be blank" });
      return false;
    } else if (state.match("^[a-zA-Z ]*$") === null) {
      this.setState({ errorMsg: "Please enter valid state" });
      return false;
    }
    if (country === null || country === "") {
      this.setState({ errorMsg: "Country can not be blank" });
      return false;
    } else if (country.match("^[a-zA-Z ]*$") === null) {
      this.setState({ errorMsg: "Please enter valid Country" });
      return false;
    }
    if (email === null || email === "") {
      this.setState({ errorMsg: "Email can not be blank" });
      return false;
    } else if (email.match("^[^@]+@[^@]+.[^@]+$") === null) {
      this.setState({ errorMsg: "Please enter valid email" });
      return false;
    }
    if (phone === null || phone === "" || zip === "0") {
      this.setState({ errorMsg: "Phone Number can not be blank" });
      return false;
    } else if (phone.match("^[0-9]*$") === null) {
      this.setState({ errorMsg: "Please enter valid phone number" });
      return false;
    }
    if (password === null || password === "") {
      this.setState({ errorMsg: "Password Name can not be blank" });
      return false;
    }
    if (userType === null || userType === "") {
      this.setState({ errorMsg: "Please select user type" });
      return false;
    } else if (userType.match("^[a-zA-Z ]*$") === null) {
      this.setState({ errorMsg: "Please enter valid user type" });
      return false;
    }

    this.setState({ errorMsg: "" });
    return true;
  };
  render() {
    return (
      <div
        style={{
          "padding-top": "100px",
          "align-items": "center",
          "justify-content": "center",
        }}
      >
        {" "}
        <Card
          style={{
            "align-items": "center",
            "justify-content": "center",
          }}
        >
          <Card.Body>
            <h5>New User</h5>
            &nbsp;
            {this.state.successMsg !== undefined &&
            this.state.successMsg != null &&
            this.state.successMsg !== "" ? (
              <Alert variant="success" size="sm">
                {this.state.successMsg}
              </Alert>
            ) : null}
            {this.state.errorMsg !== undefined &&
            this.state.errorMsg != null &&
            this.state.errorMsg !== "" ? (
              <Alert variant="danger" size="sm">
                {this.state.errorMsg}
              </Alert>
            ) : null}
            <Form noValidate validated={this.state.validated}>
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    size="sm"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    size="sm"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="4"
                  controlId="validationCustomUsername"
                >
                  <Form.Label>Date Of Birth</Form.Label>
                  <DatePicker
                    selected={this.state.dateOfBirth}
                    onChange={this.handleChangeDateofBirth}
                    name="dateOfBirth"
                    dateFormat="MM/dd/yyyy"
                    value={this.state.dateOfBirth}
                    maxDate={new Date()}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="5" controlId="validationCustom03">
                  <Form.Label>Address Line 1</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Address Line 1"
                    required
                    name="address1"
                    size="sm"
                    value={this.state.address1}
                    onChange={this.handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid city.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="5" controlId="validationCustom04">
                  <Form.Label>Address Line 2</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Address Line 2"
                    required
                    name="address2"
                    size="sm"
                    value={this.state.address2}
                    onChange={this.handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid state.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="2" controlId="validationCustom05">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City"
                    name="city"
                    required
                    size="sm"
                    value={this.state.city}
                    onChange={this.handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid zip.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="validationCustom03">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    placeholder="State"
                    required
                    size="sm"
                    value={this.state.state}
                    onChange={this.handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid city.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    placeholder="Country"
                    required
                    size="sm"
                    value={this.state.country}
                    onChange={this.handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid state.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom05">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Zip"
                    name="zip"
                    required
                    size="sm"
                    value={this.state.zip}
                    onChange={this.handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid zip.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="3" controlId="validationCustom05">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="email"
                    name="email"
                    required
                    size="sm"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid zip.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom03">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="phone"
                    name="phone"
                    placeholder="Phone"
                    required
                    size="sm"
                    maxLength="20"
                    value={this.state.phone}
                    onChange={this.handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid city.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    size="sm"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid state.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <FormControl component="fieldset">
                  <FormLabel component="legend">User Type</FormLabel>
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="row-radio-buttons-group"
                    onChange={this.handleChangeUserType}
                  >
                    <FormControlLabel
                      value="Customer"
                      control={<Radio size="small" />}
                      label="Customer"
                    />
                    <FormControlLabel
                      value="Employee"
                      control={<Radio size="small" />}
                      label="Employee"
                    />
                  </RadioGroup>
                </FormControl>
              </Row>
              <Button type="button" onClick={this.handleSubmit}>
                Register
              </Button>
              &nbsp; &nbsp;
              <Button type="button" onClick={this.clear}>
                Clear
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
