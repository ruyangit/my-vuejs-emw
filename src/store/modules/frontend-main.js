import api from '@api'

const state = {
    monitorSummaryLists: {
        summary: {},
        changeList: [],
        riskList: [],
        sentimentList: [],
        pageNo: 0,
        pageSize: 0,
        totalPage: 0,
        totalRecord: 0,
        path: ''
    },
    monitorSummaryDetail: {},
    searchCompanyLists: {
        companyList: [],
        pageNo: 0,
        pageSize: 0,
        totalPage: 0,
        totalRecord: 0,
        path: ''
    },
    followCompanyLists: {
        companyList: [],
        pageNo: 0,
        pageSize: 0,
        totalPage: 0,
        totalRecord: 0,
        path: ''
    },
    companyDetailItems: {
        companyDetail: {},
        path: ''
    }

}

const actions = {
    async['getMonitorSummaryLists']({ commit, state, rootState: { global, route: { fullPath } } }, config) {
        const path = fullPath
        const { data: { status, data } } = await api.post('/monitor/getSummary.do', { ...config })
        console.log(data)
        if (data && status === 'success') {
            commit('receiveMonitorSummaryLists', {
                ...config,
                ...data,
                path
            })
        }
    },
    async['getSearchCompanyLists']({ commit, state, rootState: { global, route: { fullPath } } }, config) {
        const path = fullPath
        // console.log(path)
        // if (state.searchCompany.companyList.length > 0 && path === state.searchCompany.path && config.page === 1) {
        //     global.progress = 100
        //     return
        // }
        const { data: { status, data } } = await api.post('/follow/searchCompany.do', { ...config })
        if (data && status === 'success') {
            commit('receiveSearchCompanyLists', {
                ...config,
                ...data,
                path
            })
        }
    },
    async['getFollowCompanyLists']({ commit, state, rootState: { global, route: { fullPath } } }, config) {
        const path = fullPath
        const { data: { status, data } } = await api.post('/follow/companyList.do', { ...config })
        // console.log(data)
        if (data && status === 'success') {
            commit('receiveFollowCompanyLists', {
                ...config,
                ...data,
                path
            })
        }
    },
    async['getCompanyDetailItems']({ commit, state, rootState: { global, route: { fullPath } } }, config) {
        const path = fullPath
        const { data: { status, data } } = await api.post('/follow/getCompanyDetail.do', { ...config })
        if (data && status === 'success') {
            commit('receiveCompanyDetailItems', {
                ...config,
                ...data,
                path
            })
        }
    }
}

const mutations = {
    ['receiveMonitorSummaryLists'](state, {
        summary,
        changeList,
        riskList,
        sentimentList,
        pageNo,
        pageSize,
        totalPage,
        totalRecord,
        path
    }) {
        // let date = new Date()
        // let month = (date.getMonth() + 1)
        // if (month < 10) month = '0' + month
        // let day = date.getDate()
        // if (day < 10) day = '0' + day
        // summary.today = month + '/' + day
        // date = new Date(date - 1000 * 60 * 60 * 24 * 30)//30天前
        // month = (date.getMonth() + 1)
        // if (month < 10) month = '0' + month
        // day = date.getDate()
        // if (day < 10) day = '0' + day
        // summary.thirty = month + '/' + day + '-' + summary.today
        // date = new Date(date - 1000 * 60 * 60 * 24 * 60)//+60天前=90天前
        // month = (date.getMonth() + 1)
        // if (month < 10) month = '0' + month
        // day = date.getDate()
        // if (day < 10) day = '0' + day
        // summary.ninety = month + '/' + day + '-' + summary.today

        state.monitorSummaryLists = {
            summary,
            changeList,
            riskList,
            sentimentList,
            pageNo,
            pageSize,
            totalPage,
            totalRecord,
            path
        }
    },
    ['receiveSearchCompanyLists'](state, {
        companyList,
        pageNo,
        pageSize,
        totalPage,
        totalRecord,
        path
    }) {
        state.searchCompanyLists = {
            companyList,
            pageNo,
            pageSize,
            totalPage,
            totalRecord,
            path
        }
    },
    ['receiveFollowCompanyLists'](state, {
        companyList,
        pageNo,
        pageSize,
        totalPage,
        totalRecord,
        path
    }) {
        state.followCompanyLists = {
            companyList,
            pageNo,
            pageSize,
            totalPage,
            totalRecord,
            path
        }
    },
    ['receiveCompanyDetailItems'](state, { companyDetail, path }) {
        state.companyDetailItems = {
            companyDetail,
            path
        }
    },
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
    ['getMonitorSummaryLists'](state) {
        return state.monitorSummaryLists
    },
    ['getSearchCompanyLists'](state) {
        return state.searchCompanyLists
    },
    ['getFollowCompanyLists'](state) {
        return state.followCompanyLists
    },
    ['getCompanyDetailItems'](state) {
        return state.companyDetailItems
    },
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
