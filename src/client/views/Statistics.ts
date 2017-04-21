import Vue from 'vue';
import Component from 'vue-class-component';
import * as Chart from 'chart.js/dist/Chart';
import { ajax } from '../utils';

Chart.defaults.global.defaultFontFamily = '"Microsoft Yahei", "sans-serif"';
Chart.defaults.global.legend.labels.fontSize = 14;
Chart.defaults.global.legend.labels.padding = 30;

function makeChart(analysis: any) {
  if (this.chart) {
    this.chart.destroy();
  }

  const dates = Object.keys(analysis);
  const addCount = dates.map(date => analysis[date].add);
  const resolveCount = dates.map(date => analysis[date].resolve);
  const closeCount = dates.map(date => analysis[date].close);

  const maxCount = Math.max(
    Math.max(...addCount),
    Math.max(...resolveCount),
    Math.max(...closeCount),
  );
  const stepSize = Math.ceil(maxCount / 10);

  const datasetOptions = {
    fill: false,
    lineTension: 0.1,
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    spanGaps: false,
  };

  this.chart = new Chart(this.$refs.chart, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        Object.assign({
          label: '提交数量',
          data: addCount,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          pointBorderColor: 'rgba(255, 99, 132, 1)',
          pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
        }, datasetOptions),
        Object.assign({
          label: '解决数量',
          data: resolveCount,
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
          pointBorderColor: 'rgba(255, 206, 86, 1)',
          pointHoverBackgroundColor: 'rgba(255, 206, 86, 1)',
        }, datasetOptions),
        Object.assign({
          label: '关闭数量',
          data: closeCount,
          backgroundColor: 'rgba(75, 192, 192, 0.4)',
          borderColor: 'rgba(75, 192, 192, 1)',
          pointBorderColor: 'rgba(75, 192, 192, 1)',
          pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
        }, datasetOptions),
      ],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            stepSize,
          },
        }],
      },
    },
  });
}

@Component({})
export default class StatisticsView extends Vue {
  counts = {
    total: 0,
    toBeResolve: 0,
    toBeClose: 0,
    closed: 0,
  };

  ranges = [
    { name: '最近一周', value: 7, active: true },
    { name: '最近半个月', value: 15, active: false },
    { name: '最近一个月', value: 30, active: false },
  ];

  get range() {
    return (this.ranges.find(range => range.active) as any).value;
  }

  mounted() {
    this.fetchStat();
  }

  selectRange(index: number) {
    this.ranges.forEach((range) => { range.active = false; });
    this.ranges[index].active = true;
    this.fetchStat();
  }

  async fetchStat() {
    const data = await ajax.get(`/bug/stat?range=${this.range}`, true);
    if (data.success) {
      const { counts, analysis } = data.result;
      this.counts = counts;
      makeChart.bind(this)(analysis);
    }
  }
}
