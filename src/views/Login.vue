<template>
    <div>
        <div id="bg">
            <img src="static/images/bg.jpg">
        </div>
        <div class="login layout clear">
            <form @submit.prevent="validateSubmit('loginForm')" data-vv-scope="loginForm">
                <div class="login-box zb-login-box">
                    <h1>签约企业登录</h1>
                    <div class="form-item">
                        <div class="form-item-content loginform">
                            <input :class="{'input': true, 'is-danger': errors.has('loginForm.userName') }" type="tel" placeholder="请输入您的帐号" v-validate="'required'" v-model="loginForm.userName" name="userName">
                            <span v-show="errors.has('loginForm.userName')" class="help-tip is-danger">帐号不能为空</span>
                        </div>
                    </div>
                    <div class="form-item">
                        <div class="form-item-content loginform">
                            <input :class="{'input': true, 'is-danger': errors.has('loginForm.passWord') }" type="passWord" placeholder="请输入您的账号密码" v-validate="'required'" v-model="loginForm.passWord" name="passWord">
                            <span v-show="errors.has('loginForm.passWord')" class="help-tip is-danger">账号密码不能为空</span>
                        </div>
                    </div>
                    <div class="form-item" v-if="loginCode">
                        <div class="form-item-content">
                            <img @click="verifCode()" :src="imageCode" style="width:80px;height:30px;position: absolute;right:0px;top:2px;">
                            <input :class="{'input': true, 'is-danger': errors.has('loginForm.loginCode') }" type="tel" placeholder="请输入您的验证码" v-validate="'required'" v-model="loginForm.loginCode" name="loginCode">
                            <span v-show="errors.has('loginForm.loginCode')" class="help-tip is-danger">验证码不能为空</span>
                        </div>
                    </div>
                    <button type="submit" :disabled="btnDisabled">登录</button>
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
import { baseUrl } from '@api/env'
export default {
    data() {
        return {
            btnDisabled: false,
            loginCode: false,
            imageCode: '',
            loginForm: {
                userName: '',
                passWord: '',
                loginCode:''
            }
        }
    },
    computed: {
        // formDirty() {
        //     return Object.keys(this.fields).some(key => this.fields[key].dirty);
        // }
    },
    mounted() {
        this.verifCode()
    },
    methods: {
        validateSubmit(name) {
            this.$validator.validateAll(name).then(result => {
                if (result) {
                    // eslint-disable-next-line
                    this.btnDisabled = true
                    this.handleSubmit();
                    return;
                }
                this.btnDisabled = false
            });
        },
        verifCode() {
            this.imageCode = baseUrl + '/user/getCheckCodeImage.do?checkType=login&userName=' + this.loginForm.userName+'&_t='+ new Date().getTime();
        },
        async handleSubmit() {
            // console.log(this.loginForm)
            const { data: { status, message, data } } = await api.post('/user/login.do', this.loginForm)
            if (status === 'success') {
                //登录成功获取用户信息
                this.$store.commit("global/isLogin", 'true')
                this.$store.dispatch("global/getUserInfo")
                let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                this.$router.push({
                    path: redirect
                })
            } else {
                this.verifCode()
                if (data && data.needValid == 'true') {
                    this.loginCode = true
                }
            }
            this.btnDisabled = false
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
/*验证提示框toastr样式修改  */
.toast-top-center {
    top: 70px;
}
.form-item .loginform input {
    width: 353px;
    height: 58px;
    border: 1px solid #bbb;
    border-radius: 5px;
    padding-left: 15px;
}
.zb-login-box {
    height: 450px;
    background: pink;
}
.login-box .form-item .loginform {
    margin-top: 10px;
}
</style>
