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
                    <tr v-for="(item,index) in followCompanys" :key="index">
                        <td class="text-l">
                            <a href="javascript:;" @click="detailCompany(item)" v-text="item.companyName"></a>
                        </td>
                        <td>2017/06/20</td>
                        <td>2017/06/20</td>
                        <td>3</td>
                        <td>--</td>
                        <td>5</td>
                        <td>
                            <a href="javascript:void(0)" @click="cancelFollow(item)">取消关注</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="nocompany" v-if="followCompanyNoData">
                <img src="/static/images/notFollewed.png">
            </div>
        </div>
        <SearchCompany v-model="searchVisible" @follow="follow" @searchVlidate="searchVlidate"></SearchCompany>
        <LayerBox v-model="confirmFollowVisible" :isClose="isClose">
            <h3>添加企业关注</h3>
            <p>确认关注企业信息</p>
            <div class="search-list-title clear">
                <div class="span-320">企业名称</div>
                <div class="span-220">法定代表人</div>
                <div class="span-220">注册资金</div>
            </div>
            <div class="search-list" style="height:100px">
                <div class="search-list-line clear">
                    <div class="span-320 pd27" v-text="followCompany.companyName"></div>
                    <div class="span-220 pd27" v-text="followCompany.legalPerson"></div>
                    <div class="span-220 pd27" v-text="followCompany.regCapital"></div>
                </div>
            </div>
            <p>关注时间：</p>
            <p>关注后和可获取该企业信息，同时从关注日起开始按月计费。</p>
            <div class="model-footer">
                <button class="return" style="background-color:white" @click="backSearchFollow()">返回上一页</button>
                <button class="btn" @click="confirmFollow()">确认关注</button>
            </div>
        </LayerBox>
        <LayerBox v-model="cancelFollowVisible" :isClose="isClose">
            <a href="javascript:void(0)" class="close" @click="cancelFollowVisible=false">×</a>
            <h3>取消企业关注</h3>
            <p>确认取消企业关注：
                <span v-text="followCompany.companyName"></span>
            </p>
            <p>取消时间：</p>
            <p>取消关注将无法及时获取该企业的最新信息，同时下月将取消计费。</p>
            <button class="btn" @click="confirmCancelFollow()">确认取消</button>
        </LayerBox>
        <LayerBox v-model="searchValidateVisible" :isClose="isClose">
            <a href="javascript:void(0)" class="close" @click="searchValidateVisible=false">×</a>
            <h3>填写验证码</h3>
            <div class="search-validate">
                <div class="modal-line">
                    <label for="">验证码：</label>
                    <input type="tel">
                </div>
                <div class="validate">
                    <img ><a href="#" >看不清？换一张</a>
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
                        <td class="tdr"></td>
                        <td class="thr">组织机构代码</td>
                        <td class="tdr"></td>
                    </tr>
                    <tr>
                        <td class="thr">统一信用社会代码</td>
                        <td></td>
                        <td class="thr">经营状态</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="thr">注册号</td>
                        <td></td>
                        <td class="thr">成立日期</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="thr">公司类型</td>
                        <td></td>
                        <td class="thr">营业期限</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="thr">注册资金</td>
                        <td></td>
                        <td class="thr">发照日期</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="thr">登记机关</td>
                        <td></td>
                        <td class="thr">企业地址</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="thr">经营范围</td>
                        <td colspan="3"></td>
                    </tr>
                </tbody>
            </table>
        </LayerBox>
    </div>
</template>
<script> 
import SearchCompany from '@/components/SearchCompany'
import LayerBox from '@/components/LayerBox'
export default {
    data() {
        return {
            isClose: false,
            searchVisible: false,
            searchValidateVisible: false,
            detailCompanyVisible: false,
            confirmFollowVisible: false,
            cancelFollowVisible: false,
            followCompany: {},
            followCompanys: [],
            followCompanyNoData: true
        }
    },
    components: {
        SearchCompany,
        LayerBox
    },
    mounted() {

    },
    methods: {
        detailCompany(e) {
            this.followCompany = e
            this.detailCompanyVisible = true
        },
        follow(e) {
            this.followCompany = e
            this.confirmFollowVisible = true

        },
        searchVlidate() {
            this.searchValidateVisible = true
        },
        confirmSearchValidate() {
            this.searchValidateVisible = false
            this.searchVisible = true
        },
        backSearchFollow() {
            this.confirmFollowVisible = false
            this.searchVisible = true
        },
        confirmFollow() {
            this.confirmFollowVisible = false
            this.followCompanyNoData = false
            this.followCompanys.push({
                companyName: this.followCompany.companyName,
            })
        },
        cancelFollow(e) {
            this.followCompany = e
            this.cancelFollowVisible = true
        },
        confirmCancelFollow() {
            this.cancelFollowVisible = false
            this.followCompanys = []
            if (this.followCompanys.length <= 0) {
                this.followCompanyNoData = true
            }
        }
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

.search-validate .modal-line {
    /*margin: 20px 0;*/
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
.search-validate .validate img{
    width: 120px;
    height: 60px;
    background-color: #e5e5e5;
}
.search-validate .validate a{
    margin-left: 15px;
}
</style>
