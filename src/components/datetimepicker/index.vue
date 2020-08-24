<template>
  <div class="date-time-picker">
    <div :class="{'date-time-mask':visible}"
         @click="cancel"></div>
    <div class="date-time-dialog"
         :class="{'date-time-dialog-show':visible}">
      <div class="date-time-content">
        <date-time class="date-time-list"
                   v-for="(index,item) in dateList"
                   :key="index"
                   :data="item"
                   :data-index="index"
                   :default-date="defaultDate"
                   :last-date="lastDate"
                   @getselectvalue="getselectvalue"></date-time>
      </div>
      <div class="date-time-btn">
        <div class="cancel"
             @click="cancel">取消</div>
        <p style="margin: 0 36px;"></p>
        <div class="confirm"
             @click="confirm">确认</div>
      </div>
    </div>
  </div>
</template>
<script>
import DateTime from './datetime'
export default {
  components: {
    DateTime
  },
  props: {
    // 是否显示
    visible: {
      type: Boolean,
      default: false
    },
    // 默认的日期
    defaultDate: {
      type: String,
      default: ''
    },
    startDate: {
      type: String,
      default: ''
    },
    endDate: {
      type: String,
      default: ''
    }
  },
  computed: {
    dateList () {
      var arr = [];
      arr.push(this.getBetweenDateStr(this.startDate, this.endDate));
      arr.push(this.getTimeArr());
      return arr;
    }
  },
  data () {
    return {
      seletedData: '',
      seletedDate: '',
      seletedTime: '',
      lastDate: ''
    }
  },
  methods: {
    getBetweenDateStr (start, end) {
      var result = [];
      var beginDay = start.split("-");
      var endDay = end.split("-");
      var diffDay = new Date();
      var dateList = new Array;
      var i = 0;
      diffDay.setDate(beginDay[2]);
      diffDay.setMonth(beginDay[1] - 1);
      diffDay.setFullYear(beginDay[0]);
      result.push(start);
      while (i == 0) {
        var countDay = diffDay.getTime() + 24 * 60 * 60 * 1000;
        diffDay.setTime(countDay);
        dateList[2] = diffDay.getDate();
        dateList[1] = diffDay.getMonth() + 1;
        dateList[0] = diffDay.getFullYear();
        if (String(dateList[1]).length == 1) { dateList[1] = "0" + dateList[1] };
        if (String(dateList[2]).length == 1) { dateList[2] = "0" + dateList[2] };
        result.push(dateList[0] + "-" + dateList[1] + "-" + dateList[2]);
        if (dateList[0] == endDay[0] && dateList[1] == endDay[1] && dateList[2] == endDay[2]) {          i = 1;
        }
      };
      return result;
    },
    getTimeArr () {
      var arr = [], time = ['00', '30'];
      for (var i = 0; i < 24; i++) {
        if (i < 10) {
          i = '0' + i;
        }
        for (var j = 0; j < time.length; j++) {
          arr.push(i + ':' + time[j])
        }
      }
      return arr;
    },
    getselectvalue (data, index) {
      if (index === 0) {
        this.seletedDate = data
      }
      if (index === 1) {
        this.seletedTime = data
      }
      this.lastDate = ''
    },
    cancel () {
      if (this.seletedData) {
        this.lastDate = this.seletedData;
      } else {
        this.lastDate = this.defaultDate;
      }
      this.visible = false;
      this.$emit('cancel');
    },
    confirm () {
      this.seletedData = `${this.seletedDate} ${this.seletedTime}`;
      this.visible = false;
      this.$emit('confirm', this.seletedData);
    }
  }
}
</script>
<style lang="less" scoped>
.date-time-mask {
  height: 100%;
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
.date-time-dialog {
  transform-style: preserve-3d;
  border-radius: 8px 8px 0 0;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  transition: all 0.3s ease;
  transform: translateY(100%);
  z-index: 3000;
}
.date-time-content {
  display: flex;
  width: 100%;
  align-items: center;
  padding: 10px 0;
  .date-time-list {
    flex: 1;
    text-align: center;
  }
}
.date-time-btn {
  display: flex;
  padding: 6px 36px 16px;
  justify-content: space-evenly;
  position: relative;
  z-index: 100000;
  transform: translateZ(100000px);
  cursor: pointer;
  div {
    flex: 1;
    font-size: 12px;
    padding: 4px 24px;
    border: 1px solid #eee;
    border-radius: 4px;
    text-align: center;
  }
  .cancel {
    background: #eee;
    color: #48b477;
  }
  .confirm {
    background: #48b477;
    color: #fff;
  }
}
.date-time-dialog-show {
  transform: translateY(0);
}
</style>
