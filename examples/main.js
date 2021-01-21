/**
 * Created by aresn on 16/6/20.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import stage from '../src/index'

Vue.use(VueRouter)
Vue.use(stage)
// 开启debug模式
Vue.config.debug = true

// 路由配置
var router = new VueRouter()

router.map({
  '/waterfall': {
    component: function (resolve) {
      require(['./routers/waterfall.vue'], resolve)
    }
  },
  '/mobile': {
    component: function (resolve) {
      require(['./routers/mobile.vue'], resolve)
    }
  },
  '/navcate': {
    component: function (resolve) {
      require(['./routers/navcate.vue'], resolve)
    }
  },
  '/r3checked': {
    component: function (resolve) {
      require(['./routers/r3checked.vue'], resolve)
    }
  },
  '/rankTwo': {
    component: function (resolve) {
      require(['./routers/rankTwo.vue'], resolve)
    }
  },
  '/area': {
    component: function (resolve) {
      require(['./routers/area.vue'], resolve)
    }
  },
  '/timeline': {
    component: function (resolve) {
      require(['./routers/timeline.vue'], resolve)
    }
  },
  '/datepicker': {
    component: function (resolve) {
      require(['./routers/datepicker.vue'], resolve)
    }
  },
  '/hxkdate': {
    component: function (resolve) {
      require(['./routers/hxk_date.vue'], resolve)
    }
  },
  '/timelinesingle': {
    component: function (resolve) {
      require(['./routers/timelinesingle.vue'], resolve)
    }
  },
  '/board': {
    component: function (resolve) {
      require(['./routers/board.vue'], resolve)
    }
  },
  accordion: {
    component: function (resolve) {
      require(['./routers/accordion.vue'], resolve)
    }
  },
  cardmenu: {
    component: function (resolve) {
      require(['./routers/cardmenu.vue'], resolve)
    }
  },
  lanhemenu: {
    component: function (resolve) {
      require(['./routers/lanhemenu.vue'], resolve)
    }
  },
  '/imgscroll': {
    component: function (resolve) {
      require(['./routers/imgscroll.vue'], resolve)
    }
  },
  '/menulist': {
    component: function (resolve) {
      require(['./routers/menulist.vue'], resolve)
    }
  },
  '/customselect': {
    component: function (resolve) {
      require(['./routers/customselect.vue'], resolve)
    }
  },
  '/tablelist': {
    component: function (resolve) {
      require(['./routers/tablelist.vue'], resolve)
    }
  },
  '/ronglvtable': {
    component: function (resolve) {
      require(['./routers/ronglvtable.vue'], resolve)
    }
  },
  '/datetimepicker': {
    component: function (resolve) {
      require(['./routers/datetimepicker.vue'], resolve)
    }
  },
  '/video': {
    component: function (resolve) {
      require(['./routers/video.vue'], resolve)
    }
  },
  '/photo': {
    component: function (resolve) {
      require(['./routers/photo.vue'], resolve)
    }
  },
  '/table': {
    component: function (resolve) {
      require(['./routers/custom_table.vue'], resolve)
    }
  },
  '/mobilecharts': {
    component: function (resolve) {
      require(['./routers/mobile_charts.vue'], resolve)
    }
  },
  '/pasteinput': {
    component: function (resolve) {
      require(['./routers/paste_input.vue'], resolve)
    }
  }
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.afterEach(function (transition) {})

router.redirect({
  '*': '/customselect'
})
router.start(App, '#app')
