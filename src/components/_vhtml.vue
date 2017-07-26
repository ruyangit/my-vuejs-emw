<template>
    <div v-html="html"></div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'HtmlSit',
    data() {
        return {
            html: ''
        }
    },
    beforeRouteEnter(to, from, next) {
        console.log(1)
        axios.get('/static/html/' + to.params.file).then(response => {
            next(vm => {
                vm.html = response.data
                vm.$nextTick(() => vm.$emit('loaded'))
            })
        })
    },
    beforeRouteUpdate(to, from, next) {
        console.log(2)
        this.$emit('loaded', 1)
        axios.get('/static/html/' + to.params.file).then(response => {
            this.html = response.data
            this.$nextTick(() => {
                this.$emit('loaded', 0)
                next()
            })
        })
    }
}
</script>