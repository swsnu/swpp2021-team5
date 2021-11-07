import React from 'react';
import {
  Image, Container, Divider, Grid,
} from 'semantic-ui-react';
import styled from 'styled-components';

const MenuNameHeader = styled.div`
background-color:#B3D962;
font-size:65px;
color:#F28095;
font-family:'verveine';
border-radius: 10px;
`;

const TextArea = styled.div`
background-color:#F2BB16;
border-radius: 10%;
font-family:'verveine';
font-size:30px;
`;

const Nutrient = (props) => (
  <Container text>
    <MenuNameHeader>{props.menu_name}</MenuNameHeader>
    <Divider />
    <Grid>
      <Grid.Column width={12}>
        <Image
          src="/sushi_example_image.jpeg"
          alt="menu"
          size="large"
        />
      </Grid.Column>
      <Grid.Column width={4}>
        <TextArea>
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
        </TextArea>
      </Grid.Column>
    </Grid>
  </Container>
);

export default Nutrient;
