import React from 'react';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

import { weeklyOptions } from './GraphConfig';

const Div = styled.div`
color:#F28095;
align-items:center;
vertical-align: middle;
line-height: 10px;
margin: 0 auto  ;
width: 90%;
height: 500px;
`;

function StatsWeeklyChart(props) {
  console.log('Child rendered');
  const barData = {
    labels: [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
    ],
    datasets: [
      {
        label: 'Calorie',
        data: new Array(7).fill(0),
        borderColor: 'green',
        tension: 0.1
      },
      {
        label: 'Carbs',
        data: new Array(7).fill(0),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      },
      {
        label: 'Protein',
        data: new Array(7).fill(0),
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1
      },
      {
        label: 'Fat',
        data: new Array(7).fill(0),
        borderColor: 'rgb(255, 205, 86)',
        tension: 0.1
      }
    ],
  };
  const { selectedWeekNutritions } = props;
  let i;
  for (i = 0; i < selectedWeekNutritions.length; i += 1) {
    const day = selectedWeekNutritions[i].date.getDay(); // Sun ~ Mon (0 ~ 6)
    barData.datasets[0].data[day] = Math.round((selectedWeekNutritions[i].calories / props.recommendedIntake.calories) * 10000) / 100;
    barData.datasets[1].data[day] = Math.round((selectedWeekNutritions[i].carbs / props.recommendedIntake.carbs) * 10000) / 100;
    barData.datasets[2].data[day] = Math.round((selectedWeekNutritions[i].protein / props.recommendedIntake.protein) * 10000) / 100;
    barData.datasets[3].data[day] = Math.round((selectedWeekNutritions[i].fat / props.recommendedIntake.fat) * 10000) / 100;
  }
  console.log(barData);

  return (
    <Div className="StatsWeeklyChart">
      <Line data={barData} redraw plugins={[ChartDataLabels]} options={weeklyOptions} />
    </Div>
  );
}

export default StatsWeeklyChart;
