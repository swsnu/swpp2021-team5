import React from 'react';
import { Grid } from 'semantic-ui-react';
import Meal from './Meal';

const MealList = () => (
  <div className="MenuRecommendation">
    <Grid>
      <Grid.Column width={4}>
        <Meal
          time="breakfast"
        />
      </Grid.Column>
      <Grid.Column width={4}>
        <Meal
          time="lunch"
        />
      </Grid.Column>
      <Grid.Column width={4}>
        <Meal
          time="dinner"
        />
      </Grid.Column>
    </Grid>
  </div>
);

export default MealList;
