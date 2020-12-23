<!--
 * @Author: yzf
 * @Date: 2020-12-21 10:53:14
 * @LastEditTime: 2020-12-23 17:07:00
 * @LastEditors: yzf
 * @Description: 这是 文件
 * @FilePath: /alex/Volumes/project/hex/components/src/components/custom_table/index.vue
 * @大威天龙,世尊地藏,般若诸佛,般若巴麻空,没有bug
-->
<template>
  <div class="custom_table"
    :style="{width: w + 'px', height: h + 'px'}"
  >
    <div class="fixed">
      <div class="head tr">
        <div class="td first" @click='checkAll'>
          {{checkAllStatus}}
        </div>
        <div
          class="td"
          v-for="(idx, field) in fixed"
          :key='field.field'
          :style="[
            {width: field.width + 'px'},
            styX(idx, 'fixed'),
            {transition: moveXOnOff && startIdx !== idx ? '.2s' : 'none'}
          ]"
          @mousedown="moveXDown($event, idx, 'fixed')">
          {{field.showname}}
          <span @mousedown.stop='resizeDown($event, field)'></span>
        </div>
      </div>
      <div class="content">
        <div class="tr"
          :class='{selectedRow:selectedData == item.id}'
          v-for='(idx, item) in data'
          :key='idx'
          :style='[
            {height: item.height + "px"},
            styY(idx)
          ]'>
          <div class="td first" @mousedown="moveYDown($event, idx)" @click="selectRow(item)">
            <input type="checkbox" v-model='item.checked'>
            {{idx + 1}}
          </div>
          <div
            class="td"
            :class="{selected: selectedField == field.field && selectedData == item.id}"
            v-for="(i, field) in fixed"
            :key='field.field'
            :val='field'
            :style="[
              {width: field.width + 'px'},
              styX(i, 'fixed'),
              {transition: moveXOnOff && startIdx !== i ? '.2s' : 'none'}
            ]"
            @click='componentClick(item, field)'
            @dblclick="dblClick(item, field)">
            <template v-if='editField != field.field || editData != item.id'>
              <component :is='field.type' :item='item' :field='field' :idx='i' @clearedit='clearedit'></component>
            </template>
            <template v-else>
              <component :is='field.editType' :item='item' :field='field' :idx='i' @clearedit='clearedit'></component>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="normal">
      <div class="head tr">
        <div
          class="td"
          v-for="(idx, field) in normal"
          :key='field.field'
          :style="[
            {width: field.width + 'px'},
            styX(idx, 'normal'),
            {transition: moveXOnOff && startIdx !== idx ? '.2s' : 'none'}
          ]"
          @mousedown="moveXDown($event, idx, 'normal')">
          {{field.showname}}
          <span @mousedown.stop='resizeDown($event, field)'></span>
        </div>
      </div>
      <div class="content">
        <div
        class="tr"
        :class='{selectedRow:selectedData == item.id}'
        v-for='(idx, item) in data'
        :key='idx'
        :style='[
          {height: item.height + "px"},
          styY(idx)
        ]'>
          <div
            class="td"
            :class="{selected: selectedField == field.field && selectedData == item.id}"
            v-for="(i, field) in normal"
            :key='field.field'
            :style="[
              {width: field.width + 'px'},
              styX(i, 'normal'),
              {transition: moveXOnOff && startIdx !== i ? '.2s' : 'none'}
            ]"
            @click='componentClick(item, field)'
            @dblclick="dblClick(item, field)">
            <template v-if='editField != field.field || editData != item.id'>
              <component :is='field.type' :item='item' :field='field' :idx='i' @clearedit='clearedit'></component>
            </template>
            <template v-else>
              <component :is='field.editType' :item='item' :field='field' :idx='i' @clearedit='clearedit'></component>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'customtable',
  props: {
    w: {
      type: Number,
      default: 1000
    },
    h: {
      type: Number,
      default: 1000
    },
    data: {
      type: Array,
      default () {
        return []
      }
    },
    fields: {
      type: Array,
      default () {
        return []
      }
    },
    selected: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    fixed () {
      return this.fields.filter(field => field.fixed && field.show)
    },
    normal () {
      return this.fields.filter(field => !field.fixed && field.show)
    },
    gapX () {
      if (!this.moveXOnOff) return 0
      return this.nowX - this.startX
    },
    nowIdx () {
      if (!this.gapX) return this.startIdx
      return Math.min(Math.max(this.startIdx + Math.ceil(this.gapX / 100), 0), this[this.moveType].length - 1)
    },
    styX () {
      return (idx, type) => {
        // 根据当前应该在的位置动态的改变css
        if (type === this.moveType) {
          if (idx === this.startIdx) {
              return {
                transform: `translateX(${this.gapX}px)`,
                zIndex: 99
              }
          }
          if (idx < this.startIdx && this.nowIdx <= idx) {
              return {
                transform: `translateX(100px)`
              }
          }
          if (idx > this.startIdx && this.nowIdx >= idx) {
              return {
                transform: `translateX(-100px)`
              }
          }
        }
        return {}
      }
    },
    gapY () {
      if (!this.moveYOnOff) return 0
      return this.nowY - this.startY
    },
    nowYIdx () {
      if (!this.gapY) return this.startIdx
      return Math.min(Math.max(this.startIdx + Math.ceil(this.gapY / 30), 0), this.data.length - 1)
    },
    styY () {
      return idx => {
        // 根据当前应该在的位置动态的改变css
        if (idx === this.startIdx) {
            return {
              transform: `translateY(${this.gapY}px)`,
              zIndex: 99
            }
        }
        if (idx < this.startIdx && this.nowYIdx <= idx) {
            return {
              transform: `translateY(30px)`
            }
        }
        if (idx > this.startIdx && this.nowYIdx >= idx) {
            return {
              transform: `translateY(-30px)`
            }
        }
        return {}
      }
    },
    checkAllStatus () {
      return this.checkDate.length === this.data.length ? 'checked' : this.checkDate.length === 0 ? 'none' : 'half'
    }
  },
  data () {
    return {
      handleData: null,
      onoff: false,
      initWidth: 0,
      startX: 0,
      nowX: 0,
      moveXOnOff: false,
      startIdx: null,
      moveType: null,
      moveYOnOff: false,
      startY: 0,
      nowY: 0,
      selectedField: null,
      selectedData: null,
      editField: null,
      editData: null,
      checkDate: []
    }
  },
  methods: {
    resizeDown(e, field) {
      this.handleData = field
      this.initWidth = field.width
      this.startX = e.x
      this.nowX = e.x
      this.onoff = true
      window.addEventListener('mousemove', this.resizeMove)
      window.addEventListener('mouseup', this.resizeOver)
    },
    resizeMove(e) {
      if (!this.onoff) return
      this.nowX = e.x
      this.handleData.width = this.initWidth + this.nowX - this.startX
    },
    resizeOver(e) {
      window.removeEventListener("mousemove", this.resizeMove)
      window.removeEventListener("mouseup", this.resizeOver)
      this.handleData = null
      this.onoff = false
      this.initWidth = 0
      this.startX = 0
      this.nowX = 0
    },
    moveXDown(e, idx, type) {
      this.startIdx = idx
      this.startX = e.x
      this.nowX = e.x
      this.moveXOnOff = true
      this.moveType = type
      window.addEventListener('mousemove', this.moveXMove)
      window.addEventListener('mouseup', this.moveXUp)
    },
    moveXMove(e) {
      if (!this.moveXOnOff) return
      this.nowX = e.x
    },
    moveXUp(e) {
      window.removeEventListener("mousemove", this.moveXMove)
      window.removeEventListener("mouseup", this.moveXUp)
      this.changeData()
      this.startIdx = null
      this.moveXOnOff = false
      this.moveType = null
      this.startX = 0
      this.nowX = 0
    },
    changeData () {
      if (this.nowIdx !== this.startIdx) {
        const idx = this.fields.findIndex(item=>item.field === this[this.moveType][this.startIdx].field)
        const data = this.fields.splice(idx, 1)
        console.log(this.nowIdx, this[this.moveType].length)
        const tar = this.fields.findIndex(item=>item.field === this[this.moveType][this.nowIdx].field)
        this.fields.splice(tar, 0, data[0])
      }
    },
    moveYDown (e, idx) {
      this.startIdx = idx
      this.startY = e.y
      this.nowY = e.y
      this.moveYOnOff = true
      window.addEventListener('mousemove', this.moveYMove)
      window.addEventListener('mouseup', this.moveYUp)
    },
    moveYMove (e) {
      if (!this.moveYOnOff) return
      this.nowY = e.y
    },
    moveYUp (e) {
      window.removeEventListener("mousemove", this.moveYMove)
      window.removeEventListener("mouseup", this.moveYUp)
      this.changeYData()
      this.startIdx = null
      this.moveYOnOff = false
      this.startY = 0
      this.nowY = 0
    },
    changeYData () {
      if (this.nowYIdx !== this.startIdx) {
        const data = this.data.splice(this.startIdx, 1)
        this.data.splice(this.nowYIdx, 0, data[0])
      }
    },
    componentClick (data, field) {
      this.selectedField = field.field
      this.selectedData = data.id
    },
    dblClick (data, field) {
      this.editField = field.field
      this.editData = data.id
    },
    clearedit () {
      this.editField = null
      this.editData = null
    },
    selectRow (item) {
      this.$emit('showfillscreenitem', item)
    },
    checkAll () {
      if (this.checkAllStatus === 'checked') {
        this.data.forEach(item => item.checked = false)
      } else {
        this.data.forEach(item => item.checked = true)
      }
    }
  },
  watch: {
    data: {
      deep: true,
      handler (n) {
        const data = this.data.filter(item=>item.checked)
        this.checkDate = data
        this.$emit('checkeddatachange', data)
      }
    }
  },
  components: {
    text: {
      props: ['item', 'field'],
      template:`<div>{{item[field.field]}}</div>`
    },
    inp: {
      props: ['item', 'field'],
      template:`<input v-el:inp type='text' v-model='item[field.field]' @blur='clear'>`,
      methods: {
        clear () {
          this.$emit('clearedit')
        }
      },
      ready() {
        this.$nextTick(() => {
          this.$els.inp&&this.$els.inp.focus()
        })
      }
    }
  },
  ready () {}
}
</script>

