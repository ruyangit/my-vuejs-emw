<template>
    <div class="user layout">
        <div class="user-line">
            <label>企业名称</label>
            <input type="text" disabled v-model="userInfo.companyName">
        </div>
        <div class="user-line">
            <label>用户名称</label>
            <input type="text"  v-model="userInfo.userName" disabled>
        </div>
        <div class="user-line">
            <label>登录密码</label>
            <input type="password" value="12345678" disabled>
            <router-link :to="{ name: 'ResetPass', params: { type: 'password' }}">修改</router-link>
        </div>
        <div class="user-line">
            <label>手机号</label>
            <!-- <input type="text" v-model="userInfo.mobile" disabled> -->
            <span>{{userInfo.mobile | formatPhone}}</span>
            <router-link :to="{ name: 'ResetPhone', params: { type: 'mobile' }}">修改</router-link>
        </div>
        <div class="user-line">
            <label>绑定邮箱</label>
            <span v-text="userInfo.email"></span>
            <router-link :to="{ name: 'ResetEmail', params: { type: 'email' }}">修改</router-link>
        </div>
        <div class="user-line">
            <label>创建时间</label>
            <span v-text="userInfo.createDt"></span>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            userInfo: 'global/getUserInfo'
        })
    },

}
</script>
