/* eslint-disable */
import React from 'react';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';

import { todayOptions, todayData } from './GraphConfig';

const Div = styled.div`
color:#F28095;
align-items:center;
vertical-align: middle;
line-height: 10px;
margin: 10px;
height: 500px;
width: 50%;
`;

const StatsDaily = (props) => {

  const barData = todayData;
  barData.datasets[0].data = [
    Math.round(100*props.intake.calories/props.recommendedIntake.calories),
    Math.round(100*props.intake.carbs/props.recommendedIntake.carbs),
    Math.round(100*props.intake.protein/props.recommendedIntake.protein),
    Math.round(100*props.intake.fat/props.recommendedIntake.fat)
  ]
  barData.datasets[1].data = [
    Math.round(props.intake.calories),
    Math.round(props.intake.carbs),
    Math.round(props.intake.protein),
    Math.round(props.intake.fat)
  ]
  barData.datasets[2].data = [
    Math.round(props.recommendedIntake.calories),
    Math.round(props.recommendedIntake.carbs),
    Math.round(props.recommendedIntake.protein),
    Math.round(props.recommendedIntake.fat),
  ]

  return (
    <Div>
      <Bar data={barData} redraw plugins={[ChartDataLabels]} options={todayOptions} width={3} height={3} />
    </Div>
  )
}

export default StatsDaily;