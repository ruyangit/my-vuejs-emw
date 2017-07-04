import api from '@api'
const state = {
    userInfo: null
}

const actions = {
    async['getUserInfo']({ commit }) {
        const { data: { status, data } } = await api.get('/user/info')
        if (status === 200) {
            commit('userInfo', data)
        }
    }
}

const mutations = {
    ['userInfo'](state, data) {
        state.userInfo = data
    },
    ['logout'](state) {
        state.userInfo = null
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
