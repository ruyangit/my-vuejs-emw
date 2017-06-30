<template>
    <div id="app">
        <header>
            <nav>
                <router-link to="/" exact>
                    <img class="logo" src="/static/images/logo.png" alt="logo">
                </router-link>
                <div v-if="isLogin">
                    <router-link :to="item.url" v-for="(item,index) in array" :key="index" v-text="item.text"></router-link>
                </div>
            </nav>
        </header>
        <transition name="fade" mode="out-in">
            <router-view class="view"></router-view>
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
                url: '/ConcernEnterprise'
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
        if (this.global.token) {
            this.isLogin = true
        }
    },
    watch: {
        'global.token'() {
            if (this.global.token) {
                this.isLogin = true
            }else{
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
    color: red
}
</style>
