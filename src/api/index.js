// import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import { baseUrl, productPath } from './env'

axios.interceptors.request.use(config => {
    store.dispatch("global/gProgress", 50)
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => response, error => {
    var response = error.response
    console.error(error)
    return Promise.resolve(error)
})

function checkStatus(response) {
    store.dispatch("global/gProgress", 100)
    if (response && (response.status === 200 || response.status === 304)) {
        return response
    }
    return {
        data: {
            status: -1,
            message: response.statusText,
            data: ''
        }
    }
}

function checkCode(res) {
    console.warn(res)
    if (res.data.status != 'success') {
        console.warn(res.data.message || '系统繁忙，请稍后再试')
        store.dispatch('global/showMsg', res.data.message || '系统繁忙，请稍后再试')
        if (res.data.message === 'session_out_time') {
            store.commit("global/logout")
            window.location.href = productPath + "/index.html"
        }
    }
    return res
}

export default {
    post(url, data) {
        return axios({
            method: 'POST',
            url: baseUrl + url,
            data: qs.stringify(data),
            timeout: 30000,
            //服务端不支持
            // headers: {
            // 'X-Requested-With': 'XMLHttpRequest',
            // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            // }
        }).then(checkStatus).then(checkCode)
    },
    get(url, params) {
        return axios({
            method: 'GET',
            url: baseUrl + url,
            params,
            timeout: 30000,
            //服务端不支持
            // headers: {
            //     'X-Requested-With': 'XMLHttpRequest'
            // }
        }).then(checkStatus).then(checkCode)
    }
}
