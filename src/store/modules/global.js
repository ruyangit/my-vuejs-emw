import api from '@api'
import { setStore, removeStore } from '@/utils/storage'
const state = {
    progress: -1,
    isLogin: false,
    userInfo: null
}

const actions = {
    ['gProgress']({ commit }, payload) {
        commit('progress', payload)
    },
    async['getUserInfo']({ commit }) {
        const { data: { status, data } } = await api.get('/user/info')
        if (status === 200) {
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
