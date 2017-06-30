<template>
    <div>
        <button @click="submit()">登录</button>
    </div>
</template>
<script>
import api from '@api'
import { mapGetters } from 'vuex'
export default {
    methods: {
        async submit() {
            const { data: { data, status } } = await api.get('/user/login')
            if (status === 200) {
                this.$store.commit('global/token', { token: data.token })
                let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                this.$router.push({
                    path: redirect
                })
            }
        }
    }
}
</script>