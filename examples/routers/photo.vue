<!--
 * @Author: yzf
 * @Date: 2020-09-17 19:19:32
 * @LastEditTime: 2020-09-21 13:47:39
 * @LastEditors: yzf
 * @Description: 这是文件
 * @FilePath: /alex/Volumes/project/hex/components/examples/routers/photo.vue
 * @大威天龙,世尊地藏,般若诸佛,般若巴麻空,没有bug
-->
<template>
  <div class="wrap">
    <div class="video">
      <photorecorder v-ref:video  @draw='draw'></photorecorder>
    </div>
    <div class="btns">
      <div class="preview" @click="preview">preview</div>
      <div class="start" @click="start">start</div>
      <div class="download" @click="download">download</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      camera: true,
      audio: true
    }
  },
  methods: {
    preview () {
      this.$refs.video.preview()
    },
    start () {
      var name = Math.random()
      this.$refs.video.drawImage(name + '.jpg')
    },
    draw (file) {
      console.log('file', file)
    },
    download () {
      this.$refs.video.download()
    }
  }
}
</script>

<style lang="less" scoped>
.wrap {
  .video {
    width: 600px;
    height: 300px;
  }
  .btns {
    display: flex;
  }
  .btns div {
    padding: 4px 16px;
    border: 1px solid #000;
    cursor: pointer;
  }
  .btns div:hover {
    background: orange;
    color: #fff;
  }
}
</style>
