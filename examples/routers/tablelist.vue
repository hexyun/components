<template>
  <tablelist
    :table-list="tableList"
    @changestatus="changestatus"
    @clickbtn="clickbtn"
  ></tablelist>
</template>
<script>
export default {
  data() {
    return {
      tableList: [
        [
          {
            name: "编号",
            label: "id",
            width: "50",
            textAlign: "center",
          },
          {
            name: "姓名",
            label: "name",
            width: "150",
            textAlign: "center",
          },
          {
            name: "电话号码",
            label: "number",
            width: "150",
            textAlign: "center",
          },
          {
            name: "家庭住址",
            label: "address",
            width: "250",
            textAlign: "left",
          },
          {
            name: "公开信息",
            label: "public",
            type: "switch",
            width: "100",
            textAlign: "center",
          },
          {
            name: "图片",
            label: "img",
            type: "img",
            width: "100",
            textAlign: "center",
          },
          {
            name: "操作",
            label: "button",
            width: "250",
            textAlign: "center",
          },
        ],
        [
          {
            id: 1,
            name: "小明",
            number: "12432436547",
            address: "内存卡就是对你曾经看",
            button: [
              {
                name: "编辑",
                background: "#598ABE",
                color: "#fff",
                bdcolor: "#598ABE",
                width: "56",
              },
            ],
            public: true,
            img:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603285411715&di=1d5690171c0635309db3644f2d4f4980&imgtype=0&src=http%3A%2F%2Ft8.baidu.com%2Fit%2Fu%3D1484500186%2C1503043093%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1280%26h%3D853",
            tag: {
              show: true,
              text: "推",
              style: {},
            },
          },
          {
            id: 1,
            name: "小明",
            number: "12432436547",
            address:
              "内存卡就是对你曾经看你打开就是你吃亏的就是你曾经就开始吃亏的是你曾经看",
            button: [
              {
                name: "编辑",
                background: "#598ABE",
                color: "#fff",
                bdcolor: "#598ABE",
                width: "56",
              },
            ],
            public: true,
            hsjdhf: "nfkdnvk",
            tag: {
              show: true,
              text: "推",
              style: {},
            },
          },
        ],
      ],
    };
  },
  methods: {
    changestatus(data) {
      // console.log(data, '点击开关');
    },
    clickbtn(data, btn) {
      // console.log(data, btn, '点击按钮');
    },
  },
};
</script>
<style lang="less" scoped>
</style>
