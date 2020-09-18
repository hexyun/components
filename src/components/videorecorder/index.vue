<!--
 * @Author: yzf
 * @Date: 2020-09-17 19:15:05
 * @LastEditTime: 2020-09-17 19:39:23
 * @LastEditors: yzf
 * @Description: 录像组件
 * @FilePath: /alex/Volumes/project/hex/components/src/components/videorecorder/index.vue
 * @大威天龙,世尊地藏,般若诸佛,般若巴麻空,没有bug
-->
<template>
  <video class="video_recorder" muted v-el:videodom></video>
</template>

<script>
import { saveAs } from '../../utils/fileSaver.js';
export default {
  name: 'videorecorder',
  data() {
    return {
      video: null,
      mediaRecorder: null,
      mediaStream: null,
      recorderFile: null,
      file: null
    }
  },
  methods: {
    init() {
      this.$nextTick(() => {
        this.video = this.$els.videodom
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
    download() {
      saveAs(this.file)
    }
  },
  ready() {
    this.init()
  }
}
</script>

<style>
.video_recorder {
  width: 100%;
  height: 100%;
}
</style>
