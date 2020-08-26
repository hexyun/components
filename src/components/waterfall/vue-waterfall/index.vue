<template>
  <div
    class="vue-waterfall-easy-container"
    :style="{
      width: width && !isMobile ? width + 'px' : '',
      height: parseFloat(height) == height ? height + 'px' : height,
    }"
    :class="{ none: noneText && noneData }"
  >
    <!-- <button @click="recalculate">布局</button> -->
    <div class="loading ball-beat" v-show="isPreloading_c" :class="{ first: isFirstLoad }">
      <div class="dot-box" :isFirstLoad="isFirstLoad">
        <div class="dot" v-for="n in loadingDotCount" :key="n" :style="loadingDotStyle"></div>
      </div>
    </div>
    <div class="vue-waterfall-easy-scroll">
      <div
        class="vue-waterfall-easy"
        :style="
          isMobile
            ? ''
            : {
                width: colWidth * cols + 'px',
                left: '50%',
                marginLeft: (-1 * colWidth * cols) / 2 + 'px',
              }
        "
        :class="{ mobile: isMobile }"
      >
        <div
          class="img-box"
          v-for="(index, v) in imgsArr_c"
          track-by="$index"
          :key="$index"
          :class="[cardAnimationClass, { __err__: v._error }]"
          :style="{
            padding: (isMobile ? mobileGap : gap) / 2 + 'px',
            width: isMobile ? '' : getColWidth(v) + 'px',
          }"
          :data-index="$index"
        >
          <div
            class="img-inner-box static-box"
            v-if="v.type === 'static'"
            :class="{ fixed: !inValidImgSize(v) }"
            :style="getImgSize(v)"
            :data-index="$index"
          >
            <div class="img-wraper">
              <img :src="v.realPath" :height="getImageHeight(v)" alt />
            </div>
            <div :class="[type === 'mobile'] ? 'live-info' : 'img-info'">
              <p class="title">{{ v.title }}</p>
              <p class="desc">{{ v.exhibition_name }}</p>
              <p class="booth" v-if="v.booth_number">{{ t("booth") }}{{ v.booth_number }}</p>
            </div>
          </div>

          <div
            :style="getImgSize(v)"
            class="img-inner-box live-box"
            v-if="v.type === 'live'"
            :class="{ fixed: !inValidImgSize(v) }"
            :data-index="$index"
          >
            <div class="img-wraper">
              <img :src="v.realPath" :height="getImageHeight(v)" alt />
            </div>
            <div
              :class="[type === 'mobile'] ? 'mobile-tag' : 'tag'"
              class="doing-tag"
              v-if="v.status === 'doing'"
            >{{ t("doing", v.liveType) }}</div>
            <div
              :class="[type === 'mobile'] ? 'mobile-tag' : 'tag'"
              class="done-tag"
              v-if="v.status === 'done'"
            >{{ t("over", v.liveType) }}</div>
            <div
              :class="[type === 'mobile'] ? 'mobile-tag' : 'tag'"
              class="nostart-tag"
              v-if="v.status === 'nostart'"
            >{{ t("nostart", v.liveType) }}</div>
            <template v-if="type === 'pc'">
              <div class="play-icon">
                <img src="../images/play.png" alt />
              </div>
              <div class="img-info-bg"></div>
              <div class="img-info">
                <p class="title">{{ v.title }}</p>
                <p class="desc">{{ v.exhibition_name }}</p>
                <p class="booth" v-if="v.booth_number">{{ t("booth") }}{{ v.booth_number }}</p>
              </div>
            </template>
            <template v-else>
              <div class="play-icon-mobile">
                <img src="../images/play-mobile.png" alt />
              </div>
              <div class="live-info">
                <p class="title">{{ v.title }}</p>
                <p class="desc">{{ v.exhibition_name }}</p>
                <p class="booth" v-if="v.booth_number">{{ t("booth") }}{{ v.booth_number }}</p>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="text" v-show="noneText && noneData">没有更多了…</div>
  </div>
</template>

