/* eslint-disable */
import React from 'react';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import { Grid, Header } from 'semantic-ui-react';

import { todayOptions, todayData } from './GraphConfig';

const Div = styled.div`
align-items:center;
vertical-align: middle;
line-height: 10px;
height: 500px;
margin: 5% auto;
width: 90%;
background-color:#CCEECC;
border-radius: 20px;
padding: 5%;
`;

const BarDiv = styled.div`
align-items:center;
vertical-align: middle;
line-height: 10px;
height: 400px;
`;

const StatsDaily = (props) => {

  const barData = todayData;
  barData.datasets[0].data = [
    Math.round((props.intake.calories/props.recommendedIntake.calories) * 10000) / 100,
    Math.round((props.intake.carbs/props.recommendedIntake.carbs) * 10000) / 100,
    Math.round((props.intake.protein/props.recommendedIntake.protein) * 10000) / 100,
    Math.round((props.intake.fat/props.recommendedIntake.fat) * 10000) / 100,
  ]
  barData.datasets[1].data = [
    Math.round(props.intake.calories * 100) / 100,
    Math.round(props.intake.carbs * 100) / 100,
    Math.round(props.intake.protein * 100) / 100,
    Math.round(props.intake.fat * 100) / 100
  ]
  barData.datasets[2].data = [
    Math.round(props.recommendedIntake.calories * 100) / 100,
    Math.round(props.recommendedIntake.carbs * 100) / 100,
    Math.round(props.recommendedIntake.protein * 100) / 100,
    Math.round(props.recommendedIntake.fat * 100) / 100,
  ]

  return (
    <Div>
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Header as='h2'>Your Today Intake</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <BarDiv>
              <Bar data={barData} plugins={[ChartDataLabels]} options={todayOptions} />
            </BarDiv>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Div>
  )
}

export default StatsDaily;