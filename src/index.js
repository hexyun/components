import navCate from "./components/navcate/index.vue";
import waterfall from "./components/waterfall/index.vue";
import area from "./components/area/index.vue";
import timeline from "./components/timeline/index.vue";
import datepicker from "./components/datepicker/index.vue";
const Components = {
  navCate,
  waterfall,
  area,
  timeline,
  datepicker
};

const install = function (Vue, opts = {}) {
  Object.keys(Components).forEach((key) => {
    Vue.component(Components[key].name || key, Components[key]);
  });
};

// auto install
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

module.exports = Object.assign(Components, { install }); // eslint-disable-line no-undef
