webpackJsonp([4],{0:function(t,e,i){var s,n,o;!function(r,c){n=[i(52),i(51),i(163),i(81)],s=c,o="function"==typeof s?s.apply(e,n):s,!(void 0!==o&&(t.exports=o))}(this,function(t,e,s,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}var r=o(t),c=o(e),l=o(s),a=o(n);r.default.use(c.default),r.default.use(a.default),r.default.config.debug=!0;var d=new c.default;d.map({"/waterfall":{component:function(t){i.e(1,function(e){var i=[e(166)];t.apply(null,i)}.bind(this))}},"/navcate":{component:function(t){i.e(2,function(e){var i=[e(165)];t.apply(null,i)}.bind(this))}},"/area":{component:function(t){i.e(3,function(e){var i=[e(164)];t.apply(null,i)}.bind(this))}}}),d.beforeEach(function(){window.scrollTo(0,0)}),d.afterEach(function(t){}),d.redirect({"*":"/waterfall"}),d.start(l.default,"#app")})},28:function(t,e,i){var s,n,o;!function(i,r){n=[e],s=r,o="function"==typeof s?s.apply(e,n):s,!(void 0!==o&&(t.exports=o))}(this,function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={bind:function(){var t=this,e=(new Date).getTime();this.documentHandler=function(i){return!t.el.contains(i.target)&&void(t.expression&&(new Date).getTime()-e>200&&(t.vm[t.expression](),e=Date.now()))},document.addEventListener("click",this.documentHandler)},update:function(){},unbind:function(){document.removeEventListener("click",this.documentHandler)}},t.exports=e.default})},29:function(t,e,i){t.exports={default:i(92),__esModule:!0}},73:function(t,e,i){var s,n,o;!function(i,r){n=[e],s=r,o="function"==typeof s?s.apply(e,n):s,!(void 0!==o&&(t.exports=o))}(this,function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{}},ready:function(){},beforeDestroy:function(){},methods:{}},t.exports=e.default})},77:function(t,e,i){var s,n,o;!function(r,c){n=[e,i(29),i(28)],s=c,o="function"==typeof s?s.apply(e,n):s,!(void 0!==o&&(t.exports=o))}(this,function(e,i,s){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(i),r=n(s);e.default={name:"area",directives:{clickOutSide:r.default},props:{defaultData:{type:Array,default:function(){return[]}},inputWidth:{type:String,default:"468px"},list:{type:Array,default:function(){return[]}}},data:function(){return{show:!1,contries:[],provinces:[],cities:[],current:{country:{},province:{},city:{}}}},watch:{list:{deep:!0,handler:function(){this.init()}}},computed:{selectText:function(){return(this.current.country.name||"")+(this.current.province.name||"")+(this.current.city.name||"")}},ready:function(){this.init()},methods:{init:function(){this.setContries(this.list),this.setDefaultData()},setDefaultData:function(){if(this.defaultData.length<=0)return!1;var t=this.defaultData,e=t[0].id||-1,i=this.setSelected(this.list,e);if(i>-1){this.selectNode("country",i,"init");var s=this.contries[i];if(t[1]&&s.children){var n=t[1].id||-1,o=this.setSelected(s.children,n);o>-1&&this.selectNode("province",o,"init");var r=s.children[o];if(t[2]&&r.children){var c=t[2].id||-1,l=this.setSelected(r.children,c);l>-1&&this.selectNode("city",l,"init")}}}},setSelected:function(t,e){var i=-1;return t.forEach(function(t,s){t.id===e&&(i=s)}),i},setContries:function(t){this.contries=t},setProvinces:function(t,e){this.cities=[],this.provinces=e},setCities:function(t,e){this.cities=e},selectNode:function(t,e,i){var s={};"country"===t?(s=this.contries[e],this.clearContries(),this.clearProvinces(),this.clearCities(),this.contries.$set(e,(0,o.default)({},s,{selected:!0})),this.setProvinces(s.id,s.children),this.current.province={},this.current.city={},"init"!==i&&this.$emit("select-node",s)):"province"===t?(s=this.provinces[e],this.clearProvinces(),this.provinces.$set(e,(0,o.default)({},s,{selected:!0})),this.setCities(s.id,s.children),this.current.city={},"init"!==i&&this.$emit("select-node",this.current.country,s)):"city"===t&&(s=this.cities[e],this.cities.$set(e,(0,o.default)({},s,{selected:!0})),"init"!==i&&(this.$emit("select-node",this.current.country,this.current.province,s),this.reset()),this.show=!1),this.current[t]=s},clearContries:function(){var t=this;this.contries&&this.contries.forEach(function(e,i){e.selected=!1,t.contries.$set(i,e)})},clearProvinces:function(){var t=this;this.provinces&&this.provinces.forEach(function(e,i){e.selected=!1,t.provinces.$set(i,e)})},clearCities:function(){var t=this;this.cities&&this.cities.forEach(function(e,i){e.selected=!1,t.cities.$set(i,e)})},reset:function(){this.clearContries(),this.clearProvinces(),this.clearCities(),this.provinces=[],this.cities=[]},hiddenMenu:function(){this.show=!1,this.reset()}}},t.exports=e.default})},78:function(t,e,i){var s,n,o;!function(r,c){n=[e,i(29),i(28)],s=c,o="function"==typeof s?s.apply(e,n):s,!(void 0!==o&&(t.exports=o))}(this,function(e,i,s){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(i),r=n(s);e.default={name:"navCate",directives:{clickOutSide:r.default},props:{defaultData:{type:Array,default:function(){return[]}},menuList:{type:Object,default:function(){return{level:1,list:[]}}},eventType:{type:String,default:"click"}},data:function(){return{level:1,list:[],selectedFirst:!1,secondList:[],firstMenu:{}}},filters:{subStringName:function(t){return t.length>6?t.substring(0,6)+"...":t}},computed:{},ready:function(){this.init()},watch:{menuList:{deep:!0,handler:function(){this.init()}}},methods:{init:function(){var t=this;this.level=this.menuList.level||1;var e=this.menuList.list||[];e.forEach(function(e,i){t.list.$set(i,(0,o.default)({},e,{selected:!1}))}),this.setDefaultData()},setDefaultData:function(){if(this.defaultData.length<=0)return!1;var t=this.defaultData,e=t[0].id||-1,i=this.setSelected(this.list,e);if(i>-1){this.selectFirstMenu(this.eventType,this.list[i],i);var s=this.list[i];if(t[1]&&s.children){var n=t[1].id||-1,o=this.setSelected(s.children,n),r=s.children[o];if(t[2]&&r.children){var c=t[2].id||-1;this.setSelected(r.children,c)}}}},setSelected:function(t,e){var i=-1;return t.forEach(function(s,n){s.id===e&&(t.$set(n,(0,o.default)({},s,{selected:!0})),i=n)}),i},selectFirstMenu:function(t,e,i){if(t!=this.eventType)return!1;this.reset(),this.selectedFirst=!0,this.firstMenu=e;var s=this.list[i];s.selected=!0,this.list.$set(i,s),this.secondList=s.children},selectLinkMenu:function(t,e){this.$emit("select",t,e,this.firstMenu),this.reset()},reset:function(){var t=this,e=this.list;e.forEach(function(e,i){e.selected=!1,t.list.$set(i,e)}),this.selectedFirst=!1},mouseLeave:function(){"hover"===this.eventType&&this.reset()},hiddenMenu:function(){this.$emit("clickoutside"),this.reset()}}},t.exports=e.default})},79:function(t,e,i){var s,n,o;!function(r,c){n=[e,i(28),i(170)],s=c,o="function"==typeof s?s.apply(e,n):s,!(void 0!==o&&(t.exports=o))}(this,function(e,i,s){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(i),r=n(s);e.default={name:"waterfall",components:{vueWaterfall:r.default},directives:{clickOutSide:o.default},props:{list:{type:Array,default:function(){return[]}},loadingImg:{type:String,default:""}},data:function(){return{}},watch:{},computed:{},ready:function(){this.init()},methods:{init:function(){},scrollBottom:function(){this.$emit("scroll-bottom")},selectItem:function(t,e){this.$emit("select-item",e)}}},t.exports=e.default})},80:function(t,e,i){var s,n,o;!function(i,r){n=[e],s=r,o="function"==typeof s?s.apply(e,n):s,!(void 0!==o&&(t.exports=o))}(this,function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"vue-waterfall-easy",props:{width:{type:Number},height:{type:[Number,String]},reachBottomDistance:{type:Number,default:20},loadingDotCount:{type:Number,default:3},loadingDotStyle:{type:Object},loadingImg:{type:String,default:""},gap:{type:Number,default:20},mobileGap:{type:Number,default:8},maxCols:{type:Number,default:5},imgsArr:{type:Array,required:!0},srcKey:{type:String,default:"src"},hrefKey:{type:String,default:"href"},imgWidth:{type:Number,default:240},isRouterLink:{type:Boolean,default:!1},linkRange:{type:String,default:"card"},loadingTimeOut:{type:Number,default:500},cardAnimationClass:{type:[String],default:"default-card-animation"},enablePullDownEvent:{type:Boolean,default:!1}},data:function(){return{msg:"this is from vue-waterfall-easy.vue",isMobile:!!navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i),isPreloading:!0,isPreloading_c:!0,imgsArr_c:[],loadedCount:0,cols:NaN,imgBoxEls:null,beginIndex:0,colsHeightArr:[],LoadingTimer:null,isFirstLoad:!0,over:!1,scrollEl:null}},computed:{colWidth:function(){return this.imgWidth+this.gap},imgWidth_c:function(){return this.isMobile?window.innerWidth/2-this.mobileGap:this.imgWidth},hasLoadingSlot:function(){return!!this.$scopedSlots.loading}},ready:function(){var t=this;this.bindClickEvent(),this.loadingMiddle(),this.preload(),this.cols=this.calcuCols(),this.$on("preloaded",function(){t.isFirstLoad=!1,t.imgsArr_c=t.imgsArr.concat([]),t.$nextTick(function(){t.isPreloading=!1,t.imgBoxEls=t.$el.getElementsByClassName("img-box"),t.waterfall()})}),this.isMobile||this.width||window.addEventListener("resize",this.response),this.isMobile&&this.enablePullDownEvent&&this.pullDown(),this.scroll()},beforeDestroy:function(){window.removeEventListener("resize",this.response)},watch:{isPreloading:function(t,e){var i=this;t?setTimeout(function(){i.isPreloading&&(i.isPreloading_c=!0)},this.loadingTimeOut):this.isPreloading_c=!1},imgsArr:function(t,e){(this.imgsArr_c.length>t.length||this.imgsArr_c.length>0&&t[0]&&!t[0]._height)&&this.reset(),this.preload()}},methods:{preload:function(t,e){var i=this;this.imgsArr.forEach(function(t,e){if(!(e<i.loadedCount)){if(i.imgsArr[e].realPath=i.loadingImg,!t[i.srcKey])return i.imgsArr[e]._height="0",i.loadedCount++,void(i.loadedCount==i.imgsArr.length&&i.$emit("preloaded"));var s=new Image;s.src=t[i.srcKey],s.onload=s.onerror=function(n){i.loadedCount++,i.imgsArr[e]._height="load"==n.type?Math.round(i.imgWidth_c/(s.width/s.height)):i.isMobile?i.imgWidth_c:i.imgWidth,"error"==n.type&&(i.imgsArr[e]._error=!0,i.$emit("imgError",i.imgsArr[e])),i.loadedCount==i.imgsArr.length&&i.$emit("preloaded"),i.imgsArr[e].realPath=t[i.srcKey]}}})},calcuCols:function(){var t=this.width?this.width:window.innerWidth,e=parseInt(t/this.colWidth);return e=0===e?1:e,this.isMobile?2:e>this.maxCols?this.maxCols:e},waterfall:function(){if(this.imgBoxEls){var t,e,i,s=this.isMobile?this.imgBoxEls[0].offsetWidth:this.colWidth;0==this.beginIndex&&(this.colsHeightArr=[]);for(var n=this.beginIndex;n<this.imgsArr.length;n++){if(!this.imgBoxEls[n])return;if(i=this.imgBoxEls[n].offsetHeight,n<this.cols)this.colsHeightArr.push(i),t=0,e=n*s;else{var o=Math.min.apply(null,this.colsHeightArr),r=this.colsHeightArr.indexOf(o);t=o,e=r*s,this.colsHeightArr[r]=o+i}this.imgBoxEls[n].style.left=e+"px",this.imgBoxEls[n].style.top=t+"px"}this.beginIndex=this.imgsArr.length}},response:function(){var t=this.cols;this.cols=this.calcuCols(),t!==this.cols&&(this.beginIndex=0,this.waterfall(),this.over&&this.setOverTipPos())},scrollFn:function(){var t=this.scrollEl;if(!this.isPreloading){var e=Math.min.apply(null,this.colsHeightArr);t.scrollTop+t.offsetHeight>e-this.reachBottomDistance&&(this.isPreloading=!0,this.$emit("scroll-bottom"))}},scroll:function(){this.scrollEl.addEventListener("scroll",this.scrollFn)},waterfallOver:function(){this.scrollEl.removeEventListener("scroll",this.scrollFn),this.isPreloading=!1,this.over=!0,this.setOverTipPos()},setOverTipPos:function(){var t=this,e=Math.max.apply(null,this.colsHeightArr);this.$nextTick(function(){t.$refs.over.style.top=e+"px"})},bindClickEvent:function(){var t=this;this.$el.querySelector(".vue-waterfall-easy").addEventListener("click",function(e){var i=e.target;if(e.target.className.indexOf("over")===-1&&i.className.indexOf("img-box")==-1){for(;i.className.indexOf("img-inner-box")==-1;)i=i.parentNode;var s=i.getAttribute("data-index");t.$emit("select-item",e,t.imgsArr_c[s])}})},pullDown:function(){var t,e=this,i=this.$el.querySelector(".vue-waterfall-easy-scroll");i.addEventListener("touchmove",function(s){if(0===i.scrollTop){var n=s.changedTouches[0];t||(t=n.pageY);var o=n.pageY-t;o>0&&s.preventDefault(),e.$emit("pullDownMove",o)}}),i.addEventListener("touchend",function(s){0===i.scrollTop&&(t=NaN,e.$emit("pullDownEnd"))})},loadingMiddle:function(){var t=this.scrollEl=this.$el.querySelector(".vue-waterfall-easy-scroll"),e=t.offsetWidth-t.clientWidth;this.$el.querySelector(".loading").style.marginLeft=-e/2+"px"},reset:function(){this.imgsArr_c=[],this.beginIndex=0,this.loadedCount=0,this.isFirstLoad=!0,this.isPreloading=!0,this.scroll(),this.over=!1}}},t.exports=e.default})},81:function(t,e,i){var s,n,o;!function(r,c){n=[t,i(29),i(30),i(168),i(169),i(167)],s=c,o="function"==typeof s?s.apply(e,n):s,!(void 0!==o&&(t.exports=o))}(this,function(t,e,i,s,n,o){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var c=r(e),l=r(i),a=r(s),d=r(n),u=r(o),f={navCate:a.default,waterfall:d.default,area:u.default},h=function(t){arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};(0,l.default)(f).forEach(function(e){t.component(f[e].name||e,f[e])})};"undefined"!=typeof window&&window.Vue&&h(window.Vue),t.exports=(0,c.default)(f,{install:h})})},92:function(t,e,i){i(130),t.exports=i(1).Object.assign},121:function(t,e,i){"use strict";var s=i(5),n=i(19),o=i(39),r=i(25),c=i(22),l=i(36),a=Object.assign;t.exports=!a||i(11)(function(){var t={},e={},i=Symbol(),s="abcdefghijklmnopqrst";return t[i]=7,s.split("").forEach(function(t){e[t]=t}),7!=a({},t)[i]||Object.keys(a({},e)).join("")!=s})?function(t,e){for(var i=c(t),a=arguments.length,d=1,u=o.f,f=r.f;a>d;)for(var h,v=l(arguments[d++]),p=u?n(v).concat(u(v)):n(v),m=p.length,g=0;m>g;)h=p[g++],s&&!f.call(v,h)||(i[h]=v[h]);return i}:a},130:function(t,e,i){var s=i(3);s(s.S+s.F,"Object",{assign:i(121)})},149:function(t,e){},150:function(t,e){},151:function(t,e){},152:function(t,e){},153:function(t,e){},154:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAMAAACfBSJ0AAAA51BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9aq4iyAAAATXRSTlMAAQMEBQYJCwwNDhAREhMUFhkbHyAiJSYsLTAxNTc4OT4/SktMT1BSVVZXY2Vqa3Bydnd9foCDhIWHiImMjZGSlZaam5yen6Gio6SlprIytNEAAAG8SURBVEjHtZbbWoJAFIVXWWpJhZWlZVpJJnRAzYK0AyYkTfP+z9NFWuIc4at1ifPLDHvN3gvgqFC33WEQkSgYuU69CC2VLI/QRRHfMpRUpZuEZmi3IqXKPSpSryykcp2YihXbOT5melQuz+Rh1ZCqFFZZrBFTteIGgxGqI9Jc2mRM9RQntmqGVFfhwsfJeVRf3m85OjSNOj8uiVNx8dw5PZpOvZmVmR/G9x9S8Nvk3eXHwzx2+zKuCwAGU/E2ABw/S6pvALCYxxYAYLUlLqoFwBdwwOa1yHweUCBCDtgfCDZaQJ1KOKDxygXrcOQc1i/fOZwDV8EBW7efzBIXIyUHHDK+HyHQ4LByNk4uCRDpcMDOW2JJBKLHIWk8ovu+7eX36Z3vlDnfUIM7eGC/p7p+xg2vfraCW2tHXL8o/HnyIvCn9D7s3QnuQxHwhNzGlej++QBaovt+PpHe9xLzpxcAcPSk6C9sP3vMywb2vJ9x+mcw0Omfqft1fz4fptnmQ8p5ZGebf/5CHDEnmeZtmvle+5M8oZtfmpy8pD5jWMuUz3xTlAenWfKgPH/2y/+QdwHAyJSvZ3necUfyPP8F7MRpihpYSdoAAAAASUVORK5CYII="},155:function(t,e){t.exports=" <router-view></router-view> "},159:function(t,e){t.exports=' <div :class="{\'hex-area\':true}" :style={width:inputWidth} v-click-out-side=hiddenMenu> <div class=area-input @click="show=!show"> <input type=text placeholder=请选择地区 disabled=disabled :value=selectText /> <svg t=1590251416183 class=icon viewBox="0 0 1024 1024" version=1.1 xmlns=http://www.w3.org/2000/svg p-id=2845 width=52 height=52 :class="{\'trans\':show}"> <path d="M529.808696 614.4c-11.130435 11.130435-26.713043 11.130435-35.617392 0L178.086957 291.617391c-22.26087-22.26087-55.652174-24.486957-75.686957-6.678261-17.808696 15.582609-17.808696 51.2 8.904348 75.686957L476.382609 734.608696c22.26087 22.26087 55.652174 22.26087 75.686956 0l365.078261-371.756522c22.26087-22.26087 24.486957-55.652174 6.678261-75.686957-17.808696-17.808696-55.652174-17.808696-75.686957 6.678261L529.808696 614.4" fill=#BFBFBF p-id=2846 />s </svg> </div> <div :class="{\'area-select\':true,\'show\':show}"> <div class=section> <div class=title>国家列表</div> <div class="content common-scrollbar"> <div class=content-scroll> <div v-for="item in contries" :key=item.id track-by=$index :class="{\'item\':true,\'selected\':item.selected}" @click="selectNode(\'country\',$index)"> <a href=javascript:;>{{item.name}}</a> </div> </div> </div> </div> <div class=section> <div class=title>省份列表</div> <div class="content common-scrollbar"> <div class=content-scroll> <div v-for="item in provinces" :key=item.id track-by=$index :class="{\'item\':true,\'selected\':item.selected}" @click="selectNode(\'province\',$index)"> <a href=javascript:;>{{item.name}}</a> </div> </div> </div> </div> <div class=section> <div class=title>市级列表</div> <div class="content common-scrollbar"> <div class=content-scroll> <div v-for="item in cities" :key=item.id track-by=$index :class="{\'item\':true,\'selected\':item.selected}" @click="selectNode(\'city\',$index)"> <a href=javascript:;>{{item.name}}</a> </div> </div> </div> </div> </div> </div> '},160:function(t,e){t.exports=" <div class=hex-waterfall> <vue-waterfall :imgs-arr=list @scroll-bottom=scrollBottom @select-item=selectItem :gap=14 :max-cols=4 :loading-img=loadingImg> </vue-waterfall> </div> "},161:function(t,e){t.exports=' <div class=hex-cate @mouseleave=mouseLeave v-click-out-side=hiddenMenu _v-0416fcdd=""> <template v-if="level===1"> <div class="first-menu common-scrollbar" _v-0416fcdd=""> <a href=javascript:; v-for="item in list" :key=item.id track-by=$index @click=selectLinkMenu(item) class=menu-item _v-0416fcdd="">{{item.name | subStringName}}</a> </div> </template> <template v-if="level===2"> <div class="first-menu common-scrollbar" _v-0416fcdd=""> <a href=javascript:; v-for="item in list" :key=item.id track-by=$index @click="selectFirstMenu(\'click\',item,$index)" @mouseover="selectFirstMenu(\'hover\',item,$index)" :class="{\'menu-item\':true,\'selected\':item.selected}" _v-0416fcdd="">{{item.name | subStringName}}</a> </div> <div class="second-menu common-scrollbar" v-if=selectedFirst _v-0416fcdd=""> <div class=menu-content _v-0416fcdd=""> <a href=javascript:; :class="{\'menu-item\':true,\'selected\':item.selected}" v-for="item in secondList" :key=item.id track-by=$index @click=selectLinkMenu(item) _v-0416fcdd="">{{item.name | subStringName}}</a> </div> </div> </template> <template v-if="level===3"> <div class="first-menu common-scrollbar" _v-0416fcdd=""> <a href=javascript:; v-for="item in list" :key=item.id track-by=$index @click="selectFirstMenu(\'click\',item,$index)" @mouseover="selectFirstMenu(\'hover\',item,$index)" :class="{\'menu-item\':true,\'selected\':item.selected}" _v-0416fcdd="">{{item.name | subStringName}}</a> </div> <div class="third-menu common-scrollbar" v-if=selectedFirst _v-0416fcdd=""> <div class=menu-content _v-0416fcdd=""> <div class=third-item v-for="second in secondList" :key=second.id track-by=$index _v-0416fcdd=""> <div class=title _v-0416fcdd=""> <span class=name-content _v-0416fcdd="">{{second.name}}</span>: </div> <div class=list _v-0416fcdd=""> <a href=javascript:; v-for="item in second.children" :key=item.id track-by=$index :class="{\'menu-item\':true,\'selected\':item.selected}" @click="selectLinkMenu(item, second)" _v-0416fcdd="">{{item.name | subStringName}}</a> </div> </div> </div> </div> </template> </div> '},162:function(t,e,i){t.exports=' <div class=vue-waterfall-easy-container :style="{width: width&amp;&amp;!isMobile ? width+\'px\' : \'\', height: parseFloat(height)==height ? height+\'px\': height }" _v-2bf62b8e=""> <div class="loading ball-beat" v-show=isPreloading_c :class={first:isFirstLoad} _v-2bf62b8e=""> <div class=dot-box :isfirstload=isFirstLoad _v-2bf62b8e=""> <div class=dot v-for="n in loadingDotCount" :key=n :style=loadingDotStyle _v-2bf62b8e=""></div> </div> </div> <div class=vue-waterfall-easy-scroll _v-2bf62b8e=""> <div class=vue-waterfall-easy :style="isMobile? \'\' :{width: colWidth*cols+\'px\',left:\'50%\', marginLeft: -1*colWidth*cols/2 +\'px\'}" _v-2bf62b8e=""> <div class=img-box v-for="v in imgsArr_c" track-by=$index :key=$index :class="[cardAnimationClass, {__err__: v._error}]" :style="{padding: (isMobile ? mobileGap : gap)/2+\'px\', width: isMobile ? \'\' : colWidth+\'px\'}" :data-index=$index _v-2bf62b8e=""> <div class="img-inner-box static-box" v-if="v.type===\'static\'" :data-index=$index _v-2bf62b8e=""> <div class=img-wraper :style="{width:imgWidth_c + \'px\',height:v._height ? v._height+\'px\':false}" _v-2bf62b8e=""> <img :src=v.realPath alt="" _v-2bf62b8e=""> </div> <div class=img-info _v-2bf62b8e=""> <p class=title _v-2bf62b8e="">{{v.title}}</p> <p class=desc _v-2bf62b8e="">{{v.exhibition_name}}</p> </div> </div> <div class="img-inner-box live-box" v-if="v.type===\'live\'" :data-index=$index _v-2bf62b8e=""> <div class=img-wraper :style="{width:imgWidth_c + \'px\',height:v._height ? v._height+\'px\':false}" _v-2bf62b8e=""> <img :src=v.realPath alt="" _v-2bf62b8e=""> </div> <div class="tag doing-tag" v-if="v.status===\'doing\'" _v-2bf62b8e="">进行中</div> <div class="tag done-tag" v-if="v.status===\'done\'" _v-2bf62b8e="">结束</div> <div class="tag nostart-tag" v-if="v.status===\'nostart\'" _v-2bf62b8e="">未开始</div> <div class=play-icon _v-2bf62b8e=""> <img src='+i(154)+' alt="" _v-2bf62b8e=""> </div> <div class=img-info-bg _v-2bf62b8e=""></div> <div class=img-info _v-2bf62b8e=""> <p class=title _v-2bf62b8e="">{{v.title}}</p> <p class=desc _v-2bf62b8e="">{{v.exhibition_name}}</p> </div> </div> </div> </div> </div> </div> '},163:function(t,e,i){var s,n,o={};i(149),s=i(73),n=i(155),t.exports=s||{},t.exports.__esModule&&(t.exports=t.exports.default);var r="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;n&&(r.template=n),r.computed||(r.computed={}),Object.keys(o).forEach(function(t){var e=o[t];r.computed[t]=function(){return e}})},167:function(t,e,i){var s,n,o={};i(150),s=i(77),n=i(159),t.exports=s||{},t.exports.__esModule&&(t.exports=t.exports.default);var r="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;n&&(r.template=n),r.computed||(r.computed={}),Object.keys(o).forEach(function(t){var e=o[t];r.computed[t]=function(){return e}})},168:function(t,e,i){var s,n,o={};i(152),s=i(78),n=i(161),t.exports=s||{},t.exports.__esModule&&(t.exports=t.exports.default);var r="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;n&&(r.template=n),r.computed||(r.computed={}),Object.keys(o).forEach(function(t){var e=o[t];r.computed[t]=function(){return e}})},169:function(t,e,i){var s,n,o={};i(151),s=i(79),n=i(160),t.exports=s||{},t.exports.__esModule&&(t.exports=t.exports.default);var r="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;n&&(r.template=n),r.computed||(r.computed={}),Object.keys(o).forEach(function(t){var e=o[t];r.computed[t]=function(){return e}})},170:function(t,e,i){var s,n,o={};i(153),s=i(80),n=i(162),t.exports=s||{},t.exports.__esModule&&(t.exports=t.exports.default);var r="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;n&&(r.template=n),r.computed||(r.computed={}),Object.keys(o).forEach(function(t){var e=o[t];r.computed[t]=function(){return e}})}});