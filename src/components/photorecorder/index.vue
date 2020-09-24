<!--
 * @Author: yzf
 * @Date: 2020-09-21 11:28:57
 * @LastEditTime: 2020-09-21 14:06:18
 * @LastEditors: yzf
 * @Description: 这是拍照组件
 * @FilePath: /alex/Volumes/project/hex/components/src/components/photorecorder/index.vue
 * @大威天龙,世尊地藏,般若诸佛,般若巴麻空,没有bug
-->
<template>
  <div class="photo_recorder_wrap">
    <video class="photo_recorder" muted v-el:videodom></video>
    <canvas class='photo_canvas' v-el:canvas :width="w" :height="h"></canvas>
  </div>
</template>

<script>
import { saveAs } from '../../utils/fileSaver.js';
export default {
  name: 'photorecorder',
  data() {
    return {
      video: null,
      canvas: null,
      file: null,
      w: 0,
      h: 0
    }
  },
  methods: {
    init() {
      this.$nextTick(() => {
        this.video = this.$els.videodom
        const w = this.video.scrollWidth
        const h = this.video.scrollHeight
        this.canvas = this.$els.canvas
        this.w = w
        this.h = h
      })
    },
    getUserMedia() {
      // 获取用户设备
      return new Promise((resolve, reject) => {
        const constraints = { video: true, audio: false }
        navigator.getUserMedia =
          navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia ||
          window.getUserMedia
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices
            .getUserMedia(constraints)
            .then(stream => {
              resolve(stream)
            })
            .catch(err => {
              reject(err)
            })
        } else if (navigator.getUserMedia) {
          navigator.getUserMedia(
            constraints,
            stream => {
              resolve(stream)
            },
            err => {
              reject(err)
            }
          )
        } else {
          reject('Not support userMedia')
        }
      })
    },
    preview () {
      this.getUserMedia().then(stream => {
        this.video.srcObject = stream
        this.video.play()
      })
    },
    drawImage (name) {
      this.canvas.getContext('2d').drawImage(this.video, 0, 0, this.w, this.h)
      const base64 = this.canvas.toDataURL('image/png')
      const file = this.dataURLtoFile(base64, name || new Date().toISOString().replace(/:|\./g, '-') + '.jpg')
      this.file = file
      this.$emit('draw', file)
    },
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    },
    download() {
      saveAs(this.file)
    }
  },
  ready() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.photo_recorder_wrap {
  width: 100%;
  height: 100%;
  position: relative;
  .photo_recorder {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .photo_canvas {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    opacity: 0;
  }
}
</style>
