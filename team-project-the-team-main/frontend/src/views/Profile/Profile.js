import * as React from "react";
import {Container, Form, FormLabel, Row, Col, Button }from "react-bootstrap";
import 'react-datepicker/dist/react-datepicker.css';

import { Redirect } from 'react-router';
import backendServer from '../../webConfig';
import axios from 'axios';
import {useState} from 'react';
class Profile extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      userDetails: {},
      firstName: '',
      lastName: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      country: "",
      password: "",
    };
  }

  componentDidMount(){
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("user: "+user);
    const userId = user.id;
    console.log("userId:"+userId)
        
    axios
    .get(`${backendServer}/v1/user/getUser`, {params: {
     userId,
    }})
    .then((response) => {
      
      if (response.status === 200) {
        console.log(response.data);
        this.setState({
          userDetails: response.data,
        });
        
      } else {
        this.setState({ errorMsg: response.data });
      }
     
    })
    .catch((err) => {
      this.setState({ errorMsg: err });
    });
 }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleChangeFirstName = (e) => {
    const { userDetails } = this.state;
    userDetails.first_name = e.target.value;
    this.setState({ userDetails });

  }
  handleChangeLastName = (e) => {
    const { userDetails } = this.state;
    userDetails.last_name = e.target.value;
    this.setState({ userDetails });
  }
  handleChangeEmail = (e) => {
    const { userDetails } = this.state;
    userDetails.email = e.target.value;
    this.setState({ userDetails });

  }
  handleChangePhone = (e) => {
    const { userDetails } = this.state;
    userDetails.phone_number = e.target.value;
    this.setState({ userDetails });
  }
  handleChangeStreet = (e) => {
    const { userDetails } = this.state;
    userDetails.add_line1 = e.target.value;
    this.setState({ userDetails });

  }
  handleChangeCity = (e) => {
    const { userDetails } = this.state;
    userDetails.add_line2 = e.target.value;
    this.setState({ userDetails });
  }
  handleChangeState = (e) => {
    const { userDetails } = this.state;
    userDetails.state = e.target.value;
    this.setState({ userDetails });

  }
  handleChangeCountry = (e) => {
    const { userDetails } = this.state;
    userDetails.country = e.target.value;
    this.setState({ userDetails });
  }

  handleChangePassword = (e) => {
    const { userDetails } = this.state;
    userDetails.password = e.target.value;
    this.setState({ userDetails });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const {
      userDetails,
      firstName,
      lastName,
      email,
      phone,
      add_line1,
      add_line2,
      state,
      country,
      username,
      password,
      
    } = this.state;

    const profile = {
      firstName,
      lastName,
      email,
      phone,
      add_line1,
      add_line2,
      state,
      country,
      username,
      password,
    };
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(userDetails.first_name.length==0){
      alert("First Name can't be empty");
    }
    else if(userDetails.email.length==0 || !userDetails.email.match(validRegex)){
      alert("Email can't be empty or invalid email format");
    }
    else if(userDetails.username.length==0){
      alert("Username can't be empty");
    }
    else if(userDetails.password.length==0){
      alert("Password can't be empty");
    }
    else{
      console.log("inside submit: "+userDetails);
    axios
      .post(`${backendServer}/v1/user/update`, userDetails)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          this.setState({
            
          });
          alert("Profile Changes Updated!");
        } else {
          this.setState({ errorMsg: response.data });
        }
      })
      .catch((err) => {
        this.setState({ errorMsg: err });
      });
    }
  };


 

  render() {
    const { userDetails} = this.state;
    console.log("userDetails:"+JSON.stringify(userDetails))
    const mileage = userDetails.mileage;
    console.log(mileage)
    return (
      <>
       <h2>Edit Profile Details</h2>
       
       <br/>
    
        <div class="container">
        
        <form>
        <fieldset>
          
          <div class="row gutters">
          <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div class="card h-100">
              <div class="card-body">
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 class="mb-2 text-primary">Personal Details</h6>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="firstName">First Name</label>
                        <input type="text" class="form-control" name="first_name" onChange={this.handleChangeFirstName} value={userDetails.first_name}/>
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                    <label for="lastname">Last Name</label>
                    <input type="text" class="form-control" name="last_name" onChange={this.handleChangeLastName} value={userDetails.last_name}/>
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="phone">Phone</label>
                      <input type="text" class="form-control" name="phone" onChange={this.handleChangePhone} value={userDetails.phone_number}/>
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="eMail">Email</label>
                      <input type="text" class="form-control" name="email" onChange={this.handleChangeEmail} value={userDetails.email}/>
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="username">Username</label>
                      <input type="text" class="form-control" name="username" IsReadOnly="True" value={userDetails.username}/>
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="password">Update Password</label>
                      <input type="password" class="form-control" name="password" onChange={this.handleChangePassword} value={userDetails.password}/>
                    </div>
                  </div>
                </div>
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 class="mt-3 mb-2 text-primary">Address</h6>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="Street">Street</label>
                      <input type="text" class="form-control" name="add_line1" onChange={this.handleChangeStreet} value={userDetails.add_line1 }/>
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="ciTy">City</label>
                      <input type="text" class="form-control" name="add_line2" onChange={this.handleChangeCity} value={userDetails.add_line2}/>
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="sTate">State</label>
                      <input type="text" class="form-control" name="state" onChange={this.handleChangeState} value={userDetails.state}/>
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="zIp">Country</label>
                      <input type="text" class="form-control" name="country" onChange={this.handleChangeCountry} value={userDetails.country}/>
                    </div>
                  </div>
                </div>
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <br/>
                    <div class="text-right">
                      <button type="submit" id="submit" name="submit" class="btn btn-primary" onClick={this.handleSubmit} >Update</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>

        </fieldset>
        </form>
    </div>


        
      </>
    );
  }
}
export default Profile;
