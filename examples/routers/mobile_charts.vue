<template>
  <div class="screen">
    <div class="content">
      <div class="wrap">
        <mobilecharts :list="list" :setting="setting"></mobilecharts>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      list: [],
      setting: {
        title: '',//标题
        unit: '',//单位
        max: 1,//数值上限
        min: 0,//数值下限
        width: 0,//宽度
        height: 0,//高度
      },
    };
  },
  methods: {
    select(img) {
      console.log(img);
    },
  },
  ready() {
    setTimeout(() => {
      this.setting = {
        title: '血压',//标题
        unit: 'mmHg',//单位
        max: 5,//数值上限
        min: 1.5,//数值下限
        width: 0,//宽度
        height: 0,//高度
      }
      this.list = [
        { x: 1563502923000, y: 4.0 },
        { x: 1598059598000, y: 1.3 },
        // { x: 1609689600000, y: 1.0 },
        // { x: 1610121600000, y: 4.3 },
        // { x: 1610640000000, y: 5.2 },
        // { x: 1611417600000, y: 6.4 },
        { x: 1612627200000, y: 4 }
      ];
    }, 2000);
  },
  watch: {},
};
</script>
<style lang="less" scoped>
</style>
