<template>
    <div class="user layout">
        <h1>绑定邮箱修改</h1>
    
        <div class="user-modal" v-show="status">
            <p>邮箱验证码已发送至手机138xxxx0921@163.com，请填写邮箱的验证码，如长时间未收到，请点击这里
                <a href="javascript:void(0)">重发</a>
            </p>
            <div class="modal-line">
                <label for="">邮箱验证码：</label>
                <input type="tel">
            </div>
            <div class="modal-line">
                <label for="">新邮箱地址：</label>
                <input type="tel">
            </div>
            <button @click="resetPhone()">发送验证邮件</button>
        </div>
        <div v-show="!status">
            <div style="text-align:center;margin:35px;">
                <p>恭喜您，邮箱绑定成功！</p>
                <p>138XXXX0000@163.com</p>
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
        backIndex() {
            this.$router.push({ path: '/' })
        },
        resetPhone() {
            this.status = false
        }
    }

}
</script>