<template>
    <div class="dataall layout clear">
        <div class="data">
            <div class="titleline clear position-rela">
                <p class="title">今日</p>
                <p class="extra" v-text="summary.today">--</p>
                <div class="remove-line"></div>
            </div>
            <div class="content clear">
                <dl class="infochange">
                    <dt v-if="summary.changeToday" v-text="summary.changeToday">--</dt>
                    <dt v-else>--</dt>
                    <dd>信息变更</dd>
                </dl>
                <dl class="track">
                    <dt v-if="summary.sentimentToday" v-text="summary.sentimentToday">--</dt>
                    <dt v-else>--</dt>
                    <dd>舆情跟踪</dd>
                </dl>
                <dl class="risk">
                    <dt v-if="summary.riskToday" v-text="summary.riskToday">--</dt>
                    <dt v-else>--</dt>
                    <dd>预警风险</dd>
                </dl>
            </div>
        </div>
        <div class="data">
            <div class="titleline clear  position-rela">
                <p class="title">近30天</p>
                <p class="extra" v-text="summary.lastThirty">--</p>
                <div class="remove-line"></div>
            </div>
    
            <div class="content">
                <dl class="infochange clear">
                    <dt v-if="summary.changeThirty" v-text="summary.changeThirty">--</dt>
                    <dt v-else>--</dt>
                    <dd>信息变更</dd>
                </dl>
                <dl class="track">                    
                    <dt v-if="summary.sentimentThirty" v-text="summary.sentimentThirty">--</dt>
                    <dt v-else>--</dt>
                    <dd>舆情跟踪</dd>
                </dl>
                <dl class="risk">
                    <dt v-if="summary.riskThirty" v-text="summary.riskThirty">--</dt> 
                    <dt v-else>--</dt>
                    <dd>预警风险</dd>
                </dl>
            </div>
        </div>
        <div class="data">
            <div class="titleline clear position-rela">
                <p class="title">近90天</p>
                <p class="extra" v-text="summary.lastNinety">--</p>
                <div class="remove-line"></div>
            </div>
            <div class="content">
                <dl class="infochange clear">
                    <dt v-if="summary.changeNinety" v-text="summary.changeNinety">--</dt>
                    <dt v-else>--</dt>
                    <dd>信息变更</dd>
                </dl>
                <dl class="track">
                    <dt v-if="summary.sentimentNinety" v-text="summary.sentimentNinety">--</dt>
                    <dt v-else>--</dt>
                    <dd>舆情跟踪</dd>
                </dl>
                <dl class="risk">
                    <dt v-if="summary.riskNinety" v-text="summary.riskNinety">--</dt>
                    <dt v-else>--</dt>
                    <dd>预警风险</dd>
                </dl>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            summary: {}
        }
    },
    props: ['data'],
    mounted() {
        if (this.data)
            this.summary = this.data
    }

}
</script>
<style scoped>
.position-rela {
    position: relative;
}
.remove-line {
    position: absolute;
    width: 384px;
    height: 50px;
    border: 1px solid #49a0d5;
    border-radius: 5px 5px 0 0;
}
</style>
