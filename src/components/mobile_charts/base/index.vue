
<template>
  <div id="echarts" :style="styles"></div>
</template>

<script>
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

export default {
  name: "mobilecharts",
  props: {
    styles: {
      type: Object,
      default: {},
    },
    options: {
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
      // 初始化 Highcharts 图表
      var myChart = echarts.init(document.getElementById('echarts'));
      // 绘制图表
      myChart.setOption(this.options);
    }
  },
  ready() {
    console.log(this.options, this.styles)
    this.initChart();
  },
};
</script>

<style lang="less" scoped>
</style>
