<template>
  <div id="luxy" class="luxy">
    <div class="luxy-el" :data-speed-y="img.speed" :data-offset="idx===0?0:img.offset" v-for='(idx, img) in imglist' :key='idx' @click='selectThis(img)'>
      <img :src="img.src"/>
    </div>
    <!-- <div class="luxy-el" data-speed-y="30" data-offset="50">
      <img src="./images/img.jpg" alt="" />
    </div>
    <div class="luxy-el" data-speed-y="20" data-offset="40">
      <img src="./images/img.jpg" alt="" />
    </div>
    <div class="luxy-el" data-speed-y="15" data-offset="30">
      <img src="./images/img.jpg" alt="" />
    </div>
    <div class="luxy-el" data-speed-y="10" data-offset="20">
      <img src="./images/img.jpg" alt="" />
    </div>
    <div class="luxy-el" data-speed-y="5" data-offset="10">
      <img src="./images/img.jpg" alt="" />
    </div>
    <div class="luxy-el" data-speed-y="1" data-offset="5">
      <img src="./images/img.jpg" alt="" />
    </div> -->
  </div>
</template>
<script>
export default {
  name: "imgscroll",
  props:{
    imglist:{
      type:Array
    },
    speed: {
      type: Number,
      default: 40
    },
    offset: {
      type: Number,
      default: 40
    }
  },
  data() {
    return {};
  },
  ready() {

  },
  methods: {
    selectThis (img) {
      this.$emit('select',img)
    }
  },
  watch: {
    imglist: {
      immediate: true,
      handler(n) {
        this.$nextTick(()=>{
          luxy.init({
            wrapper: "#luxy",
            targets: ".luxy-el",
            wrapperSpeed: 0.08,
          });
        })
      }
    }
  }
};
</script>
<style lang="less" scoped>
html,
body,
* {
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
  background: transparent;
  background-color: transparent;
}
img {
  width: 100%;
  height: 100%;
}
div > h5 {
  text-align: center;
  line-height: 50px;
  font-size: 32px;
}

div {
  background-position: center 2rem;
  background-repeat: no-repeat;
  background-size: 90% auto;
}
</style>
