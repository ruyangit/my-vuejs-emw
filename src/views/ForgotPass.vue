<template>
    <div>
        <div class="forgot-bj">
        </div>
        <div class="user layout">
            <form @submit.prevent="validateSubmit('forgontPassForm')" data-vv-scope="forgontPassForm">
                <div class="user-modal userBox-shadow" v-show="status">
                    <div class="modal-line">
                        <label>手机号码：</label>
                        <input :readonly="mobileReadonly" :class="{'input': true, 'is-danger': errors.has('forgontPassForm.mobile') }" type="tel" placeholder="请输入您的手机号码" v-validate="'required|phone'" v-model="forgontPassForm.mobile" name="mobile">
                        <span v-show="errors.has('forgontPassForm.mobile')" class="help-tip">{{errors.first('forgontPassForm.mobile')}}</span>
                    </div>
                    <div class="modal-line code">
                        <label>验证码：</label>
                        <input :class="{'input': true, 'is-danger': errors.has('forgontPassForm.validValue') }" type="tel" placeholder="请输入验证码" v-validate="'required'" v-model="forgontPassForm.validValue" name="validValue">
                        <!--<a @click="shortMessage()" href="javascript:;">获取验证码</a>-->
                        <CountDown :start='start' @countDown='start=false' @click.native='sendCode()'></CountDown>
                        <span v-show="errors.has('forgontPassForm.validValue')" class="help-tip">验证码不能为空</span>
                    </div>
                    <div class="modal-line">
                        <label>新密码：</label>
                        <input :class="{'input': true, 'is-danger': errors.has('forgontPassForm.newValue') }" type="password" placeholder="请输入新密码" v-validate="'required|min:6|max:21'" v-model="forgontPassForm.newValue" name="newValue">
                        <span v-show="errors.has('forgontPassForm.newValue')" class="help-tip">请输入6-21位任意长度的密码</span>
                    </div>
                    <div class="modal-line">
                        <label>确认密码：</label>
                        <input :class="{'input': true, 'is-danger': errors.has('forgontPassForm.confirmValue') }" type="password" placeholder="请输入确认密码" v-validate="'required|min:6|max:21|confirmed:newValue'" v-model="forgontPassForm.confirmValue" name="confirmValue">
                        <span v-show="errors.has('forgontPassForm.confirmValue')" class="help-tip">确认密码输入有误</span>
                    </div>
                    <button type="submit">确认更改</button>
                </div>
            </form>
            <div v-show="!status">
                <div style="text-align:center;margin:35px;">
                    <p>恭喜您，密码修改成功！</p>
                    <p>{{forgontPassForm.mobile | formatPhone}}</p>
                </div>
                <button class="btn" @click="backIndex()">返回登录</button>
            </div>
        </div>
    </div>
</template>
<script>
import {fogetPwd} from '@api/user'
import CountDown from '@/components/CountDown'
export default {
    data() {
        return {
            start: false,
            status: true,
            mobileReadonly: false,
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
                  fogetPwd(this.forgontPassForm).then(({data: { status, data }}) => {
                    if (status === 'success') {
                      this.status = false
                    }
                  })
                }
            });
        },
        sendCode () {
            //前面发送ajax请求成功之后调用this.start = true开始短信倒计时
            this.$validator.validate('forgontPassForm.mobile', this.forgontPassForm.mobile).then(result => {
                if (result && !this.start) {
                    //发送短信验证码接口
                    this.shortMessage()
                }
            });
        },
       shortMessage () {
            const mobile = this.forgontPassForm.mobile
            const operateType = '020'
            const fun = this.initCountDown
            this.$store.dispatch('global/sendCode', {mobile, operateType, fun})
        },
        initCountDown () {
          this.mobileReadonly = true
          this.start = true
        }
    }
  }
</script>
<style scoped>

.user .user-modal {
    position: relative;
    top: -150px;
    background-color: #fff;
    border: 1px solid #e5e5e5;
}
.user .userBox-shadow {
    -webkit-box-shadow: 0 0 10px #ccc;
    -moz-box-shadow: 0 0 10px #ccc;
    -ms-box-shadow: 0 0 10px #ccc;
    -o-box-shadow: 0 0 10px #ccc;
    box-shadow: 0 0 10px #ccc;
}
</style>
