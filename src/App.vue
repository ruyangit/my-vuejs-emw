<template>
    <div id="app">
        <div class="top clear">
            <header class="layout">
                <img src="/static/images/logo.png" alt="">
                <h1>企业监测预警系统</h1>
                <nav class="menu">
                    <ul class="nav" v-if="isLogin">
                        <li v-for="(item,index) in array" :key="index">
                            <router-link :to="item.url" v-text="item.text" tag="a"></router-link>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
        <transition name="fade" mode="out-in">
            <router-view :key="key"></router-view>
        </transition>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'app',
    data() {
        return {
            isLogin: false,
            array: [{
                text: '预警中心',
                url: '/WarningConsole'
            }, {
                text: '关注企业',
                url: '/FollowCompany'
            }, {
                text: '帮助中心',
                url: '/HelpCenter'
            }, {
                text: '我的账户',
                url: '/MyAccount'
            }]
        }
    },
    computed: {
        ...mapGetters({
            global: 'global/getGlobal'
        }),
        key() {
            return this.$route.path.replace(/\//g, '_')
        }
    },
    mounted() {
        if (this.global.userInfo) {
            this.isLogin = true
        }
    },
    watch: {
        'global.userInfo'() {
            if (this.global.userInfo) {
                this.isLogin = true
            } else {
                this.isLogin = false
            }
        }
    }
}
</script>
<style lang="less">
.logo {
    height: 30px;
}

.router-link-exact-active {
    border-bottom: 2px solid #49a0d5;
}
</style>
