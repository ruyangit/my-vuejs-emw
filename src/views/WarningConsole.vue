<template>
    <div>
        <div class="banner-bj">
            <div class="banner layout">
                <h1>预警信息总览</h1>
                <h2>Overview</h2>
            </div>
        </div>
        <div v-if="warningNoData">
            <div class="nowarn-mes layout">
                <ul class="clear">
                    <li>
                        <i></i>
                        <h1>目标企业快速关注</h1>
                        <p>支持同时关注多家企业</p>
                    </li>
                    <li>
                        <i></i>
                        <h1>动态信息自动推送</h1>
                        <p>实时掌握企业重大事项</p>
                    </li>
                    <li>
                        <i></i>
                        <h1>风险事件及时预警</h1>
                        <p>第一时间采取保全措施</p>
                    </li>
                </ul>
                <h3>关注企业，查看最新动态</h3>
                <button class="btn add" @click="followCompany()">新增关注</button>
            </div>
        </div>
        <div v-if="!warningNoData">
            <v-summary :data="monitorSummaryLists.summary"></v-summary>
            <div class="list layout">
                <div class="rowList clear cursor-boxshadow" v-for="(item,index) in monitorSummaryLists.monitorList" :key="index" @click="detail(item)" >
                    <div class="left event positon-rela" v-if="item.dataType=='change'">
                        信息变更
                        <div class="remove-line border1"></div>
                    </div>
                    <div class="left event risk positon-rela" v-else-if="item.dataType=='bond'||item.dataType=='dishonest'||item.dataType=='penalty'">
                        风险事件
                        <div class="remove-line border2"></div>
                    </div>
                    <div class="left event track positon-rela" v-else-if="item.dataType=='track'">
                        舆情变化
                        <div class="remove-line border3"></div>
                    </div>
                    <div class="left eventDetails">
                        <dl>
                            <dt>
                                <a href="javascript:;" v-text="item.respondentName"></a>
                            </dt>
                            <dd v-if="item.dataType=='change'" v-text="'变更后：'+item.contentB" class="txt-ellipsis"></dd>
                            <dd v-else v-text="item.contentA"></dd>
                            <dd v-if="item.dataType=='change'" v-text="'变更前：'+item.contentA" class="lightThis txt-ellipsis"></dd>
                            <dd v-else v-text="item.contentB"></dd>
                        </dl>
                        <v-date :date='item.dt'></v-date>
                    </div>
                </div>
                <!-- <div class="rowList clear" v-for="(item,index) in monitorSummaryLists.changeList" :key="index">
                                <div class="left event">
                                    信息变更
                                </div>
                                <div class="left eventDetails">
                                    <dl>
                                        <dt>
                                            <a href="javascript:;" @click="detail(item,'change')" v-text="item.companyName"></a>
                                        </dt>
                                        <dd v-text="item.changeItem"></dd>
                                        <dd>变更后：
                                            <span v-text="item.changeAfter"></span>
                                        </dd>
                                        <dd class="lightThis">变更前：
                                            <span v-text="item.changeBefore"></span>
                                        </dd>
                                    </dl>
                                    <v-date :date='item.changeDate'></v-date>
                                </div>
                            </div>
                            <div class="rowList clear" v-for="(item,index) in monitorSummaryLists.riskList" :key="index">
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
                                    <v-date :date='item.riskDate'></v-date>
                                </div>
                            </div>
                            <div class="rowList clear" v-for="(item,index) in monitorSummaryLists.sentimentList" :key="index">
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
                                    <v-date :date='item.sentimentDate'></v-date>
                                </div>
                            </div> -->
                <a href="javascript:void(0);" @click="loadMore()" v-if="hasNext" class="more">点击加载更多</a>
            </div>
        </div>
        <LayerBox v-model="warningDetailVisibleChange">
            <div class="texttip">
                <div :class="detailConfig.className" v-text="detailConfig.text"></div>
            </div>
            <h3 v-text="monitorSummaryDetailExt.respondentName">--</h3>
            <h6>预警时间：{{monitorSummaryDetailExt.dt}}</h6>
            <table class="tbl" v-if="monitorSummaryDetailItems.change">
                <tbody class="change-table">
                    <!-- <tr>
                        <td class="thr">变更项目</td>
                        <td>变更前</td>
                        <td>变更后</td>
                        <td>变更时间</td>
                    </tr>
                    <tr>
                        <td class="thr" v-text="monitorSummaryDetailItems.change.changeItem"></td>
                        <td v-text="monitorSummaryDetailItems.change.changeBefore"></td>
                        <td v-text="monitorSummaryDetailItems.change.changeAfter">></td>
                        <td v-text="monitorSummaryDetailItems.change.changeDt"></td>
                    </tr> -->
                     <tr>
                        <td class="thr">变更项目</td>
                        <td class="td-style" colspan="3" v-text="monitorSummaryDetailItems.change.changeItem"></td>
                    </tr>
                    <tr>
                        <td class="thr">变更前</td>
                         <td class="td-style" colspan="3"><textarea v-text="monitorSummaryDetailItems.change.changeBefore"></textarea></td>
                    </tr> 
                    <tr>
                        <td class="thr">变更后</td>
                         <td class="td-style" colspan="3"><textarea v-text="monitorSummaryDetailItems.change.changeAfter"></textarea></td>
                    </tr>
                    <tr>
                        <td class="thr">变更时间</td>
                         <td class="td-style" colspan="3" v-text="monitorSummaryDetailItems.change.changeDt"></td>
                    </tr>
                </tbody>
            </table>
        </LayerBox>
        <LayerBox v-model="warningDetailVisibleBond">
            <div class="texttip">
                <div :class="detailConfig.className" v-text="detailConfig.text"></div>
            </div>
            <h3 v-text="monitorSummaryDetailExt.respondentName">--</h3>
            <h6>预警时间：{{monitorSummaryDetailExt.dt}}</h6>
            <table class="tbl" v-if="monitorSummaryDetailItems.bond">
                <tbody>
                    <tr>
                        <td class="thr">企业名称</td>
                        <td class="w220" v-text="monitorSummaryDetailItems.bond.companyName"></td>
                        <td class="thr">工商注册号</td>
                        <td class="w220" v-text="monitorSummaryDetailItems.bond.regNo"></td>
                    </tr>
                    <tr>
                        <td class="thr">统一社会信用代码</td>
                        <td  v-text="monitorSummaryDetailItems.bond.creditNo"></td>
                        <td class="thr">省份</td>
                        <td  v-text="monitorSummaryDetailItems.bond.province"></td>
                    </tr>
                    <tr>
                        <td class="thr">组织机构代码</td>
                        <td  v-text="monitorSummaryDetailItems.bond.orgCode"></td>
                        <td class="thr">时间</td>
                        <td  v-text="monitorSummaryDetailItems.bond.createdDt"></td>
                    </tr>
                </tbody>
            </table>
        </LayerBox>
        <LayerBox v-model="warningDetailVisibleDishonest">
            <div class="texttip">
                <div :class="detailConfig.className" v-text="detailConfig.text"></div>
            </div>
            <h3 v-text="monitorSummaryDetailExt.respondentName">--</h3>
            <h6>预警时间：{{monitorSummaryDetailExt.dt}}</h6>
            <table class="tbl" v-if="monitorSummaryDetailItems.dishonest">
                <tbody>
                    <tr>
                        <td class="thr">案件号</td>
                        <td class="tdr" v-text="monitorSummaryDetailItems.dishonest.caseNo"></td>
                        <td class="thr">文档编号</td>
                        <td class="tdr" v-text="monitorSummaryDetailItems.dishonest.docNo"></td>
                    </tr>
                    <tr>
                        <td class="thr">法庭</td>
                        <td class="tdr" v-text="monitorSummaryDetailItems.dishonest.court"></td>
                        <td class="thr">省份</td>
                        <td class="tdr" v-text="monitorSummaryDetailItems.dishonest.province"></td>
                    </tr>
                    <tr>
                        <td class="thr">案件日期</td>
                        <td class="tdr" v-text="monitorSummaryDetailItems.dishonest.caseDate"></td>
                        <td class="thr">执行部门</td>
                        <td class="tdr" v-text="monitorSummaryDetailItems.dishonest.exeDepartment "></td>
                    </tr>
                    <tr>
                        <td class="thr">履行情况</td>
                        <td class="tdr" v-text="monitorSummaryDetailItems.dishonest.performance"></td>
                        <td class="thr">发布日期</td>
                        <td class="tdr" v-text="monitorSummaryDetailItems.dishonest.publishDate"></td>
                    </tr>
                    <tr>
                        <td class="thr">责任与义务</td>
                        <td class="tdr" colspan="3"><textarea class="txtarea" v-text="monitorSummaryDetailItems.dishonest.finalDuty"></textarea></td>
                    </tr>
                </tbody>
            </table>
        </LayerBox>
        <LayerBox v-model="warningDetailVisiblePenalty">
            <div class="texttip">
                <div :class="detailConfig.className" v-text="detailConfig.text"></div>
            </div>
            <h3 v-text="monitorSummaryDetailExt.respondentName">--</h3>
            <h6>预警时间：{{monitorSummaryDetailExt.dt}}</h6>
            <table class="tbl" v-if="monitorSummaryDetailItems.penalty">
                <tbody>
                    <tr>
                        <td class="thr">主体名称</td>
                        <td class="tdr" v-text="monitorSummaryDetailItems.penalty.penaltyName"></td>
                        <td class="thr">公示类型</td>
                        <td class="tdr" v-text="monitorSummaryDetailItems.penalty.penaltyType"></td>
                    </tr>
                    <tr>
                        <td class="thr">处罚时间</td>
                        <td class="tdr" v-text="monitorSummaryDetailItems.penalty.penaltyTime"></td>
                        <td class="thr">行政类别/区域</td>
                        <td class="tdr" v-text="monitorSummaryDetailItems.penalty.recordSource"></td>
                    </tr>
                    <tr>
                        <td class="thr">处罚内容</td>
                        <td class="tdr w600" colspan="3" v-text="monitorSummaryDetailItems.penalty.encryStr"></td>
                    </tr>
                    <tr>
                        <td class="thr">全名</td>
                        <td class="tdr" colspan="3" v-text="monitorSummaryDetailItems.penalty.fullname"></td>
                    </tr>
                </tbody>
            </table>
        </LayerBox>
    </div>
