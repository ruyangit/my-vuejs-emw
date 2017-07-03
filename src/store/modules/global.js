import qs from 'qs'
import { setStore, removeStore } from '@/utils/storage'
const state = {
    auth: {
        token: null,
        accountNo: null,
    },
    userInfo: {}
}

const actions = {
    ['getAuth']({ commit }, auth) {
        commit('auth', auth)
    }
}

const mutations = {
    ['auth'](state, { token, accountNo }) {
        state.auth = { token, accountNo }
        setStore('auth', qs.stringify({ token, accountNo }))
    },
    ['logout'](state) {
        state.auth = {
            token: null,
            accountNo: null
        }
        state.userInfo = {}
        removeStore('auth')
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
