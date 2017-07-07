<template>
    <div class="user layout">
        <div class="user-line">
            <label for="">所属企业</label>
            <input type="text" value="国轩高科股份有限公司" disabled>
        </div>
        <div class="user-line">
            <label for="">用户名称</label>
            <input type="text" value="GUOXUANGAOKE" disabled>
        </div>
        <div class="user-line">
            <label for="">登录密码</label>
            <input type="password" value="12345678" disabled>
            <router-link to="/MyAccount/ResetPass">修改</router-link>
        </div>
        <div class="user-line">
            <label for="">手机号</label>
            <input type="text" value="138xxxx0928" disabled>
            <router-link to="/MyAccount/ResetPhone">修改</router-link>
        </div>
        <div class="user-line">
            <label for="">绑定邮箱</label>
            <span>ADMIN@GUOXUAN.COM</span>
            <router-link to="/MyAccount/ResetEmail">修改</router-link>
        </div>
        <div class="user-line">
            <label for="">绑定邮箱</label>
            <span>2017/06/20 12:30:21</span>
        </div>
    </div>
</template>
<script> 
export default {
    methods: {

    }
}
</script>