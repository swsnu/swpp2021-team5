/* eslint-disable */

import React from 'react';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import { options } from './GraphConfig';



const StatsDaily = (props) => {

    const data = {
        labels: [
          'Calorie',
          'Carbs',
          'Protein',
          'Fat',
        ],
        datasets: [{
          // label: "Today's My Nutrient Intake",
          data: props.data,
          backgroundColor: [
            'green',
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
          ],
        },
        ],
      };

    return (
        <Bar data={data} redraw plugins={[ChartDataLabels]} options={options} width={3} height={3} />
    )
}

export default StatsDaily;