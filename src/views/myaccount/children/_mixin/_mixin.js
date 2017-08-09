/**
 * Created by cymin on 2017/8/7.
 */

import {mapGetters} from 'vuex'
import CountDown from '@/components/CountDown'
import {userModify} from '@/api/user'

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
        type: 'email',
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
          this.myForm.type = this.$route.params.type
          this.myForm.oldValue = oldValue
          const parm = Object.assign(this.myForm, this.codeInfo)
          userModify(Object.assign(parm)).then(({data: { status, data }}) => {
            if (status === 'success') {
              this.$store.commit('global/updUserInfo', {key: this.myForm.type, val: this.myForm.newValue})
              this.status = false
            }
          })
        }
      });
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
