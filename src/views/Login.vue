<template>
    <div>
        <div id="bg">
            <img src="/static/images/bg.jpg">
        </div>
        <div class="login layout clear">
            <form @submit.prevent="validateSubmit('loginForm')" data-vv-scope="loginForm">
                <div class="login-box ">
                    <h1>签约企业登录</h1>
                    <div class="form-item">
                        <label for="">账号</label>
                        <div class="form-item-content">
                            <input :class="{'input': true, 'is-danger': errors.has('loginForm.mobile') }" type="tel" placeholder="请输入您的手机号码" v-validate="'required'" v-model="loginForm.mobile" name="mobile">
                            <span v-show="errors.has('loginForm.mobile')" class="help-tip is-danger">手机号码不能为空</span>
                        </div>
                    </div>
                    <div class="form-item">
                        <label for="">密码</label>
                        <div class="form-item-content">
                            <input :class="{'input': true, 'is-danger': errors.has('loginForm.password') }" type="password" placeholder="请输入您的账号密码" v-validate="'required'" v-model="loginForm.password" name="password">
                            <span v-show="errors.has('loginForm.password')" class="help-tip is-danger">账号密码不能为空</span>
                        </div>
                    </div>
                    <button type="submit">登录</button>
                    <router-link to="/ForgotPass" tag="a">忘记密码</router-link>
                </div>
            </form>
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

export default {
    data() {
        return {
            loginForm: {
                mobile: '',
                password: ''
            }
        }
    },
    computed: {
        // formDirty() {
        //     return Object.keys(this.fields).some(key => this.fields[key].dirty);
        // }
    },
    methods: {
        validateSubmit(name) {
            this.$validator.validateAll(name).then(result => {
                if (result) {
                    // eslint-disable-next-line
                    this.handleSubmit();
                    return;
                }
            });
        },
        async handleSubmit() {
            const { data: { status, message } } = await api.get('/user/login', this.loginForm)
            if (status === 200) {
                // //登录成功获取用户信息
                this.$store.commit("global/isLogin", 'true')
                this.$store.dispatch("global/getUserInfo")
                let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                this.$router.push({
                    path: redirect
                })
            } else {
                alert('用户名密码输入有误!')
            }
        }
    }
}
</script>
<style>
.login-box .form-item {
    margin-bottom: 24px;
    vertical-align: top;
    zoom: 1;
}

.login-box .form-item:after {
    clear: both;
    visibility: hidden;
    font-size: 0;
    height: 0;
}

.login-box .form-item:after,
.login-box .form-item:before {
    content: "";
    display: table
}

.login-box .form-item .form-item-content {
    position: relative;
    line-height: 35px;
    font-size: 14px;
}

.login-box .is-danger {
    border-color: red;
}

.login-box .help-tip {
    position: absolute;
    top: 100%;
    left: 0;
    line-height: 1;
    margin: 10px auto;
    color: #ed3f14;
}
</style>