</template>
<script> 
import LayerBox from '@/components/LayerBox'
import vDate from '@/components/_vdate'
import vSummary from '@/components/_vsummary'
import { mapGetters } from 'vuex'
const fetchInitialData = async (store, config = { pageNo: 1 }) => {
    const base = { ...config, pageSize: 5 }
    await store.dispatch('frontend/main/getMonitorSummaryLists', base)
}
const fetchInitialMoreData = async (store, config = { pageNo: 1 }) => {
    const base = { ...config, pageSize: 5 }
    await store.dispatch('frontend/main/getMonitorSummaryMoreLists', base)
}
export default {
    data() {
        return {
            warningDetailVisibleChange: false,
            warningDetailVisibleBond: false,
            warningDetailVisibleDishonest: false,
            warningDetailVisiblePenalty: false,
            detailConfig: {},
            warningNoData: true,
            hasNext: true,
            monitorSummaryDetailExt: {}
        }
    },
    computed: {
        ...mapGetters({
            monitorSummaryLists: 'frontend/main/getMonitorSummaryLists',
            monitorSummaryDetailItems: 'frontend/main/getMonitorSummaryDetailItems'
        })
    },
    components: {
        LayerBox,
        vDate,
        vSummary
    },
    mounted() {
        fetchInitialData(this.$store, { pageNo: 1 })
        this.showData()
    },
    watch: {
        'monitorSummaryLists.totalRecord'() {
            this.showData()
        },
        'monitorSummaryLists.pageNo'() {
             if (this.monitorSummaryLists.pageNo >= parseInt(this.monitorSummaryLists.totalPage)) {
                this.hasNext = false
            }
        },
        '$route'() {
            //console.log('route 切换');
            // fetchInitialData(this.$store, { pageNo: 1 })
        }
    },
    methods: {
        showData() {
            if (this.monitorSummaryLists.totalRecord > 0) {
                this.warningNoData = false
            } else {
                this.warningNoData = true
            }
        },
        async detail(e) {
            console.log(e)
            this.monitorSummaryDetailExt = e
            let dataType = e.dataType

            let config = {
                dataType: dataType,
                id: e.id
            }
            await this.$store.dispatch('frontend/main/getMonitorSummaryDetailItems', config)

            if ('change' == dataType) {
                this.detailConfig = {
                    className: 'textinfo',
                    text: '信息变更'
                }
                this.warningDetailVisibleChange = true
            } else if ('track' == dataType) {
                this.detailConfig = {
                    className: 'texttrack',
                    text: '舆情变化'
                }
            } else {
                this.detailConfig = {
                    className: 'textrisk',
                    text: '风险事件'
                }
                if ('bond' == dataType) {
                    this.warningDetailVisibleBond = true
                } else if ('dishonest' == dataType) {
                    this.warningDetailVisibleDishonest = true
                } else if ('penalty' == dataType) {
                    this.warningDetailVisiblePenalty = true
                }
            }


        },
        followCompany() {
            this.$router.push({ path: "/FollowCompany" })
        },
        loadMore(pageNo = parseInt(this.monitorSummaryLists.pageNo) + 1) {
            fetchInitialMoreData(this.$store, { pageNo })
        }
    },
}
</script>
<style>
table.tbl {
    margin-top: 25px;
    margin-bottom: 25px;
    border-right: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    border-collapse: collapse;
}

