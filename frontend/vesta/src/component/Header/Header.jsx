import React from 'react';
import styled from 'styled-components';
import { Button, Image } from 'semantic-ui-react';
import '../../styles/Header/header.css';
import { NavLink } from 'react-router-dom';

const HeaderBackground = styled.div`
background-color:#F2CE1B;
top:0;
round:15px;
width:100%;
z-index:0.5;
`;

const Header = () => (
  <HeaderBackground>
    <a href="/main">
      <Image
        className="logo-image"
        centered
        src="/kitchenVestaLogo.png"
        alt="logo"
        size="small"
      />
    </a>
    <Button.Group className="header-buttons">
      <a href="/setting">
        <Button className="setting button">setting</Button>
      </a>
      <Button className="logout button">logout</Button>
    </Button.Group>
  </HeaderBackground>
);

export default Header;
