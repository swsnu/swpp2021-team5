/* eslint-disable */
import React from 'react';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import { todayOptions, todayData } from './GraphConfig';


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
    <Bar data={barData} redraw plugins={[ChartDataLabels]} options={todayOptions} width={3} height={3} />
  )
}

export default StatsDaily;