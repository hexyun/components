<!--
 * @Descripttion: 
 * @version: 
 * @Author: yzf
 * @Date: 2020-07-02 11:17:55
 * @LastEditors: yzf
 * @LastEditTime: 2020-09-08 11:34:48
-->
<template>
  <div class="board-wrap">
    <button @click="rewrite">重写</button>
    <button @click="exportImg">导出</button>
    <button @click="defaultImg">默认值</button>
    <div class="wrap">
      <board
        v-ref:board
        :color="color"
        :linewidth="linewidth"
        :defaultimg="defaultimg"
        @exportimg="exportimg"
      ></board>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: "#000",
      linewidth: 3,
      // defaultimg: 'http://a0.att.hudong.com/64/76/20300001349415131407760417677.jpg',
      defaultimg: "",
    };
  },
  methods: {
    rewrite() {
      this.$refs.board.overwrite();
    },
    exportImg() {
      this.$refs.board.exportImg();
    },
    defaultImg() {
      this.defaultimg = "";
      setTimeout(() => {
        this.defaultimg =
          "https://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1593335834&t=dc356d7122e76850f3563078a64f2fff";
      }, 0);
    },
    exportimg(base, step) {
      console.log(base, step);
      var img = new Image();
      img.src = base;
      document.body.appendChild(img);
    },
  },
};
</script>

<style lang="less" scoped>
.board-wrap {
  margin: auto;
  width: 600px;
  height: 600px;
  background: green;
  .wrap {
    width: 100%;
    height: 100%;
    margin-top: 200px;
    background: lightgreen;
  }
}
</style>
