import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Header, Table, Input, Button,
} from 'semantic-ui-react';
import { Doughnut } from 'react-chartjs-2';

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
        'Red',
        'Blue',
        'Yellow',
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
        hoverOffset: 4,
      }],
    };

    return (
      <div className="Statistics">
        <div className="Header">
          <Header as="h1">Statistics Page</Header>
        </div>

        <div className="chart">
          <Doughnut data={data} radius="1%" />
        </div>

      </div>
    );
  }
}

export default Statistics;
