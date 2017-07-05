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
                        <th>信息变更</th>
                        <th>舆情变化</th>
                        <th>风险事件</th>
                        <th>&nbsp;&nbsp;&nbsp;&nbsp;</th>
                    </tr>
                    <tr v-for="(item,index) in followCompanys" :key="index">
                        <td class="text-l" v-text="item.companyName"></td>
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
        <SearchCompany v-model="searchVisible" @follow="follow"></SearchCompany>
        <LayerBox v-model="confirmFollowVisible" isClose='false'>
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
        <LayerBox v-model="cancelFollowVisible" isClose='false'>
            <h3>取消企业关注</h3>
            <p>确认取消企业关注：
                <span v-text="followCompany.companyName"></span>
            </p>
            <p>取消时间：</p>
            <p>取消关注将无法及时获取该企业的最新信息，同时下月将取消计费。</p>
            <button class="btn" @click="confirmCancelFollow()">确认取消</button>
        </LayerBox>
    </div>
</template>
<script> 
import SearchCompany from '@/components/SearchCompany'
import LayerBox from '@/components/LayerBox'
export default {
    data() {
        return {
            searchVisible: false,
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
        follow(e) {
            this.followCompany = e
            this.confirmFollowVisible = true

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
<style>

</style>
