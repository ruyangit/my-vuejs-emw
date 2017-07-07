<template>
    <div>
        <div class="forgot-bj">
        </div>
        <div class="user layout">
            <form @submit.prevent="validateSubmit('forgontPassForm')" data-vv-scope="forgontPassForm">
                <div class="user-modal" v-show="status">
                    <div class="modal-line">
                        <label for="">手机号码：</label>
                        <input :disabled="mobileDisabled" :class="{'input': true, 'is-danger': errors.has('forgontPassForm.mobile') }" type="tel" placeholder="请输入您的手机号码" v-validate="'required|phone'" v-model="forgontPassForm.mobile" name="mobile">
                        <span v-show="errors.has('forgontPassForm.mobile')" class="help-tip">{{errors.first('forgontPassForm.mobile')}}</span>
                    </div>
                    <div class="modal-line code">
                        <label for="">验证码：</label>
                        <input :class="{'input': true, 'is-danger': errors.has('forgontPassForm.validValue') }" type="tel" placeholder="请输入验证码" v-validate="'required'" v-model="forgontPassForm.validValue" name="validValue">
                        <!--<a @click="shortMessage()" href="javascript:;">获取验证码</a>-->
                        <CountDown :start='start' @countDown='start=false' @click.native='sendCode()'></CountDown>
                        <span v-show="errors.has('forgontPassForm.validValue')" class="help-tip">验证码不能为空</span>
                    </div>
                    <div class="modal-line">
                        <label for="">新密码：</label>
                        <input :class="{'input': true, 'is-danger': errors.has('forgontPassForm.newValue') }" type="tel" placeholder="请输入新密码" v-validate="'required|min:6|max:21'" v-model="forgontPassForm.newValue" name="newValue">
                        <span v-show="errors.has('forgontPassForm.newValue')" class="help-tip">请输入6-21位任意长度的密码</span>
                    </div>
                    <div class="modal-line">
                        <label for="">确认密码：</label>
                        <input :class="{'input': true, 'is-danger': errors.has('forgontPassForm.confirmValue') }" type="tel" placeholder="请输入确认密码" v-validate="'required|min:6|max:21|confirmed:newValue'" v-model="forgontPassForm.confirmValue" name="confirmValue">
                        <span v-show="errors.has('forgontPassForm.confirmValue')" class="help-tip">确认密码输入有误</span>
                    </div>
                    <button type="submit">确认更改</button>
                </div>
            </form>
            <div v-show="!status">
                <div style="text-align:center;margin:35px;">
                    <p>恭喜您，密码修改成功！</p>
                    <p>138XXXX0000</p>
                </div>
                <button class="btn" @click="backIndex()">返回登录</button>
            </div>
        </div>
    </div>
</template>
<script>
import api from '@api'
import CountDown from '@/components/CountDown'
export default {
    data() {
        return {
            start: false,
            status: true,
            mobileDisabled: false,
            forgontPassForm: {
                type: 'password',
                mobile: '',
                validValue: '',
                newValue: '',
            }
        }
    },
    components: {
        CountDown
    },
    methods: {
        backIndex() {
            this.$router.push({ path: '/' })
        },
        validateSubmit(name) {
            this.$validator.validateAll(name).then(result => {
                if (result) {
                    // eslint-disable-next-line
                    // this.handleSubmit();
                    this.status = false
                    return;
                }
            });
        },
        sendCode() {

            //前面发送ajax请求成功之后调用this.start = true开始短信倒计时
            this.$validator.validate('forgontPassForm.mobile', this.forgontPassForm.mobile).then(result => {
                if (result && !this.start) {

                    //发送短信验证码接口
                    this.shortMessage()
                }
            });
            // this.start = true
        },
        async shortMessage() {
            const { data: { status, message } } = await api.get('/user/shortMessage', this.forgontPassForm)
            if (status === 200) {
                this.mobileDisabled = true
                this.start = true
                return;
            }
        }
    }

}
</script>
<style>

.user .user-modal {
    position: relative;
    top: -150px;
    background-color: #fff;
    border: 1px solid #e5e5e5;
}
</style>
