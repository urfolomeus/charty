import React from 'react'

import { Line } from 'react-chartjs-2'
import { datas } from './data'

const colorMedian = '#24c9a8';
const colorRangeBorder = '#d5f5ef';
const colorRangeFill = '#d5f5ef';

const tens = (point) => point.y === 1 || point.y === 333 || point.y % 10 === 0

const customTooltips = function(tooltip) {
  // Tooltip Element
  var tooltipEl = document.getElementById('chartjs-tooltip');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'chartjs-tooltip';
    tooltipEl.innerHTML = '<table></table>';
    this._chart.canvas.parentNode.appendChild(tooltipEl);
  }

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set caret Position
  tooltipEl.classList.remove('above', 'below', 'no-transform');
  if (tooltip.yAlign) {
    tooltipEl.classList.add(tooltip.yAlign);
  } else {
    tooltipEl.classList.add('no-transform');
  }

  // Set Text
  if (tooltip.dataPoints) {
    var innerHtml = '<thead>';

    var numSubjects = parseInt(tooltip.dataPoints[0].value)

    if (numSubjects === 1) {
      innerHtml += '<tr><th><br /><b>First Subject First Dose</b></th></tr>';
    } else if (numSubjects === 333) {
      innerHtml += '<tr><th><br /><b>Last Subject First Dose</b></th></tr>';
    } else {
      innerHtml += '<tr><th><br /><b>' + numSubjects + ' subjects</b></th></tr>';
    }
    innerHtml += '</thead><tbody>';

    innerHtml += '<tr><td>Lower</td><td>' + tooltip.dataPoints[1].label + '</td></tr>'
    innerHtml += '<tr><td>Median</td><td>' + tooltip.dataPoints[0].label + '</td></tr>'
    innerHtml += '<tr><td>Upper</td><td>' + tooltip.dataPoints[2].label + '</td></tr>'

    innerHtml += '</tbody>';

    var tableRoot = tooltipEl.querySelector('table');
    tableRoot.innerHTML = innerHtml;
  }

  var positionY = this._chart.canvas.offsetTop;
  var positionX = this._chart.canvas.offsetLeft;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = (positionX + tooltip.caretX) + 'px';
  tooltipEl.style.top = (positionY + tooltip.caretY + 20) + 'px';
  tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
  tooltipEl.style.fontSize = tooltip.bodyFontSize + 'px';
  tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
  tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
};

const data = {
  datasets: [
    {
      label: 'Median',
      backgroundColor: colorMedian,
      borderColor: colorMedian,
      fill: false,
      data: datas.median.filter(tens)
    },
    {
      label: 'LowerBound',
      backgroundColor: colorRangeFill,
      borderColor: colorRangeBorder,
      fill: 0,
      pointRadius: 0,
      data: datas.lower.filter(tens)
    },
    {
      label: 'UpperBound',
      backgroundColor: colorRangeFill,
      borderColor: colorRangeBorder,
      fill: 0,
      pointRadius: 0,
      data: datas.upper.filter(tens)
    }
  ]
}

const options = {
  title: {
    text: 'Chart.js Time Scale'
  },
  scales: {
    xAxes: [{
      type: 'time',
      time: {
        minUnit: 'month',
        tooltipFormat: "ll",
        displayFormats: {
          month: 'MMM YY'
        }
      },
      gridLines: {
        display: false
      },
      scaleLabel: {
        display: true,
        labelString: 'Date'
      }
    }],
    yAxes: [{
      gridLines: {
        display: false
      },
      scaleLabel: {
        display: true,
        labelString: 'subjects'
      },
      ticks: {
        precision: 0,
        stepSize: 50,
        maxTicksLimit: 333
      }
    }]
  },
  legend: {
    display: false
  },
  tooltips: {
    enabled: false,
    mode: 'index',
    position: 'nearest',
    custom: customTooltips
  }
}

function EnrollmentChart() {
  return (
    <Line data={data} options={options} width={450} />
  );
}

export default EnrollmentChart;
