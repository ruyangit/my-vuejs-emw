<template>
    <div class="user layout">
        <h1>绑定邮箱修改</h1>

        <div class="user-modal" v-show="status">
            <p>邮箱验证码已发送至手机{{userInfo.mobile | formatPhone}}，请填写邮箱的验证码，如长时间未收到，请点击这里
                <CountDown :start='start' @countDown='start=false' @click.native='sendCode()'></CountDown>
            </p>
            <form @submit.prevent="validateSubmit('myForm', userInfo.email)" data-vv-scope="myForm">
                <div class="modal-line">
                    <label >邮箱验证码：</label>
                    <input :class="{'input': true, 'is-danger': errors.has('myForm.validValue') }" type="tel" placeholder="请输入邮箱验证码" v-validate="'required'" v-model="myForm.validValue" name="validValue">
                    <span v-show="errors.has('myForm.validValue')" class="help-tip">邮箱验证码不能为空</span>
                </div>
                <div class="modal-line">
                    <label >新邮箱地址：</label>
                    <input :class="{'input': true, 'is-danger': errors.has('myForm.newValue') }" type="tel" placeholder="请输入新邮箱地址" v-validate="'required|email'" v-model="myForm.newValue" name="newValue">
                    <span v-show="errors.has('myForm.newValue')" class="help-tip">请输入正确的电子邮箱</span>
                </div>
                <button type="submit">发送验证邮件</button>
            </form>
        </div>
        <div v-show="!status">
            <div style="text-align:center;margin:35px;">
                <p>恭喜您，邮箱绑定成功！</p>
                <p>{{myForm.newValue | formatEmail}}</p>
            </div>
            <button class="btn" @click="backIndex()">返回首页</button>
        </div>
    </div>
</template>
<script>
import myMixin from './_mixin/_mixin'

export default {
    mixins: [myMixin]
}
</script>
