<template>
    <div>
        <div id="bg">
            <img src="/static/images/bg.jpg">
        </div>
        <div class="login layout clear">
            <div class="login-box ">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                    <h1>签约企业登录</h1>
                    <el-form-item label="帐号" prop="mobile">
                        <el-input v-model="ruleForm.mobile" placeholder="请输入手机号码"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="ruleForm.password" placeholder="请输入账号密码"></el-input>
                    </el-form-item>
                    <button type="button" @click="submitForm('ruleForm')">登录</button>
                    <a href="javascript:void(0)">忘记密码</a>
                </el-form>
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
            ruleForm: {
                mobile: '',
                password: ''
            },
            rules: {
                mobile: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入账号密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.execLogin()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        async execLogin() {
            const { data: { status, message } } = await api.get('/user/login',this.ruleForm)
            if (status === 200) {
                // //登录成功获取用户信息
                this.$store.commit("global/isLogin", 'true')
                this.$store.dispatch("global/getUserInfo")
                let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                this.$router.push({
                    path: redirect
                })
            } else {
                alert('用户名密码输入有误！')
            }
        }
    }
}
</script>