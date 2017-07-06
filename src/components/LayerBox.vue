<!-- borrowed from Nuxt! -->

<template>
    <div class="event-layer" v-show="layerBoxVisible">
        <div class="cover"></div>
        <div class="event-con" :style="'width:'+width+'px'">
            <slot></slot>
            <button v-if="isClose" class="btn btn-cancel" @click="close()">关闭</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LayerBox',
    props: {
        isClose: {
            type: Boolean,
            default: true
        },
        value: {
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            default: '800'
        },
    },
    data() {
        return {
            layerBoxVisible: this.value
        }
    },
    watch: {
        value(val) {
            this.layerBoxVisible = val
        }
    },
    methods: {
        close() {
            this.layerBoxVisible = false
            this.$emit('input', false)
        }
    }
}
</script>

<style scoped>

</style>