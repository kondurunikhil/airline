import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Card from "react-bootstrap/Card";
import Summary from "./Summary";
import Activity from "./MileageHistory";
import axios from "axios";
import backendServer from "../../webConfig";
import PropTypes from "prop-types";

export default class Mileage extends React.Component {
  constructor() {
    super();
    this.state = {
      page: "default",
      user: JSON.parse(localStorage.getItem("user")),
      userMileageProfile: "",
    };
  }

  componentDidMount() {
    this.setState({ user: JSON.parse(localStorage.getItem("user")) });
    this.getMileage();
  }

  handleProfile = () => {
    this.props.setPage("profile");
  };
  getMileage = () => {
    //e.preventDefault();
    //const { userId } = this.state;
    axios
      .get(`${backendServer}/v1/user/getUser?userId=${this.state.user.id}`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          this.setState({
            user: response.data,
          });
          localStorage.setItem("user", JSON.stringify(this.state.user));
        } else {
          this.setState({ errorMsg: response.data });
        }
      })
      .catch((err) => {
        this.setState({ errorMsg: err });
      });
  };
  handleActivity = () => {
    if (this.state.page === "default") {
      this.setState({
        page: "activities",
      });
    } else {
      this.setState({
        page: "default",
      });
    }
  };
  render() {
    return (
      <>
        {this.state.user !== "" ? (
          <Card>
            <Card.Body>
              <Row>
                <Col md={5}>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Hi! {this.state.user.first_name}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 13 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Mileage Rewards ID: {this.state.user.mileage.id}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 13 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Member since{" "}
                    {new Date(
                      this.state.user.mileage.memberSince
                    ).toLocaleDateString()}
                  </Typography>
                  <Button
                    size="small"
                    sx={{ fontSize: 11 }}
                    onClick={this.handleProfile}
                  >
                    View Profile
                    <ChevronRightIcon />
                  </Button>
                </Col>
                <Col md={4}>&nbsp;</Col>
                <Col md={3}>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Points
                  </Typography>
                  <Typography sx={{ fontSize: 24 }} color="text.secondary">
                    {this.state.user.mileage.availableRewards}
                  </Typography>
                  <Button
                    size="small"
                    sx={{ fontSize: 11 }}
                    onClick={this.handleActivity}
                  >
                    Learn More
                    <ChevronRightIcon />
                  </Button>
                </Col>
              </Row>
              <Row></Row>
            </Card.Body>
          </Card>
        ) : null}
        &nbsp;
        {this.state.page === "activities" ? (
          <Activity data={this.state.userMileageProfile} />
        ) : null}
        {this.state.page === "default" ? (
          <Summary getMileage={this.getMileage} />
        ) : null}
      </>
    );
  }
}

Mileage.protoTypes = { setPage: PropTypes.func.isRequired };
