import React from 'react';
import {
  Image, Container, Divider, Grid,
} from 'semantic-ui-react';
import styled from 'styled-components';

const MenuNameHeader = styled.div`
background-color:#B3D962;
font-size:44px;
font-weight:600;
color:#F28095;
font-family:"Helvetica";
border-radius: 10px;
`;

const TextArea = styled.div`
background-color:#F2CE1B;
border-radius: 10%;
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
