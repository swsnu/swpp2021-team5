/* eslint-disable */
import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Container,
} from 'semantic-ui-react';
import styled from 'styled-components';

const StatsBody = styled.div`
background-color:#CCEECC;
border-radius: 20px;
font-family:'verveine';
font-size:30px;
margin: 15px;
padding: 10px;
`;


class PastNutritionInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const dailyData = {
      labels: [
        'Calories',
        'Carbs',
        'Protein',
        'Fat',
      ],
      datasets: [{
        label: 'Nutrition Intake Percentage\nfor Today',
        data: [60, 80, 70, 90],
        backgroundColor: [
          'green',
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
      }],
    };

    const weeklyData = {
      labels: [
        'Calories',
        'Carbs',
        'Protein',
        'Fat',
      ],
      datasets: [{
        label: 'Nutrition Intake Percentage\nfor This Week',
        data: [30, 40, 45, 35],
        backgroundColor: [
          'green',
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
      }],
    };
    const options = {
      scales: {
        y: {
          display: true,
          min: 0,
          max: 100,
          ticks: {
            callback: function (value) {
              return value + '%'; // convert it to percentage
            },
            scaleLabel: {
              display: true,
              labelString: 'Percentage',
            },
            scaleFontSize: 100
          },
        },
        x: {
          ticks: {
            fontSzie: 20
          }
        }
      },
      plugins: {
        datalabels: {
          display: true,
          color: "white"
        },
        legend: {
          display: false,
          labels: {
            font: {
              size: 1
            }
          }
        },
      },
      maintainAspectRatio: true,
    };

    return (
      <div>
        <StatsBody>
          <h2>Nutrition Analysis For Today</h2>
          <Bar
            data={dailyData}
            width={30}
            height={20}
            options={options}
          />
        </StatsBody>
        <StatsBody style={{backgroundColor: "#CCEEFF"}}>
          <h2>Nutrition Analysis For This Week</h2>
          <Bar
            data={weeklyData}
            width={30}
            height={20}
            options={options}
          />
        </StatsBody>
      </div>
    );
  }
}
export default PastNutritionInfo;
