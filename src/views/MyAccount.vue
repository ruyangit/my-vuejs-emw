<template>
    <div>
        <div class="banner-bj help-bj">
            <div class="banner layout">
                <h1>用户中心</h1>
                <h2>User center</h2>
            </div>
        </div>
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
                <a href="password.html">修改</a>
            </div>
            <div class="user-line">
                <label for="">手机号</label>
                <input type="text" value="138xxxx0928" disabled>
                <a href="tel.html">修改</a>
            </div>
            <div class="user-line">
                <label for="">绑定邮箱</label>
                <span>ADMIN@GUOXUAN.COM</span>
                <a href="email.html">修改</a>
            </div>
            <div class="user-line">
                <label for="">绑定邮箱</label>
                <span>2017/06/20 12:30:21</span>
            </div>
        </div>
    
    </div>
</template>
<script> 
export default {
    methods: {
        logout() {
            this.$store.commit('global/logout')
            this.$router.push({ path: "/" })
        }
    }
}
</script>