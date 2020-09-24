<!--
 * @Author: yzf
 * @Date: 2020-09-17 19:15:05
 * @LastEditTime: 2020-09-21 14:24:42
 * @LastEditors: yzf
 * @Description: 这是录像组件
 * @FilePath: /alex/Volumes/project/hex/components/src/components/videorecorder/index.vue
 * @大威天龙,世尊地藏,般若诸佛,般若巴麻空,没有bug
-->
<template>
  <div class="video_recorder_wrap">
    <video class="video_recorder" muted v-el:videodom></video>
    <canvas class='photo_canvas' v-el:canvas :width="w" :height="h"></canvas>
  </div>
</template>

<script>
import { saveAs } from '../../utils/fileSaver.js';
export default {
  name: 'videorecorder',
  props: {
    camera: {
      type:Boolean,
      default:true
    },
    audio: {
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      video: null,
      canvas: null,
      mediaRecorder: null,
      mediaStream: null,
      recorderFile: null,
      photoFile: null,
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
    preview() {
      // 预览流
      this.getUserMedia()
        .then(stream => {
          // 用来存储摄像头数据
          var chunks = []
          // 创建一个录制对象
          this.mediaRecorder = new MediaRecorder(stream)
          // 存储这个流,用来后续其它操作
          this.mediaStream = stream
          // 播放视频
          this.video.srcObject = stream
          this.video.play()
          // 录制对象存储数据
          this.mediaRecorder.ondataavailable = e => {
            this.mediaRecorder.blobs.push(e.data)
            chunks.push(e.data)
          }
          this.mediaRecorder.blobs = []
          // 录制对象转存Blob
          this.mediaRecorder.onstop = e => {
            this.recorderFile = new Blob(chunks, {
              type: this.mediaRecorder.mimeType
            })
            chunks = []
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    unPreview(stream = this.mediaStream) {
      // 关闭视频流
      if (typeof stream.stop === 'function') {
        stream.stop()
      } else {
        const trackList = [stream.getAudioTracks(), stream.getVideoTracks()]
        trackList.map(tracks => {
          if (tracks && tracks.length > 0) {
            tracks.map(track => {
              if (typeof track.stop === 'function') {
                track.stop()
              }
            })
          }
        })
      }
    },
    start() {
      // 开始录制
      this.mediaRecorder.start()
    },
    stop() {
      // 结束录制
      this.mediaRecorder.stop()
    },
    getUserMedia() {
      // 获取用户设备
      return new Promise((resolve, reject) => {
        const constraints = { video: this.camera, audio: this.audio }
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
    save(name) {
      const file = new File(
        [this.recorderFile],
        name || new Date().toISOString().replace(/:|\./g, '-') + '.mp4',
        {
          type: 'video/mp4'
        }
      )
      this.file = file
      this.$emit('filechange', file)
    },
    drawImage(name) {
      this.canvas.getContext('2d').drawImage(this.video, 0, 0, this.w, this.h)
      const base64 = this.canvas.toDataURL('image/png')
      const file = this.dataURLtoFile(base64, name || new Date().toISOString().replace(/:|\./g, '-') + '.jpg')
      this.photoFile = file
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
    download(type) {
      saveAs(type === 1 ?this.file: this.photoFile)
    }
  },
  ready() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.video_recorder_wrap {
  width: 100%;
  height: 100%;
  position: relative;
  .video_recorder {
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
