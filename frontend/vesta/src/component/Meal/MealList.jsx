import React from 'react';
import { Divider, Grid } from 'semantic-ui-react';
import styled from 'styled-components';
// import { StyledContainer } from '../../styles/Menu_Recommendation/StyledContainer';
import Meal from './Meal';

const Box = styled.div`
background-color:#B3D962;
border-radius: 10px;
width: 1060px;
height: 80px;
padding: 1.5%
`;

const RecommendationHeader = styled.div`
font-family:'verveine';
font-size:65px;
color:#F28095;
position:relative;
`;

const MealList = (props) => (
  <div className="MealList">
    <Box className="MenuRecommendation">
      <RecommendationHeader>{props.title}</RecommendationHeader>
    </Box>
    <Divider />
    <Grid>
      <Grid.Column width={3}>
        <Meal
          time="breakfast"
        />
      </Grid.Column>
      <Grid.Column width={3}>
        <Meal
          time="lunch"
        />
      </Grid.Column>
      <Grid.Column width={3}>
        <Meal
          time="dinner"
        />
      </Grid.Column>
    </Grid>
    {/* </Box> */}
  </div>
);

export default MealList;
