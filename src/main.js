// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Meta from 'vue-meta'
import router from './router'
import store from './store'
import { getStore } from './utils/storage'

import { sync } from 'vuex-router-sync'

import qs from 'qs'

Vue.config.productionTip = false

Vue.use(Meta)

sync(store, router)

//页面刷新时重新赋值
const auth = getStore('auth')
if (auth) {
  //获取用户信息
  const authJs = qs.parse(auth)
  store.commit('global/auth', authJs)
}

const app = new Vue({
  router,
  store,
  render: h => h(App)
})

app.$mount('#app')
