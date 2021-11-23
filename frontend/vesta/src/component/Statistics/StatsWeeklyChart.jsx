import React from 'react';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from 'react-chartjs-2';

import { weeklyOptions, weeklyData } from './GraphConfig';

function StatsWeeklyChart(props) {
  const barData = weeklyData;
  const { selectedWeekNutritions } = props;
  console.log(props.selectedWeekNutritions[0].date.getDay());
  let i;
  for (i = 0; i < selectedWeekNutritions.length; i += 1) {
    const day = selectedWeekNutritions[i].date.getDay(); // Sun ~ Mon (0 ~ 6)
    barData.datasets[0].data[day] = selectedWeekNutritions[i].calories;
    barData.datasets[1].data[day] = selectedWeekNutritions[i].carbs;
    barData.datasets[2].data[day] = selectedWeekNutritions[i].protein;
    barData.datasets[3].data[day] = selectedWeekNutritions[i].fat;
  }

  return (
    <div className="StatsWeeklyChart">
      <Line data={barData} redraw plugins={[ChartDataLabels]} options={weeklyOptions} />
    </div>
  );
}

export default StatsWeeklyChart;
