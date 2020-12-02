<!--
 * @Author: yzf
 * @Date: 2020-12-21 10:52:25
 * @LastEditTime: 2020-12-22 10:44:48
 * @LastEditors: yzf
 * @Description: 这是 文件
 * @FilePath: /alex/Volumes/project/hex/components/examples/routers/custom_table.vue
 * @大威天龙,世尊地藏,般若诸佛,般若巴麻空,没有bug
-->
<template>
  <div class="custom_table_wrap">
    <button @click='sortData'>排序</button>
    <button @click='add(1)'>添加列</button>
    <button @click='add(2)'>添加行</button>
    <input type="text" v-model='text'>
    <button @click='setLineHeight'>设置行高</button>
    <customtable
    :data='data'
    :fields='fields'
    :w='w'
    :h='h'
    >
    </customtable>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [],
      fields: [{
        field: 'name',
        width: 100,
        show: true,
        fixed: true,
        type: 'text',
        defaultType: 'text',
        editType: 'inp'
      },{
        field: 'age',
        width: 100,
        show: true,
        fixed: false,
        type: 'text',
        defaultType: 'text',
        editType: 'inp'
      },{
        field: 'job',
        width: 100,
        show: true,
        fixed: true,
        type: 'text',
        defaultType: 'text',
        editType: 'inp'
      },{
        field: 'content',
        width: 100,
        show: true,
        fixed: false,
        type: 'text',
        defaultType: 'text',
        editType: 'inp'
      }],
      w: 1000,
      h: 500,
      // test
      selected: [],
      onoff: false,
      num: 101,
      text: ''
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
          width: 100,
          show: true,
          fixed: this.num % 2 === 0,
          type: 'text'
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
    }
  },
  ready () {
    this.$nextTick(() => {
      setTimeout(()=> {
        for (let i = 0; i < 100; i++) {
          this.data.push({
            id: i,
            height: 30,
            name: `name${i}`,
            age: `age${i}`,
            job: `job${i}`,
            content: `content${i}`
          })
        }
      })
    })
  }
}
</script>

<style>

</style>
