/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Button, Form
  } from 'semantic-ui-react';
import styled from 'styled-components';

import * as actionCreators from '../../store/actions/index';
import { sexToggleButtons } from '../Setting/Setting';
import { recommendedCalorie } from '../Setting/Calculator';

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

export const isNumeric = (str) => {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      age: '',
      sex: true,
      height: '',
      weight: '',
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

  onChangedAge = (e) => {
    const thisState = this.state;
    this.setState({ ...thisState, age: e.target.value });
  }

  onClickedUserSexMaleButton = (e) => {
    const thisState = this.state;
    if (!this.state.sex) {
      this.setState({...thisState, sex: true})
    }
  }

  onClickedUserSexFemaleButton = (e) => {
    const thisState = this.state;
    if (this.state.sex) {
      this.setState({...thisState, sex: false})
    }
  }

  onChangedHeight = (e) => {
    const thisState = this.state;
    this.setState({ ...thisState, height: e.target.value });
  }

  onChangedWeight = (e) => {
    const thisState = this.state;
    this.setState({ ...thisState, weight: e.target.value });
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

    if (!isNumeric(this.state.age) || parseInt(this.state.age) < 5) {
      alert('Age should be a number larger than 4');
      return;
    } else if (!isNumeric(this.state.height)) {
      alert('Height should be entered as a number');
      return;
    } else if (!isNumeric(this.state.weight)) {
      alert('Weight should be enterend as a number');
      return;
    }

    const targetCalories = recommendedCalorie(
      parseInt(this.state.age),
      this.state.sex,
      parseFloat(this.state.height),
      parseFloat(this.state.weight)
    )
    this.props.onRegister(
      this.state.username,
      this.state.password,
      this.state.age,
      this.state.sex,
      this.state.height,
      this.state.weight,
      targetCalories,
    )
    /*alert(`Succesfully Registered!\nYour Target Calorie is set to ${targetCalories}Kcal as recommended generally for your body profile.\nYou can customize your target calorie at the setting page after login.\nWelcome!`);*/
  }

  render() {
    let sexSelectButton = sexToggleButtons(this.state.sex,
      this.onClickedUserSexMaleButton, this.onClickedUserSexFemaleButton)

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
            <Form.Field>
              <label>Age</label>
              <input
                id='age-input'  
                type='text'
                placeholder='Age'
                onChange={(e) => this.onChangedAge(e)}
              />
            </Form.Field>
            <Form.Field>
              <label>Sex</label>
              {sexSelectButton}
            </Form.Field>
            <Form.Field>
              <label>Height</label>
              <input
                id='height-input'  
                type='text'
                placeholder='Height'
                onChange={(e) => this.onChangedHeight(e)}
              />
            </Form.Field>
            <Form.Field>
              <label>Weight</label>
              <input
                id='weight-input'  
                type='text'
                placeholder='Weight'
                onChange={(e) => this.onChangedWeight(e)}
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
    onRegister: (
      username, password, age, sex, height, weight, targetCalories
    ) => dispatch(actionCreators.signUp(
      username, password, parseInt(age), sex, parseFloat(height), parseFloat(weight), targetCalories
    )),
  }
}

export default connect(null, mapDispatchToProps)(Signup);