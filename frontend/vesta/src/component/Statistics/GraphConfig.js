/* eslint-disable */
export const options = {
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