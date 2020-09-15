<template>
  <div :class="{'hex-area':true}" :style="{width:inputWidth}" v-click-out-side="hiddenMenu">
    <div class="area-input" @click="show = !show">
      <input type="text" :placeholder="t('none')" disabled :value="selectText" />
      <svg
        t="1590251416183"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2845"
        width="52"
        height="52"
        :class="{'trans':show}"
      >
        <path
          d="M529.808696 614.4c-11.130435 11.130435-26.713043 11.130435-35.617392 0L178.086957 291.617391c-22.26087-22.26087-55.652174-24.486957-75.686957-6.678261-17.808696 15.582609-17.808696 51.2 8.904348 75.686957L476.382609 734.608696c22.26087 22.26087 55.652174 22.26087 75.686956 0l365.078261-371.756522c22.26087-22.26087 24.486957-55.652174 6.678261-75.686957-17.808696-17.808696-55.652174-17.808696-75.686957 6.678261L529.808696 614.4"
          fill="#BFBFBF"
          p-id="2846"
        />
      </svg>
    </div>
    <div :class="{'area-select':true,'show':show}">
      <div class="section">
        <div class="content common-scrollbar">
          <div class="content-scroll">
            <div
              v-for="item in contries"
              :key="item[id]"
              track-by="$index"
              :class="{'item':true,'selected':item.selected}"
              @click="selectNode('country',$index)"
            >
              <a href="javascript:;">{{item[name]}}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="content common-scrollbar">
          <div class="content-scroll">
            <div
              v-for="item in provinces"
              :key="item[id]"
              track-by="$index"
              :class="{'item':true,'selected':item.selected}"
              @click="selectNode('province',$index)"
            >
              <a href="javascript:;">{{item[name]}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { throttle } from '../../utils/dom'
// import Vue from 'Vue'
import clickOutSide from "../../directives/clickoutside.js";
export default {
  name: "ranktwo",
  directives: {
    clickOutSide
  },
  props: {
    id: {
      type: String,
      default: "id"
    },
    name: {
      type: String,
      default: "name"
    },
    linktype: {
      type: String,
      default: ""
    },
    inputWidth: {
      type: String,
      default: "468px"
    },
    key: {
      type: String,
      default: 'name'
    },
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    defaultData: {
      type: Array,
      default() {
        return [];
      }
    },
    lang: {
      type: String,
      default: "zh",
    },
    langInfo: {
      type: Object,
      default() {
        return {
          zh: {
            none: '请选择',
          },
          en: {
            none: 'please select',
          }
        }
      }
    }
  },
  data() {
    return {
      show: false,
      contries: [],
      provinces: [],
      cities: [],
      current: {
        country: {},
        province: {},
      },
    };
  },
  computed: {
    selectText() {
      return (
        !this.current.country[this.name] ? '' : (this.current.country[this.name] || "") + this.linktype +
          (this.current.province[this.name] || "")
      );
    }
  },
  ready() {
    // console.log('this.list', this.list)
  },
  methods: {
    t(keypath) {
      const o = this.langInfo[this.lang] || {}
      const keys = keypath.split('.')
      let r = o
      let key
      for (let i = 0;i < keys.length;i++) {
        key = keys[i]
        if (key && typeof r === 'object') {
          r = r[key]
        }
      }
      return r || ''
    },
    // init waterfall instance
    init() {
      // 设置国家列表
      this.setContries(this.list);
      this.setDefaultData();
    },
    // 设置初始数据
    setDefaultData(ChosedData) {
      if (this.defaultData.length <= 0) return false;
      let that = this;
      let data = this.defaultData;
      // 选中第一列
      let fid = data[0][this.id];
      let fIndex = this.setSelected(this.list, this.id, fid);
      if (fIndex > -1) {
        this.selectNode("country", fIndex, "init");
        // 选中第二列
        let fItem = this.contries[fIndex];
        if (data[1] && fItem.children) {
          let sid = data[1][this.id];
          let sIndex = this.setSelected(fItem.children, this.id, sid);
          if (sIndex > -1) {
            this.selectNode("province", sIndex, "init");
          }
        }
      }
    },
    setSelected(list, key, val) {
      return list.findIndex(x => x[key] === val)
    },
    // 设置国家列表
    setContries(list) {
      this.contries = list;
      this.provinces = [];
      // console.log('object :>> ', list);
    },
    // 设置省份列表
    setProvinces(id, list) {
      this.provinces = list;
    },
    /**
     * 选中列表节点
     * type: init selected
     */
    selectNode(from, index, type) {
      let data = {};
      if (from === "country") {
        data = this.contries[index];
        this.clearContries();
        this.clearProvinces();
        this.contries.$set(index, Object.assign({}, data, { selected: true }));
        this.setProvinces(data[this.name], data.children);
        this.current.province = {};
        if (type !== "init") {
          this.$emit("select-node", data);
        }
      } else {
        data = this.provinces[index];
        this.clearProvinces();
        this.provinces.$set(index, Object.assign({}, data, { selected: true }));
        // console.log('this.provinces', this.provinces)
        if (type !== "init") {
          this.$emit("select-node", this.current.country, data);
        }
        this.show = false;
      }
      this.current[from] = data;
    },
    // 清除国家列表选中状态
    clearContries() {
      let that = this;
      this.contries &&
        this.contries.forEach((element, index) => {
          // Vue.set(element, 'selected', false);
          element.selected = false;
          that.contries.$set(index, element);
        });
    },
    // 清除省份列表选中状态
    clearProvinces() {
      let that = this;
      this.provinces &&
        this.provinces.forEach((element, index) => {
          // Vue.set(element, 'selected', false);
          element.selected = false;
          that.provinces.$set(index, element);
        });
    },
    // 清除市级列表选中状态
    clearCities() {
      let that = this;
      this.cities &&
        this.cities.forEach((element, index) => {
          element.selected = false;
          // Vue.set(element, 'selected', false);
          that.cities.$set(index, element);
        });
    },
    // 重置列表
    reset() {
      this.clearContries();
      this.clearProvinces();
      this.provinces = [];
      this.cities = [];
    },
    hiddenMenu() {
      this.show = false;
      this.reset();
    }
  }
};
</script>
<style lang="less">
.hex-area {
  height: 0px;
  * {
    box-sizing: border-box;
  }

  .section {
    flex: 1;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    .title {
      padding: 0px 15px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 38px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    }
    .content {
      height: 192px;
      min-height: auto;
      .content-scroll {
        height: 100%;
        padding-right: 5px;
        overflow: auto;
        &::-webkit-scrollbar {
          width: 5px;
        }
        &::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.45);
          border-radius: 2.5px;
        }
      }
      .item {
        position: relative;
        height: 32px;
        padding: 0px 15px;

        &.selected,
        &.selected a {
          background: rgba(230, 247, 255, 1);
        }
        &:hover,
        &:hover a {
          background: rgba(230, 247, 255, 1);
        }
        a {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          position: absolute;
          left: 15px;
          right: -5px;
          display: block;
          line-height: 32px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.65);
          display: block;
          text-decoration: none;
        }
      }
    }
  }
  .area-input {
    width: 100%;
    height: 32px;
    padding-left: 12px;
    padding-right: 14px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    input {
      cursor: pointer;
      height: 100%;
      border: none;
      font-size: 14px;
      font-weight: 400;
      flex: 1;
    }
    input::-webkit-input-placeholder {
      color: rgba(0, 0, 0, 0.25);
    }

    input:-moz-placeholder {
      color: rgba(0, 0, 0, 0.25);
    }

    input::-moz-placeholder {
      color: rgba(0, 0, 0, 0.25);
    }

    input:-ms-input-placeholder {
      color: rgba(0, 0, 0, 0.25);
    }
    .icon {
      height: 100%;
      width: 20px;
      color: rgba(0, 0, 0, 0.25);
    }
    .trans {
      transform: rotate(180deg);
    }
  }
  .area-select {
    width: 100%;
    display: flex;
    transform: translateY(-1px);
    height: 0px;
    overflow: hidden;
    transition: 0.3s ease-in;
    &.show {
      height: 232px;
    }
  }
}
</style>
