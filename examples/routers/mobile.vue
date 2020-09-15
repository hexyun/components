<template>
  <div class="container" id="container">
    <div class="iframe-box" style="width: 100%; height: 300px">
      <iframe
        src="//daily.digitalexpo.com/silkroadcg3d/panorama/index.html"
        frameborder="0"
        width="100%"
        height="300"
      ></iframe>
    </div>
    <div class="waterfall_wrap">
      <waterfall
        :loading-img="loadingImg"
        :list="list"
        :lang="'zh'"
        :img-size="imgSize"
        :img-width="294"
        :none-data="noneData"
        :gap="12"
        :vertical-gap="10"
        ,
        :type="type"
        :lang-info="langInfo"
        @scroll-bottom="scrollBottom"
        @select-item="selectItem"
        @scroll="scroll"
      ></waterfall>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgSize: {
        live: {
          width: 171,
        },
        static: {
          width: 280,
        },
      },
      loadingImg:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC", // 懒加载图片
      noneData: false,
      list: [],
      langInfo: {
        zh: {
          nostart: "直播未开始",
          doing: "直播进行中",
          over: "直播已结束",
        },
        en: {
          nostart: "Coming Soon",
          doing: "On-going",
          over: "End",
        },
      },
      type: "mobile",
    };
  },
  created() {
    console.log("created");
    this.__time = 0;
    var width = screen.width;
    var columnWidth = (width - 30) / 2 + 0.5;
    this.imgSize = {
      live: { width: columnWidth },
      static: { width: columnWidth },
    };
    console.log(JSON.stringify(this.imgSize, null, 2));
    this.$nextTick(() => {
      document.getElementById("container").style.height =
        window.innerHeight - 200 + "px";
    });
    this.request();
  },
  methods: {
    //  暴露事件方法
    selectNode(node) {
      console.log(node);
    },
    scrollBottom() {
      console.log("scroll bottom");
      this.getWaterfall();
    },
    selectItem(item) {
      console.log("item", item);
    },
    scroll(top) {
      const dom = document.getElementsByTagName("html")[0];
      dom.scrollTop = top;
    },
    change() {
      var self = this;
      this.list = [];
      setTimeout(function () {}, 1000);
    },
    changeNoneData() {
      this.noneData = !this.noneData;
    },
    request() {
      $.post({
        url:
          "https://13000.preview.lowcode.com/flow/api/5ee9d1f0ed52eb2a22750f95",
        data: {},
        dataType: "json",
        success: function (res) {},
      });
    },
    // 抓取数据
    getWaterfall() {
      this.__time += 1;
      const self = this;
      $.post({
        url:
          "https://13000.preview.lowcode.com/flow/api/5ee9d1f0ed52eb2a22750f95",
        data: {
          time: this.__time,
        },
        dataType: "json",
        success: function (res) {
          if (res.data && res.data.list) {
            let list = res.data.list;
            list = list.map((item) => {
              item.src = item.coverUrl;
              item.title = item.goodsName;
              item.exhibition_name = item.ownerName;

              const statusMap = {
                预开始: "nostart",
                进行中: "doing",
                已结束: "done",
              };
              item.status = statusMap[item.bussState];
              item.realPath = "";

              const liveTypes = new Set(["LIVE", "MEETING"]);
              // const liveTypes = new Set();
              item.type = liveTypes.has(item.goodsType) ? "live" : "static";
              item.liveType = item.goodsType;
              // delete item.ImageHeight;
              // delete item.ImageWidth;
              return item;
            });
            if (list && list.length === 0) {
              self.noneData = true;
            }
            self.list = self.list.concat(list);
          }
        },
      });
    },
  },
  ready() {
    this.getWaterfall();

    let time = 0;

    // this.__timer = setInterval(() => {
    //   this.getWaterfall();
    //   time += 1;
    //   if (time >= 5) {
    //     clearInterval(this.__timer);
    //   }
    // }, 1000);
  },
};
</script>
<style lang="less" scoped>
.container {
  height: 667px;
}
iframe {
  display: block;
}
.waterfall_wrap {
  width: 100%;
  height: 100%;
  min-height: 200px;
  padding: 0 6px;
  margin-top: 25px;
  box-sizing: border-box;
}
</style>
