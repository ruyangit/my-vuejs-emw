<template>
    <div class="user layout">
        <h1>修改密码</h1>
        <div class="user-modal" v-show="status">
            <div class="modal-line">
                <label for="">原登录密码：</label>
                <input type="password">
            </div>
            <div class="modal-line">
                <label for="">新登录密码：</label>
                <input type="password">
            </div>
            <div class="modal-line">
                <label for="">确认登录密码：</label>
                <input type="password">
            </div>
            <button @click="resetPass()">确认修改</button>
        </div>
        <div v-show="!status">
            <div style="text-align:center;margin:35px;">
                <span>恭喜您，密码修改成功！</span>
            </div>
            <button class="btn" @click="backIndex()">返回首页</button>
        </div>
    </div>
</template>
<script> 
export default {
    data() {
        return {
            status: true
        }
    },
    methods: {
        backIndex(){
            this.$router.push({path:'/'})
        },
        resetPass(){
            this.status = false
        }
    }
}
</script>