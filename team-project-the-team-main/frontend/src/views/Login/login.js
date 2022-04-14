import Card from "react-bootstrap/Card";
import * as React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import backendServer from "../../webConfig";
import { Redirect } from "react-router";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import { ReactComponent as Logo } from "../../images.svg";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      user: localStorage.getItem("user"),
      userType: "Customer",
      redirectFlag: false,
      successMsg: "",
      errorMsg: "",
    };
  }

  handleUsername = (e) => {
    e.preventDefault();
    this.setState({
      username: e.target.value,
    });
  };

  handleChange = (e) => {
    this.setState({
      userType: e.target.value,
    });
  };
  validateForm = () => {
    const { username, password } = this.state;
    if (username === null || username === "") {
      this.setState({ errorMsg: "User Name can not be blank" });
      return false;
    }
    if (password === null || password === "") {
      this.setState({ errorMsg: "Password date can not be blank" });
      return false;
    }

    this.setState({ errorMsg: "" });
    return true;
  };
  handlePassword = (e) => {
    e.preventDefault();
    this.setState({
      password: e.target.value,
    });
  };
  handleLogin = (e) => {
    if (!this.validateForm()) {
      return;
    }
    const { username, password, userType } = this.state;
    const user = {
      username: username,
      password: password,
      userType: userType,
    };
    console.log(user);
    axios
      .post(`${backendServer}/v1/user/login`, user)
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data.entity);
          localStorage.setItem("user", JSON.stringify(response.data.entity));
          this.setState({
            user: response.data.entity,
            redirectFlag: true,
          });
          this.props.handleUser();
        } else {
          this.setState({ errorMsg: response.data.statusInfo.reasonPhrase });
        }
      })
      .catch((err) => {
        this.setState({ errorMsg: err });
      });
  };
  render() {
    let redirectVar = null;
    const user = this.state.user;
    if (this.state.redirectFlag) {
      redirectVar = <Redirect to={{ pathname: "/dashboard", user }} />;
    }
    return (
      <>
        {redirectVar}
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
              <Row>
                <Col>
                  <Logo />
                </Col>

                <Col>
                  <Form>
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
                    <Form.Group className="mb-1" controlId="formBasicEmail">
                      <Form.Label style={{ fontSize: "16px" }}>
                        Email address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        size="sm"
                        onChange={this.handleUsername}
                      />
                    </Form.Group>

                    <Form.Group className="mb-1" controlId="formBasicPassword">
                      <Form.Label style={{ fontSize: "16px" }}>
                        Password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        size="sm"
                        onChange={this.handlePassword}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Check
                        className="mr-sm-2"
                        inline
                        value="Customer"
                        defaultChecked="true"
                        label="Customer"
                        name="userType"
                        type="radio"
                        id="Customer"
                        onChange={this.handleChange}
                      />
                      <Form.Check
                        className="mr-sm-2"
                        inline
                        value="Employee"
                        label="Employee"
                        name="userType"
                        type="radio"
                        id="Employee"
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={this.handleLogin}
                    >
                      Login
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      </>
    );
  }
}
