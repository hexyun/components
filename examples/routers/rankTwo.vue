<template>
  <div>
    <button @click="init">init</button>
    <ranktwo
      v-ref:ranktwo
      :list="list"
      :default-data="source.defaultData"
      :id="'code'"
      :linkType="'/'"
      :name="'value'"
      :lang="'zh'"
      @select-node="selectNode"
    ></ranktwo>
  </div>
</template>
<script>
export default {
  data() {
    return {
      source: {
        defaultData: [
          {
            "code": "code_2",
            "value": "渠道经销"
          },
          {
            "code": "code_2_1",
            "value": "品牌代理商"
          },

        ],
      },
      list: [{
        "code": "code_1",
        "value": "食品制造/加工"
      },
      {
        "code": "code_2",
        "children": [
          {
            "code": "code_2_1",
            "value": "品牌代理商"
          },
          {
            "code": "code_2_2",
            "value": "分销商"
          },
          {
            "code": "code_2_3",
            "value": "批发商"
          },
          {
            "code": "code_2_4",
            "value": "其他"
          }
        ],
        "value": "渠道经销"
      },
      {
        "code": "code_3",
        "children": [
          {
            "code": "code_3_1",
            "value": "连锁商超"
          },
          {
            "code": "code_3_2",
            "value": "百货公司"
          },
          {
            "code": "code_3_3",
            "value": "社区商店"
          },
          {
            "code": "code_3_4",
            "value": "便利店"
          },
          {
            "code": "code_3_5",
            "value": "新零售"
          },
          {
            "code": "code_3_6",
            "value": "其他"
          }
        ],
        "value": "零售终端"
      },
      {
        "code": "code_4",
        "children": [
          {
            "code": "code_4_1",
            "value": "快餐店"
          },
          {
            "code": "code_4_2",
            "value": "酒店"
          },
          {
            "code": "code_4_3",
            "value": "餐厅/咖啡厅"
          },
          {
            "code": "code_4_4",
            "value": "酒吧"
          },
          {
            "code": "code_4_5",
            "value": "度假村/俱乐部"
          },
          {
            "code": "code_4_6",
            "value": "其他"
          }
        ],
        "value": "餐饮业"
      },
      {
        "code": "code_5",
        "value": "进出口商/贸易公司"
      },
      {
        "code": "code_6",
        "value": "网络电商"
      },
      {
        "code": "code_7",
        "value": "行业协会"
      },
      {
        "code": "code_8",
        "value": "其他"
      }
      ]
    };
  },
  ready() {
    this.init();
  },
  watch: {
    defaultdata(val) {
      console.log(val)
    },
  },
  methods: {
    print() {
      console.log(this.gam);
    },
    //  暴露事件方法
    selectNode(country, province) {
      console.log(country, province)
    },
    getResult() {
      // 返回的国省市
    },
    init() {
      this.$refs.ranktwo.init()
    },
    tes(e) {
      console.log('接受值', e)
      this.gam[0] = xxx
    },
    log() {
      console.log('gam', this.gam)
    }
  }
};
</script>
