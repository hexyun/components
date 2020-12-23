<!--
 * @Author: yzf
 * @Date: 2020-12-21 10:52:25
 * @LastEditTime: 2020-12-23 18:41:17
 * @LastEditors: yzf
 * @Description: 这是 文件
 * @FilePath: /alex/Volumes/project/hex/components/examples/routers/custom_table.vue
 * @大威天龙,世尊地藏,般若诸佛,般若巴麻空,没有bug
-->
<template>
  <div class="custom_table_wrap">
    <div class='btns'>
      <button @click='sortData'>排序</button>
      <button @click='add(1)'>添加列</button>
      <button @click='add(2)'>添加行</button>
      <input type="text" v-model='text' placeholder='这是输入框'>
      <button @click='clear'>清空输入框</button>
      <button @click='changeShow'>更改显示隐藏,输入框输入字段(name)</button>
      <button @click='setLineHeight'>设置行高,输入框输入数字(20)</button>
      <button @click='setFieldName'>设置字段名,输入框输入字段 字段名(name name1)</button>
      <button @click='setTableSize'>设置表格宽高,输入框输入宽 高(1000 500)</button>
      <button @click='setCheckedData'>修改选中数据,输入框属性 属性值(name namesss)</button>
      <button @click='filterData'>根据条件筛选数据,输入框属性 属性值(name namesss)</button>
    </div>
    <customtable
    v-ref:customtable
    :data='data'
    :fields='fields'
    :w='w'
    :h='h'
    @showfillscreenitem='showFillScreenItem'
    @checkeddatachange='checkeddatachange'
    >
    </customtable>
    <div>
      全屏展示:{{showfillscreenitem && showfillscreenitem.name}}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [],
      allData: [],
      fields: [{
        field: 'name',
        showname: 'name',
        width: 100,
        show: true,
        fixed: true,
        type: 'text',
        editType: 'inp'
      },{
        field: 'age',
        showname: 'age',
        width: 100,
        show: true,
        fixed: false,
        type: 'text',
        editType: 'inp'
      },{
        field: 'job',
        showname: 'job',
        width: 100,
        show: true,
        fixed: false,
        type: 'text',
        editType: 'inp'
      },{
        field: 'content',
        showname: 'content',
        width: 100,
        show: true,
        fixed: false,
        type: 'text',
        editType: 'inp'
      },{
        field: 'value',
        showname: 'value',
        width: 200,
        show: true,
        fixed: false,
        type: 'text',
        editType: 'inp'
      }],
      w: 1000,
      h: 600,
      // test
      selected: [],
      onoff: false,
      num: 101,
      text: '',
      showfillscreenitem: null,
      checkedData: []
    }
  },
  methods: {
    sortData () {
      if (this.onoff) {
        this.data = this.data.sort((a, b) => a.id - b.id)
      } else {
        this.data = this.data.sort((a, b) => b.id - a.id)
      }
      this.onoff =! this.onoff;
    },
    add (type) {
      if (type === 1) {
        this.fields.push({
          field: 'add' + this.num,
          showname: 'add' + this.num,
          width: 100,
          show: true,
          fixed: this.num % 4 === 0,
          type: 'text',
          editType: 'inp'
        })
      } else {
        const i = this.num
        this.data.push({
            id: i,
            height: 30,
            name: `name${i}`,
            age: `age${i}`,
            job: `job${i}`,
            content: `content${i}`,
            value: `value${i}`
          })
      }
      this.num++
    },
    setLineHeight () {
      this.data = this.data.map(item => {
        item.height = (this.text*1)
        return item
      })
    },
    changeShow () {
      const data = this.fields.find(item => item.field === this.text)
      data.show = !data.show
    },
    setFieldName () {
      const field = this.text.split(' ')
      const data = this.fields.find(item => item.field === field[0])
      data.showname = field[1]
    },
    setTableSize () {
      const data = this.text.split(' ')
      this.w = data[0] * 1
      this.h = data[1] * 1
    },
    showFillScreenItem (item) {
      this.showfillscreenitem = item
    },
    checkeddatachange (data) {
      this.checkedData = data
    },
    setCheckedData () {
      const data = this.text.split(' ')
      this.checkedData.forEach(item => item[data[0]] = data[1])
    },
    filterData () {
      if (this.text === '') {
        this.data = this.allData
      } else {
        const data = this.text.split(' ')
        this.data = this.allData.filter(item => item[data[0]] === data[1])
      }
    },
    clear () {
      this.text = ''
    }
  },
  ready () {
    this.$nextTick(() => {
      setTimeout(()=> {
        for (let i = 0; i < 10; i++) {
          this.allData.push({
            id: i,
            height: 30,
            name: `name${i}`,
            age: `age${i}`,
            job: `job${i}`,
            content: `content${i}`,
            value: `value${i}`,
            checked: false
          })
        }
        this.data = this.allData
      })
      // console.log(this.$refs.customtable)
    })
  }
}
</script>

<style lang="less" scoped>
.custom_table_wrap {
  display: flex;
  .btns {
    display: flex;
    flex-direction: column;
    width: 200px;
  }
}
</style>
