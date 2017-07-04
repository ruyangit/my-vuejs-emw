// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Meta from 'vue-meta'
import router from './router'
import store from './store'
import { getStore } from './utils/storage'

import { sync } from 'vuex-router-sync'

import { 
  Dialog,
  Form,
  FormItem,
  Table,
  TableColumn,
  Input
} from 'element-ui'

Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)

Vue.config.productionTip = false

Vue.use(Meta)

sync(store, router)
let isLogin = Boolean(getStore('isLogin'))
if(isLogin){
    store.commit("global/isLogin", 'true')
    store.dispatch("global/getUserInfo")
}

const app = new Vue({
  router,
  store,
  render: h => h(App)
})

app.$mount('#app')
