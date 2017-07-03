import Vue from 'vue'
import VueRouter from 'vue-router'
import { routerMode } from '@api/env'
import { inBrowser } from '@/utils'
import store from '@/store'
import ProgressBar from '@/components/ProgressBar'

const Login = r => require.ensure([], () => r(require('@/views/Login')), 'chunk-login')
const WarningConsole = r => require.ensure([], () => r(require('@/views/WarningConsole')), 'chunk-warningconsole')
const ConcernEnterprise = r => require.ensure([], () => r(require('@/views/ConcernEnterprise')), 'chunk-concernenterprise')
const HelpCenter = r => require.ensure([], () => r(require('@/views/HelpCenter')), 'chunk-helpcenter')
const MyAccount = r => require.ensure([], () => r(require('@/views/MyAccount')), 'chunk-myaccount')

Vue.use(VueRouter)
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()

document.body.appendChild(bar.$el)

const scrollBehavior = to => {
  const position = {}
  if (to.hash) {
    position.selector = to.hash
  }
  if (to.matched.some(mm => mm.meta.scrollToTop)) {
    position.x = 0
    position.y = 0
  }
  return position
}


const router = new VueRouter({
  mode: routerMode,
  base: __dirname,
  scrollBehavior,
  routes: [
    { name: 'Login', path: '/Login', component: Login, meta: { auth: false } },

    { name: 'WarningConsole', path: '/WarningConsole', component: WarningConsole, meta: { scrollToTop: true } },
    { name: 'ConcernEnterprise', path: '/ConcernEnterprise', component: ConcernEnterprise, meta: { scrollToTop: true } },
    { name: 'HelpCenter', path: '/HelpCenter', component: HelpCenter, meta: { scrollToTop: true } },
    { name: 'MyAccount', path: '/MyAccount', component: MyAccount, meta: { scrollToTop: true } },

    { path: '/', redirect: { name: 'WarningConsole' } },
    { path: '*', redirect: { name: 'Login' } }
  ]
})

router.beforeEach(({ meta, path }, from, next) => {
  bar.start()
  let { auth = true } = meta
  if (auth) {
    var token = Boolean(store.state.global.auth.token) //true用户已登录， false用户未登录
    if (auth && !token && path !== '/Login') {
      return next({
        path: '/Login',
        query: { redirect: path }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } 
  next()
})

router.afterEach((to, from, next) => {
  bar.finish()
});



export default router