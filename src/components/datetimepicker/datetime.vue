<template>
  <div class="date-time"
       @touchstart='start($event)'
       @touchmove='move($event, dataIndex)'
       @touchend='end($event)'>
    <div class="item-mask"></div>
    <div class="item-indicator"></div>
    <div class="item-scroll"
         :style="{transform: transY}">
      <div class="item"
           :data-value="data[selectIndex]"
           v-for="(index,item) in data"
           :key="index">{{ item }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    dataIndex: {
      type: Number
    },
    defaultDate: {
      type: String,
      default: ''
    },
    lastDate: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      currentY: 0,
      currentIndex: undefined,
      startY: 0,
      idx: 0,
      itemHeight: 34,
      selectIndex: 0,
      flag: true,
      lastFlag: false
    }
  },
  computed: {
    domIndex () {
      return this.dataIndex
    },
    transY () {
      if (this.defaultDate && this.flag) {
        this.handle(this.defaultDate);
      }
      if (!this.defaultDate && this.flag) {
        this.handle(this.formatter());
      }

      if (this.lastDate && !this.lastFlag) {
        this.handle(this.lastDate);
      }
      this.selectIndex = this.idx + 2;
      this.$emit('getselectvalue', this.data[this.idx + 2], this.domIndex);
      return `translateY(${-(this.idx * this.itemHeight)}px)`;
    }
  },
  methods: {
    handle (data) {
      var defDate = data.split(' ');
      if (!defDate[1]) {
        defDate[1] = '00:00';
      }
      for (let i = 0; i < this.data.length; i++) {
        for (let j = 0; j < defDate.length; j++) {
          if (this.data[i] === defDate[j]) {
            this.idx = i - 2;
          }
        }
      }
    },
    formatter () {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;    //js从0开始取 
      var date1 = date.getDate();
      if (month < 10) {
        month = `0${month}`;
      }
      if (date1 < 10) {
        data1 = `0${data1}`;
      }
      return `${year}-${month}-${date1} 00:00`;
    },
    start (e) {
      this.flag = false;
      this.lastFlag = true;
      if (this.idx) {
        this.currentIndex = this.idx;
      }
      this.currentY = e.touches[0].clientY;
    },
    move (e, index) {
      var scrollEl = document.getElementsByClassName('item-scroll');
      var scrollItemNumber = scrollEl[index].getElementsByClassName('item').length;
      var elHeight = scrollEl[index].clientHeight;
      var dVal = this.currentY - e.touches[0].clientY;
      if (dVal > 0) {
        // 向下
        if (this.currentIndex) {
          this.idx = this.currentIndex + Math.ceil(dVal / this.itemHeight);
          if (this.idx * this.itemHeight + 102 > elHeight) {
            this.idx = scrollItemNumber - 3;
          }
        } else {
          this.idx = Math.ceil(dVal / this.itemHeight);
          if (this.idx * this.itemHeight + 102 > elHeight) {
            this.idx = scrollItemNumber - 3;
          }
        }
      }
      if (dVal < 0) {
        // 向上
        if (this.currentIndex) {
          this.idx = this.currentIndex + Math.ceil(dVal / this.itemHeight);
          if (-(this.idx * this.itemHeight) > 68) {
            this.idx = -2;
          }
        } else {
          this.idx = Math.ceil(dVal / this.itemHeight);
          if (-(this.idx * this.itemHeight) > 68) {
            this.idx = -2;
          }
        }
      }
      this.selectIndex = this.idx + 2;
      this.getSelectValue(this.selectIndex, index)
      this.lastFlag = false;
    },
    getSelectValue (selectIndex, index) {
      var data = document.getElementsByClassName('item-scroll')[index].getElementsByClassName('item')[selectIndex].getAttribute('data-value');
      this.$emit('getselectvalue', data, index);
    },
    end (e) {
    }
  }
}
</script>
<style lang="less" scoped>
.date-time {
  position: relative;
  height: 170px;
  overflow: hidden;
  width: 100%;
  z-index: 3000;
  .item-mask {
    border-radius: 10px 10px 0 0;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    margin: 0 auto;
    width: 100%;
    transform: translateZ(0px);
    z-index: 3;
    background-image: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.95),
        rgba(255, 255, 255, 0.6)
      ),
      linear-gradient(
        to top,
        rgba(255, 255, 255, 0.95),
        rgba(255, 255, 255, 0.6)
      );
    background-position: top, bottom;
    background-size: 100% 68px;
    background-repeat: no-repeat;
  }
  .item-indicator {
    width: 100%;
    height: 34px;
    position: absolute;
    left: 0;
    top: 68px;
    z-index: 3;
    background-image: -webkit-linear-gradient(
        top,
        #d0d0d0,
        #d0d0d0,
        transparent,
        transparent
      ),
      -webkit-linear-gradient(bottom, #d0d0d0, #d0d0d0, transparent, transparent);
    background-image: linear-gradient(
        to bottom,
        #d0d0d0,
        #d0d0d0,
        transparent,
        transparent
      ),
      linear-gradient(to top, #d0d0d0, #d0d0d0, transparent, transparent);
    background-position: top, bottom;
    background-size: 100% 1px;
    background-repeat: no-repeat;
  }
  .item-scroll {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1;
    .item {
      text-align: center;
      font-size: 16px;
      height: 34px;
      line-height: 34px;
      color: #000;
    }
  }
}
</style>
