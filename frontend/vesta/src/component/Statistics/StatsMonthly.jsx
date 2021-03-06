/* eslint-disable */
import React from 'react';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import {
  Grid, Button, Header
} from 'semantic-ui-react';

import { monthlyOptions, months } from './GraphConfig';

const Div = styled.div`
margin: 5% auto;
background-color:#CCEEFF;
`;

const ChartDiv = styled.div`
color:#F28095;
align-items:center;
vertical-align: middle;
line-height: 10px;
margin: 0 auto;
width: 90%;
height: 500px;
`;

const StatsMonthly = (props) => {
  const  { recommendedIntake, monthlyUserNutritions, selectedMonth } = props
  const title = `${(new Date().getFullYear())} ${months[selectedMonth].month}`
  // console.log(monthNutritions);
  const monthNutritionData = [
    { // first week
      calories: 0,
      carbs: 0,
      protein: 0,
      fat: 0
    },
    { // second week
      calories: 0,
      carbs: 0,
      protein: 0,
      fat: 0
    },
    { // third week
      calories: 0,
      carbs: 0,
      protein: 0,
      fat: 0
    },
    { // last week
      calories: 0,
      carbs: 0,
      protein: 0,
      fat: 0
    }
  ];

  let i;
  for (i = 0; i < monthlyUserNutritions.length; i += 1) {
    let weekIndex =  parseInt((monthlyUserNutritions[i].date.getDate() - 1) / 7);
    if (weekIndex === 4) {
      weekIndex = 3;
    }
    // console.log(weekIndex);
    // console.log(monthNutritions[i]);
    // console.log(monthNutritionData[weekIndex]);
    monthNutritionData[weekIndex].calories += monthlyUserNutritions[i].calories;
    monthNutritionData[weekIndex].carbs += monthlyUserNutritions[i].carbs;
    monthNutritionData[weekIndex].protein += monthlyUserNutritions[i].protein;
    monthNutritionData[weekIndex].fat += monthlyUserNutritions[i].fat;
  }

  for (i = 0; i < 3; i += 1) {
    monthNutritionData[i].calories = Math.round(10000 * (monthNutritionData[i].calories / ( 7 * recommendedIntake.calories))) / 100
    monthNutritionData[i].carbs = Math.round(10000 * (monthNutritionData[i].carbs / ( 7 * recommendedIntake.carbs))) / 100
    monthNutritionData[i].protein = Math.round(10000 * (monthNutritionData[i].protein / ( 7 * recommendedIntake.protein))) / 100
    monthNutritionData[i].fat = Math.round(10000 * (monthNutritionData[i].fat / ( 7 * recommendedIntake.fat))) / 100
  }

    monthNutritionData[3].calories = Math.round(10000 * (monthNutritionData[i].calories / ( (months[selectedMonth].date - 21) * recommendedIntake.calories))) / 100
    monthNutritionData[3].carbs = Math.round(10000 * (monthNutritionData[i].carbs / ( (months[selectedMonth].date - 21) * recommendedIntake.carbs))) / 100
    monthNutritionData[3].protein = Math.round(10000 * (monthNutritionData[i].protein / ( (months[selectedMonth].date - 21) * recommendedIntake.protein))) / 100
    monthNutritionData[3].fat = Math.round(10000 * (monthNutritionData[i].fat / ( (months[selectedMonth].date - 21) * recommendedIntake.fat))) / 100
  

  const barData = {
    labels: [
      '1st Week',
      '2nd Week',
      '3rd Week',
      '4th Week',
    ],
    datasets: [
      {
        label: 'Calorie',
        data: [monthNutritionData[0].calories, monthNutritionData[1].calories, monthNutritionData[2].calories, monthNutritionData[3].calories],
        borderColor: 'green',
        tension: 0.1
      },
      {
        label: 'Carbs',
        data: [monthNutritionData[0].carbs, monthNutritionData[1].carbs, monthNutritionData[2].carbs, monthNutritionData[3].carbs],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      },
      {
        label: 'Protein',
        data: [monthNutritionData[0].protein, monthNutritionData[1].protein, monthNutritionData[2].protein, monthNutritionData[3].protein],
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1
      },
      {
        label: 'Fat',
        data: [monthNutritionData[0].fat, monthNutritionData[1].fat, monthNutritionData[2].fat, monthNutritionData[3].fat],
        borderColor: 'rgb(255, 205, 86)',
        tension: 0.1
      }
    ],
  };

  return (
      <Div className="StatsMonthly">
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column class="left floated column">
              <Button id="monthly-prev-button" onClick={() => props.onClickedMonthlyPrevButton()} primary >Prev</Button>
            </Grid.Column>
            <Grid.Column>
              <Header as='h2'>
                {title}
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Button id="monthly-next-button" onClick={() => props.onClickedMonthlyNextButton()} secondary >Next</Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <ChartDiv>
              <Line data={barData} redraw plugins={[ChartDataLabels]} options={monthlyOptions} />
            </ChartDiv>
          </Grid.Row>
        </Grid>
      </Div>
  )
}

export default StatsMonthly;