<template>
  <div
    id="inputarea"
    contenteditable="true"
    @blur="blur"
    @focus="focus"
    @input="input"
  ></div>
  <!-- <textarea id="inputarea" placeholder="在此输入..."></textarea> -->
</template>

<script>

export default {
  name: "pasteinput",
  props: {
    type: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputarea: null,
    };
  },
  computed: {
    text: function () {
      return '<span class="inputarea_placeholder_setting" style="color: gray;">' + this.placeholder + '</span>'
    }
  },
  methods: {
    initInput() {
      var that = this;
      // 拖拽
      this.inputarea.addEventListener("dragenter", function (e) {
        e.stopPropagation();
        e.preventDefault();
      }, false);

      this.inputarea.addEventListener("dragover", function (e) {
        e.stopPropagation();
        e.preventDefault();
      }, false);

      this.inputarea.addEventListener("drop", function (e) {
        e.stopPropagation();
        e.preventDefault();

        var dt = e.dataTransfer;
        var files = dt.files;

        that.handle("filelists", files);
      }, false);

      // 剪贴板粘贴
      this.inputarea.addEventListener('paste', function (event) {
        // 添加到事件对象中的访问系统剪贴板的接口
        var clipboardData = event.clipboardData, items, item, types;
        if (clipboardData) {
          items = clipboardData.items;
          if (!items) {
            return;
          }
          item = items[0];
          // 保存在剪贴板中的数据类型
          types = clipboardData.types || [];
          for (var i = 0;i < types.length;i++) {
            if (types[i] === 'Files') {
              item = items[i];
              break;
            }
          }
          // 判断是否为图片数据
          if (item && item.kind === 'file' && item.type.match(/^image\//i)) {
            event.preventDefault();
            // 读取该图片          
            var blob = item.getAsFile();
            that.handle("blob", blob);
          }
        }
      });

    },
    handle(type, data) {
      // 处理结果
      if (type === "filelists") {
        var files = data;
        if (files.length > 1) { this.$emit("alert", '每次请拖拽一个对象'); return }
        for (var i = 0;i < files.length;i++) {
          var file = files[i];
          var imageType = /^image\//;
          if (!imageType.test(file.type)) {
            this.$emit("alert", '请拖拽图片对象');
            continue;
          }
          this.handleResult(file);
        }
      } else if (type === "blob") {
        this.handleResult(data);
      }
    },
    handleResult(file) {
      if (this.type === 'image/*' || this.type.match(file.type)) {
        this.$emit("upload", file);
      } else {
        this.$emit("alert", '图片格式错误');
      }
    },
    focus() {
      var oldValue = this.inputarea.innerHTML;
      if (oldValue == this.text) {
        this.inputarea.innerHTML = ''
      }
    },
    // input(e) {
    //   if (!e.data) {
    //     this.inputarea.innerHTML = this.text;
    //   }
    //   // else if (this.inputarea.innerHTML.indexof()) {
    //   //   //   this.inputarea.innerHTML = e.data
    //   // }
    //   console.log(e.data, this.inputarea.innerHTML)
    // },
    blur(a) {
      var newValue = this.inputarea.innerHTML.replace(this.text, '');
      this.$emit("update", newValue);
      if (!newValue) {
        this.inputarea.innerHTML = this.text;
      }
    },
    getText() {
      return $('#inputarea').val()
    },
    setText(text, pic) {
      var html;
      if (pic) {
        html = this.inputarea.innerHTML.replace(this.text, '') + pic;
      } else {
        html = text
      }
      this.inputarea.innerHTML = html;
      setTimeout(() => {
        this.keepLastIndex(this.inputarea);
        $("#inputarea").scrollTop($("#inputarea")[0].scrollHeight);
      }, 5)

    },
    keepLastIndex(obj) {
      if (window.getSelection) { //ie11 10 9 ff safari
        obj.focus(); //解决ff不获取焦点无法定位问题
        var range = window.getSelection(); //创建range
        range.selectAllChildren(obj); //range 选择obj下所有子内容
        range.collapseToEnd(); //光标移至最后
      } else if (document.selection) { //ie10 9 8 7 6 5
        var range = document.selection.createRange(); //创建选择对象
        //var range = document.body.createTextRange();
        range.moveToElementText(obj); //range定位到obj
        range.collapse(false); //光标移至最后
        range.select();
      }
    }
  },
  ready() {
    this.inputarea = document.getElementById("inputarea");
    this.inputarea.innerHTML = this.text;
    this.initInput();
  },
};
</script>

<style lang="less" scoped>
#inputarea {
  height: 100%;
  width: 100%;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  padding: 6px;
  outline: 0;
  overflow-y: scroll;
  img {
    vertical-align: text-bottom;
  }
}
#inputarea:hover {
  border-color: #40a9ff;
  border-right-width: 1px !important;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-thumb {
  border-radius: 1em;
  background-color: rgba(50, 50, 50, 0.3);
}
::-webkit-scrollbar-track {
  border-radius: 1em;
  background-color: rgba(50, 50, 50, 0.1);
}
</style>