table.tbl tr td {
    height: 45px;
    min-width: 100px;
    padding-left: 15px;
    /*border-bottom: 1px solid #e5e5e5;*/
    border-left: 1px solid #e5e5e5;
    border-top: 1px solid #e5e5e5;
}

table.tbl tr td.thr {
    width: 165px;
    background-color: #f9f9f9;
}
.txt-ellipsis{
    width: 850px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.cursor-boxshadow {
    cursor: pointer;    
    -webkit-box-shadow: 0 3px 5px #ccc;
    -ms-box-shadow: 0 3px 5px #ccc;
    -moz-box-shadow: 0 3px 5px #ccc;
    -o-box-shadow: 0 3px 5px #ccc;
    box-shadow: 0 3px 5px #ccc;
}
.change-table td {
    text-align: center;
}
.change-table .td-style {
    width: 600px;
}
.change-table textarea {
    width: 600px;
    height: 130px;
    border: none;
    padding: 10px;
}
.txtarea {
    width: 600px;
    height: 170px;
    border: none;
    font-size: 14px;
}
.positon-rela {
    position: relative;
}
.remove-line {
    position: absolute;
    top: -1px;
    left: -1px;
    width: 124px;
    height: 124px;
    border-radius: 4px;
}
.border1 {
    border:1px solid #00c1de;
}
.border2 {
    border:1px solid #e96e74;
}
.border3 {
    border:1px solid #e3894e;
}
.w600 {
    width: 600px;
}
.w220 {
    width: 220px;
}
</style>