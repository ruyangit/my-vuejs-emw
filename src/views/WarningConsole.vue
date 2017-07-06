<template>
    <div>
        <div class="banner-bj">
            <div class="banner layout">
                <h1>预警信息总览</h1>
                <h2>Overview</h2>
            </div>
        </div>
        <div class="dataall layout clear">
            <div class="data">
                <div class="titleline clear">
                    <p class="title">今日</p>
                    <p class="extra" v-text="monitorSummary.summary.today">--</p>
                </div>
                <div class="content clear">
                    <dl class="infochange">
                        <dt v-text="monitorSummary.summary.changeToday">--</dt>
                        <dd>信息变更</dd>
                    </dl>
                    <dl class="track">
                        <dt v-text="monitorSummary.summary.riskToday">--</dt>
                        <dd>舆情跟踪</dd>
                    </dl>
                    <dl class="risk">
                        <dt v-text="monitorSummary.summary.sentimentToday">--</dt>
                        <dd>预警风险</dd>
                    </dl>
                </div>
            </div>
            <div class="data">
                <div class="titleline clear">
                    <p class="title">近30天</p>
                    <p class="extra" v-text="monitorSummary.summary.thirty">--</p>
                </div>
    
                <div class="content">
                    <dl class="infochange clear">
                        <dt v-text="monitorSummary.summary.changeThirty">--</dt>
                        <dd>信息变更</dd>
                    </dl>
                    <dl class="track">
                        <dt v-text="monitorSummary.summary.riskThirty">--</dt>
                        <dd>舆情跟踪</dd>
                    </dl>
                    <dl class="risk">
                        <dt v-text="monitorSummary.summary.sentimentThirty">--</dt>
                        <dd>预警风险</dd>
                    </dl>
                </div>
            </div>
            <div class="data">
                <div class="titleline clear">
                    <p class="title">近90天</p>
                    <p class="extra" v-text="monitorSummary.summary.ninety">--</p>
                </div>
                <div class="content">
                    <dl class="infochange clear">
                        <dt v-text="monitorSummary.summary.changeNinety">--</dt>
                        <dd>信息变更</dd>
                    </dl>
                    <dl class="track">
                        <dt v-text="monitorSummary.summary.riskNinety">--</dt>
                        <dd>舆情跟踪</dd>
                    </dl>
                    <dl class="risk">
                        <dt v-text="monitorSummary.summary.sentimentNinety">--</dt>
                        <dd>预警风险</dd>
                    </dl>
                </div>
            </div>
        </div>
        <div class="list layout">
            <div class="rowList clear" v-for="(item,index) in monitorSummary.changeList" :key="index">
                <div class="left event">
                    信息变更
                </div>
                <div class="left eventDetails">
                    <dl>
                        <dt>
                            <a href="javascript:;" @click="detail(item,'change')" v-text="item.companyName"></a>
                        </dt>
                        <!--<dd v-text="item.changeItem"></dd>-->
                        <dd>变更后：
                            <span v-text="item.changeAfter"></span>
                        </dd>
                        <dd class="lightThis">变更前：
                            <span v-text="item.changeBefore"></span>
                        </dd>
                    </dl>
                    <div class="date">
                        <span>05/01</span>
                        <br>
                        <label v-text="item.changeDate"></label>
                    </div>
                </div>
            </div>
            <div class="rowList clear" v-for="(item,index) in monitorSummary.riskList" :key="index">
                <div class="left event risk">
                    风险事件
                </div>
                <div class="left eventDetails">
                    <dl>
                        <dt>
                            <a href="javascript:;" @click="detail(item,'risk')" v-text="item.companyName"></a>
                        </dt>
                        <dd v-text="item.riskItem"></dd>
                        <dd class="lightThis" v-text="item.riskContent"></dd>
                    </dl>
                    <div class="date">
                        <span>05/01</span>
                        <br>
                        <label v-text="item.riskDate"></label>
                    </div>
                </div>
            </div>
            <div class="rowList clear" v-for="(item,index) in monitorSummary.sentimentList" :key="index">
                <div class="left event track">
                    舆情变化
                </div>
                <div class="left eventDetails">
                    <dl>
                        <dt>
                            <a href="javascript:;" @click="detail(item,'track')" v-text="item.companyName"></a>
                        </dt>
                        <dd v-text="item.sentimentItem"></dd>
                        <dd class="lightThis" v-text="item.sentimentContent"></dd>
                    </dl>
                    <div class="date">
                        <span>05/01</span>
                        <br>
                        <label v-text="item.sentimentDate"></label>
                    </div>
                </div>
            </div>
            <a href="javascript:void(0);" class="more">点击加载更多</a>
        </div>
        <LayerBox v-model="warningDetailVisible">
            <div class="texttip">
                <div :class="detailConfig.className" v-text="detailConfig.text"></div>
            </div>
            <h3>国轩高科股份有限公司</h3>
            <h6>预警时间：2017/06/20</h6>
            <p>该公司位于地址江苏省南通市通州区十总镇东源大道1号欢迎实地了解具体业务,公司主要经营或服务范围是锂离子电池及其材料、电池、电机及整车控制系统的研发、制造与销售;锂离子电池应急电源、储能电池、电动工具电池的研发、制造与销售;高、低压开关及成套设备,数字化电器设备,配网智能化设备及元器件,三箱产品的研发、制造、销售、承装;太阳能、风能等可再生能源设备的研发、制造、销售与承装;节能环保电器及设备、船舶电器及设备的研发、制造、销售和安装;变压器、变电站、大型充电设备、车载充电机及车载高压箱的研发、制造、销售;自营和代理各类商品及技术的进出口业务(国家限定企业经营或禁止进出口的商品和技术除外);城市.... 您如果想进一步了解可以电话联系该公司。
            </p>
        </LayerBox>
    </div>
</template>
<script> 
import LayerBox from '@/components/LayerBox'
import { mapGetters } from 'vuex'
const fetchInitialData = async (store) => {
    await store.dispatch('frontend/main/getMonitorSummary')
}
export default {
    data() {
        return {
            warningDetailVisible: false,
            detailConfig: {}
        }
    },
    computed: {
        ...mapGetters({
            monitorSummary: 'frontend/main/getMonitorSummary'
        })
    },
    components: {
        LayerBox
    },
    mounted() {
        if (this.monitorSummary.changeList.length <= 0 && this.monitorSummary.riskList.length <= 0 && this.monitorSummary.sentimentList.length <= 0) {
            fetchInitialData(this.$store)
        }
    },
    methods: {
        detail(e, type) {
            
            if ('risk' == type) {
                this.detailConfig = {
                    className: 'textrisk',
                    text: '风险事件'
                }
            } else if ('track' == type) {
                this.detailConfig = {
                    className: 'texttrack',
                    text: '舆情变化'
                }
            } else {
                this.detailConfig = {
                    className: 'textinfo',
                    text: '信息变更'
                }
            }
            this.warningDetailVisible = true
        }
    },
}
</script>