<template>
    <div>
        <div class="banner-bj company-bj">
            <div class="banner layout">
                <h1>预警企业关注名单</h1>
                <h2>Warning list</h2>
            </div>
        </div>
        <div class="company-list layout">
            <div class="company-title">
                <a href="javascript:void(0)" class="addcompany" @click="searchVisible = true">新增关注</a>
                <h1>当前关注企业</h1>
            </div>
            <table class="list">
                <tbody>
                    <tr>
                        <th class="text-l">企业名称</th>
                        <th>关注时间</th>
                        <th>最后预警时间</th>
                        <th>注册资本</th>
                        <th>法定代表人</th>
                        <th>成立时间</th>
                        <th>&nbsp;&nbsp;&nbsp;&nbsp;</th>
                    </tr>
                    <tr v-for="(item,index) in followCompanyLists.companyList" :key="index">
                        <td class="text-l">
                            <a href="javascript:;" @click="detailCompany(item)" v-text="item.respondentName"></a>
                        </td>
                        <td v-text="item.followDt">--</td>
                        <td v-text="item.monitorDt">--</td>
                        <td v-text="item.registeredCapital">--</td>
                        <td v-text="item.legalPerson">--</td>
                        <td v-text="item.foundedDt">--</td>
                        <td>
                            <a href="javascript:void(0)" @click="cancelFollow(item)">取消关注</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="nocompany" v-if="followCompanyLists.companyList.length==0">
                <img src="static/images/notFollewed.png">
            </div>
        </div>
        <SearchCompany v-model="searchVisible" @follow="follow" @searchVlidate="searchVlidate"></SearchCompany>
        <LayerBox v-model="confirmFollowVisible" :isClose="isClose">
            <h3>添加企业关注</h3>
            <p>确认关注企业信息</p>
            <div class="search-list-title clear">
                <div class="span-320">企业名称</div>
                <div class="span-220">法定代表人</div>
                <div class="span-220">登记状态</div>
            </div>
            <div class="search-list" style="height:100px">
                <div class="search-list-line clear">
                    <div class="span-320 pd27" v-if="followCompany.respondentName" v-text="followCompany.respondentName"></div>
                    <div class="span-320 pd27" v-else>&nbsp;</div>
                    <div class="span-220 pd27" v-if="followCompany.legalPerson" v-text="followCompany.legalPerson"></div>
                    <div class="span-220 pd27" v-else>&nbsp;</div>
                    <div class="span-220 pd27" v-if="followCompany.entStatus" v-text="followCompany.entStatus"></div>
                    <div class="span-220 pd27" v-else>&nbsp;</div>
                </div>
            </div>
            <p>关注时间：
                <label v-text="followDate"></label>
            </p>
            <p class="font-color">
                <img src="static/images/icon-details.png" alt="">关注后即可获取该企业最新信息，同时从关注日起开始按月计费。</p>
            <div class="model-footer txtcenter">
                <button class="return btn-return" style="background-color:white" @click="backSearchFollow()">返回上一页</button>
                <button class="btn btn-sure" @click="confirmFollow()">确认关注</button>
            </div>
        </LayerBox>
        <LayerBox v-model="cancelFollowVisible" :isClose="isClose">
            <a href="javascript:void(0)" class="close" @click="cancelFollowVisible=false">×</a>
            <h3>取消企业关注</h3>
            <p>确认取消企业关注：
                <span v-text="followCompany.respondentName"></span>
            </p>
            <p>取消时间：
                <label v-text="followDate"></label>
            </p>
            <p class="font-color">
                <img src="static/images/icon-details.png" alt="">取消关注将无法及时获取该企业的最新信息，同时下月将自动停止计费。</p>
            <button class="btn" @click="confirmCancelFollow()">确认取消</button>
        </LayerBox>
        <LayerBox v-model="searchValidateVisible" :isClose="isClose">
            <a href="javascript:void(0)" class="close" @click="searchValidateVisible=false">×</a>
            <h3>填写验证码</h3>
            <div class="search-validate">
                <div class="modal-line">
                    <label for="">验证码：</label>
                    <input type="tel" placeholder="请输入您的验证码" v-model="validCode" name="validCode">
                </div>
                <div class="validate">
                    <img @click="verifCode()" :src="imageCode">
                    <a href="#" @click="verifCode()">看不清？换一张</a>
                </div>
            </div>
            <button class="btn" @click="confirmSearchValidate()">确认</button>
        </LayerBox>
        <LayerBox v-model="detailCompanyVisible">
            <h3>企业信息详情</h3>
            <table class="company">
                <tbody>
                    <tr>
                        <td class="thr">企业名称</td>
                        <td class="tdr" v-text="companyDetailItems.companyDetail.respondentName"></td>
                        <td class="thr">组织机构代码</td>
                        <td class="tdr" v-text="companyDetailItems.companyDetail.orgNo"></td>
                    </tr>
                    <tr>
                        <td class="thr">统一信用社会代码</td>
                        <td v-text="companyDetailItems.companyDetail.creditNo"></td>
                        <td class="thr">经营状态</td>
                        <td v-text="companyDetailItems.companyDetail.orgNo"></td>
                    </tr>
                    <tr>
                        <td class="thr">注册号</td>
                        <td v-text="companyDetailItems.companyDetail.regNo"></td>
                        <td class="thr">成立日期</td>
                        <td v-text="companyDetailItems.companyDetail.foundedDt"></td>
                    </tr>
                    <tr>
                        <td class="thr">公司类型</td>
                        <td v-text="companyDetailItems.companyDetail.enterpriseProperty"></td>
                        <td class="thr">营业期限</td>
                        <td v-text="companyDetailItems.companyDetail.operatingPeriodBegin"></td>
                    </tr>
                    <tr>
                        <td class="thr">注册资金</td>
                        <td v-text="companyDetailItems.companyDetail.registeredCapital"></td>
                        <td class="thr">发照日期</td>
                        <td v-text="companyDetailItems.companyDetail.orgNo"></td>
                    </tr>
                    <tr>
                        <td class="thr">登记机关</td>
                        <td v-text="companyDetailItems.companyDetail.regAuthority"></td>
                        <td class="thr">企业地址</td>
                        <td v-text="companyDetailItems.companyDetail.address"></td>
                    </tr>
                    <tr>
                        <td class="thr">经营范围</td>
                        <td class="textarea-css" colspan="3">
                            <textarea v-text="companyDetailItems.companyDetail.bizScope"></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>
        </LayerBox>
    </div>
