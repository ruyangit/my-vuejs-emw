import { setStore, removeStore } from '@/utils/storage'
const state = {
    token: null,
    accountNo: null,
    userInfo: {}
}

const actions = {
    ['getToken']({ commit }, token) {
        commit('token', token)
    }
}

const mutations = {
    ['token'](state, { token }) {
        state.token = { token }
        setStore('token', token)
    },
    ['logout'](state) {
        state.token = null
        state.accountNo = null
        state.userInfo =  {}
        removeStore('token')
    },

}

const getters = {
    ['getGlobal'](state) {
        return state
    }
}

export default {
    actions,
    state,
    mutations,
    getters
}
