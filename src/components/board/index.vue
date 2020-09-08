<template>
  <div class="board-wrap" v-el:board-wrap>
    <canvas
      class="board"
      v-el:board-dom
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
      @mousedown="mouseDown"
      @mousemove="mouseMove"
      @mouseup="mouseUp"
      @mouseleave="mouseLeave"
    >
    </canvas>
  </div>
</template>

<script>
export default {
  name: "board",
  props: {
    color: {
      // 画笔颜色
      type: String,
      default: "#000",
    },
    linewidth: {
      // 画笔粗细
      type: Number,
      default: 3,
    },
    defaultimg: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      dom: "",
      ctx: "",
      down: false,
      start: {
        x: 0,
        y: 0,
      },
      width: 0,
      height: 0,
      step: 0,
    };
  },
  methods: {
    mouseDown(e) {
      e = e || event;
      e.preventDefault();
      this.startDraw(e.offsetX, e.offsetY);
    },
    touchStart(e) {
      e = e || event;
      e.preventDefault();
      this.startDraw(
        e.targetTouches[0].clientX - this.dom.getBoundingClientRect().left,
        e.targetTouches[0].clientY - this.dom.getBoundingClientRect().top
      );
    },
    startDraw(x, y) {
      this.start = { x, y };
      this.ctx.beginPath();
      this.down = true;
    },
    mouseMove(e) {
      e = e || event;
      e.preventDefault();
      this.moveDraw(e.offsetX, e.offsetY);
    },
    touchMove(e) {
      e = e || event;
      e.preventDefault();
      this.moveDraw(
        e.targetTouches[0].clientX - this.dom.getBoundingClientRect().left,
        e.targetTouches[0].clientY - this.dom.getBoundingClientRect().top
      );
    },
    moveDraw(x, y) {
      if (this.down) {
        this.ctx.moveTo(...Object.values(this.start));
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        this.start = { x, y };
        this.step++;
      }
    },
    mouseUp(e) {
      e = e || event;
      e.preventDefault();
      this.endDraw();
    },
    touchEnd(e) {
      e = e || event;
      e.preventDefault();
      this.endDraw();
    },
    endDraw() {
      this.ctx.closePath();
      this.down = false;
    },
    mouseLeave() {
      this.endDraw();
    },
    overwrite() {
      this.ctx.clearRect(0, 0, 600, 600);
      this.step = 0;
    },
    defaultDraw(src) {
      this.$nextTick(() => {
        var self = this;
        const img = new Image();
        img.src = src;
        img.style.width = 0;
        img.style.height = 0;
        document.body.appendChild(img);
        img.onload = function () {
          self.ctx.drawImage(img, 0, 0, self.width, self.height);
          document.body.removeChild(img);
          self.step = 0;
        };
      });
    },
    exportImg() {
      const base = this.dom.toDataURL("image/png");
      this.$emit("exportimg", base, this.step);
    },
  },
  watch: {
    defaultimg: {
      immediate: true,
      handler(n) {
        if (n) {
          this.defaultDraw(n);
        }
      },
    },
  },
  ready() {
    this.$nextTick(() => {
      const wrap = this.$els.boardWrap;
      this.width = wrap.offsetWidth;
      this.height = wrap.offsetHeight;

      this.dom = this.$els.boardDom;
      this.dom.width = this.width;
      this.dom.height = this.height;

      this.ctx = this.dom.getContext("2d");
      this.ctx.strokeStyle = this.color;
      this.ctx.lineWidth = this.linewidth * 1;
    });
  },
};
</script>

<style lang="less" scoped>
.board-wrap {
  width: 100%;
  height: 100%;
}
</style>