</template>
<script> 
import { getDate } from '@/utils'
import SearchCompany from '@/components/SearchCompany'
import LayerBox from '@/components/LayerBox'
import { mapGetters } from 'vuex'
import { baseUrl } from '@api/env'
import api from '@api'
const fetchInitialData = async (store, config = { pageNo: 1 }) => {
    const base = { ...config, pageSize: 10 }
    await store.dispatch('frontend/main/getFollowCompanyLists', base)
}
export default {
    data() {
        return {
            validCode: '',
            imageCode: '',
            isClose: false,
            searchVisible: false,
            searchValidateVisible: false,
            detailCompanyVisible: false,
            confirmFollowVisible: false,
            cancelFollowVisible: false,
            followCompany: {},
            followDate: getDate()
        }
    },
    computed: {
        ...mapGetters({
            followCompanyLists: 'frontend/main/getFollowCompanyLists',
            companyDetailItems: 'frontend/main/getCompanyDetailItems',
            userInfo: 'global/getUserInfo'
        })
    },
    components: {
        SearchCompany,
        LayerBox
    },
    mounted() {
        // this.verifCode()
        fetchInitialData(this.$store, { pageNo: 1 })
    },
    methods: {
        async detailCompany(e) {
            //this.followCompany = e
            this.detailCompanyVisible = true

            const base = { respondentCode: e.respondentCode }

            await this.$store.dispatch('frontend/main/getCompanyDetailItems', base)
        },
        follow(e) {
            this.followCompany = e
            this.confirmFollowVisible = true
        },
        searchVlidate() {
            this.verifCode()
            this.searchValidateVisible = true
        },
        confirmSearchValidate() {
            this.searchValidateVisible = false
            this.searchVisible = true
            //通知子组件执行搜索方法
            if(validCode){
                this.$store.dispatch('frontend/main/getValidCode', this.validCode)
            }else{
                alert('请输入图片验证码。')
            }
        },
        backSearchFollow() {
            this.confirmFollowVisible = false
            this.searchVisible = true
        },
        async confirmFollow() {
            this.confirmFollowVisible = false
            const config = {
                respondentCode: this.followCompany.respondentCode,
                respondentName: this.followCompany.respondentName
            }
            const { data: { status, data } } = await api.post('/follow/followCompany.do', { ...config })
            if (status === 'success') {
                this.$store.dispatch('global/showMsg', {
                    type: 'success',
                    content: '关注成功'
                })
                fetchInitialData(this.$store, { pageNo: 1 })
            }

        },
        cancelFollow(e) {
            this.followCompany = e
            this.cancelFollowVisible = true
        },
        async confirmCancelFollow() {
            this.cancelFollowVisible = false
            const config = {
                respondentCode: this.followCompany.respondentCode,
                respondentName: this.followCompany.respondentName
            }
            const { data: { status, data } } = await api.post('/follow/abandonCompany.do', { ...config })
            if (status === 'success') {
                this.$store.dispatch('global/showMsg', {
                    type: 'success',
                    content: '取消成功'
                })
                fetchInitialData(this.$store, { pageNo: 1 })
            }
        },
        verifCode() {
            if (this.userInfo) {
                this.imageCode = baseUrl + '/user/getCheckCodeImage.do?checkType=search&userName=' + this.userInfo.userName + '&_t=' + new Date().getTime();
            }
        },
    }

}
</script>
<style scoped>
table.company {
    margin-top: 25px;
    margin-bottom: 25px;
    border-right: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    border-collapse: collapse;
}

table.company tr td {
    height: 45px;
    width: 230px;
    padding-left: 15px;
    /*border-bottom: 1px solid #e5e5e5;*/
    border-left: 1px solid #e5e5e5;
    border-top: 1px solid #e5e5e5;
}

table.company tr td.thr {
    width: 145px;
    background-color: #f9f9f9;
}

.search-validate {
    margin: 45px;
    /*padding-left: 50px;*/
}

.search-validate .modal-line label {
    width: 150px;
    text-align: right;
    display: inline-block;
}

.search-validate .modal-line input {
    width: 420px;
    height: 38px;
    border: 1px solid #bbb;
    margin-left: 10px;
    border-radius: 2px;
    padding-left: 10px;
}

.search-validate .validate {
    padding-left: 163px;
    margin-top: 30px;
}

.search-validate .validate img {
    width: 120px;
    height: 60px;
    background-color: #e5e5e5;
}

.search-validate .validate a {
    margin-left: 15px;
}

.font-color {
    font-size: 14px;
    color: #bfbfbf;
    position: relative;
    padding-left: 20px;
}

.font-color img {
    width: 13px;
    height: 15px;
    position: absolute;
    top: 7px;
    left: 0;
}

.model-footer .btn-return,
.model-footer .btn-sure {
    width: 200px;
}

.model-footer .btn-return {
    margin-right: 20px;
}

.textarea-css textarea {
    width: 640px;
    height: 90px;
    border: none;
    font-size: 14px;
}
</style>