<script>
export default {
  name: "vue-waterfall-easy",
  props: {
    width: {
      // 容器宽度
      type: Number,
    },
    height: {
      // 容器高度
      type: [Number, String],
    },
    reachBottomDistance: {
      // 滚动触底距离，触发加载新图片
      type: Number, // selector
      default: 100, // 默认在最低那一列到底时触发
    },
    loadingDotCount: {
      // loading 点数
      type: Number,
      default: 3,
    },
    loadingDotStyle: {
      type: Object,
    },
    loadingImg: {
      type: String,
      default: "",
    },
    gap: {
      // .img-box 间距
      type: Number,
      default: 0,
    },
    mobileGap: {
      type: Number,
      default: 0,
    },
    maxCols: {
      type: Number,
      default: 5,
    },
    imgsArr: {
      type: Array,
      required: true,
    },
    srcKey: {
      type: String,
      default: "src",
    },
    hrefKey: {
      type: String,
      default: "href",
    },
    imgWidth: {
      type: Number,
      default: 240,
    },
    imgSize: {
      type: Object,
      default() {
        return {
          live: {
            width: 240,
            height: 400,
          },
          static: {
            width: 240,
            height: 300,
          },
        };
      },
    },
    verticalGap: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: "pc",
    },
    isRouterLink: {
      type: Boolean,
      default: false,
    },
    linkRange: {
      // card | img | custom 自定义通过slot自定义链接范围
      type: String,
      default: "card",
    },
    loadingTimeOut: {
      // 预加载事件小于500毫秒就不显示加载动画，增加用户体验
      type: Number,
      default: 500,
    },
    cardAnimationClass: {
      type: [String],
      default: "default-card-animation",
    },
    enablePullDownEvent: {
      type: Boolean,
      default: false,
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
            booth: "展位号: ",
          },
          en: {
            booth: "booth Number: ",
          },
        };
      },
    },
    domId: {
      type: String,
    },
    noneData: {
      type: Boolean,
    },
  },
  data() {
    return {
      msg: "this is from  .vue",
      isMobile: !!navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i), // 初始化移动端
      isPreloading: true, // 正在预加载中，显示加载动画
      isPreloading_c: true,
      imgsArr_c: [], // 待图片预加载imgsArr完成，插入新的字段height之后,才会生成imgsArr_c，这时才开始渲染
      loadedCount: 0,
      cols: NaN, // 需要根据窗口宽度初始化
      imgBoxEls: null, // 所有的.img-box元素
      beginIndex: 0, // 开始要排列的图片索引,首次为第二列的第一张图片，后续加载则为已经排列图片的下一个索引
      colsHeightArr: [],
      // 自定义loading
      LoadingTimer: null,
      isFirstLoad: true, // 首次加载
      over: false, // 结束waterfall加载
      scrollEl: null, // 滚动的div
      prev: 0,
      noneText: false,
    };
  },
  computed: {
    colWidth() {
      // 每一列的宽度
      let width = this.getTargetWidth() || this.imgWidth;
      return width + this.gap;
    },
    imgWidth_c() {
      // 对于移动端重新计算图片宽度`
      return this.isMobile
        ? window.innerWidth / 2 - this.mobileGap
        : this.getTargetWidth() || this.imgWidth;
    },
    hasLoadingSlot() {
      return !!this.$scopedSlots.loading;
    },
  },
  ready() {
    this.bindClickEvent();
    this.loadingMiddle();

    this.preload();
    this.cols = this.calcuCols();
    this.$on("preloaded", () => {
      this.isFirstLoad = false;
      this.imgsArr_c = this.imgsArr.concat([]); // 预加载完成，这时才开始渲染
      this.$nextTick(() => {
        this.isPreloading = false;
        this.imgBoxEls = this.$el.getElementsByClassName("img-box");
        this.beginIndex = 0;
        this.waterfall();
      });
    });
    if (!this.isMobile && !this.width)
      window.addEventListener("resize", this.response);
    if (this.isMobile && this.enablePullDownEvent) this.pullDown();
    this.scroll();

    if (this.domId) {
      const self = this;
      this.$nextTick(() => {
        const dom = document.querySelector(this.domId);
        if (dom) {
          dom.onscroll = function () {
            const now = Date.now();
            if (dom.scrollHeight - dom.scrollTop - dom.clientHeight <= 100) {
              if (now - self.prev > 500) {
                self.prev = now;
                self.$emit("scroll-bottom");
              }
            }
          };
        }
      });
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.response);
  },
  watch: {
    isPreloading(newV, oldV) {
      if (newV) {
        setTimeout(() => {
          if (!this.isPreloading) return; // 500毫秒内预加载完图片则不显示加载动画
          this.isPreloading_c = true;
        }, this.loadingTimeOut);
      } else {
        this.isPreloading_c = false;
      }
    },
    imgsArr(newV, oldV) {
      let self = this;
      if (
        this.imgsArr_c.length > newV.length ||
        (this.imgsArr_c.length > 0 && newV[0] && !newV[0]._height)
      ) {
        this.reset();
      }
      this.preload()
        .then((res) => {
          // this.beginIndex = 0;
          // this.waterfall();
        })
        .catch();
    },
  },
  methods: {
    t(keypath) {
      const o = this.langInfo[this.lang] || {};
      const keys = keypath.split(".");
      let r = o;
      let key;
      for (let i = 0; i < keys.length; i++) {
        key = keys[i];
        if (key && typeof r === "object") {
          r = r[key];
        }
      }
      return r || "";
    },
    getTargetWidth() {
      let width;
      if (this.inValidImgSize["live"]) {
        width = parseFloat(this.imgSize["live"].width);
      } else if (this.inValidImgSize["static"]) {
        width = parseFloat(this.imgSize["static"].width);
      }
      return width;
    },
    inValidImgSize(v) {
      return (
        !this.imgSize ||
        (typeof this.imgSize === "object" && !this.imgSize[v.type])
      );
    },
    getColWidth(v) {
      // imgSize is invalid
      if (this.inValidImgSize(v)) {
        return this.colWidth;
      } else {
        return this.getTargetWidth();
      }
    },
    getImgSize(v) {
      const defaults = {
        w: this.imgWidth_c + "px",
        h: v._height ? v._height + "px" : false,
      };
      if (this.inValidImgSize(v)) {
        return defaults;
      } else {
        const style = this.imgSize[v.type];
        const target = {
          width: style.width ? parseFloat(style.width) + "px" : defaults.width,
          height: style.height
            ? parseFloat(style.height) + "px"
            : defaults.height,
        };
        return target;
      }
    },
    t(keypath, liveType) {
      const o = this.langInfo[this.lang] || {};
      const keys = keypath.split(".");
      let r = o;
      let key;
      for (let i = 0; i < keys.length; i++) {
        key = keys[i];
        if (key && typeof r === "object") {
          r = r[key];
        }
      }
      // Trick
      if (liveType === "MEETING") {
        r = r.replace("直播", "会议");
      }
      return r || "";
    },
    // 获取真实高度
    getImageHeight(item) {
      const { ImageHeight = 0, ImageWidth = 0 } = item;
      // console.log(item.title, ImageWidth, ImageHeight);
      this.imgSize = this.imgSize || {};
      if (ImageHeight && ImageWidth) {
        const define = this.imgSize[item.type] || { width: this.imgWidth };
        const width = define.width;
        const imageHeight = Math.round(width / (ImageWidth / ImageHeight));
        return imageHeight + "px";
      }
      return "";
    },
    // ==1== 预加载
    preload(src, imgIndex) {
      return new Promise((resolve, reject) => {
        this.imgsArr.forEach((imgItem, imgIndex) => {
          if (imgIndex < this.loadedCount) return; // 只对新加载图片进行预加载
          this.imgsArr[imgIndex].realPath = this.loadingImg;

          // 无图时
          if (!imgItem[this.srcKey]) {
            this.imgsArr[imgIndex]._height = "0";
            this.loadedCount++;

            // 支持无图模式
            if (this.loadedCount == this.imgsArr.length) {
              this.$emit("preloaded");
              resolve();
            }
            return;
          }

          var oImg = new Image();
          oImg.src = imgItem[this.srcKey];

          // 图片加载成功处理逻辑
          const onload = (e) => {
            // console.log("onload", imgIndex);
            this.loadedCount++;
            // 预加载图片，计算图片容器的高

            if (e.type === "load") {
              const imageHeight = Math.round(
                this.imgWidth_c / (oImg.width / oImg.height)
              );
              // console.log(e.target, oImg.width, oImg.height, imageHeight);
              this.imgsArr[imgIndex]._height = imageHeight;
              this.imgsArr[imgIndex]._load = true;
            } else {
              this.imgsArr[imgIndex]._height = this.isMobile
                ? this.imgWidth_c
                : this.imgWidth;
            }

            if (e.type == "error") {
              this.imgsArr[imgIndex]._error = true;
              this.$emit("imgError", this.imgsArr[imgIndex]);
              reject(this.imgsArr[imgIndex]);
            }

            if (this.loadedCount == this.imgsArr.length) {
              this.$emit("preloaded");
              resolve();
            }
            this.imgsArr[imgIndex].realPath = imgItem[this.srcKey];
          };

          oImg.onload = onload;
          oImg.onerror = onload;
        });
      });
    },
    // ==2== 计算cols
    calcuCols() {
      // 列数初始化
      var waterfallWidth = this.width ? this.width : window.innerWidth;
      var cols = parseInt(waterfallWidth / this.colWidth);
      cols = cols === 0 ? 1 : cols;
      return this.isMobile ? 2 : cols > this.maxCols ? this.maxCols : cols;
    },
    // ==3== waterfall 布局
    waterfall() {
      // console.log('瀑布流布局计算', this.imgsArr.length, this.beginIndex);
      if (!this.imgBoxEls) return;
      var top;
      var left;
      var height;
      var colWidth = this.isMobile
        ? this.imgBoxEls[0].offsetWidth
        : this.colWidth;

      if (this.beginIndex == 0) this.colsHeightArr = [];

      // 瀑布流计算
      for (var i = this.beginIndex; i < this.imgsArr.length; i++) {
        if (!this.imgBoxEls[i]) return;

        const box = this.imgBoxEls[i];
        height = parseFloat(window.getComputedStyle(box).height);

        // 暴力计算
        const item = this.imgsArr[i];
        const imageHeight = parseFloat(this.getImageHeight(item));
        const liveHeight = this.type === "mobile" ? 26 : 10;
        const staticHeight = this.type === "mobile" ? 48 : 85;

        if (height < imageHeight) {
          height =
            item.type === "live"
              ? imageHeight + liveHeight
              : imageHeight + staticHeight;
        }

        if (this.verticalGap) {
          height += this.verticalGap;
        }

        if (i < this.cols) {
          this.colsHeightArr.push(height);
          top = 0;
          left = i * colWidth;
        } else {
          var minHeight = Math.min.apply(null, this.colsHeightArr); // 最低高低
          var minIndex = this.colsHeightArr.indexOf(minHeight); // 最低高度的索引
          top = minHeight;
          left = minIndex * colWidth;

          // 更新列的最低高度
          this.colsHeightArr[minIndex] = minHeight + height;
        }
        // console.log('height', height, top, box);
        this.imgBoxEls[i].style.left = left + "px";
        this.imgBoxEls[i].style.top = top + "px";
        this.beginIndex = this.imgsArr.length; // 排列完之后，新增图片从这个索引开始预加载图片和排列
      }
    },

    // ==4== resize 响应式
    response() {
      var old = this.cols;
      this.cols = this.calcuCols();
      if (old === this.cols) return; // 列数不变直接退出
      this.beginIndex = 0; // 开始排列的元素索引
      this.waterfall();
      if (this.over) this.setOverTipPos();
    },
    // ==5== 滚动触底事件
    scrollFn() {
      // console.log('scroll')
      var self = this;
      if (!this.domId) {
        var scrollEl = this.scrollEl;
        this.$emit("scroll", scrollEl.scrollTop);
        var minHeight = Math.min.apply(null, this.colsHeightArr);
        if (
          scrollEl.scrollTop + scrollEl.offsetHeight >=
          scrollEl.scrollHeight - this.reachBottomDistance
        ) {
          this.noneText = true;
        } else {
          this.noneText = false;
        }
        if (this.isPreloading) return;
        if (
          scrollEl.scrollTop + scrollEl.offsetHeight >
          minHeight - this.reachBottomDistance
        ) {
          this.isPreloading = true;
          // console.log('scroll-bottom')
          this.$emit("scroll-bottom"); // 滚动触底
        }
      }
    },
    // from: https://github.com/vue-tools/vt-image/blob/master/src/utils.js#L72
    throttle(fn, delay = 500) {
      let last;
      let now;
      let timer;
      let context = this;
      let args;
      return function () {
        now = new Date().getTime();
        args = arguments;
        if (last && now - last < delay) {
          clearTimeout(timer);
          timer = setTimeout(function () {
            last = now;
            fn.apply(context, args);
          }, delay);
        } else {
          last = now;
          fn.apply(context, args);
        }
      };
    },
    _delayScroll() {
      return this.throttle(this.scrollFn, 200)();
    },
    scroll() {
      this.scrollEl.addEventListener("scroll", this._delayScroll);
    },
    waterfallOver() {
      this.scrollEl.removeEventListener("scroll", this._delayScroll);
      this.isPreloading = false;
      this.over = true;
      this.setOverTipPos();
    },
    setOverTipPos() {
      var maxHeight = Math.max.apply(null, this.colsHeightArr);
      this.$nextTick(() => {
        this.$refs.over.style.top = maxHeight + "px";
      });
    },
    // ==6== 点击事件绑定
    bindClickEvent() {
      this.$el
        .querySelector(".vue-waterfall-easy")
        .addEventListener("click", (e) => {
          var targetEl = e.target;
          if (e.target.className.indexOf("over") !== -1) return;
          if (targetEl.className.indexOf("img-box") != -1) return;
          while (targetEl.className.indexOf("img-inner-box") == -1) {
            targetEl = targetEl.parentNode;
          }
          var index = targetEl.getAttribute("data-index");
          this.$emit("select-item", e, this.imgsArr_c[index]);
        });
    },
    // ==7== 下拉事件
    pullDown() {
      var scrollEl = this.$el.querySelector(".vue-waterfall-easy-scroll");
      var startY;
      scrollEl.addEventListener("touchmove", (e) => {
        if (scrollEl.scrollTop === 0) {
          var t = e.changedTouches[0];
          if (!startY) startY = t.pageY;
          var pullDownDistance = t.pageY - startY;
          if (pullDownDistance > 0) {
            e.preventDefault();
          }
          this.$emit("pullDownMove", pullDownDistance);
        }
      });
      scrollEl.addEventListener("touchend", (e) => {
        if (scrollEl.scrollTop === 0) {
          startY = NaN;
          this.$emit("pullDownEnd");
        }
      });
    },
    // other
    loadingMiddle() {
      // 对滚动条宽度造成的不居中进行校正
      var scrollEl = (this.scrollEl = this.$el.querySelector(
        ".vue-waterfall-easy-scroll"
      ));
      var scrollbarWidth = scrollEl.offsetWidth - scrollEl.clientWidth;
      this.$el.querySelector(".loading").style.marginLeft =
        -scrollbarWidth / 2 + "px";
    },
    reset() {
      this.imgsArr_c = [];
      this.beginIndex = 0;
      this.loadedCount = 0;
      this.isFirstLoad = true;
      this.isPreloading = true;
      this.scroll();
      this.over = false;
    },
    recalculate() {
      this.beginIndex = 0;
      this.waterfall();
    },
  },
};
</script>
<style lang="less" scoped>
.vue-waterfall-easy-container {
  width: 100%;
  height: 100%;
  position: relative;
  background: #f4f4f4;
  transition: 0.3s;
  &.none {
    padding-bottom: 42px;
  }
  .vue-waterfall-easy-scroll {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .vue-waterfall-easy {
    position: absolute;
    width: 100%; // 移动端生效
    @keyframes show-card {
      0% {
        transform: scale(0.5);
      }
      100% {
        transform: scale(1);
      }
    }
    & > .img-box {
      position: absolute;
      box-sizing: border-box;
    }
    &.mobile > .img-box {
      width: 50%; // 移动端生效
    }
    &.mobile .img-wraper > img {
      border-radius: 4px 4px 0 0;
    }
    &.mobile .static-box .live-info {
      padding: 7px 10px !important;
      background: rgba(24, 34, 57, 1);
      line-height: 15px;
      .desc {
        color: rgba(255, 255, 255, 0.3);
        margin: 0;
        font-size: 12px;
      }
      .title {
        line-height: 18px;
        color: #fff;
        font-size: 14px;
        margin-bottom: 7px;
      }
    }
    &.mobile .live-box .live-info {
      border-radius: 0 0 4px 4px !important;
      padding: 7px 10px !important;
      background: rgba(24, 34, 57, 1) !important;
      .title {
        font-size: 14px;
        color: #fff !important;
        line-height: 21px !important;
      }
    }
    & > .img-box.default-card-animation {
      animation: show-card 0.4s;
      transition: left 0.6s, top 0.6s;
      transition-delay: 0.1s;
    }
    a {
      display: block;
    }
    .img-inner-box {
      position: relative;
      // box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      // border-radius: 4px;
    }
    .__err__ .img-wraper {
      background-image: url(data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk1M0JCM0QwNkVFNDExRThCNTJCQUQ2RDFGQzg0NzIxIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk1M0JCM0NGNkVFNDExRThCNTJCQUQ2RDFGQzg0NzIxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTYwRUMyMDE2RUUzMTFFOEJCRTU5RTFDODg1ODgwMjYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTYwRUMyMDI2RUUzMTFFOEJCRTU5RTFDODg1ODgwMjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAQCwsLDAsQDAwQFw8NDxcbFBAQFBsfFxcXFxcfHhcaGhoaFx4eIyUnJSMeLy8zMy8vQEBAQEBAQEBAQEBAQEBAAREPDxETERUSEhUUERQRFBoUFhYUGiYaGhwaGiYwIx4eHh4jMCsuJycnLis1NTAwNTVAQD9AQEBAQEBAQEBAQED/wAARCACRAJEDASIAAhEBAxEB/8QAZQAAAwEBAQAAAAAAAAAAAAAAAAIDAQQHAQEAAAAAAAAAAAAAAAAAAAAAEAACAQMDBAEFAAMBAAAAAAAAAQIRMQMhQRJRYYEycZHBIkITsdFSYhEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9AAAAAMFnNQWt9kAwkssVbV9CTnKb10XQVtLSyAd5ZuzURW27yfhmX9RlDI+wD4Vf/ZVi41SKCdeNI3YEnOXJtOiBZZr/wBGcMi2Ft7AXjli76PoOcqael0Mpyg9NV0A6QEhNTWl90MBoAAAAAAGGiTlxjXfZAZkycdEqyI3q26sOrd92CTm6bbsA1boh1i3lqPGKiqIZAYklYHY0x6tIDY2B3NdjEBgNJ3NACTxbx0E1TozoYsoqSowI2o06MtjyctGqSItODptsw6NX2YHSaJCXKNd90OAAAAYznnLnJvZWK5pUjRXloiNdwCjk0l9S0YqKohcSpGrvLUcDUBLK23x23FWNtVSAuHch/KXQP5PoBdqq77GJ1XfczFVKjVBcuPk6rXqBQCH8n0D+UugFwZD+bV1oNif5OOzQDyipKjI0cW0/qXYmVVjVXjqAkZcHXZ3OhHNXcthlWNHeOjAoAABDLKs6bISlWl1Busm+42Jfm30At2BmI1gRy+3gpD1XwTy+3gpH1QDASyt8uKdFuJRw1iwOjdBKy+TIutGbK3kAAxtJNuwiywdmA7s/glj9/BV04unQli9l8AWDsBjAhSja6D4pUnTZmZV+afUVOkk+4HUBgAc0bD4v2+fsJGw+L9vn7AVQMEDAjl9vBSHqvgnl9vBSHqvgDJwbfJC8JPSlEO5wTo3qMnUDEqNGz0jXoD08BRSXyBB/m6u2xvFPQ1qjoDAVNxqv1ZuJUnT5BGw9/AFQYAwJZf1+fsJKw+X9fn7CSsB0AAAc7VG13GxP82uoZFSbezFWkkwOgGCBgRy15adDZTaioq7QZPfwZQDFFfPc2MnB0vE1AwCc+WituPjaS4kzU6agPkS9hEVeqJJU0AAh7+ACHv4AqAAwI5X+aXQVKrS7g3WTY2ONZp7IC9AAAJ5lWNf+dSV1XqdL1VGc8lxk47bAUxyqqO60GIpuL5LyuxZNNVVtmAmVfkpbbi1RYAI1QVRYAI1QJ1aRYzdAbJ8Y1I1RZggI1SNxL8uW1NCoAYxckqKiu9Bm0lV23ZFtyfJ+F2Ayyr0K4VSNf8ArUnFcpKO250LRUQABoAYLkhzXdWHMA5u26uNGXF9tx8uOusfYlbTcC6aaqrdTTnTlHVfQrHJF6PRsBwAAC5i9vg0xbgaAIAAxtJVduosskVotWiTcpav6ANKXJ9the27sF9NyuLHTWXsA2OHBd3cYDQAAAAAAAwSeNS1syhgHNRxdJfUK10ujoaTuJLCrp0Amm1Ztdhv6z3Sfkxwmu4leqoBT+1P1f8AkZy4469daEaopllRqPRAH9ZOyp5Fbbu2+xmuyGUJvsAtaaWQUcnSP1Kxwq7dR0krALDGo63Y4GgAAAAAAAAAAAAAAAAAshJ7AAGK6B3YABsNx4gADAAAAAAAAAAAAAf/2Q==);
      background-repeat: no-repeat;
      background-position: center;
      background-size: 50% 50%;
      img {
        display: none;
      }
    }
    .img-wraper {
      display: flex;
      justify-content: center;
      align-items: center;
      & > img {
        display: block;
        border: none;
        width: 100%;
        max-width: 100%;
      }
    }
    .fixed .img-wraper {
      height: calc(~"100% - 75px");

      & > img {
        width: 100%;
        max-width: 100%;
        max-height: 100%;
      }
    }
    .over {
      position: absolute;
      width: 100%;
      text-align: center;
      font-size: 12px;
      line-height: 1.6;
      color: #aaa;
    }
  }

  & > .loading.first {
    bottom: 50%;
    transform: translate(-50%, 50%);
  }
  & > .loading {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 6px;
    z-index: 999;
    @keyframes ball-beat {
      50% {
        opacity: 0.2;
        transform: scale(0.75);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    &.ball-beat > .dot {
      vertical-align: bottom;
      background-color: #4b15ab;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin: 3px;
      animation-fill-mode: both;
      display: inline-block;
      animation: ball-beat 0.7s 0s infinite linear;
    }
    &.ball-beat > .dot:nth-child(2n-1) {
      animation-delay: 0.35s;
    }
  }
  .text {
    position: absolute;
    bottom: 10px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
    line-height: 22px;
    text-align: center;
    width: 100%;
  }
}
.fixed {
  &.img-inner-box {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.2);
  }
}
.img-inner-box {
  position: relative;
  .title {
    font-size: 18px;
  }
  .desc {
    font-size: 14px;
  }
  .booth {
    font-size: 14px;
  }
}
/*pc端样式处理*/
.static-box {
  .img-info {
    padding: 15px;
    background: #ffffff;
    width: 100%;
    box-sizing: border-box;
    height: 75px;
    .title {
      color: rgba(0, 0, 0, 1);
      height: 25px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .desc {
      color: rgba(0, 0, 0, 0.45);
    }
    .booth {
      color: rgba(0, 0, 0, 0.45);
    }
  }
  .live-info {
    box-sizing: border-box;
    width: 100%;
    height: auto;
    padding: 14px 6px 15px 14px;
    .title {
      height: 16px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
      line-height: 16px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .desc {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      height: 22px;
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      margin: 11px 0;
    }
    .booth {
      height: 14px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.45);
      line-height: 14px;
    }
  }
}
/*移动端样式处理*/
.live-box {
  .img-info-bg {
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 65%;
    background: linear-gradient(
      0deg,
      rgba(24, 34, 57, 1) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    opacity: 0.73;
  }
  .img-info {
    position: absolute;
    left: 20px;
    bottom: 20px;
  }
  .play-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 55px;
    height: 55px;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
    }
  }
  .play-icon-mobile {
    position: absolute;
    right: 5px;
    top: 5px;
    width: 20px;
    height: 20px;
    img {
      width: 100%;
    }
  }
  .live-info {
    padding: 5px;
    background: #ffffff;
    width: 100%;
    box-sizing: border-box;
    .title {
      color: rgba(0, 0, 0, 1);
      font-size: 14px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .title {
    color: rgba(255, 255, 255, 1);
  }
  .desc {
    color: rgba(255, 255, 255, 0.45);
  }
  .booth {
    color: rgba(0, 0, 0, 0.45);
  }
  .tag {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 5px 10px;
    border-radius: 5px;
    opacity: 0.8;
    font-size: 14px;
    text-align: center;
    color: #ffffff;
    &.nostart-tag {
      background: rgba(0, 0, 0, 0.45);
    }
    &.doing-tag {
      background: rgba(46, 76, 244, 1);
    }
    &.done-tag {
      background: rgba(0, 0, 0, 1);
    }
  }
  .mobile-tag {
    position: absolute;
    top: 5px;
    left: 5px;
    padding: 2px 5px;
    border-radius: 5px;
    font-size: 9px;
    text-align: center;
    color: #ffffff;
    &.nostart-tag {
      background: rgba(24, 144, 255, 1);
    }
    &.doing-tag {
      background: rgba(250, 84, 28, 1);
    }
    &.done-tag {
      background: rgba(138, 138, 138, 1);
    }
  }
}
</style>
