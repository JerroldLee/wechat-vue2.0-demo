// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
// import { sync } from 'vuex-router-sync'
// import VueTouch from 'vue-touch'
var VueTouch = require('assets/js/vue-touch')
import zepto from 'webpack-zepto'
import fastclick from 'fastclick'

import store from 'store'
// 导入路由配置
import routerConfig from './router-config.js'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueTouch)

import App from './App'

fastclick.attach(document.body)

//3、创建路由实例，然后传入`routes`配置
const router = new VueRouter({
  mode: 'history',
  routes:routerConfig.routes
})
// sync(store, router)

//4、创建和挂载根实例，通过router配置参数注入路由，从而让整个应用都有路由功能
//下面这句话代表创建Vue实例不赋值给一个变量而不报错，注意放的位置
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

// window.router = router
window.Vue = Vue
window.$ = zepto
