import * as React from "react";
import { Card, Nav, Button } from "react-bootstrap";
import SavedCards from "../Payment/SavedCards";
import SavedBank from "../Payment/SavedBank";

export default class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "1",
    };
  }
  handleTabChange = (e) => {
    this.setState = {
      selectedTab: e,
    };
  };
  render() {
    return (
      <>
        <Card>
          <Card.Header>
            <Nav variant="pills" defaultActiveKey="#first">
              <Nav.Item>
                <Nav.Link href="#first">Saved Cards</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#link">Add New Card</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <Card.Title>Manage Cards</Card.Title>
            <Card.Text>
              <SavedCards />
            </Card.Text>
          </Card.Body>
        </Card>
        <div>&nbsp;</div>
        <Card>
          <Card.Header>
            <Nav variant="pills" defaultActiveKey="#first">
              <Nav.Item>
                <Nav.Link href="#first">Saved Bank</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#link">Add Bank</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <Card.Title>Manage Account</Card.Title>
            <Card.Text>
              <SavedBank />
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
}
