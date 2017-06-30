<template>
    <div>
        myaccount
        <button @click="logout()">退出</button>
    </div>
</template>
<script> 
export default {
    methods: {
        logout() {
            this.$store.commit('global/logout')
            this.$router.push({ path: "/" })
        }
    }
}
</script>