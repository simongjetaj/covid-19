const socket = io();
const ctx = document.getElementById('chart').getContext('2d');
let chart = null;
let casesDataset = {
  label: 'Cases',
  borderColor: '#1a202c',
  data: [],
  type: 'line',
  pointRadius: 0,
  fill: false,
  lineTension: 0,
  borderWidth: 3,
};

let deathsDataset = {
  label: 'Deaths',
  borderColor: '#e53e3e',
  data: [],
  type: 'line',
  pointRadius: 0,
  fill: false,
  lineTension: 0,
  borderWidth: 2,
};

let recoveriesDataset = {
  label: 'Recoveries',
  borderColor: '#38a169',
  data: [],
  type: 'line',
  pointRadius: 0,
  fill: false,
  lineTension: 0,
  borderWidth: 4,
};

socket.on('chart', (casesTimeline, recoveriesTimeline, deathsTimeline) => {
  if (chart) {
    chart.destroy();
    casesDataset.data = [];
    recoveriesDataset.data = [];
    deathsDataset.data = [];
  }

  prepareDataset(casesTimeline, 'cases');
  prepareDataset(recoveriesTimeline, 'recoveries');
  prepareDataset(deathsTimeline, 'deaths');

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [casesDataset, recoveriesDataset, deathsDataset],
    },
    options: {
      fill: false,
      responsive: true,
      scales: {
        xAxes: [
          {
            type: 'time',
            distribution: 'series',
            time: {
              unit: 'month',
            },
            ticks: {
              major: {
                enabled: true,
                fontStyle: 'bold',
              },
              source: 'data',
              autoSkip: true,
              autoSkipPadding: 75,
              maxRotation: 0,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
            },
            ticks: {
              beginAtZero: true,
              callback: (value) => value.toLocaleString(),
            },
          },
        ],
      },
      tooltips: {
        intersect: false,
        mode: 'index',
        callbacks: {
          title: () => {},
          label: (tooltipItem) => {
            let label = moment(tooltipItem.label).format('DD/MM/YYYY') || '';

            if (label) {
              label += ': ';
            }

            label += tooltipItem.value;
            return label;
          },
        },
      },
    },
  });
});

function prepareDataset(obj, timeline) {
  for (let [key, value] of Object.entries(obj)) {
    switch (timeline) {
      case 'cases':
        casesDataset.data.push({
          x: moment(key, ['MM/DD/YY']).format(),
          y: value,
        });
        break;
      case 'deaths':
        deathsDataset.data.push({
          x: moment(key, ['MM/DD/YY']).format(),
          y: value,
        });
        break;
      case 'recoveries':
        recoveriesDataset.data.push({
          x: moment(key, ['MM/DD/YY']).format(),
          y: value,
        });
        break;
    }
  }
}
