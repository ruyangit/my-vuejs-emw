import Vue from 'vue'
import Vuex from 'vuex'

import global from './modules/global'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        // douban: {
        //     namespaced: true,
        //     modules: {
        //         movie: movie
        //     }
        // },
        global: {
            namespaced: true,
            ...global,
            modules: {
                // category: globalCategory,
                // comment: globalComment
            }
        }
    }
})