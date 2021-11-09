import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Header, Table, Input, Button,
} from 'semantic-ui-react';
import { Bar } from 'react-chartjs-2';

import * as actionCreators from '../../store/actions/index';

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
        data: [10, 10, 10, 10],
        backgroundColor: [
          'green',
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
      }],
    };

    return (
      <div className="Statistics">
        <div className="Header">
          <Header as="h1">Statistics Page</Header>
        </div>

        <div className="chart" style={{ width: 300, height: 150, margin: 5, }}>
          <Bar data={data} width={30} height={30} />
        </div>

      </div>
    );
  }
}

export default Statistics;
