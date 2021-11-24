/* eslint-disable */
import React, { Component } from 'react';

import { Button, Grid, GridRow, Header } from 'semantic-ui-react';
import styled from 'styled-components';

import StatsWeeklyChart from './StatsWeeklyChart';

const Div = styled.div`
margin: 5% auto;
background-color:#CCEEFF;
`;

class StatsWeekly extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const selectedWeekSun = new Date(this.props.selectedWeek.getTime());
    selectedWeekSun.setDate(selectedWeekSun.getDate() - selectedWeekSun.getDay());
    const selectedWeekSat = new Date(this.props.selectedWeek.getTime());
    selectedWeekSat.setDate(selectedWeekSat.getDate() + (6 - selectedWeekSat.getDay()));
    const userNutritions = this.props.userNutritions;
    const recommendedIntake = this.props.recommendedIntake;

    console.log(userNutritions);
    let selectedWeekNutritions = userNutritions.filter((nutrition) => {
      return +nutrition.date >= +selectedWeekSun && +nutrition.date <= +selectedWeekSat;
    });
    console.log(selectedWeekNutritions);
    
    return (
      <Div className="StatsWeekly">
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column class="left floated column">
              <Button id="prev-button" onClick={() => this.props.onClickedWeeklyPrevButton()} primary >Prev</Button>
            </Grid.Column>
            <Grid.Column>
              <Header as='h2'>11-1 Week</Header>
            </Grid.Column>
            <Grid.Column>
              <Button id="next-button" onClick={() => this.props.onClickedWeeklyNextButton()} secondary >Next</Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <StatsWeeklyChart selectedWeekNutritions={selectedWeekNutritions} recommendedIntake={recommendedIntake}/>
          </Grid.Row>
        </Grid>
      </Div>
    )
  }
}

export default StatsWeekly;