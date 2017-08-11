/**
 * Created by cymin on 2017/8/7.
 */

import {mapGetters} from 'vuex'
import CountDown from '@/components/CountDown'
import {modifyEmail, modifyMobile} from '@/api/user'

export default {
  data () {
    return {
      start: false,
      typeValue: {
        password: '020',
        mobile: '021',
        email: '022'
      },
      status: true,
      myForm: {
        oldValue: '',
        newValue: '',
        validValue: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'global/getUserInfo',
      codeInfo: 'global/getCodeInfo'
    })
  },
  methods: {
    initCountDown () {
     this.start = true
    },
    // 发送验证码
    getCode({mobile, userName}, fun) {
      const operateType = this.typeValue[this.$route.params.type]
      this.$store.dispatch('global/sendCode', {mobile, userName, operateType, fun})
    },

    backIndex () {
      this.$router.push({ path: '/' })
    },

    sendCode() {
      const fun = this.initCountDown
      this.getCode(this.userInfo, fun)
    },

    // 验证通过提交数据
    validateSubmit(name, oldValue) {
      this.$validator.validateAll(name).then(result => {
        if (result) {
          if ('email' === this.$route.params.type) {
            this.myForm.oldValue = oldValue
            const parm = Object.assign(this.myForm, this.getCodeInfo(this.userInfo.mobile))
            modifyEmail(parm).then(({data: { status, data }}) => {
              if (status === 'success') {
                this.stateChange()
              }
            })
          } else if ('mobile' === this.$route.params.type) {
            const  {codeUuid: oldcodeUuid, mobile: oldmobile} = this.getCodeInfo(this.userInfo.mobile)
            const  newcodeUuid = this.getCodeInfo(this.myForm.newValue)
            const parm = Object.assign(
                                        this.myForm,
                                        {codeUuid: newcodeUuid.codeUuid , mobile: newcodeUuid.mobile},
                                        {validValue: this.myForm.validValue},
                                        {oldcodeUuid, oldmobile},
                                        {oldvalidValue: this.myForm.oldValue},
                                        {userName: this.userInfo.userName},
                                        {oldValue: this.userInfo.mobile}
                                      )
            modifyMobile(parm).then(({data: { status, data }}) => {
              if (status === 'success') {
                this.stateChange()
              }
            })
          }
        }
      });
    },
    getCodeInfo (val) {
      let myCodeInfo = {}
      this.codeInfo.find((item) => {
        Object.keys(item).forEach((key) => {
          if (key === val) {
            Object.assign(myCodeInfo, item[key])
          }
        })
      })
      return myCodeInfo
    },
    stateChange () {
      this.$store.commit('global/updUserInfo', {key: this.$route.params.type, val: this.myForm.newValue})
      this.status = false
    }
  },
  components: {
    CountDown
  },
  created() {
    // 获取手机验证码
    this.getCode(this.userInfo)
  }
}
