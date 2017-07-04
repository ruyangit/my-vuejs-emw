<template>
    <div>
        <div id="bg">
            <img src="/static/images/bg.jpg">
        </div>
        <div class="login layout clear">
            <div class="login-box ">
                <h1>签约企业登录</h1>
                <label for="">账号</label>
                <input type="tel" placeholder="请输入手机号码">
                <label for="">密码</label>
                <input type="password" placeholder="请输入账号密码">
                <button @click="submit()">登录</button>
                <a href="javascript:void(0)">忘记密码</a>
            </div>
        </div>
        <div class="service layout">
            <div class="service-process">
                <span>服务流程</span>
                <i style="left: 0;"></i>
                <i style="right: 0;"></i>
            </div>
            <div class="ser-block clear">
                <i class="icon1"></i>
                <i class="icon2"></i>
                <i class="icon3"></i>
            </div>
            <p>业务咨询热线：021-34611615</p>
        </div>
    
    </div>
</template>
<script>
import api from '@api'
// import { mapGetters } from 'vuex'
export default {
    // computed: {
    //     ...mapGetters({
    //         userInfo: 'global/getUserInfo'
    //     })
    // },
    methods: {
        async submit() {
            const { data: { status, message } } = await api.get('/user/login')
            if (status === 200) {
                // //登录成功获取用户信息
                this.$store.commit("global/isLogin", 'true')
                this.$store.dispatch("global/getUserInfo")
                let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                this.$router.push({
                    path: redirect
                })
            }else{
                alert('用户名密码输入有误！')
            }
        }
    },
    beforeEnter: (to, from, next) => {
        // ...
        console.log(to);
    }
}
</script>