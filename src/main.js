import Vue from 'vue'
import App from './App.vue'
import store from '../src/store/index.js'
import './vantui'
import router from "./router"
import "./filter/index"

// 拦截重复性跳转
import VueRouter from "vue-router";
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

// 安装全局事件总线
Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
