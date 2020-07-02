<template>
  <div class="content">
    <div class="wrap">
      <imgscroll :imglist='imglist' @select='select'></imgscroll>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imglist: [],
      speed: 40,
      offset: 40
    }
  },
  methods: {
    select (img) {
      console.log(img)
    }
  },
  ready () {
    for (let i = 10; i--;) {
      this.imglist.push({
        src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3716669321,3674639441&fm=26&gp=0.jpg',
        speed: Math.random()* 10,
        offset: 0
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>