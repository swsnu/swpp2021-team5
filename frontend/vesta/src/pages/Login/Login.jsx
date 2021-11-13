/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Checkbox, Divider, Form } from 'semantic-ui-react';
import styled from 'styled-components';
import * as actionCreators from '../../store/actions/index';

const Div = styled.div`
background-color:#B3D962;
color:#F28095;
align-items:center;
vertical-align: middle;
line-height: 80px;
margin:8;
`;

class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  loginHandler() {
    this.props.onLogin({
      username: this.state.username,
      password: this.state.password,
    });
  }

  signupHandler() {
    this.props.history.push('/signup');
  }

  render() {
    return (
      <Div className="Login" class="ui one column stackable center aligned page grid">
        <Form className="ui six wide column form segment">
        <Divider/>
          <Form.Field>
            <input
              id="username-input"
              type="text"
              value={this.state.username}
              placeholder="username"
              onChange={(event) => this.setState({
                username: event.target.value
              })}
            ></input>
          </Form.Field>
          <Form.Field>
            <input
              id="password-input"
              type="password"
              value={this.state.password}
              placeholder="password"
              onChange={(event) => this.setState({
                password: event.target.value
              })}
            ></input>
          </Form.Field>
          <Button id="submit-button" onClick={() => this.loginHandler()}>
            Login
          </Button>
          <Button id="signup-button" onClick={() => this.signupHandler()}>
            Signup
          </Button>
        </Form>
      </Div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (info) =>
      dispatch(actionCreators.logIn(info)),
  }
}

export default connect(null, mapDispatchToProps)(withRouter(Login));