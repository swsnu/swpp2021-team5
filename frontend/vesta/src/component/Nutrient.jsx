import React from 'react';
import {
  Image, Container, Divider,
} from 'semantic-ui-react';
import styled from 'styled-components';

const MenuNameHeader = styled.div`
background-color:#B3D962;
font-size:44px;
font-weight:600;
color:#F28095;
font-family:sans-serif;
`;

const Nutrient = (props) => (
  <Container text>
    <MenuNameHeader>{props.menu_name}</MenuNameHeader>
    <Divider />
    <Image
      src="/sushi_example_image.jpeg"
      alt="menu"
      size="large"
    />
    <p>
      Calories:
      {props.calories}
    </p>
    <p>
      Carbohydrate:
      {props.carbs}
    </p>
    <p>
      Protein:
      {props.protein}
    </p>
    <p>
      Fat:
      {props.fat}
    </p>
  </Container>
);

export default Nutrient;
