import {getUserInfo, sendSMSMsg} from '../../api/user'
import toastr from 'toastr'
import { inBrowser } from '@/utils'
import { setStore, removeStore } from '@/utils/storage'
toastr.options.positionClass = 'toast-top-center'
const state = {
    progress: 0,
    isLogin: false,
    userInfo: null,
    codeInfo: []
}

const actions = {
    ['gProgress']({ commit }, payload) {
        commit('progress', payload)
    },
    ['showMsg']({ commit }, config) {
        let content, type
        if (typeof config === 'string') {
            content = config
            type = 'error'
        } else {
            content = config.content
            type = config.type
        }
        if (inBrowser) toastr[type](content)
    },
    ['hideMsg']() {
        toastr.clear()
    },
    async['getUserInfo']({ commit }) {
        const { data: { status, data } } = await getUserInfo()
        if (status === 'success') {
            commit('userInfo', data.userInfo)
        }
    },
    async['sendCode']({ commit }, {mobile, operateType, fun}) {
      const { data: { status, data } } = await sendSMSMsg({mobile, operateType})
      fun && fun()
      if (status === 'success') {
        commit('codeInfo', data)
      }
    }
}

const mutations = {
    ['progress'](state, payload) {
        state.progress = payload
    },
    ['isLogin'](state, payload) {
        state.isLogin = payload
        setStore('isLogin', payload)
    },
    ['userInfo'](state, data) {
        state.userInfo = data
    },
    ['logout'](state) {
        state.isLogin = false
        state.userInfo = null
        removeStore('isLogin')
    },
    ['codeInfo'] (state, {codeUuid, mobile, userName}) {
      const obj = {}
      const tempCodeInfo = Object.assign({}, {codeUuid, mobile, userName})
      if (state.codeInfo.length === 0) {
        obj[mobile] = tempCodeInfo
        state.codeInfo.push(obj)
        return
      }
      state.codeInfo.find((item) => {
        if (Reflect.has(item, mobile)) {
          item[mobile] = tempCodeInfo
        } else {
          obj[mobile] = tempCodeInfo
          state.codeInfo.push(obj)
        }
      })
    },
    ['updUserInfo'] (state, {key, val}) {
      console.log('updUserInfo')
      state.userInfo[key] = val
    }
}

const getters = {
    ['getGlobal'](state) {
        return state
    },
    ['getUserInfo'](state) {
        return state.userInfo
    },
    ['getCodeInfo'](state) {
      return state.codeInfo
    }
}

export default {
    actions,
    state,
    mutations,
    getters
}
