<!-- borrowed from Nuxt! -->

<template>
    <div class="event-layer" v-show="visible">
        <div class="cover"></div>
        <div class="event-con overflow">
            <div>
                <a href="javascript:void(0)" class="close" @click="close()">×</a>
                <h3>添加企业关注</h3>
            </div>
            <div class="search-bar clear">
                <div class="search-text">
                    <input type="text" v-model="searchText" :class="{'input': true, 'is-danger': errors.has('searchText') }" v-validate="'required|shlth:2'" name="searchText">
                </div>
                <button class="search bth-style" :disabled="sbtnDisabled" @click="search()">搜索公司</button>
                <span v-show="errors.has('searchText')" class="help-tip">{{errors.first('searchText')}}</span>
            </div>
            <div class="search-list-title clear">
                <div class="span-290">企业名称</div>
                <div class="span-200">法定代表人</div>
                <div class="span-200">成立时间</div>
                <div class="span-200">登记状态</div>
                <div class="span-200 txtcenter width-padding">选择关注</div>
            </div>
            <div class="search-list">
                <div v-show="searchCompanyLists.companyList" class="search-list-line clear zb-bottom-line" v-for="(item,index) in searchCompanyLists.companyList" :key="index">
                    <div class="span-290 pd27" v-text="item.respondentName"></div>
                    <div class="span-200 pd27" v-if="item.legalPerson" v-text="item.legalPerson"></div>
                    <div class="span-200 pd27" v-else>&nbsp;</div>
                    <div class="span-200 pd27" v-if="item.foundedDt" v-text="item.foundedDt"></div>
                    <div class="span-200 pd27" v-else>&nbsp;</div>
                    <div class="span-200 pd27" v-if="item.entStatus" v-text="item.entStatus"></div>
                    <div class="span-200 pd27" v-else>&nbsp;</div>
                    <div class="span-180 pd20 txtcenter" v-if="item.followFlag">
                        <button class="followed">已关注</button>
                    </div>
                    <div class="span-180 pd20 txtcenter" v-else>
                        <button class="follow" @click="follow(item)">关注</button>
                    </div>
                </div>
                <div v-show="searchCompanyLists.companyList.length==0" class="nocompany">请在上方输入您想要搜索的企业名称</div>
            </div>
            <a href="javascript:void(0);" @click="loadMore()" v-if="searchCompanyLists.companyList.length>0&&hasNext" class="click-more">点击加载更多</a>
        </div>
        <LayerBox v-model="layerBoxVisible">
    
        </LayerBox>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LayerBox from '@/components/LayerBox'
const fetchInitialData = async (store, config = { pageNo: 1 }) => {
    // this.sbtnDisabled = true
    const base = { ...config, pageSize: 50 }
    await store.dispatch('frontend/main/getSearchCompanyLists', base)
}
export default {
    name: 'SearchCompany',
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapGetters({
            searchCompanyLists: 'frontend/main/getSearchCompanyLists',
        })
    },
    data() {
        return {
            visible: false,
            layerBoxVisible: false,
            searchText: "",
            sbtnDisabled: false,
            hasNext: true,
        }
    },
    components: {
        LayerBox
    },
    mounted() {
    },
    watch: {
        'searchCompanyLists.needValid'() {
            // console.log(this.searchCompanyLists.needValid)
        },
        'searchCompanyLists.pageNo'() {
            if (this.searchCompanyLists.pageNo >= parseInt(this.searchCompanyLists.totalPage)) {
                this.hasNext = false
            } else {
                this.hasNext = true
            }
        },
        value(val) {
            this.visible = val
        }
    },
    methods: {
        close() {
            this.visible = false
            this.$emit('input', false)
        },
        search() {
            this.$validator.validate('searchText', this.searchText).then(result => {
                if (result) {
                    fetchInitialData(this.$store, { pageNo: 1, companyName: this.searchText })
                    return
                }
            });

        },
        loadMore(pageNo = parseInt(this.searchCompanyLists.pageNo) + 1) {
            this.$validator.validate('searchText', this.searchText).then(result => {
                if (result) {
                    fetchInitialData(this.$store, { pageNo, companyName: this.searchText })
                    return
                }
            });
            
        },
        searchVlidate() {
            this.$emit("searchVlidate")
            this.close()
        },
        follow(e) {
            this.$emit("follow", e)
            this.close()
        }
    }
}
</script>

<style scoped>
    .bth-style {
        border-radius: 0 3px 3px 0;
        font-size: 16px;
    }   
    .width-padding {
        width: 170px;
        padding-right: 30px;
    }
    .overflow {
        overflow: visible;
    }
    .zb-bottom-line {
        border-bottom: 1px dotted #bbb;
        margin-right: 15px;
    }
    .event-con .zb-bottom-line div {
        border-bottom: none;
    }
</style>