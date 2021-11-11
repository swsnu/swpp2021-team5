import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Container,
} from 'semantic-ui-react';

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
        label: 'Nutrition Intake Percentage for Today',
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
        label: 'Nutrition Intake Percentage for This Week',
        data: [30, 40, 45, 35],
        backgroundColor: [
          'green',
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
      }],
    };

    return (
      <div>
        <Container>
          <h2>Nutrition Analysis For Today</h2>
          <Bar
            data={dailyData}
            width={30}
            height={20}
            options={{
              scales: {
                y: {
                  max: 100,
                  min: 0,
                  ticks: {
                    stepSize: 5,
                  },
                },
              },
            }}
          />
          <h2>Nutrition Analysis For This Week</h2>
          <Bar
            data={weeklyData}
            width={30}
            height={20}
            options={{
              scales: {
                y: {
                  max: 100,
                  min: 0,
                  ticks: {
                    stepSize: 5,
                  },
                },
              },
            }}
          />
        </Container>
      </div>
    );
  }
}
export default PastNutritionInfo;
