<template>
    <a href="javascript:;">
        {{time | change}}</a>
</template>

<script>
let flag = false
export default {
    data() {
        return {
            time: '获取验证码',
        }
    },
    props: {
        start: {
            type: Boolean
        }
    },
    watch: {
        start(value, oldvalue) {
            if (value == true) {
                this.countDown()
            }
        }
    },
    methods: {
        countDown() {
            this.time = 3;
            let time = setInterval(() => {
                this.time--
                if (this.time == 0) {
                    this.$emit('countDown')
                    this.time = '获取验证码'
                    flag = true
                    clearInterval(time)
                }
            }, 1000)
        }
    },
    filters: {
        change(value) {
            if (!value) return ""
            if (!isNaN(value)) {
                if (flag == true) {
                    return `重新发送${value}s`
                }
                return value + 's'
            } else {
                return value
            }
        }
    }

}
</script>