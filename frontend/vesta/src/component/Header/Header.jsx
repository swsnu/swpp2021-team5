import React from 'react';
import styled from 'styled-components';
import { Button, Image } from 'semantic-ui-react';

const HeaderBackground = styled.div`
background-color:#F2CE1B
`;

const Header = () => (
  <HeaderBackground>
    <Image
      centered
      src="/kitchenVestaLogo.png"
      alt="logo"
      size="medium"
    />
    <Button className="ui button">setting</Button>
    <Button className="ui button">logout</Button>
  </HeaderBackground>
);

export default Header;
