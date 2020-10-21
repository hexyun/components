<template>
  <div class="table-wrapper">
    <div class="table-list">
      <div class="table-header">
        <div class="table-column-group">
          <div class="column"
              :style="{'width': item.width.slice(-1) === '%' ? item.width : item.width + 'px', 'text-align': item.textAlign}"
              v-for="(index, item) in tableList[0]"
              :key="index">{{ item.name }}
          </div>
        </div>
      </div>
      <div class="table-body">
        <div class="table-row-group"
            v-for="(index, item) in tableList[1]"
            :key="index">
          <div class="row"
              :style="{'width': column.width.slice(-1) === '%' ? column.width : column.width + 'px', 'text-align': column.textAlign}"
              v-for="(key, column) in tableList[0]"
              :key="key">
            <div v-if="column.label !== 'button' && column.type !== 'switch' && column.type !== 'img'"
                class="row-content"
                :class="{
                  'text-color' : item[column.label] === '驳回'
                }">{{ item[column.label] }}</div>
            <input class="switch"
                  v-if="column.label !== 'button' && column.type == 'switch' && item[column.label] || item[column.label] === false"
                  type="checkbox"
                  :checked="item[column.label]"
                  @click="changestatus(item, column.label)">
            <div v-if="column.label === 'button'">
              <button class="row-btn"
                      v-for="(idx, btn) in item[column.label]"
                      :key="idx"
                      :style="{
                      'background': btn.background,
                      'color': btn.color,
                      'width': btn.width.slice(-1) === '%' ? btn.width : btn.width + 'px',
                      'border-color': btn.bdcolor
                    }"
                      @click="clickbtn(item, btn)">{{ btn.name }}</button>
            </div>
            <div v-if='column.label === "img"' class='img-wrap'>
              <img :src="item[column.label]" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tablelist',
  props: {
    tableList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changestatus (data, type) {
      data[type] = !data[type]
      this.$emit('changestatus', data);
    },
    clickbtn (data, btn) {
      this.$emit('clickbtn', data, btn);
    }
  }
}
</script>
<style lang="less" scoped>
.table-wrapper {
  width: 100%;
  height: 100%;
  .table-list {
    .table-header {
      .table-column-group {
        display: flex;
        height: 58px;
        background: rgba(250, 250, 250, 1);
        font-size: 14px;
        font-weight: 500;
        color: rgba(38, 38, 38, 1);
        line-height: 58px;
        .column {
          padding-left: 16px;
          box-sizing: border-box;
        }
      }
    }
    .table-body {
      .table-row-group {
        display: flex;
        height: 58px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(89, 89, 89, 1);
        border-bottom: 1px solid rgba(232, 232, 232, 1);
        align-items: center;
        .row {
          box-sizing: border-box;
          padding-left: 16px;
          height: 100%;
          display: flex;
          align-items: center;
          input[type="checkbox"].switch {
            cursor: pointer;
            outline: none;
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            position: relative;
            width: 60px;
            height: 32px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
            border-radius: 16px;
            border: 1px solid rgba(217, 217, 217, 1);
            transition: border-color 0.3s, background-color 0.3s;
          }
          input[type="checkbox"].switch::after {
            content: "";
            display: inline-block;
            width: 30px;
            height: 30px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
            border: 1px solid rgba(217, 217, 217, 1);
            border-radius: 50%;
            transition: 0.4s;
            top: -1px;
            position: absolute;
            left: -2px;
          }
          input[type="checkbox"].switch:checked {
            background: rgba(70, 212, 105, 1);
            border: 1px solid rgba(70, 212, 105, 1);
          }
          /* 当input[type=checkbox]被选中时：伪元素显示下面样式 位置发生变化 */
          input[type="checkbox"].switch:checked::after {
            content: "";
            position: absolute;
            left: 47%;
          }
          .row-content {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .text-color {
            color: #fb5004;
          }
          button {
            cursor: pointer;
            outline: 0;
            box-sizing: border-box;
            height: 32px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
            border-radius: 4px;
            border: 1px solid rgba(217, 217, 217, 1);
            line-height: 32px;
            text-align: center;
            margin-right: 8px;
          }
          .img-wrap {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content:center;
            align-items:center;
            img {
              max-width: 100%;
              max-height: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
