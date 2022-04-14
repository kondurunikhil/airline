import { Form } from "react-bootstrap/";
import * as React from "react";

export default class AddBank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bankName: '',
      accNumber: '',
      ifscCode: '',
      cvv: '',
      payment_type: 'Bank Account'
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    const payment = this.state;
    const name = e.target.name;
    payment[name] = e.target.value;
    this.props.parentCallback(payment);
  }
  render() {
    const { bankName, accNumber, ifscCode, cvv } = this.state;
    return (
      <>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Bank Name</Form.Label>
            <Form.Control type="text" placeholder="Bank Name" size="sm" name="bankName" value= {bankName} onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Account Number</Form.Label>
            <Form.Control type="number" placeholder="Account Number" size="sm" name="accNumber" value= {accNumber} onChange={this.handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>IFSC Code</Form.Label>
            <Form.Control type="text" placeholder="IFSC Code" size="sm" name="ifscCode" value= {ifscCode} onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>CVV</Form.Label>
            <Form.Control type="password" placeholder="CVV" size="sm" name="cvv" value= {cvv} onChange={this.handleChange} />
          </Form.Group>
        </Form>
      </>
    );
  }
}
