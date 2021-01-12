
<template>
  <div class="highcharts-container"></div>
</template>

<script>
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts)

export default {
  name: "mobilecharts",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    setting: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      chart: null
    };
  },
  methods: {
    initChart() {
      // console.log(this.$el);
      if (this.chart) {
        this.chart.destroy();
      };
      // 初始化 Highcharts 图表
      this.$el.style.width = (this.setting.width || 400) + 'px';
      this.$el.style.height = (this.setting.height || 400) + 'px';
      var formatData = this.list.map(item => {
        return {
          ...item,
          dataLabels: { color: this.judgeColor(item.y) },
          marker: {
            enabled: true,
            fillColor: 'white',
            symbol: 'circle',
            lineColor: this.judgeColor(item.y),
            lineWidth: 2,
            height: 10,
            radius: 5,
            width: 10
          }
        }
      });
      let options = {
        chart: {
          type: 'scatter',
          zoomType: 'xy'
        },
        title: {
          // text: this.setting.title,
          text: this.setting.unit ? this.setting.title + '<span style="color:#061A37;font-size: 13px;opacity: 0.35;margin-left:4px;">(' + this.setting.unit + ')<span>' : this.setting.title,
          align: 'left',
          useHTML: true,
          style: { "color": "#061A37", "opacity": 0.85, "fontSize": "15px" }
        },
        tooltip: {
          enabled: false
        },
        xAxis: {
          lineWidth: 1,
          lineColor: '#AEB5BE',
          type: 'datetime',
          dateTimeLabelFormats: {
            millisecond: '%H:%M:%S.%L',
            second: '%H:%M:%S',
            minute: '%H:%M',
            hour: '%H:%M',
            day: '%Y/%m/%d',
            week: '%Y/%m/%d',
            month: '%Y/%m',
            year: '%Y'
          }
        },
        yAxis: {
          visible: true,
          lineWidth: 1,
          lineColor: '#AEB5BE',
          labels: {
            enabled: false
          },
          title: {
            text: ''
          },
          min: 0,
          minorGridLineWidth: 0,
          gridLineWidth: 0,
          alternateGridColor: null,
          plotLines: [{
            color: 'rgba(225,20,10,0.33)',
            dashStyle: 'ShortDash',
            value: this.setting.min,
            width: 1
          },
          {
            color: 'rgba(225,20,10,0.33)',
            dashStyle: 'ShortDash',
            value: this.setting.max,
            width: 1
          }],
          plotBands: [{
            from: 0,
            to: this.setting.min,
            color: 'rgba(0, 0, 0, 0)',
            label: {
              text: '偏低',
              style: {
                color: '#E1140A',
                opacity: 0.33
              }
            }
          }, {
            from: this.setting.min,
            to: this.setting.max,
            color: 'rgba(0, 0, 0, 0)',
            label: {
              text: '<p>正常</p><p>' + this.setting.min + '-' + this.setting.max + '</p>',
              useHTML: true,
              style: {
                color: '#00A34E',
                opacity: 0.33
              }
            }
          }, {
            from: this.setting.max,
            to: 10000,
            color: 'rgba(0, 0, 0, 0)',
            label: {
              text: '偏高',
              style: {
                color: '#E1140A',
                opacity: 0.33
              }
            }
          },]
        },
        plotOptions: {
          scatter: {
            dataLabels: {
              enabled: true               // 开启数据标签
            },
            enableMouseTracking: false // 关闭鼠标跟踪，对应的提示框、点击事件会失效
          }
        },
        series: [{
          dashStyle: 'ShortDash',
          data: formatData,
          showInLegend: false
        }],
        credits: {
          enabled: false
        },
      }
      this.chart = new Highcharts.Chart(this.$el, options);
      setTimeout(() => {
        this.chart.setSize();
      }, 0);
    },
    judgeColor(val) {
      var value = (Number(val) > Number(this.setting.min)) && (Number(val) < Number(this.setting.max));
      // console.log('value', value, val, Number(val) > Number(this.setting.min),)
      return value ? '#00A34E' : '#E1140A'
    }
  },
  ready() {
    // this.showChart();
    this.initChart();
    console.log(this.setting)
  },
};
</script>

<style lang="less" scoped>
</style>
