import React from 'react';
import {
  Image, Container, Header, Divider,
} from 'semantic-ui-react';

const Nutrient = (props) => (
  <Container text>
    <Header as="h2">{props.menu_name}</Header>
    <Divider />
    <Image
      src="/sushi_example_image.jpeg"
      as="a"
      alt="menu"
      size="medium"
    />
    <p>{props.calories}</p>
    <p>{props.carbs}</p>
    <p>{props.protein}</p>
    <p>{props.fat}</p>
  </Container>
);

export default Nutrient;
