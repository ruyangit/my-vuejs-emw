<template>
    <div id="app">
        <div class="top clear">
            <header class="layout">
                <img src="/static/images/logo.png" alt="" class="logo">
                <span class="ml15">企业监测预警系统</span>
                <nav class="menu">
                    <ul class="nav" v-if="isLogin">
                        <li v-for="(item,index) in array" :key="index">
                            <router-link :to="item.url" v-text="item.text" tag="a"></router-link>
                        </li>
                        <li id="pop" @mouseover="isLayer=true" @mouseout="isLayer=false">
                            <router-link to="/MyAccount/Profile" class="my-accout" tag="a">
                                <i class="t"></i>
                                <span>我的账户</span>
                                <div id="accout-layer" v-show="isLayer" v-if="userInfo">
                                    <div class="accout-layer">
                                        <div class="arr"></div>
                                        <div class="ac-header">
                                            <img src="/static/images/headscu.jpg">
                                            <h3 v-text="userInfo.userName"></h3>
                                            <p>欢迎来到企业监测预警中心</p>
                                        </div>
                                        <div class="ac-body">
                                            <p v-text="'所属企业：'+userInfo.companyName"></p>
                                            <p v-text="'手机号：'+userInfo.mobile"></p>
                                            <p v-text="'邮箱：'+userInfo.email"></p>
                                        </div>
                                        <div class="ac-footer">
                                            <button @click="logout()">退出登录</button>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
        <transition name="fade" mode="out-in">
            <router-view :key="key" class="router"></router-view>
        </transition>
    </div>
</template>
<script>
import './utils/validator.js'
import { mapGetters } from 'vuex'
import NProgress from 'nprogress'
export default {
    name: 'app',
    data() {
        return {
            isLogin: false,
            isLayer: false,
            array: [{
                text: '预警中心',
                url: '/WarningConsole'
            }, {
                text: '关注企业',
                url: '/FollowCompany'
            }, {
                text: '帮助中心',
                url: '/HelpCenter'
            }]
        }
    },
    computed: {
        ...mapGetters({
            global: 'global/getGlobal',
            userInfo: 'global/getUserInfo'
        }),
        key() {
            return this.$route.path.replace(/\//g, '_')
        }
    },
    mounted() {
        this.isLogin = this.global.isLogin
    },
    watch: {
        'global.progress'(val) {
            // NProgress.configure({ showSpinner: false })
            if (val === 0) {
                NProgress.set(0)
                NProgress.start()
            } else if (val === 100) {
                NProgress.done()
            } else {
                NProgress.set(val / 100)
                NProgress.start()
            }
        },
        'global.isLogin'() {
            this.isLogin = this.global.isLogin
        }
    },
    methods: {
        logout() {
            this.$store.commit("global/logout")
            // this.$router.path('/Login')
            window.location.href = "/"
        }
    }
}
</script>
<style>
.router-link-exact-active {
    border-bottom: 2px solid #49a0d5;
}

div.toast-message {
    font-size: 14px;
    color: #fff;
}
</style>
