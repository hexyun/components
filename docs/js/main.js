webpackJsonp([5],{0:function(e,t,i){var s,n,o;!function(c,r){n=[i(53),i(52),i(169),i(83)],s=r,o="function"==typeof s?s.apply(t,n):s,!(void 0!==o&&(e.exports=o))}(this,function(e,t,s,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var c=o(e),r=o(t),l=o(s),a=o(n);c.default.use(r.default),c.default.use(a.default),c.default.config.debug=!0;var d=new r.default;d.map({"/waterfall":{component:function(e){i.e(1,function(t){var i=[t(173)];e.apply(null,i)}.bind(this))}},"/navcate":{component:function(e){i.e(3,function(t){var i=[t(171)];e.apply(null,i)}.bind(this))}},"/area":{component:function(e){i.e(4,function(t){var i=[t(170)];e.apply(null,i)}.bind(this))}},"/timeline":{component:function(e){i.e(2,function(t){var i=[t(172)];e.apply(null,i)}.bind(this))}}}),d.beforeEach(function(){window.scrollTo(0,0)}),d.afterEach(function(e){}),d.redirect({"*":"/timeline"}),d.start(l.default,"#app")})},29:function(e,t,i){var s,n,o;!function(i,c){n=[t],s=c,o="function"==typeof s?s.apply(t,n):s,!(void 0!==o&&(e.exports=o))}(this,function(t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={bind:function(){var e=this,t=(new Date).getTime();this.documentHandler=function(i){return!e.el.contains(i.target)&&void(e.expression&&(new Date).getTime()-t>200&&(e.vm[e.expression](),t=Date.now()))},document.addEventListener("click",this.documentHandler)},update:function(){},unbind:function(){document.removeEventListener("click",this.documentHandler)}},e.exports=t.default})},30:function(e,t,i){e.exports={default:i(94),__esModule:!0}},73:function(e,t,i){var s,n,o;!function(i,c){n=[t],s=c,o="function"==typeof s?s.apply(t,n):s,!(void 0!==o&&(e.exports=o))}(this,function(t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{}},ready:function(){},beforeDestroy:function(){},methods:{}},e.exports=t.default})},78:function(e,t,i){var s,n,o;!function(c,r){n=[t,i(30),i(14),i(29)],s=r,o="function"==typeof s?s.apply(t,n):s,!(void 0!==o&&(e.exports=o))}(this,function(t,i,s,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var c=o(i),r=o(s),l=o(n);t.default={name:"area",directives:{clickOutSide:l.default},props:{defaultData:{type:Array,default:function(){return[]}},inputWidth:{type:String,default:"468px"},list:{type:Array,default:function(){return[]}},lang:{type:String,default:"zh"},langInfo:{type:Object,default:function(){return{zh:{none:"请选择地区",contries:"国家列表",provinces:"省份列表",cities:"市级列表"},en:{none:"please select area",contries:"contries",provinces:"provinces",cities:"cities"}}}}},data:function(){return{show:!1,contries:[],provinces:[],cities:[],current:{country:{},province:{},city:{}}}},watch:{list:{deep:!0,handler:function(){this.init()}}},computed:{selectText:function(){return(this.current.country.name||"")+(this.current.province.name||"")+(this.current.city.name||"")}},ready:function(){this.init()},methods:{t:function(e){for(var t=this.langInfo[this.lang]||{},i=e.split("."),s=t,n=void 0,o=0;o<i.length;o++)n=i[o],n&&"object"===("undefined"==typeof s?"undefined":(0,r.default)(s))&&(s=s[n]);return s||""},init:function(){this.setContries(this.list),this.setDefaultData()},setDefaultData:function(){if(this.defaultData.length<=0)return!1;var e=this.defaultData,t=e[0].id||-1,i=this.setSelected(this.list,t);if(i>-1){this.selectNode("country",i,"init");var s=this.contries[i];if(e[1]&&s.children){var n=e[1].id||-1,o=this.setSelected(s.children,n);o>-1&&this.selectNode("province",o,"init");var c=s.children[o];if(e[2]&&c.children){var r=e[2].id||-1,l=this.setSelected(c.children,r);l>-1&&this.selectNode("city",l,"init")}}}},setSelected:function(e,t){var i=-1;return e.forEach(function(e,s){e.id===t&&(i=s)}),i},setContries:function(e){this.contries=e},setProvinces:function(e,t){this.cities=[],this.provinces=t},setCities:function(e,t){this.cities=t},selectNode:function(e,t,i){var s={};"country"===e?(s=this.contries[t],this.clearContries(),this.clearProvinces(),this.clearCities(),this.contries.$set(t,(0,c.default)({},s,{selected:!0})),this.setProvinces(s.id,s.children),this.current.province={},this.current.city={},"init"!==i&&this.$emit("select-node",s)):"province"===e?(s=this.provinces[t],this.clearProvinces(),this.provinces.$set(t,(0,c.default)({},s,{selected:!0})),this.setCities(s.id,s.children),this.current.city={},"init"!==i&&this.$emit("select-node",this.current.country,s)):"city"===e&&(s=this.cities[t],this.cities.$set(t,(0,c.default)({},s,{selected:!0})),"init"!==i&&(this.$emit("select-node",this.current.country,this.current.province,s),this.reset()),this.show=!1),this.current[e]=s},clearContries:function(){var e=this;this.contries&&this.contries.forEach(function(t,i){t.selected=!1,e.contries.$set(i,t)})},clearProvinces:function(){var e=this;this.provinces&&this.provinces.forEach(function(t,i){t.selected=!1,e.provinces.$set(i,t)})},clearCities:function(){var e=this;this.cities&&this.cities.forEach(function(t,i){t.selected=!1,e.cities.$set(i,t)})},reset:function(){this.clearContries(),this.clearProvinces(),this.clearCities(),this.provinces=[],this.cities=[]},hiddenMenu:function(){this.show=!1,this.reset()}}},e.exports=t.default})},79:function(e,t,i){var s,n,o;!function(c,r){n=[t,i(30),i(29)],s=r,o="function"==typeof s?s.apply(t,n):s,!(void 0!==o&&(e.exports=o))}(this,function(t,i,s){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(i),c=n(s);t.default={name:"navCate",directives:{clickOutSide:c.default},props:{defaultData:{type:Array,default:function(){return[]}},list:{type:Array,default:function(){return[]}},level:{type:Number,default:1},eventType:{type:String,default:"click"}},data:function(){return{selectedFirst:!0,secondList:[],firstMenu:{},secMenu:{},thiMenu:{}}},filters:{subStringName:function(e){return e.length>6?e.substring(0,6)+"...":e}},computed:{},ready:function(){this.init()},methods:{init:function(){var e=this;this.list.forEach(function(t,i){e.list.$set(i,(0,o.default)({},t,{selected:!1}))}),this.setDefaultData()},setDefaultData:function(){if(this.defaultData.length<=0)return!1;var e=this.defaultData,t=e[0].id||-1,i=this.setSelected(this.list,t);if(i>-1){this.selectFirstMenu(this.eventType,this.list[i],i);var s=this.list[i];if(e[1]&&s.children){var n=e[1].id||-1,o=this.setSelected(s.children,n);this.secMenu=e[1];var c=s.children[o];if(e[2]&&c.children){var r=e[2].id||-1;this.setSelected(c.children,r),this.thiMenu=e[2]}}}},setSelected:function(e,t){var i=-1;return e.forEach(function(s,n){s.id===t&&(e.$set(n,(0,o.default)({},s,{selected:!0})),i=n)}),i},selectFirstMenu:function(e,t,i){if(e!=this.eventType)return!1;this.reset(),this.selectedFirst=!0,this.firstMenu=t;var s=this.list[i];s.selected=!0,this.list.$set(i,s),this.secondList=s.children},selectLinkMenu:function(e,t){t?(this.secMenu=t,this.thiMenu=e):this.secMenu=e,1===t&&(this.firstMenu=e),e.selected=!0,this.$emit("select",e,t,this.firstMenu),this.reset()},reset:function(){var e=this,t=this.list;t.forEach(function(t,i){t.selected=!1,e.list.$set(i,t)})},mouseLeave:function(){"hover"===this.eventType&&this.reset()},hiddenMenu:function(){this.$emit("clickoutside"),this.reset()}}},e.exports=t.default})},80:function(e,t,i){var s,n,o;!function(c,r){n=[t,i(14)],s=r,o="function"==typeof s?s.apply(t,n):s,!(void 0!==o&&(e.exports=o))}(this,function(t,i){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=s(i);t.default={name:"timeline",props:{data:{type:Array,default:function(){return[]}},lang:{type:String,default:"zh"},langInfo:{type:Object,default:function(){return{zh:{time:"时间",theme:"主题",type:"类型",people:"主要人员",selece:"操作",watch:"查看"},en:{time:"time",theme:"theme",type:"type",people:"members",selece:"handle",watch:"see"}}}}},data:function(){return{}},methods:{t:function(e){for(var t=this.langInfo[this.lang]||{},i=e.split("."),s=t,o=void 0,c=0;c<i.length;c++)o=i[c],o&&"object"===("undefined"==typeof s?"undefined":(0,n.default)(s))&&(s=s[o]);return s||""},select:function(e){this.$emit("select",e)}}},e.exports=t.default})},81:function(e,t,i){var s,n,o;!function(c,r){n=[t,i(29),i(178)],s=r,o="function"==typeof s?s.apply(t,n):s,!(void 0!==o&&(e.exports=o))}(this,function(t,i,s){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(i),c=n(s);t.default={name:"waterfall",components:{vueWaterfall:c.default},directives:{clickOutSide:o.default},props:{list:{type:Array,default:function(){return[]}},loadingImg:{type:String,default:""},lang:{type:String,default:"zh"},langInfo:{type:Object,default:function(){return{zh:{nostart:"未开始",doing:"进行中",over:"结束"},en:{nostart:"nostart",doing:"doing",over:"over"}}}},domId:{type:String}},data:function(){return{}},watch:{},computed:{},ready:function(){this.init()},methods:{init:function(){},scrollBottom:function(){this.$emit("scroll-bottom")},selectItem:function(e,t){this.$emit("select-item",t)}}},e.exports=t.default})},82:function(e,t,i){var s,n,o;!function(c,r){n=[t,i(14)],s=r,o="function"==typeof s?s.apply(t,n):s,!(void 0!==o&&(e.exports=o))}(this,function(t,i){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=s(i);t.default={name:"vue-waterfall-easy",props:{width:{type:Number},height:{type:[Number,String]},reachBottomDistance:{type:Number,default:20},loadingDotCount:{type:Number,default:3},loadingDotStyle:{type:Object},loadingImg:{type:String,default:""},gap:{type:Number,default:20},mobileGap:{type:Number,default:8},maxCols:{type:Number,default:5},imgsArr:{type:Array,required:!0},srcKey:{type:String,default:"src"},hrefKey:{type:String,default:"href"},imgWidth:{type:Number,default:240},isRouterLink:{type:Boolean,default:!1},linkRange:{type:String,default:"card"},loadingTimeOut:{type:Number,default:500},cardAnimationClass:{type:[String],default:"default-card-animation"},enablePullDownEvent:{type:Boolean,default:!1},lang:{type:String,default:"zh"},langInfo:{type:Object},domId:{type:String}},data:function(){return{msg:"this is from vue-waterfall-easy.vue",isMobile:!!navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i),isPreloading:!0,isPreloading_c:!0,imgsArr_c:[],loadedCount:0,cols:NaN,imgBoxEls:null,beginIndex:0,colsHeightArr:[],LoadingTimer:null,isFirstLoad:!0,over:!1,scrollEl:null}},computed:{colWidth:function(){return this.imgWidth+this.gap},imgWidth_c:function(){return this.isMobile?window.innerWidth/2-this.mobileGap:this.imgWidth},hasLoadingSlot:function(){return!!this.$scopedSlots.loading}},ready:function(){var e=this;if(this.bindClickEvent(),this.loadingMiddle(),this.preload(),this.cols=this.calcuCols(),this.$on("preloaded",function(){e.isFirstLoad=!1,e.imgsArr_c=e.imgsArr.concat([]),e.$nextTick(function(){e.isPreloading=!1,e.imgBoxEls=e.$el.getElementsByClassName("img-box"),e.waterfall()})}),this.isMobile||this.width||window.addEventListener("resize",this.response),this.isMobile&&this.enablePullDownEvent&&this.pullDown(),this.scroll(),this.domId){var t=this;this.$nextTick(function(){var i=document.querySelector(e.domId);i.onscroll=function(){i.scrollHeight-i.scrollTop-i.clientHeight<=0&&t.$emit("scroll-bottom")}})}},beforeDestroy:function(){window.removeEventListener("resize",this.response)},watch:{isPreloading:function(e,t){var i=this;e?setTimeout(function(){i.isPreloading&&(i.isPreloading_c=!0)},this.loadingTimeOut):this.isPreloading_c=!1},imgsArr:function(e,t){(this.imgsArr_c.length>e.length||this.imgsArr_c.length>0&&e[0]&&!e[0]._height)&&this.reset(),this.preload()}},methods:{t:function(e){for(var t=this.langInfo[this.lang]||{},i=e.split("."),s=t,o=void 0,c=0;c<i.length;c++)o=i[c],o&&"object"===("undefined"==typeof s?"undefined":(0,n.default)(s))&&(s=s[o]);return s||""},preload:function(e,t){var i=this;this.imgsArr.forEach(function(e,t){if(!(t<i.loadedCount)){if(i.imgsArr[t].realPath=i.loadingImg,!e[i.srcKey])return i.imgsArr[t]._height="0",i.loadedCount++,void(i.loadedCount==i.imgsArr.length&&i.$emit("preloaded"));var s=new Image;s.src=e[i.srcKey],s.onload=s.onerror=function(n){i.loadedCount++,i.imgsArr[t]._height="load"==n.type?Math.round(i.imgWidth_c/(s.width/s.height)):i.isMobile?i.imgWidth_c:i.imgWidth,"error"==n.type&&(i.imgsArr[t]._error=!0,i.$emit("imgError",i.imgsArr[t])),i.loadedCount==i.imgsArr.length&&i.$emit("preloaded"),i.imgsArr[t].realPath=e[i.srcKey]}}})},calcuCols:function(){var e=this.width?this.width:window.innerWidth,t=parseInt(e/this.colWidth);return t=0===t?1:t,this.isMobile?2:t>this.maxCols?this.maxCols:t},waterfall:function(){if(this.imgBoxEls){var e,t,i,s=this.isMobile?this.imgBoxEls[0].offsetWidth:this.colWidth;0==this.beginIndex&&(this.colsHeightArr=[]);for(var n=this.beginIndex;n<this.imgsArr.length;n++){if(!this.imgBoxEls[n])return;if(i=this.imgBoxEls[n].offsetHeight,n<this.cols)this.colsHeightArr.push(i),e=0,t=n*s;else{var o=Math.min.apply(null,this.colsHeightArr),c=this.colsHeightArr.indexOf(o);e=o,t=c*s,this.colsHeightArr[c]=o+i}this.imgBoxEls[n].style.left=t+"px",this.imgBoxEls[n].style.top=e+"px"}this.beginIndex=this.imgsArr.length}},response:function(){var e=this.cols;this.cols=this.calcuCols(),e!==this.cols&&(this.beginIndex=0,this.waterfall(),this.over&&this.setOverTipPos())},scrollFn:function(){if(!this.domId){var e=this.scrollEl;if(this.isPreloading)return;var t=Math.min.apply(null,this.colsHeightArr);e.scrollTop+e.offsetHeight>t-this.reachBottomDistance&&(this.isPreloading=!0,this.$emit("scroll-bottom"))}},scroll:function(){this.scrollEl.addEventListener("scroll",this.scrollFn)},waterfallOver:function(){this.scrollEl.removeEventListener("scroll",this.scrollFn),this.isPreloading=!1,this.over=!0,this.setOverTipPos()},setOverTipPos:function(){var e=this,t=Math.max.apply(null,this.colsHeightArr);this.$nextTick(function(){e.$refs.over.style.top=t+"px"})},bindClickEvent:function(){var e=this;this.$el.querySelector(".vue-waterfall-easy").addEventListener("click",function(t){var i=t.target;if(t.target.className.indexOf("over")===-1&&i.className.indexOf("img-box")==-1){for(;i.className.indexOf("img-inner-box")==-1;)i=i.parentNode;var s=i.getAttribute("data-index");e.$emit("select-item",t,e.imgsArr_c[s])}})},pullDown:function(){var e,t=this,i=this.$el.querySelector(".vue-waterfall-easy-scroll");i.addEventListener("touchmove",function(s){if(0===i.scrollTop){var n=s.changedTouches[0];e||(e=n.pageY);var o=n.pageY-e;o>0&&s.preventDefault(),t.$emit("pullDownMove",o)}}),i.addEventListener("touchend",function(s){0===i.scrollTop&&(e=NaN,t.$emit("pullDownEnd"))})},loadingMiddle:function(){var e=this.scrollEl=this.$el.querySelector(".vue-waterfall-easy-scroll"),t=e.offsetWidth-e.clientWidth;this.$el.querySelector(".loading").style.marginLeft=-t/2+"px"},reset:function(){this.imgsArr_c=[],this.beginIndex=0,this.loadedCount=0,this.isFirstLoad=!0,this.isPreloading=!0,this.scroll(),this.over=!1}}},e.exports=t.default})},83:function(e,t,i){var s,n,o;!function(c,r){n=[e,i(30),i(31),i(175),i(177),i(174),i(176)],s=r,o="function"==typeof s?s.apply(t,n):s,!(void 0!==o&&(e.exports=o))}(this,function(e,t,i,s,n,o,c){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var l=r(t),a=r(i),d=r(s),u=r(n),f=r(o),v=r(c),h={navCate:d.default,waterfall:u.default,area:f.default,timeline:v.default},p=function(e){arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};(0,a.default)(h).forEach(function(t){e.component(h[t].name||t,h[t])})};"undefined"!=typeof window&&window.Vue&&p(window.Vue),e.exports=(0,l.default)(h,{install:p})})},94:function(e,t,i){i(132),e.exports=i(1).Object.assign},123:function(e,t,i){"use strict";var s=i(5),n=i(20),o=i(40),c=i(26),r=i(23),l=i(37),a=Object.assign;e.exports=!a||i(11)(function(){var e={},t={},i=Symbol(),s="abcdefghijklmnopqrst";return e[i]=7,s.split("").forEach(function(e){t[e]=e}),7!=a({},e)[i]||Object.keys(a({},t)).join("")!=s})?function(e,t){for(var i=r(e),a=arguments.length,d=1,u=o.f,f=c.f;a>d;)for(var v,h=l(arguments[d++]),p=u?n(h).concat(u(h)):n(h),m=p.length,g=0;m>g;)v=p[g++],s&&!f.call(h,v)||(i[v]=h[v]);return i}:a},132:function(e,t,i){var s=i(3);s(s.S+s.F,"Object",{assign:i(123)})},151:function(e,t){},153:function(e,t){},154:function(e,t){},155:function(e,t){},156:function(e,t){},157:function(e,t){},158:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAMAAACfBSJ0AAAA51BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9aq4iyAAAATXRSTlMAAQMEBQYJCwwNDhAREhMUFhkbHyAiJSYsLTAxNTc4OT4/SktMT1BSVVZXY2Vqa3Bydnd9foCDhIWHiImMjZGSlZaam5yen6Gio6SlprIytNEAAAG8SURBVEjHtZbbWoJAFIVXWWpJhZWlZVpJJnRAzYK0AyYkTfP+z9NFWuIc4at1ifPLDHvN3gvgqFC33WEQkSgYuU69CC2VLI/QRRHfMpRUpZuEZmi3IqXKPSpSryykcp2YihXbOT5melQuz+Rh1ZCqFFZZrBFTteIGgxGqI9Jc2mRM9RQntmqGVFfhwsfJeVRf3m85OjSNOj8uiVNx8dw5PZpOvZmVmR/G9x9S8Nvk3eXHwzx2+zKuCwAGU/E2ABw/S6pvALCYxxYAYLUlLqoFwBdwwOa1yHweUCBCDtgfCDZaQJ1KOKDxygXrcOQc1i/fOZwDV8EBW7efzBIXIyUHHDK+HyHQ4LByNk4uCRDpcMDOW2JJBKLHIWk8ovu+7eX36Z3vlDnfUIM7eGC/p7p+xg2vfraCW2tHXL8o/HnyIvCn9D7s3QnuQxHwhNzGlej++QBaovt+PpHe9xLzpxcAcPSk6C9sP3vMywb2vJ9x+mcw0Omfqft1fz4fptnmQ8p5ZGebf/5CHDEnmeZtmvle+5M8oZtfmpy8pD5jWMuUz3xTlAenWfKgPH/2y/+QdwHAyJSvZ3necUfyPP8F7MRpihpYSdoAAAAASUVORK5CYII="},159:function(e,t){e.exports=" <router-view></router-view> "},164:function(e,t){e.exports=' <div :class="{\'hex-area\':true}" :style={width:inputWidth} v-click-out-side=hiddenMenu> <div class=area-input @click="show=!show"> <input type=text :placeholder="t(\'none\')" disabled=disabled :value=selectText /> <svg t=1590251416183 class=icon viewBox="0 0 1024 1024" version=1.1 xmlns=http://www.w3.org/2000/svg p-id=2845 width=52 height=52 :class="{\'trans\':show}"> <path d="M529.808696 614.4c-11.130435 11.130435-26.713043 11.130435-35.617392 0L178.086957 291.617391c-22.26087-22.26087-55.652174-24.486957-75.686957-6.678261-17.808696 15.582609-17.808696 51.2 8.904348 75.686957L476.382609 734.608696c22.26087 22.26087 55.652174 22.26087 75.686956 0l365.078261-371.756522c22.26087-22.26087 24.486957-55.652174 6.678261-75.686957-17.808696-17.808696-55.652174-17.808696-75.686957 6.678261L529.808696 614.4" fill=#BFBFBF p-id=2846 />s </svg> </div> <div :class="{\'area-select\':true,\'show\':show}"> <div class=section> <div class=title>{{t(\'contries\')}}</div> <div class="content common-scrollbar"> <div class=content-scroll> <div v-for="item in contries" :key=item.id track-by=$index :class="{\'item\':true,\'selected\':item.selected}" @click="selectNode(\'country\',$index)"> <a href=javascript:;>{{item.name}}</a> </div> </div> </div> </div> <div class=section> <div class=title>{{t(\'provinces\')}}</div> <div class="content common-scrollbar"> <div class=content-scroll> <div v-for="item in provinces" :key=item.id track-by=$index :class="{\'item\':true,\'selected\':item.selected}" @click="selectNode(\'province\',$index)"> <a href=javascript:;>{{item.name}}</a> </div> </div> </div> </div> <div class=section> <div class=title>{{t(\'cities\')}}</div> <div class="content common-scrollbar"> <div class=content-scroll> <div v-for="item in cities" :key=item.id track-by=$index :class="{\'item\':true,\'selected\':item.selected}" @click="selectNode(\'city\',$index)"> <a href=javascript:;>{{item.name}}</a> </div> </div> </div> </div> </div> </div> '},165:function(e,t){e.exports=" <div class=hex-waterfall> <vue-waterfall :imgs-arr=list @scroll-bottom=scrollBottom @select-item=selectItem :gap=14 :max-cols=4 :loading-img=loadingImg :lang=lang :lang-info=langInfo :dom-id=domId> </vue-waterfall> </div> "},166:function(e,t){e.exports=' <div class=hex-cate @mouseleave=mouseLeave v-click-out-side=hiddenMenu :class="{&quot;oh&quot;:level!==1,&quot;sd&quot;:selectedFirst,&quot;onlyOne&quot;:level===1}" _v-0416fcdd=""> <template v-if="level===1"> <div class="first-menu common-scrollbar" _v-0416fcdd=""> <a href=javascript:; v-for="item in list" :key=item.id track-by=$index @click="selectLinkMenu(item, 1)" class=menu-item :class="{\'menu-item\':true,\'selected\':firstMenu.id === item.id}" _v-0416fcdd="">{{item.name | subStringName}}</a> </div> </template> <template v-if="level===2"> <div class="first-menu common-scrollbar" _v-0416fcdd=""> <a href=javascript:; v-for="item in list" :key=item.id track-by=$index @click="selectFirstMenu(\'click\',item,$index)" @mouseover="selectFirstMenu(\'hover\',item,$index)" :class="{\'menu-item\':true,\'selected\':firstMenu.id === item.id}" _v-0416fcdd="">{{item.name | subStringName}}</a> </div> <div class="second-menu common-scrollbar" v-if=selectedFirst _v-0416fcdd=""> <div class=menu-content _v-0416fcdd=""> <a href=javascript:; :class="{\'menu-item\':true,\'selected\':secMenu.id === item.id}" v-for="item in secondList" :key=item.id track-by=$index @click=selectLinkMenu(item) _v-0416fcdd="">{{item.name | subStringName}}</a> </div> </div> </template> <template v-if="level===3"> <div class="first-menu common-scrollbar" _v-0416fcdd=""> <a href=javascript:; v-for="item in list" :key=item.id track-by=$index @click="selectFirstMenu(\'click\',item,$index)" @mouseover="selectFirstMenu(\'hover\',item,$index)" :class="{\'menu-item\':true,\'selected\':firstMenu.id === item.id}" _v-0416fcdd="">{{item.name | subStringName}}</a> </div> <div class="third-menu common-scrollbar" v-if=selectedFirst _v-0416fcdd=""> <div class=menu-content _v-0416fcdd=""> <div class=third-item v-for="second in secondList" :key=second.id track-by=$index _v-0416fcdd=""> <div class=title _v-0416fcdd=""> <span class=name-content _v-0416fcdd="">{{second.name}}</span>: </div> <div class=list _v-0416fcdd=""> <a href=javascript:; v-for="item in second.children" :key=item.id track-by=$index :class="{\'menu-item\':true,\'selected\':thiMenu.id ===item.id}" @click="selectLinkMenu(item, second)" _v-0416fcdd="">{{item.name | subStringName}}</a> </div> </div> </div> </div> </template> </div> '},167:function(e,t){e.exports=' <div class=ali_time_line _v-06ed86cc=""> <div class=ali_time_line_head _v-06ed86cc=""> <div class="items time" _v-06ed86cc=""> {{t(\'time\')}} </div> <div class="items line_wrap" _v-06ed86cc=""></div> <div class="items theme" _v-06ed86cc=""> {{t(\'theme\')}} </div> <div class="items type" _v-06ed86cc=""> {{t(\'type\')}} </div> <div class="items people" _v-06ed86cc=""> {{t(\'people\')}} </div> <div class="items select" _v-06ed86cc=""> {{t(\'select\')}} </div> </div> <div class=ali_time_line_item_wrap _v-06ed86cc=""> <div class=ali_time_line_item v-for="(idx, item) in data" :key=idx _v-06ed86cc=""> <div class="items time" _v-06ed86cc=""> {{item.time}} </div> <div class="items line_wrap" :class="{\'first\':idx===0,\'end\':idx === data.length-1}" _v-06ed86cc=""> <div class=line _v-06ed86cc=""> </div> <div class=circle _v-06ed86cc=""> <div class=inner _v-06ed86cc=""> </div> </div> </div> <div class=right_wrap _v-06ed86cc=""> <div class=right _v-06ed86cc=""> <div class="items theme" _v-06ed86cc=""> {{item.theme}} </div> <div class="items type" _v-06ed86cc=""> {{item.type}} </div> <div class="items people" _v-06ed86cc=""> {{item.people}} </div> <div class="items select" @click=select(item) _v-06ed86cc=""> {{t(\'watch\')}} </div> </div> </div> </div> </div> </div> '},168:function(e,t,i){e.exports=' <div class=vue-waterfall-easy-container :style="{width: width&amp;&amp;!isMobile ? width+\'px\' : \'\', height: parseFloat(height)==height ? height+\'px\': height }" _v-2bf62b8e=""> <div class="loading ball-beat" v-show=isPreloading_c :class={first:isFirstLoad} _v-2bf62b8e=""> <div class=dot-box :isfirstload=isFirstLoad _v-2bf62b8e=""> <div class=dot v-for="n in loadingDotCount" :key=n :style=loadingDotStyle _v-2bf62b8e=""></div> </div> </div> <div class=vue-waterfall-easy-scroll _v-2bf62b8e=""> <div class=vue-waterfall-easy :style="isMobile? \'\' :{width: colWidth*cols+\'px\',left:\'50%\', marginLeft: -1*colWidth*cols/2 +\'px\'}" _v-2bf62b8e=""> <div class=img-box v-for="v in imgsArr_c" track-by=$index :key=$index :class="[cardAnimationClass, {__err__: v._error}]" :style="{padding: (isMobile ? mobileGap : gap)/2+\'px\', width: isMobile ? \'\' : colWidth+\'px\'}" :data-index=$index _v-2bf62b8e=""> <div class="img-inner-box static-box" v-if="v.type===\'static\'" :data-index=$index _v-2bf62b8e=""> <div class=img-wraper :style="{width:imgWidth_c + \'px\',height:v._height ? v._height+\'px\':false}" _v-2bf62b8e=""> <img :src=v.realPath alt="" _v-2bf62b8e=""> </div> <div class=img-info _v-2bf62b8e=""> <p class=title _v-2bf62b8e="">{{v.title}}</p> <p class=desc _v-2bf62b8e="">{{v.exhibition_name}}</p> </div> </div> <div class="img-inner-box live-box" v-if="v.type===\'live\'" :data-index=$index _v-2bf62b8e=""> <div class=img-wraper :style="{width:imgWidth_c + \'px\',height:v._height ? v._height+\'px\':false}" _v-2bf62b8e=""> <img :src=v.realPath alt="" _v-2bf62b8e=""> </div> <div class="tag doing-tag" v-if="v.status===\'doing\'" _v-2bf62b8e="">{{t(\'doing\')}}</div> <div class="tag done-tag" v-if="v.status===\'done\'" _v-2bf62b8e="">{{t(\'over\')}}</div> <div class="tag nostart-tag" v-if="v.status===\'nostart\'" _v-2bf62b8e="">{{t(\'nostart\')}}</div> <div class=play-icon _v-2bf62b8e=""> <img src='+i(158)+' alt="" _v-2bf62b8e=""> </div> <div class=img-info-bg _v-2bf62b8e=""></div> <div class=img-info _v-2bf62b8e=""> <p class=title _v-2bf62b8e="">{{v.title}}</p> <p class=desc _v-2bf62b8e="">{{v.exhibition_name}}</p> </div> </div> </div> </div> </div> </div> '},169:function(e,t,i){var s,n,o={};i(151),s=i(73),n=i(159),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default);var c="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;n&&(c.template=n),c.computed||(c.computed={}),Object.keys(o).forEach(function(e){var t=o[e];c.computed[e]=function(){return t}})},174:function(e,t,i){var s,n,o={};i(153),s=i(78),n=i(164),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default);var c="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;n&&(c.template=n),c.computed||(c.computed={}),Object.keys(o).forEach(function(e){var t=o[e];c.computed[e]=function(){return t}})},175:function(e,t,i){var s,n,o={};i(155),s=i(79),n=i(166),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default);var c="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;n&&(c.template=n),c.computed||(c.computed={}),Object.keys(o).forEach(function(e){var t=o[e];c.computed[e]=function(){return t}})},176:function(e,t,i){var s,n,o={};i(156),s=i(80),n=i(167),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default);var c="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;n&&(c.template=n),c.computed||(c.computed={}),Object.keys(o).forEach(function(e){var t=o[e];c.computed[e]=function(){return t}})},177:function(e,t,i){var s,n,o={};i(154),s=i(81),n=i(165),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default);var c="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;n&&(c.template=n),c.computed||(c.computed={}),Object.keys(o).forEach(function(e){var t=o[e];c.computed[e]=function(){return t}})},178:function(e,t,i){var s,n,o={};i(157),s=i(82),n=i(168),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default);var c="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;n&&(c.template=n),c.computed||(c.computed={}),Object.keys(o).forEach(function(e){var t=o[e];c.computed[e]=function(){return t}})}});