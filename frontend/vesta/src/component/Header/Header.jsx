import React from 'react';
import styled from 'styled-components';
import { Button, Image } from 'semantic-ui-react';
import '../../styles/Header/header.css';

const HeaderBackground = styled.div`
background-color:#F2CE1B;
top:0;
width:100%;
z-index:0.5;
`;

const Header = () => (
  <HeaderBackground>
    <Image
      className="logo-image"
      centered
      src="/kitchenVestaLogo.png"
      alt="logo"
      size="small"
    />
    <Button.Group className="header-buttons">
      <Button className="setting button">setting</Button>
      <Button className="logout button">logout</Button>
    </Button.Group>
  </HeaderBackground>
);

export default Header;
