<template>
  <div class="screen">
    <pasteinput
      :setting="setting"
      :showaccepttype="showaccepttype"
      @upload="upload"
      @update="update"
    ></pasteinput>
    <BUtton @click="go">获取参数</BUtton>
    <BUtton @click="set">设置</BUtton>
  </div>
</template>
<script>
export default {
  data() {
    return {
      setting: {
        width: 200,//宽度
        height: 200,//高度
      },
      showaccepttype: "image/png,image/jpg,image/jpeg"
    };
  },
  methods: {
    go() {
      console.log(this.$children[0].getText())
    },
    upload(file) {
      console.log('upload', file)
    },
    update(val) {
      console.log('val', val)
    },
    set() {
      // this.$children[0].setText("影子军团")
      this.$children[0].setText("", 'https://hexyun.oss-cn-beijing.aliyuncs.com/55l3vsdrsn5_5fd8cae198fb2263acc800e7/1610548447473/d2b5ca33bd970f64a6301fa75ae2eb22.png')
    }
  },
  ready() {
  },
  watch: {},
};
</script>
<style lang="less" scoped>
.screen {
  height: 200px;
  width: 400px;
}
</style>
