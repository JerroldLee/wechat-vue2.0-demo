// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueTouch from 'vue-touch'
import zepto from 'webpack-zepto'
import fastclick from 'fastclick'
import routerMap from './router-config.js'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueTouch)

import App from './App'

fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

window.router = router
window.Vue = Vue
window.$ = zepto
