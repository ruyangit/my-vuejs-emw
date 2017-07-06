import api from '@api'

const state = {
    monitorSummary: {
        summary: {},
        changeList: [],
        riskList: [],
        sentimentList: [],
        pageNo: 1,
        count: 5
    },
    monitorSummaryDetail: {}
}

const actions = {
    async['getMonitorSummary']({ commit, state }, config) {
        // const path = fullPath
        // if (state.lists.data.length > 0 && path === state.lists.path && config.page === 1) {
        //     global.progress = 100
        //     return
        // }
        const { data: { status, data } } = await api.get('/monitor/summary', { ...config })
        if (data && status === 200) {
            commit('receiveMonitorSummary', {
                ...config,
                ...data
            })
        }
    },
    // async ['getArticleItem']({ commit, state, rootState: {route: { path, params: { id }}} }) {
    //     if (path === state.item.path) {
    //         global.progress = 100
    //         return
    //     }
    //     const { data: { data, code} } = await api.get('frontend/article/item', { id, markdown: 1, cache: true })
    //     if (data && code === 200) {
    //         commit('receiveArticleItem', {
    //             data,
    //             path
    //         })
    //     }
    // },
    // async ['getTrending']({ commit, state }) {
    //     if (state.trending.length) return
    //     const { data: { data, code} } = await api.get('frontend/trending', { cache: true})
    //     if (data && code === 200) {
    //         commit('receiveTrending', data)
    //     }
    // }
}

const mutations = {
    ['receiveMonitorSummary'](state, { summary, changeList, riskList, sentimentList }) {
        let date = new Date()
        let month = (date.getMonth() + 1)
        if (month < 10) month = '0' + month
        let day = date.getDate()
        if (day < 10) day = '0' + day
        summary.today = month + '/' + day
        date = new Date(date - 1000 * 60 * 60 * 24 * 30)//30天前
        month = (date.getMonth() + 1)
        if (month < 10) month = '0' + month
        day = date.getDate()
        if (day < 10) day = '0' + day
        summary.thirty = month + '/' + day + '-' + summary.today
        date = new Date(date - 1000 * 60 * 60 * 24 * 60)//+60天前=90天前
        month = (date.getMonth() + 1)
        if (month < 10) month = '0' + month
        day = date.getDate()
        if (day < 10) day = '0' + day
        summary.ninety = month + '/' + day + '-' + summary.today
        state.monitorSummary = { summary, changeList, riskList, sentimentList }
        // console.log(state.monitorSummary);
    },
    // ['receiveArticleItem'](state, {data, path}) {
    //     state.item = {
    //         data, path, isLoad: true
    //     }
    // },
    // ['receiveTrending'](state, data) {
    //     state.trending = data.list
    // },
    // ['modifyLikeStatus'](state, {id, status}) {
    //     if (state.item.data._id === id) {
    //         if (status) state.item.data.like++
    //         else  state.item.data.like--
    //         state.item.data.like_status = status
    //     }
    //     const obj = state.lists.data.find(item => item._id === id)
    //     if (obj) {
    //         if (status) obj.like++
    //         else  obj.like--
    //         obj.like_status = status
    //     }
    // }
}

const getters = {
    ['getMonitorSummary'](state) {
        return state.monitorSummary
    },
    // ['getArticleItem'](state) {
    //     return state.item
    // },
    // ['getTrending'](state) {
    //     return state.trending
    // }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
