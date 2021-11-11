/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Header, Table, Input, Button, Grid
} from 'semantic-ui-react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styled from 'styled-components';

import * as actionCreators from '../../store/actions/index';

const StatisticsHeader = styled.div`
font-family:'verveine';
font-size:65px;
color:#F28095;
text-align: center;
vertical-align: middle;
line-height: 80px;
`;

const Box = styled.div`
background-color:#B3D962;
border-radius: 10px;
width: 950px;
height: 80px;
margin:0 auto;
`;

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const data = {
      labels: [
        'Calorie',
        'Carbs',
        'Protein',
        'Fat',
      ],
      datasets: [{
        // label: "Today's My Nutrient Intake",
        data: [72, 64, 57, 80],
        backgroundColor: [
          'green',
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
      },
      ],
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
      <div className="Statistics">

        
        <div className="Header">
          <StatisticsHeader>Your Today's intake</StatisticsHeader>
        </div>

        <Grid column={1} textAlign="center">
          <Grid.Column width={5}>
            <Bar data={data} redraw plugins={[ChartDataLabels]} options={options} width={3} height={3} />
            <br/>
            <br/>
            <Button size='massive'>Today</Button>
            <Button size='massive'>Weekly</Button>
            <Button size='massive'>Monthly</Button>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Statistics;
