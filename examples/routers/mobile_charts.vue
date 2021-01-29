<template>
  <div class="screen">
    <div class="content">
      <div class="wrap">
        <mobilecharts :list="list" :setting="setting"></mobilecharts>
        <input v-model="aa" type="text" @input="test" @blur="t" />
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
      aa: '',
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
    test(e) {
      console.log('input', e.target.value);
      console.log('value', this.aa);
    },
    t(e) {
      console.log('input1', e.target.value);
      console.log('value1', this.aa);
    }
  },
  ready() {
    setTimeout(() => {
      this.setting = {
        title: '血压',//标题
        unit: 'mmHg',//单位
        max: 10,//数值上限
        min: 5,//数值下限
        width: 152,//宽度
        height: 0,//高度
      }
      this.list = [
        { x: '2021/2/12', y: 130 },
        { x: '2021/12/12', y: 100 },
        // { x: 1609689600000, y: .0 },
        // { x: 1610121600000, y: 4.3 },
        // { x: 1610640000000, y: 5.2 },
        // { x: 1611417600000, y: 6.4 },
        { x: '2021/07/12', y: 4 }
      ]
    }, 2000);
  },
  watch: {},
};
</script>
<style lang="less" scoped>
</style>
