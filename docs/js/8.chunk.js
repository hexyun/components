webpackJsonp([8],{82:function(t,e,i){var n,o,c;!function(i,a){o=[e],n=a,c="function"==typeof n?n.apply(e,o):n,!(void 0!==c&&(t.exports=c))}(this,function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{defaultData:[{name:"中国",id:"china1",type:"country"},{name:"北京",id:"BeiJing1",type:"province"},{name:"朝阳区",id:"district1",type:"city"}],list:[]}},ready:function(){this.list=[{name:"中国",id:"china1",type:"country",children:[{name:"北京",id:"BeiJing1",type:"province",children:[{name:"朝阳区",id:"district1",type:"city"},{name:"昌平区",id:"city",type:"city"},{name:"东城区",id:"city",type:"city"}]},{name:"山东",id:"shandong",type:"province"},{name:"河北",id:"Hebei",type:"province"}]},{name:"美国",id:"USA",type:"country"},{name:"英国",id:"US",type:"country"}]},methods:{selectNode:function(t,e,i){console.log(t,e,i)},getResult:function(){},init:function(){this.$refs.area.init()}}},t.exports=e.default})},187:function(t,e){t.exports=" <div> <button @click=init>init</button> <area v-ref:area :list=list :default-data=defaultData @select-node=selectNode :lang='\"en\"'/> </div> "},206:function(t,e,i){var n,o,c={};n=i(82),o=i(187),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports.default);var a="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;o&&(a.template=o),a.computed||(a.computed={}),Object.keys(c).forEach(function(t){var e=c[t];a.computed[t]=function(){return e}})}});