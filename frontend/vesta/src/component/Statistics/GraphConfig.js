/* eslint-disable */
export const todayOptions = {
  maintainAspectRatio: false,
  scales: {
    y: {
      display: true,
      min: 0,
      max: 140,
      ticks: {
        callback: function (value) {
          return value + '%'; // convert it to percentage
        }
      },
    },
  },
  plugins: {
    datalabels: {
      display: true,
      color: "white",
      formatter: function(value) {
        return value + ' %'
      }
    },
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: function(context) {
          let intake, expr, recommendedIntake;
          switch (context.dataIndex) {
            case 0:
              intake = context.chart.data.datasets[1].data[0];
              recommendedIntake = context.chart.data.datasets[2].data[0];
              expr = `Intake: ${intake} Kcal\nRecommended: ${recommendedIntake} Kcal`
              return expr;
            case 1:
              intake = context.chart.data.datasets[1].data[1];
              recommendedIntake = context.chart.data.datasets[2].data[1];
              expr = `Intake: ${intake} grams\nRecommended: ${recommendedIntake} grams`
              return expr;
            case 2:
              intake = context.chart.data.datasets[1].data[2];
              recommendedIntake = context.chart.data.datasets[2].data[2];
              expr = `Intake: ${intake} grams\nRecommended: ${recommendedIntake} grams`
              return expr;
            case 3:
              intake = context.chart.data.datasets[1].data[3];
              recommendedIntake = context.chart.data.datasets[2].data[3];
              expr = `Intake: ${intake} grams\nRecommended: ${recommendedIntake} grams`
              return expr;
            default:
              return '';
          }
        }
      }
    }
  },
};

export const todayData = {
  labels: [
    'Calorie',
    'Carbs',
    'Protein',
    'Fat',
  ],
  datasets: [
    {
    // label: "",
    data: [],
    backgroundColor: [
      'green',
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
    ],
    },
    {
      data: [],
      hidden: true,
    },
    {
      data: [],
      hidden: true,
    }
  ],
};

export const weeklyOptions = {
  maintainAspectRatio: false,
  scales: {
    y: {
      display: true,
      min: 0,
      max: 140,
      ticks: {
        callback: function (value) {
          return value + '%'; // convert it to percentage
        }
      },
    },
  },
  plugins: {
    title: {
      display: false,
      text: "Stats",
    },
    datalabels: {
      display: false,
    },
    legend: {
      display: true,
      position: 'bottom',
    }
  },
}

/*
export const monthlyOptions = {
  maintainAspectRatio: false,
  scales: {
    y: {
      display: true,
      min: 0,
      max: 140,
      ticks: {
        callback: function (value) {
          return value + '%'; // convert it to percentage
        }
      },
    },
  },
  plugins: {
    title: {
      display: false,
      text: "Monthly Stats",
    },
    datalabels: {
      display: false,
    },
    legend: {
      display: true,
      position: 'bottom',
    }
  },
}
*/
