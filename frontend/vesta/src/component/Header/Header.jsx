/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { Button, Image, Icon } from 'semantic-ui-react';
import '../../styles/Header/header.css';
import { Component } from 'react';
import * as actionCreators from '../../store/actions/index';
import { NavLink } from 'react-router-dom';

const HeaderBackground = styled.div`
background-color:#F2CE1B;
// height:190px;
// width:900px;
border-radius: 20px;
display: flex;
position: relative;
justify-content:center; // centers in the flex direction and the default flex-direction is row
align-items:center;
padding:10px;
margin:15px;
`;

const Buttons = styled.div`
position: absolute;
top: 0;
right: 0;
`;

class Header extends Component {
  onLogout = () => {
    this.props.onLogout();
    this.props.history.push('/login')
  }
  
  render () {
    return (
      <HeaderBackground>
        <a href="/main">
          <img
            className="logo-image"
            src="/kitchenVestaLogo.png"
            alt="logo"
            width={170}
            height={170}
          />
        </a>
        <Buttons>
          <a href="/setting">
            <Icon circular name='settings' size='large' color='black'></Icon>
          </a>
          <a onClick={() => this.onLogout()}>
            <Icon circular name='user close' size='large' color='black'></Icon>
          </a>
        </Buttons>
      </HeaderBackground>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(actionCreators.logout()),
});

export default connect(null, mapDispatchToProps)(withRouter(Header));
