<template>
  <div class="hex-waterfall">
    <vue-waterfall
      :imgs-arr="list"
      @scroll-bottom="scrollBottom"
      @select-item="selectItem"
      @scroll="scroll"
      :gap="gap"
      :max-cols="maxCols"
      :loading-img="loadingImg"
      :lang="lang"
      :lang-info="langInfo"
      :dom-id="domId"
      :img-size="imgSize"
      :img-width="imgWidth"
      :none-data="noneData"
      :vertical-gap="verticalGap"
      :type="type"
    >
    </vue-waterfall>
  </div>
</template>
<script>
import clickOutSide from "../../directives/clickoutside.js";
import vueWaterfall from "./vue-waterfall";
export default {
  name: "waterfall",
  components: {
    vueWaterfall,
  },
  directives: {
    clickOutSide,
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    loadingImg: {
      type: String,
      default: "",
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
            nostart: "未开始",
            doing: "进行中",
            over: "已结束",
            booth: "展位号: ",
          },
          en: {
            nostart: "No Start",
            doing: "Doing",
            over: "Done",
            booth: "booth Number: ",
          },
        };
      },
    },
    domId: {
      type: String,
    },
    imgSize: {
      type: Object,
    },
    maxCols: {
      type: Number,
      default: 4,
    },
    imgWidth: {
      type: Number,
    },
    noneData: {
      type: Boolean,
      default: false,
    },
    gap: {
      type: Number,
      default: 14,
    },
    verticalGap: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: "pc",
    },
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  created() {
    console.log("this.type", this.type);
  },
  ready() {
    this.init();
  },
  methods: {
    // init waterfall instance
    init() {},
    scrollBottom() {
      this.$emit("scroll-bottom");
    },
    selectItem(e, item) {
      this.$emit("select-item", item);
    },
    scroll(top) {
      this.$emit("scroll", top);
    },
  },
};
</script>
<style lang="less">
.hex-waterfall {
  height: 100%;
  background: rgba(244, 244, 244, 1);
}
</style>
