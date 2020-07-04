/**
 * Created by aresn on 16/6/20.
 */
import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './app.vue';
import stage from '../src/index';

Vue.use(VueRouter);
Vue.use(stage);
// 开启debug模式
Vue.config.debug = true;

// 路由配置
var router = new VueRouter();

router.map({
  '/waterfall': {
    component: function (resolve) {
      require(['./routers/waterfall.vue'], resolve);
    }
  },
  '/mobile': {
    component: function (resolve) {
      require(['./routers/mobile.vue'], resolve);
    }
  },
  '/navcate': {
    component: function (resolve) {
      require(['./routers/navcate.vue'], resolve);
    }
  },
  '/area': {
    component: function (resolve) {
      require(['./routers/area.vue'], resolve);
    }
  },
  '/timeline': {
    component: function (resolve) {
      require(['./routers/timeline.vue'], resolve);
    }
  },
  '/datepicker': {
    component: function (resolve) {
      require(['./routers/datepicker.vue'], resolve);
    }
  },
  '/hxkdate': {
    component: function (resolve) {
      require(['./routers/hxk_date.vue'], resolve);
    }
  },
  '/timelinesingle': {
    component: function (resolve) {
      require(['./routers/timelinesingle.vue'], resolve);
    }
  },
  '/board': {
    component: function (resolve) {
      require(['./routers/board.vue'], resolve);
    }
  },
  'accordion': {
    component: function (resolve) {
      require(['./routers/accordion.vue'], resolve);
    }
  },
  'cardmenu': {
    component: function (resolve) {
      require(['./routers/cardmenu.vue'], resolve);
    }
  },
  'lanhemenu': {
    component: function (resolve) {
      require(['./routers/lanhemenu.vue'], resolve);
    }
  },
  '/imgscroll': {
    component: function (resolve) {
      require(['./routers/imgscroll.vue'], resolve);
    }
  }
});

router.beforeEach(function () {
  window.scrollTo(0, 0);
});

router.afterEach(function (transition) {

});

router.redirect({
  '*': "/lanhemenu"
});
router.start(App, '#app');
