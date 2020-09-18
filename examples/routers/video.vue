<!--
 * @Author: yzf
 * @Date: 2020-09-17 19:19:32
 * @LastEditTime: 2020-09-18 11:32:39
 * @LastEditors: yzf
 * @Description: 这是文件
 * @FilePath: /alex/Volumes/project/hex/components/examples/routers/video.vue
 * @大威天龙,世尊地藏,般若诸佛,般若巴麻空,没有bug
-->
<template>
  <div class="wrap">
    <div class="video">
      <videorecorder v-ref:video @filechange='filechange'></videorecorder>
    </div>
    <div class="btns">
      <div class="preview" @click="preview">preview</div>
      <div class="unPreview" @click="unPreview">unPreview</div>
      <div class="start" @click="start">start</div>
      <div class="stop" @click="stop">stop</div>
      <div class="save" @click="save">save</div>
      <div class="download" @click="download">download</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    preview () {
      this.$refs.video.preview()
    },
    unPreview () {
      this.$refs.video.unPreview()
    },
    start () {
      this.$refs.video.start()
    },
    stop () {
      this.$refs.video.stop()
    },
    save () {
      this.$refs.video.save(123)
    },
    filechange (file) {
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
    width: 300px;
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
