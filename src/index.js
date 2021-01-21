/*
 * @Author: yzf
 * @Date: 2020-08-31 14:54:53
 * @LastEditTime: 2020-12-21 11:05:06
 * @LastEditors: yzf
 * @Description: 这是文件
 * @FilePath: /alex/Volumes/project/hex/components/src/index.js
 * @大威天龙,世尊地藏,般若诸佛,般若巴麻空,没有bug
 */
import './styles/style.css'
import navCate from './components/navcate/index.vue'
import r3checked from './components/navcate/second.vue' //三级联动多选
import waterfall from './components/waterfall/index.vue'
import area from './components/area/index.vue'
import ranktwo from './components/rankTwo/index.vue' //二级联动
import timeline from './components/timeline/index.vue'
import datepicker from './components/datepicker/index.vue'
import hxkdate from './components/hxk_date/index.vue'
import timelinesingle from './components/timelinesingle/index.vue'
import board from './components/board/index.vue'
import accordion from './components/accordion/index.vue'
import cardmenu from './components/cardmenu/index.vue'
import lanhemenu from './components/lanhemenu/index.vue'
import imgscroll from './components/imgscroll/index.vue'
import menulist from './components/menulist/index.vue'
import customselect from './components/custom_select/index.vue'
import tablelist from './components/tablelist/index.vue'
import ronglvtable from './components/ronglvtable/index.vue'
import datetimepicker from './components/datetimepicker/index.vue'
import videorecorder from './components/videorecorder/index.vue'
import photorecorder from './components/photorecorder/index.vue'
import customtable from './components/custom_table/index.vue'
import mobilecharts from './components/mobile_charts/index.vue'
import pasteinput from './components/paste_input/index.vue'
const Components = {
  navCate,
  waterfall,
  area,
  ranktwo,
  timeline,
  datepicker,
  hxkdate,
  timelinesingle,
  board,
  accordion,
  cardmenu,
  lanhemenu,
  imgscroll,
  menulist,
  customselect,
  tablelist,
  ronglvtable,
  r3checked,
  datetimepicker,
  videorecorder,
  photorecorder,
  customtable,
  mobilecharts,
  pasteinput
}

const install = function (Vue, opts = {}) {
  Object.keys(Components).forEach(key => {
    Vue.component(Components[key].name || key, Components[key])
  })
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

module.exports = Object.assign(Components, {
  install
}) // eslint-disable-line no-undef
