import React from 'react';
import { Divider, Grid, Button } from 'semantic-ui-react';
// import styled from 'styled-components';
// import { StyledContainer } from '../../styles/Menu_Recommendation/StyledContainer';
import Meal from './Meal';
import { Box, RecommendationHeader } from '../../styles/Menu_Recommendation/Meals';

const MealList = (props) => (
  <div>
    <Box className="MenuRecommendation">
      <RecommendationHeader>{props.title}</RecommendationHeader>
      <Divider />
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column>
            <Meal
              time="breakfast"
            />
            {/* <Button>Other</Button> */}
          </Grid.Column>
          <Grid.Column>
            <Meal
              time="lunch"
            />
            {/* <Button>Other</Button> */}
          </Grid.Column>
          <Grid.Column>
            <Meal
              time="dinner"
            />
            {/* <Button>Other</Button> */}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Button className="main-button">Back</Button>
    </Box>
  </div>
);

export default MealList;
