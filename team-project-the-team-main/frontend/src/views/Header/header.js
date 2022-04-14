import Box from "@mui/material/Box";
import { ReactComponent as Logo } from "../../swa_logo_dark.svg";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import Typography from "@mui/material/Typography";
import { Redirect } from "react-router";
import PropTypes from "prop-types";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user")),
      redirectFlag: false,
    };
  }

  componentDidMount = () => {
    this.setState({ user: JSON.parse(localStorage.getItem("user")) });
  };

  handlePage = (e) => {
    this.props.callPage(e.target.value);
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
    const user = this.state.user;
    console.log("user: " + user);
    if (this.state.redirectFlag) {
      redirectVar = <Redirect to={{ pathname: "/" }} />;
    }
    return (
      <>
        {redirectVar}
        <AppBar
          style={{ background: "#ffff" }}
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar color="white">
            <Box display="flex" flexGrow={1}>
              <Typography variant="h6" noWrap component="div">
                <Logo />
              </Typography>
            </Box>

            {user === null ? (
              <>
                <div>
                  <a
                    size="small"
                    href="/"
                    className="nav-link btn-green"
                    type="button"
                  >
                    LOGIN
                  </a>
                </div>
                <div>
                  <a
                    size="small"
                    href="/signup"
                    className="nav-link btn-green"
                    type="button"
                  >
                    SIGNUP
                  </a>
                </div>
              </>
            ) : (
              <div>
                <Dropdown size="sm">
                  <Dropdown.Toggle
                    className="header-user Header-Dashboard"
                    id="dropdown-basic"
                    style={{ "background-color": "white", color: "blue" }}
                    size="sm"
                  >
                    {this.state.user !== undefined &&
                      this.state.user.first_name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu size="sm">
                    <Dropdown.Item onClick={this.handlePage} value="profile">
                      My Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={this.handlePage} value="rewards">
                      Mileage Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={this.handleLogout}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </>
    );
  }
}
Header.protoTypes = { setPage: PropTypes.func.isRequired };
