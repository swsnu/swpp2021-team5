/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Header, Input, Button, Form
  } from 'semantic-ui-react';
import styled from 'styled-components';

import * as actionCreators from '../../store/actions/index';

const SignupHeader = styled.div`
font-family:'verveine';
font-size:65px;
color:#F28095;
text-align: center;
vertical-align: middle;
line-height: 80px;
`;

const Div = styled.div`
background-color:#B3D962;
color:#F28095;
align-items:center;
vertical-align: middle;
line-height: 80px;
margin:8;
`;

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
    }
  }

  onChangedUsername = (e) => {
    const thisState = this.state;
    this.setState({ ...thisState, username: e.target.value });
  }

  onChangedPassword = (e) => {
    const thisState = this.state;
    this.setState({ ...thisState, password: e.target.value });
  }

  onChangedConfirmPassword = (e) => {
    const thisState = this.state;
    this.setState({ ...thisState, confirmPassword: e.target.value });
  }

  onClickedRegisterButton = () => {
    if (this.state.username === '') {
      alert('You should enter the username');
      return;
    }
    else if (this.state.password === '') {
      alert('You should enter the password');
      return;
    }
    else if (this.state.password !== this.state.confirmPassword) {
      alert('Two value of password are not consistent');
      return;
    }
    else {
      this.props.onRegister(this.state.username, this.state.password)
    }
  }

  render() {
    return (
      <div className="Signup">
              
        <div className="header">
          <br />
            <SignupHeader>Signup Page</SignupHeader>
          <br />
        </div>
        <Div className="body" class="ui one column stackable center aligned page grid">
          <Form className="ui six wide column form segment">
            <Form.Field>
              <label>Username</label>
              <input
                id='username-input'  
                type='text'
                placeholder='Username'
                onChange={(e) => this.onChangedUsername(e)}
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                id='password-input'
                type='password'
                placeholder='Password'
                onChange={(e) => this.onChangedPassword(e)}                
              />
            </Form.Field>
            <Form.Field>
              <label>Confirm Password</label>
              <input
                id='confirm-password-input'
                type='password'
                placeholder='Confirm Password'
                onChange={(e) => this.onChangedConfirmPassword(e)}    
              />
            </Form.Field>
            <Button id='register-button' onClick={() => this.onClickedRegisterButton()}>
              Register
            </Button>
          </Form>
        </Div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRegister: (username, password) => 
      dispatch(actionCreators.signUp(username, password))
  }
}

export default connect(null, mapDispatchToProps)(Signup);