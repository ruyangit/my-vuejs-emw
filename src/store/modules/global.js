import api from '@api'
import toastr from 'toastr'
import { inBrowser } from '@/utils'
import { setStore, removeStore } from '@/utils/storage'
toastr.options.positionClass = 'toast-bottom-left'
const state = {
    progress: 0,
    isLogin: false,
    userInfo: null
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
        const { data: { status, data } } = await api.post('/user/info.do')
        if (status === 'success') {
            commit('userInfo', data.userInfo)
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

}

const getters = {
    ['getGlobal'](state) {
        return state
    },
    ['getUserInfo'](state) {
        return state.userInfo
    }
}

export default {
    actions,
    state,
    mutations,
    getters
}
