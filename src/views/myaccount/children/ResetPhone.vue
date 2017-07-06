<template>
    <div class="user layout">
        <h1>手机号更改</h1>
    
        <div class="user-modal" v-show="status">
            <p>短信验证码已发送至手机138xxxx0921，请填写手机上的验证码，如长时间未收到，请点击这里
                <a href="javascript:void(0)">重发</a>
            </p>
            <div class="modal-line">
                <label for="">原手机验证码：</label>
                <input type="tel">
            </div>
            <div class="modal-line">
                <label for="">新手机号码：</label>
                <input type="tel">
            </div>
            <div class="modal-line">
                <label for="">新手机验证码：</label>
                <input type="tel">
            </div>
            <button @click="resetPhone()">确认更改</button>
        </div>
        <div v-show="!status">
            <div style="text-align:center;margin:35px;">
                <p>恭喜您，手机号码修改成功！</p>
                <p>138XXXX0000</p>
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