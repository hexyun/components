<template>
  <div>
    <input type="text"
           :value="selectDate"
           readonly
           @focus="focus">
    <datetimepicker :visible.sync="visible"
                    :default-date="selectDate"
                    :start-date="startDate"
                    :end-date="endDate"
                    @confirm="confirm"
                    @cancel="cancel"></datetimepicker>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selectDate: '2020-08-09 00:30',
      startDate: '2018-01-01',
      endDate: '2020-12-31',
      visible: false
    }
  },
  methods: {
    formatter () {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var date1 = date.getDate();
      var hour = date.getHours();
      var minutes = date.getMinutes();
      if (month < 10) {
        month = `0${month}`;
      }
      if (date1 < 10) {
        data1 = `0${data1}`;
      }
      if (hour < 10) {
        hour = `0${hour}`;
      }
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      return `${year}-${month}-${date1} ${hour}:${minutes}`;
    },
    focus () {
      this.visible = true;
    },
    confirm (date) {
      this.selectDate = date;
    },
    cancel () {

    }
  }
}
</script>
<style lang="less" scoped>
input {
  outline: none;
}
</style>
