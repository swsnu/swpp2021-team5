/* eslint-disable */
import React from 'react';

//import ChartDataLabels from 'chartjs-plugin-datalabels';
//import { Bar } from 'react-chartjs-2';

const StatsMonthly = (props) => {

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const title = months[props.selectedMonth]
  const monthNutritions = props.monthlyUserNutritions;
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
  for (i = 0; i < monthNutritions.length; i += 1) {
    let weekIndex =  (monthNutritions[i].getDay() - 1) / 7;
    if (weekIndex === 4) {
      weekIndex = 3;
    }
    monthNutritionData[weekIndex].calories += monthNutritions[i].calories;
    monthNutritionData[weekIndex].carbs += monthNutritions[i].carbs;
    monthNutritionData[weekIndex].protein += monthNutritions[i].protein;
    monthNutritionData[weekIndex].fat += monthNutritions[i].fat;
  }

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
            <StatsWeeklyChart selectedWeekNutritions={selectedWeekNutritions} recommendedIntake={recommendedIntake}/>
          </Grid.Row>
        </Grid>
      </Div>
  )
}

export default StatsMonthly;