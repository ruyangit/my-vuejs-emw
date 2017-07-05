<template>
    <div>
        <div id="bg">
            <img src="/static/images/bg.jpg">
        </div>
        <div class="login layout clear">
            <div class="login-box ">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
                    <h1>签约企业登录</h1>
                    <Form-item label="账号" prop="mobile">
                        <Input placeholder="请输入您的手机号码" v-model="formValidate.mobile"></Input>
                    </Form-item>
                    <!--<label for="">账号</label>
                            <input type="tel" placeholder="">-->
                    <!--<label for="">密码</label>
                            <input type="password" placeholder="请输入您的账号密码">-->
                    <Form-item label="密码" prop="password">
                        <Input placeholder="请输入您的账号密码" v-model="formValidate.password"></Input>
                    </Form-item>
                    <button type="button" @click="handleSubmit('formValidate')">登录</button>
                    <a href="javascript:void(0)">忘记密码</a>
                </Form>
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

export default {
    data() {
        return {
            formValidate: {
                mobile: '',
                password: ''
            },
            ruleValidate: {
                mobile: [
                    { required: true, message: '请输入手机号码' },
                ],
                password: [
                    { required: true, message: '请输入账号密码' }
                ]
            }
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.execLogin()
                } else {
                    // this.$Notice.error('请输入完整的表单信息！');
                    // this.$Notice.error({
                    //     title: '请输入完整的表单信息！'
                    // });
                }
            });
        },
        async execLogin() {
            const { data: { status, message } } = await api.get('/user/login', this.ruleForm)
            if (status === 200) {
                // //登录成功获取用户信息
                this.$store.commit("global/isLogin", 'true')
                this.$store.dispatch("global/getUserInfo")
                let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                this.$router.push({
                    path: redirect
                })
            } else {
                this.$Message.error('用户名密码输入有误！');
            }
        }
    }
}
</script>
<style>
.ivu-form .ivu-form-item-label {
    font-size: 14px;
}

.ivu-input {
    border-radius: 0px;
}

.ivu-form-item-error .ivu-input {
    border: 0px;
    border-bottom: 1px solid #ed3f14;
}
</style>
