<template>
    <div class="user layout">
        <h1>手机号更改</h1>

        <div class="user-modal" v-show="status">
            <p>短信验证码已发送至手机{{userInfo.mobile | formatPhone}}，请填写手机上的验证码，如长时间未收到，请点击这里
                <CountDown :start='start' @countDown='start=false' @click.native='sendCode()'></CountDown>
            </p>
            <form @submit.prevent="validateSubmit('myForm', userInfo.mobile)" data-vv-scope="myForm">
                <div class="modal-line">
                    <label>原手机验证码：</label>
                    <input :readonly="oldValidReadonly" :class="{'input': true, 'is-danger': errors.has('myForm.oldValue') }" type="tel" placeholder="请输入原手机验证码" v-validate="'required'" v-model="myForm.oldValue" name="oldValue">
                    <span v-show="errors.has('myForm.oldValue')" class="help-tip">原手机验证码不能为空</span>
                </div>
                <div class="modal-line code">
                    <label>新手机号码：</label>
                    <input :readonly="newMobileReadonly" :class="{'input': true, 'is-danger': errors.has('myForm.newValue') }" type="tel" placeholder="请输入新手机号码" v-validate="'required|phone'" v-model="myForm.newValue" name="newValue">
                    <CountDown :start='newstart' @countDown='newstart=false' @click.native='sendNewCode()'></CountDown>
                    <span v-show="errors.has('myForm.newValue')" class="help-tip">请输入正确的手机号码</span>
                </div>
                <div class="modal-line">
                    <label>新手机验证码：</label>
                    <input :class="{'input': true, 'is-danger': errors.has('myForm.validValue') }" type="tel" placeholder="请输入新手机验证码" v-validate="'required'" v-model="myForm.validValue" name="validValue">
                    <span v-show="errors.has('myForm.validValue')" class="help-tip">新手机验证码不能为空</span>
                </div>
                <button type="submit">确认更改</button>
            </form>
        </div>
        <div v-show="!status">
            <div style="text-align:center;margin:35px;">
                <p>恭喜您，手机号码修改成功！</p>
                <p>{{myForm.newValue | formatPhone}}</p>
            </div>
            <button class="btn" @click="backIndex()">返回首页</button>
        </div>
    </div>
</template>
<script>
import myMixin from './_mixin/_mixin'
export default {
    data() {
        return {
            newstart: false,
            oldValidReadonly: false,
            newMobileReadonly: false
        }
    },
    mixins: [myMixin],
    methods: {
        sendNewCode() {
             //前面发送ajax请求成功之后调用this.start = true开始短信倒计时
             this.$validator.validate('myForm.newValue', this.myForm.newValue).then(result => {
                if (result && !this.newstart) {
                    //发送短信验证码接口

                    this.getCode({mobile: this.myForm.newValue}, this.initNewCountDown)

                }
            });
        },
        initNewCountDown () {
          this.newstart = true
          this.oldValidReadonly = true
          this.newMobileReadonly = true
        }
    }

}
</script>
