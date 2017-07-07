import Vue from 'vue'
import Vuex from 'vuex'

import global from './modules/global'
import frontendMain from './modules/frontend-main'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        frontend: {
            namespaced: true,
            modules: {
                main: frontendMain
            }
        },
        global: {
            namespaced: true,
            ...global,
            modules: {
            }
        }
    }
})