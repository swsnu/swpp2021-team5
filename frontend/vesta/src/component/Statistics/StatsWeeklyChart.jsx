import React from 'react';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

import { weeklyOptions, weeklyData } from './GraphConfig';

const Div = styled.div`
color:#F28095;
align-items:center;
vertical-align: middle;
line-height: 10px;
margin:8;
width: 80%;
`;

function StatsWeeklyChart(props) {
  const barData = weeklyData;
  const { selectedWeekNutritions } = props;
  console.log(props.selectedWeekNutritions[0].date.getDay());
  let i;
  for (i = 0; i < selectedWeekNutritions.length; i += 1) {
    const day = selectedWeekNutritions[i].date.getDay(); // Sun ~ Mon (0 ~ 6)
    barData.datasets[0].data[day] = (100 * selectedWeekNutritions[i].calories) / props.recommendedIntake.calories;
    barData.datasets[1].data[day] = (100 * selectedWeekNutritions[i].carbs) / props.recommendedIntake.carbs;
    barData.datasets[2].data[day] = (100 * selectedWeekNutritions[i].protein) / props.recommendedIntake.protein;
    barData.datasets[3].data[day] = (100 * selectedWeekNutritions[i].fat) / props.recommendedIntake.fat;
  }

  return (
    <Div className="StatsWeeklyChart">
      <Line data={barData} redraw plugins={[ChartDataLabels]} options={weeklyOptions} />
    </Div>
  );
}

export default StatsWeeklyChart;
