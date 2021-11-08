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
font-size:25px;
`;

const Nutrient = (props) => (
  <Container text className="Nutrient">
    <MenuNameHeader>{props.menu_name}</MenuNameHeader>
    <Divider />
    <Grid>
      <Grid.Column width={9}>
        <Image
          src="/sushi_example_image.jpeg"
          alt="menu"
          size="large"
        />
      </Grid.Column>
      <Grid.Column width={7}>
        <TextArea>
          <p>
            Calories:&nbsp;
            {props.calories}
            &nbsp;
            kCal
          </p>
          <p>
            Carbohydrate:&nbsp;
            {props.carbs}
            &nbsp;
            g
          </p>
          <p>
            Protein:&nbsp;
            {props.protein}
            &nbsp;
            g
          </p>
          <p>
            Fat:&nbsp;
            {props.fat}
            &nbsp;
            g
          </p>
        </TextArea>
      </Grid.Column>
    </Grid>
  </Container>
);

export default Nutrient;
