import Vue from 'vue'
import VueRouter from 'vue-router'
import { routerMode } from '@api/env'
import { inBrowser } from '@/utils'
import store from '@/store'
// import ProgressBar from '@/components/ProgressBar'

const Login = r => require.ensure([], () => r(require('@/views/Login')), 'chunk-login')
const ForgotPass = r => require.ensure([], () => r(require('@/views/ForgotPass')), 'chunk-login')
const WarningConsole = r => require.ensure([], () => r(require('@/views/WarningConsole')), 'chunk-warningconsole')
const FollowCompany = r => require.ensure([], () => r(require('@/views/FollowCompany')), 'chunk-followcompany')
const HelpCenter = r => require.ensure([], () => r(require('@/views/HelpCenter')), 'chunk-helpcenter')
const MyAccount = r => require.ensure([], () => r(require('@/views/myaccount/MyAccount')), 'chunk-myaccount')

const Profile = r => require.ensure([], () => r(require('@/views/myaccount/children/Profile')), 'chunk-myaccount')
const ResetPass = r => require.ensure([], () => r(require('@/views/myaccount/children/ResetPass')), 'chunk-myaccount')
const ResetPhone = r => require.ensure([], () => r(require('@/views/myaccount/children/ResetPhone')), 'chunk-myaccount')
const ResetEmail = r => require.ensure([], () => r(require('@/views/myaccount/children/ResetEmail')), 'chunk-myaccount')


Vue.use(VueRouter)
// const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()

// document.body.appendChild(bar.$el)

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
    { name: 'ForgotPass', path: '/ForgotPass', component: ForgotPass, meta: { auth: false } },

    { name: 'WarningConsole', path: '/WarningConsole', component: WarningConsole, meta: { scrollToTop: true } },
    { name: 'FollowCompany', path: '/FollowCompany', component: FollowCompany, meta: { scrollToTop: true } },
    { name: 'HelpCenter', path: '/HelpCenter', component: HelpCenter, meta: { scrollToTop: true } },
    {
      name: 'MyAccount',
      path: '/MyAccount',
      component: MyAccount,
      children: [
        { name: 'Profile',path: 'Profile',component: Profile,},
        { name: 'ResetPass',path: 'ResetPass',component: ResetPass,},
        { name: 'ResetPhone',path: 'ResetPhone',component: ResetPhone,},
        { name: 'ResetEmail',path: 'ResetEmail',component: ResetEmail,}
      ]
    },

    { path: '/', redirect: { name: 'WarningConsole' } },
    { path: '*', redirect: { name: 'Login' } }
  ]
})

router.beforeEach(({ meta, path }, from, next) => {
  store.dispatch('global/gProgress', 0)
  let { auth = true } = meta
  if (auth) {
    var isLogin = Boolean(store.state.global.isLogin)
    if (auth && !isLogin && path !== '/Login') {
      return next({
        path: '/Login',
        query: { redirect: path }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  next()
})

router.afterEach((to, from, next) => {
  store.dispatch('global/gProgress', 100)
});



export default router