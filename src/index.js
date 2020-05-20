import navCate from './components/navcate/index.vue'
import waterfall from './components/waterfall/index.vue'
import pickerarea from './components/pickerarea/index.vue'
const Components = {
  navCate, waterfall, pickerarea
};

const install = function(Vue, opts = {}) {
  Object.keys(Components).forEach((key) => {
    Vue.component(Components[key].name || key, Components[key]);
  });
};

// auto install
if(typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

module.exports = Object.assign(Components, {install});   // eslint-disable-line no-undef
