<template>
  <div class="table-list-wrapper">
    <table cellpadding="0px" cellspacing="0px" class="table-list">
      <thead class="table-header">
        <tr class="table-header-contant">
          <th
            class="header-item"
            v-for="(index, item) in tableData[0]"
            :key="index"
            :style="{ width: item.width + 'px' }"
          >
            <div class="item">
              <div>{{ item.name }}</div>
              <div
                v-if="item.sort"
                class="arrow"
                @click="clickSort(item.label)"
              >
                <img
                  class="up"
                  :src="
                    sort === `up_${item.label}` ? arrow_up_active : arrow_up
                  "
                  alt=""
                />
                <img
                  class="down"
                  :src="
                    sort === `down_${item.label}`
                      ? arrow_down_active
                      : arrow_down
                  "
                  alt=""
                />
              </div>
            </div>
          </th>
          <th class="header-item" style="text-align: center; width: 112px">
            操作
          </th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr
          class="table-body-contant"
          v-for="(key, item) in tableData[1]"
          :key="key"
          @click="clickTr(item)"
        >
          <td class="body-item" v-for="(i, k) in bodyList" :key="i">
            <p
              class="tag"
              :class="[
                style[item[k]],
                { trace: k == 'trace' },
                { ellipsis: !style[item[k]] },
              ]"
            >
              {{ item[k] }}
            </p>
            <!-- <input type="text" :value="item[k]" class="item-input" disabled='disabled' @input="save"> -->
          </td>
          <td class="body-operation" :class="{ 'body-look': !editor }">
            <!-- @click="clicknode(item)" -->
            <span @click.stop="clicknode(item)" class="look tag" v-if="!editor"
              >查看</span
            >
            <div class="editor" v-else>
              <div class="delete scale tag" @click.stop="handlerDel(key, item)">
                删除
              </div>
              <div class="sort">
                <div class="up scale" @click.stop="handlerUp(key, item)">
                  <div class="triangle"></div>
                </div>
                <div class="down scale" @click.stop="handlerDown(key, item)">
                  <div class="triangle"></div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import {
  arrow_up,
  arrow_up_active,
  arrow_down,
  arrow_down_active,
  up,
  down,
} from "./img";
export default {
  props: {
    // 表格数据
    dataList: {
      type: Array,
      default: () => [],
    },
    editor: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    bodyList() {
      return this.dataList[0].map((v) => v.label);
    },
    // tableData() {
    //     if (this.sort) {
    //         let reg = /^(\S+?)_(\S+)/
    //         // 正则分割 sort, strArr[1] 代表 排序规则,  strArr[2] 代表 选中的那项
    //         let strArr = this.sort.match(reg)
    //         return [this.dataList[0], [...this.dataList[1]].sort((a, b) =>
    //             strArr[1] === 'up' ? a[strArr[2]] - b[strArr[2]] : b[strArr[2]] - a[strArr[2]]
    //         )]
    //     }
    //     return this.dataList
    // }
  },
  data() {
    return {
      asc: false,
      desc: true,
      sort: "",
      arrow_up: arrow_up,
      arrow_up_active: arrow_up_active,
      arrow_down: arrow_down,
      arrow_down_active: arrow_down_active,
      up: up,
      down: down,
      tableData: [],
      style: {
        媒体: "media",
        监管: "supervise",
        环境: "environment",
        社会: "society",
        治理: "govern",
        高: "high",
        中: "middle",
        低: "low",
      },
    };
  },
  methods: {
    clicknode(item) {
      this.$emit("clicknode", item);
    },
    save() {
      this.$emit("save", JSON.parse(JSON.stringify(this.tableData)));
    },
    sortData(order, label) {
      this.tableData &&
        this.tableData[1] &&
        this.tableData[1].sort((a, b) => {
          if (isNaN(a[label]) && !isNaN(Date.parse(a[label]))) {
            return order === "up"
              ? Date.parse(a[label]) - Date.parse(b[label])
              : Date.parse(b[label]) - Date.parse(a[label]);
          } else {
            return order === "up" ? a[label] - b[label] : b[label] - a[label];
          }
        });
    },
    clickSort(label) {
      let patt = /^up_/;
      let order = this.sort ? (patt.test(this.sort) ? "down" : "up") : "up";
      this.sort = `${order}_${label}`;
      this.sortData(order, label);
    },
    handlerDel(key, item) {
      this.$emit("delete", key, item);
    },
    handlerUp(key, item) {
      this.$emit("ascing", key, item);
    },
    handlerDown(key, item) {
      this.$emit("descing", key, item);
    },
    ascing() {
      if (this.asc) {
        this.asc = true;
        this.desc = false;
      } else {
        this.asc = true;
        this.desc = false;
      }
      this.$emit("ascing");
    },
    descing() {
      if (this.desc) {
        this.desc = true;
        this.asc = false;
      } else {
        this.desc = true;
        this.asc = false;
      }
      this.$emit("descing");
    },
    clickTr(item) {
      this.$emit("clicktr", item);
    },
  },
  watch: {
    dataList: {
      handler(val) {
        this.tableData = JSON.parse(JSON.stringify(val));
      },
      immediate: true,
    },
  },
  ready() {},
};
</script>
<style lang="less" scoped>
.table-list-wrapper {
  width: 100%;
  border: 1px solid transparent;
  border-radius: 6px;
  overflow: auto;
  .table-list {
    table-layout: fixed;
    width: 100%;
  }
  .table-header {
    font-size: 14px;
    font-weight: 500;
    color: rgba(22, 72, 127, 1);
    .table-header-contant {
      background: rgba(224, 236, 250, 1);
      .header-item {
        height: 48px;
        padding: 0 12px;
        box-sizing: border-box;
        .item {
          display: flex;
          align-items: center;
          justify-content: center;
          .arrow {
            display: flex;
            flex-direction: column;
            margin-left: 6px;
          }
          img {
            width: 17px;
          }
          .up {
            position: relative;
            top: 3px;
          }
          .down {
            position: relative;
            top: -1px;
          }
        }
      }
    }
  }
  .table-body {
    font-size: 14px;
    font-weight: 400;
    color: rgba(45, 56, 68, 0.8);
    .table-body-contant {
      .body-item {
        text-align: center;
        .item-input {
          width: 80%;
          line-height: 2em;
          border: none;
          background: transparent;
        }
        .tag {
          position: relative;
        }
      }
    }
    .table-body-contant:nth-child(odd) {
      background: rgba(255, 255, 255, 1);
      height: 48px;
      .body-item {
        padding: 0px 12px;
        box-sizing: border-box;
        .btn {
          width: 48px;
          padding: 2px 0px;
          margin: 0 auto;
          background: rgba(89, 138, 190, 1);
          border-radius: 4px;
          color: rgba(255, 255, 255, 1);
          line-height: 22px;
          box-sizing: border-box;
          cursor: pointer;
          text-align: center;
        }
        .tag {
          max-width: 322px;
          box-sizing: border-box;
          padding: 2px 12px;
          border-radius: 4px;
          border-radius: 4px;
          text-align: center;
        }
        .tag-a {
          width: 56px;
          margin: 0 auto;
          background: rgba(91, 144, 123, 0.1);
          color: rgba(91, 144, 123, 1);
        }
        .tag-b {
          width: 56px;
          margin: 0 auto;
          background: rgba(255, 151, 64, 0.1);
          color: rgba(255, 151, 64, 1);
        }
        .tag-c {
          width: 56px;
          margin: 0 auto;
          background: rgba(49, 122, 222, 0.1);
          color: rgba(49, 122, 222, 1);
        }
        .tag-e {
          width: 56px;
          margin: 0 auto;
          background: rgba(89, 138, 190, 0.1);
          color: rgba(89, 138, 190, 1);
        }
        .tag-f {
          width: 56px;
          margin: 0 auto;
          background: rgba(236, 162, 15, 0.1);
          color: rgba(236, 162, 15, 1);
        }
        .tag-g {
          color: rgba(245, 97, 77, 0.8);
        }
      }
    }
    .table-body-contant:nth-child(even) {
      background: rgba(246, 248, 251, 1);
      height: 48px;
      .body-item {
        padding: 0px 12px;
        box-sizing: border-box;

        .btn {
          width: 48px;
          padding: 2px 0px;
          margin: 0 auto;
          background: rgba(89, 138, 190, 1);
          border-radius: 4px;
          color: rgba(255, 255, 255, 1);
          line-height: 22px;
          box-sizing: border-box;
          cursor: pointer;
          text-align: center;
        }
        .tag {
          max-width: 322px;
          box-sizing: border-box;
          padding: 2px 12px;
          border-radius: 4px;
          border-radius: 4px;
          text-align: center;
        }
        .tag-a {
          width: 56px;
          margin: 0 auto;
          background: rgba(91, 144, 123, 0.1);
          color: rgba(91, 144, 123, 1);
        }
        .tag-b {
          width: 56px;
          margin: 0 auto;
          background: rgba(255, 151, 64, 0.1);
          color: rgba(255, 151, 64, 1);
        }
        .tag-c {
          width: 56px;
          margin: 0 auto;
          background: rgba(49, 122, 222, 0.1);
          color: rgba(49, 122, 222, 1);
        }
        .tag-e {
          width: 56px;
          margin: 0 auto;
          background: rgba(89, 138, 190, 0.1);
          color: rgba(89, 138, 190, 1);
        }
        .tag-f {
          width: 56px;
          margin: 0 auto;
          background: rgba(236, 162, 15, 0.1);
          color: rgba(236, 162, 15, 1);
        }
        .tag-g {
          color: rgba(245, 97, 77, 0.8);
        }
      }
    }
    .body-operation {
      display: flex;
      align-items: center;
      height: 48px;
      user-select: none;
      min-width: 8em;
      .editor {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
      }
      .delete {
        padding: 0 1em;
        line-height: 2em;
        border: 1px solid red;
        color: red;
        border-radius: 4px;
        margin-right: 0.5em;
      }
      .sort {
        display: flex;
        flex-direction: column;
        height: 2em;
        justify-content: space-between;
      }
      .triangle {
        width: 0;
        height: 0;
        border-left: 0.7em solid transparent;
        border-right: 0.7em solid transparent;
      }
      .up .triangle {
        border-bottom: 0.7em solid #ccc;
      }
      .down .triangle {
        border-top: 0.7em solid #ccc;
      }
    }
  }
}
.scale {
  transition: all 100ms;
}
.scale:active {
  transform: scale(0.9);
}
.body-look {
  justify-content: center;
  .look {
    line-height: 2em;
    padding: 0 1em;
    border-radius: 4px;
    background: #598abe;
    color: #fff;
  }
}
.media {
  line-height: 2em;
  padding: 0 1em;
  border-radius: 4px;
  background: rgba(89, 138, 190, 0.1);
  color: #598abe;
  display: inline-block;
}
.supervise {
  line-height: 2em;
  padding: 0 1em;
  border-radius: 4px;
  background: rgba(236, 162, 15, 0.1);
  color: #eca20f;
  display: inline-block;
}
.environment {
  line-height: 2em;
  padding: 0 1em;
  border-radius: 4px;
  background: rgba(91, 144, 123, 0.1);
  color: rgba(91, 144, 123, 1);
  display: inline-block;
}
.society {
  line-height: 2em;
  padding: 0 1em;
  border-radius: 4px;
  background: rgba(255, 151, 64, 0.1);
  color: rgba(255, 151, 64, 1);
  display: inline-block;
}
.govern {
  line-height: 2em;
  padding: 0 1em;
  border-radius: 4px;
  background: rgba(49, 122, 222, 0.1);
  color: rgba(49, 122, 222, 1);
  display: inline-block;
}
.high {
  line-height: 2em;
  padding: 0 1em;
  border-radius: 4px;
  background: rgba(235, 68, 9, 0.2);
  color: #eb4409;
  display: inline-block;
}
.middle {
  line-height: 2em;
  padding: 0 1em;
  border-radius: 4px;
  background: rgba(255, 156, 121, 0.2);
  color: #eb4409;
  display: inline-block;
}
.low {
  line-height: 2em;
  padding: 0 1em;
  border-radius: 4px;
  background: rgba(255, 219, 206, 0.1);
  color: #eb4409;
  display: inline-block;
}
.trace {
  color: #f5614d;
}
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
