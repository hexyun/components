
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
      chart: null,
      max: 0,
      min: 0,
      sourceArr: [],
      lowArr: [],
      middleArr: [],
      highArr: []
    };
  },
  methods: {
    initChart() {
      // console.log(this.$el);
      if (this.chart) {
        this.chart.destroy();
      };
      // 初始化 Highcharts 图表
      this.$el.style.width = (this.setting.width || 134) + 'px';
      this.$el.style.height = (this.setting.height || 200) + 'px';
      var formatData = this.list.map(item => {
        return {
          // ...item,
          y: item.y,
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
          // tickPositions: this.list.map((item) => {
          //   return new Date(item.x).toLocaleDateString()
          // }),
          lineWidth: 1,
          lineColor: '#AEB5BE',
          categories: this.list.map((item) => {
            var str = new Date(Number(item.x)).toLocaleDateString();
            var tooMany = (Number(this.setting.width) - 20) < this.list.length * 44
            return this.setting.width && tooMany ? str : str.substring(5) + '<br/>' + str.substring(0, 4)
          }),
          // type: 'category',
          // type: 'datetime',
          // dateTimeLabelFormats: {
          //   millisecond: '%H:%M:%S.%L',
          //   second: '%H:%M:%S',
          //   minute: '%H:%M',
          //   hour: '%H:%M',
          //   day: '%m/%d<br/>%Y',
          //   week: '%m/%d<br/>%Y',
          //   month: '%m/%d<br/>%Y',
          //   year: '%m/%d<br/>%Y'
          // },
          // label: {
          //   formatter: function () {
          //     console.log(this.value, this.x, this.point)
          //   }
          // }
          // tickPositioner: () => {
          //   return this.list.map((item) => {
          //     // return item.x
          //     return new Date(item.x).toLocaleDateString()
          //   })
          // },
        },
        yAxis: {
          tickPositions: this.yArr(this.list),
          breaks: [{
            from: Number(this.setting.max) + 0.33,
            to: this.ymax,
            breakSize: 3,
          },
          {
            from: Number(this.setting.min) + 0.5,
            to: Number(this.setting.max) - 0.5,
            breakSize: 4,
          },
          {
            from: this.ymin + 0.33,
            to: Number(this.setting.min),
            breakSize: 3,
          }],
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
            from: this.ymin,
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
              text: '正常<br/>' + this.setting.min + '-' + this.setting.max,
              useHTML: true,
              style: {
                color: '#00A34E',
                opacity: 0.33
              },
              y: -5
            }
          }, {
            from: this.setting.max,
            to: this.ymax,
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
          // dataLabels: {
          //   formatter: function () {
          //     return new Date(Number(this.x)).toLocaleDateString()
          //   }
          // },
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
      var value = (Number(val) >= Number(this.setting.min)) && (Number(val) <= Number(this.setting.max));
      // console.log('value', value, val, Number(val) > Number(this.setting.min),)
      return value ? '#00A34E' : '#E1140A'
    },
    yArr(list, ind) {
      if (!list.length) return;
      var ymin, ymax, settingMin, settingMax, zmin, zmax, minN;
      var arr = list.map((t) => {
        return Number(t.y)
      })
      ymin = Math.min.apply(null, arr),
        ymax = Math.max.apply(null, arr),
        settingMin = Number(this.setting.min),
        settingMax = Number(this.setting.max),
        zmin = Math.min.apply(null, [ymin, 1.66 * settingMin - 0.66 * settingMax]),
        zmax = Math.max.apply(null, [ymax, 1.66 * settingMax - 0.66 * settingMin]);
      this.ymin = zmin, this.ymax = zmax, this.sourceArr = arr;
      return [zmin, settingMin, settingMax, zmax]
    },
  },
  ready() {
    this.initChart();
    // console.log(this.setting)
  },
  watch: {
    list: {
      immediate: true,
      handler(n) {
        this.chart && this.initChart();
      },
    },
    setting: {
      immediate: true,
      handler(n) {
        this.chart && this.initChart();
      },
    },
  },
};
</script>

<style lang="less" scoped>
</style>
