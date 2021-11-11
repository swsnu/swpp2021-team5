/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { Button, Image, Icon } from 'semantic-ui-react';
import '../../styles/Header/header.css';
import { NavLink } from 'react-router-dom';

const HeaderBackground = styled.div`
background-color:#F2CE1B;
// height:190px;
// width:900px;
border-radius: 15px;
display: flex;
position: relative;
justify-content:center; // centers in the flex direction and the default flex-direction is row
align-items:center;
padding:10px;
`;

const Buttons = styled.div`
position: absolute;
top: 0;
right: 0;
`;

const Header = () => (
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
      <a href="/login">
        <Icon circular name='user close' size='large' color='black'></Icon>
      </a>
    </Buttons>
  </HeaderBackground>
);

export default Header;
