import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from 'react-chartjs-2';

import { weeklyOptions, weeklyData } from './GraphConfig';

function StatsWeeklyChart (props){

  const selectedWeekNutritions = props.selectedWeekNutritions;
  const barData = weeklyData;
  for (const nutrition in selectedWeekNutritions) {
    const day = nutrition.date.getDay(); // Sun ~ Mon (0 ~ 6)
    barData.datasets[0].data[day] = nutrition.calories; 
    barData.datasets[1].data[day] = nutrition.carbs;
    barData.datasets[2].data[day] = nutrition.protein;
    barData.datasets[3].data[day] = nutrition.fat;
  }

  return (
    <Line data={barData} redraw plugins={[ChartDataLabels]} options={weeklyOptions} />
  )
}

export default StatsWeeklyChart;