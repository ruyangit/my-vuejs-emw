import api from '@api'

const state = {
    monitorSummaryLists: {
        summary: {},
        monitorList: [],
        // changeList: [],
        // riskList: [],
        // sentimentList: [],
        pageNo: 0,
        pageSize: 0,
        totalPage: 0,
        totalRecord: 0,
        path: ''
    },
    monitorSummaryDetailItems: {
        change: {},
        bond: {},
        dishonest: {},
        penalty: {},
        path: ''
    },
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
        if (data && status === 'success') {
            commit('receiveMonitorSummaryLists', {
                ...config,
                ...data,
                path
            })
        }
    },
    async['getMonitorSummaryMoreLists']({ commit, state, rootState: { global, route: { fullPath } } }, config) {
        const path = fullPath
        const { data: { status, data } } = await api.post('/monitor/getSummaryMore.do', { ...config })
        if (data && status === 'success') {
            commit('receiveMonitorSummaryMoreLists', {
                ...config,
                ...data,
                path
            })
        }
    },
    async['getSearchCompanyLists']({ commit, state, rootState: { global, route: { fullPath } } }, config) {
        const path = fullPath
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
    },
    async['getMonitorSummaryDetailItems']({ commit, state, rootState: { global, route: { fullPath } } }, config) {
        const path = fullPath
        const { data: { status, data } } = await api.post('/monitor/getSummaryDetail.do', { ...config })
        if (data && status === 'success') {
            commit('receiveMonitorSummaryDetailItems', {
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
        monitorList,
        // changeList,
        // riskList,
        // sentimentList,
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
            monitorList,
            // changeList,
            // riskList,
            // sentimentList,
            pageNo,
            pageSize,
            totalPage,
            totalRecord,
            path
        }

        // console.log(state.monitorSummaryLists.summary)
    },
    ['receiveMonitorSummaryMoreLists'](state, {
        // summary,
        monitorList,
        pageNo,
        pageSize,
        totalPage,
        totalRecord,
        path
    }) {
        //  console.log(state.monitorSummaryLists.summary)

        if (pageNo === 1) {
            monitorList = [].concat(monitorList)
        } else {
            monitorList = state.monitorSummaryLists.monitorList.concat(monitorList)
        }

        state.monitorSummaryLists = {
            summary: state.monitorSummaryLists.summary,
            monitorList,
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
        // console.log(pageNo)
        if (pageNo === 1) {
            companyList = [].concat(companyList)
        } else {
            companyList = state.searchCompanyLists.companyList.concat(companyList)
        }
        // console.log(companyList)
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
    ['receiveMonitorSummaryDetailItems'](state, {
        change,
        bond,
        dishonest,
        penalty,
        path
     }) {
        state.monitorSummaryDetailItems = {
            change,
            bond,
            dishonest,
            penalty,
            path
        }
    },

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
    ['getMonitorSummaryDetailItems'](state) {
        return state.monitorSummaryDetailItems
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