<style lang="less" scoped>
.custom_table {
  text-align: center;
  margin: auto;
  display: flex;
  overflow: auto;
  user-select: none;
  transition: .2s;
  * {
    flex-shrink: 0;
  }
  .fixed {
    .content {
      border-right: 1px solid #000;
    }
  }
  .normal {
    flex-grow: 1;
    overflow-x: auto;
    overflow-y: visible;
    height: max-content;
    width: 1px;
    &::-webkit-scrollbar {
      display: none;
    }
    .content {
      padding-right: 100px;
      width: max-content;
    }
  }
  .head {
    height: 30px;
    .td {
      cursor: pointer;
      span {
        cursor: col-resize !important;
        position: absolute;
        right: 0;
        height: 100%;
        width: 3px;
      }
    }
  }
  .tr {
    display: flex;
    background: #fff;
    position: relative;
    &.selectedRow {
      .td {
        background: #f7f9ff;
      }
    }
    .td {
      position: relative;
      border: 1px solid #ebebeb;
      box-sizing: border-box;
      overflow: hidden;
      background: #fff;
      &:hover {
        background: #e0e5f3;
      }
      &.first {
        width: 100px;
        text-align: center;
        cursor: pointer;
      }
      &.selected {
        border: 2px solid #577eff;
        background: #fff;
      }
      div {
        width: 100%;
        height: 100%;
      }
      input[type='text'] {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        font-size: 16px;
        text-align: center;
      }
    }
  }
}
</style>
