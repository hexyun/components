webpackJsonp([3],{75:function(e,a,n){var t,c,i;!function(n,r){c=[a],t=r,i="function"==typeof t?t.apply(a,c):t,!(void 0!==i&&(e.exports=i))}(this,function(a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default={data:function(){return{eventType:"click",defaultData:[{id:"car_11",name:"车分类"},{id:"car_22",name:"车分类"},{id:"car_31",name:"车分类"}],level:3,list:[{name:"车分类1",id:"car_11",children:[{id:"car_21",name:"车二级分类字数超多11"},{id:"car_22",name:"车二级分类12",children:[{id:"car_31",name:"三级分类121"},{id:"car_32",name:"三级分类122"},{id:"car_33",name:"三级分类123"},{id:"car_34",name:"三级分类124"}]},{id:"car_23",name:"车二级分类字数超多13"},{id:"car_24",name:"车二级分类字数超多14"}]},{name:"车分类2",id:"car_12",children:[{id:"car_222222",name:"车二级分类"}]}]}},methods:{selectNode:function(e,a,n){console.log(e,a,n)},cli:function(){this.list=[{name:"车分类1",id:"car_11",children:[{id:"car_21",name:"车二级分类字数超多11"},{id:"car_22",name:"车二级分类12",children:[{id:"car_31",name:"三级分类121"},{id:"car_32",name:"三级分类122"},{id:"car_33",name:"三级分类123"},{id:"car_34",name:"三级分类124"}]},{id:"car_23",name:"车二级分类字数超多13"},{id:"car_24",name:"车二级分类字数超多14"}]},{name:"车分类2",id:"car_12",children:[{id:"car_222222",name:"车二级分类"}]}]}},ready:function(){this.cli()}},e.exports=a.default})},153:function(e,a){},163:function(e,a){e.exports=" <div class=wrap> <button @click=cli>cli</button> <nav-cate :default-data=defaultData :event-type=eventType :list=list :level=level @select=selectNode></nav-cate> </div> "},173:function(e,a,n){var t,c,i={};n(153),t=n(75),c=n(163),e.exports=t||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;c&&(r.template=c),r.computed||(r.computed={}),Object.keys(i).forEach(function(e){var a=i[e];r.computed[e]=function(){return a}})}});