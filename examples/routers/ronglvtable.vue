<template>
  <ronglvtable
    :data-list="dataList"
    @clicktr="clickTr"
    :editor="true"
  ></ronglvtable>
</template>
<script>
export default {
  data() {
    return {
      dataList: [
        [
          {
            name: "证券代码",
            label: "index",
            sort: true,
          },
          {
            name: "融绿一级行业",
            label: "company",
            sort: true,
            width: 200,
          },
          {
            name: "风险类型",
            label: "type",
            width: 200,
          },
          {
            name: "事件概述",
            label: "overview",
            width: 200,
          },
          {
            name: "来源类别",
            label: "source",
            width: 200,
          },
          {
            name: "事件跟踪",
            label: "trace",
            width: 200,
          },
          {
            name: "风险级别",
            label: "level",
            width: 200,
          },
        ],
        [
          {
            overview:
              "因违反环境影响评价制度遭到相关部门罚款10万好的借口撒谎的你的撒娇开裆裤随处可见的事阿看到你健身卡",
            index: "1",
            level: "高",
            time: "2020/06/13",
            company: "房地产",
            type: "环境",
            source: "媒体",
            trace: "有媒体",
            name: "中国平安",
          },
          {
            type: "环境",
            overview:
              "因违反环境影响评价制度遭到相关部门罚款10万妇女节快打死你放假可能的事",
            source: "监管",
            trace: "",
            name: "中国平安",
            index: "2",
            level: "低",
            time: "2020/06/13",
            company: "房地产",
          },
          {
            name: "中国平安",
            index: "3",
            level: "中",
            type: "社会",
            overview:
              "因违反环境影响评价制度遭到相关部门罚款10万大脑神经可能分开几点能吃",
            source: "媒体",
            trace: "",
            time: "2020/06/13",
            company: "房地产",
          },
        ],
      ],
    };
  },
  methods: {
    clickTr(item) {
      console.log(item);
    },
  },
};
</script>
<style lang="less" scoped></style>
