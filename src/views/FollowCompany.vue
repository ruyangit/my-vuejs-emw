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
                <a href="javascript:void(0)" class="addcompany" @click="dialogTableVisible = true">新增关注</a>
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
                    <!--<tr>
                                                                                                                            <td class="text-l">国轩高科股份有限公司</td>
                                                                                                                            <td>2017/06/20</td>
                                                                                                                            <td>2017/06/20</td>
                                                                                                                            <td>3</td>
                                                                                                                            <td>--</td>
                                                                                                                            <td>5</td>
                                                                                                                            <td>
                                                                                                                                <a href="javascript:void(0)">取消关注</a>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-l">荣盛地产开发股份有限公司</td>
                                                                                                                            <td>2017/06/20</td>
                                                                                                                            <td>2017/06/20</td>
                                                                                                                            <td>--</td>
                                                                                                                            <td>--</td>
                                                                                                                            <td>5</td>
                                                                                                                            <td>
                                                                                                                                <a href="javascript:void(0)">取消关注</a>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-l">荣盛地产开发股份有限公司</td>
                                                                                                                            <td>2017/06/20</td>
                                                                                                                            <td>2017/06/20</td>
                                                                                                                            <td>5</td>
                                                                                                                            <td>--</td>
                                                                                                                            <td>5</td>
                                                                                                                            <td>
                                                                                                                                <a href="javascript:void(0)">取消关注</a>
                                                                                                                            </td>
                                                                                                                        </tr>-->
                </tbody>
            </table>
            <div class="nocompany">
                <img src="/static/images/notFollewed.png">
            </div>
        </div>
        <Modal width="950" :footerHide="footerHide" v-model="dialogTableVisible" title="添加企业关注" :mask-closable="false">
            <Input placeholder="请输入..." class="ModalSearch">
            <span slot="append">搜索公司</span>
            </Input>
            <Table height="300" :columns="searchColumns" :data="searchDatas" :noDataText="noFocusDataText"></Table>
            <div class="ivu-modal-footer">
                <a href="javascript:;">点击查看更多</a>
            </div>
        </Modal>
    </div>
</template>
<script> 
export default {
    data() {
        return {

            dialogTableVisible: false,
            noDataPic: "<img src='/static/images/notFollewed.png'>",
            noFocusDataText: "请在上方输入您想要搜索的企业名称",
            footerHide: true,
            searchColumns: [
                {
                    title: "企业名称",
                    key: "companyName"
                },
                {
                    title: "注册资本",
                    key: "regCapital",
                    align: "right",
                },
                {
                    title: "法定代表人",
                    key: "legalPerson"
                },
                {
                    title: "成立时间",
                    key: "foundDt",
                    align: "center",
                },
                {
                    title: '选择关注',
                    key: 'choiceToFocus',
                    width: "auto",
                    align: "center",
                    render: (h, params) => {
                        return h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.index = params.index; //索引值传递
                                    //console.log(params.row);
                                    //this.newFocusContent=params.row;
                                    // this.addFocus(params.row);
                                }
                            }
                        }, '关注')
                    }
                }

            ],
            searchDatas: []
        }
    },
    mounted() {
        for (var i = 1; i <= 30; i++) {
            this.searchDatas.push({
                companyName: '企业名称',
                regCapital: '1000.0' + i,
                legalPerson: '--',
                foundDt: '成立时间',
                id: i
            })
        }
    }

}
</script>
<style>
.ivu-modal-header-inner {
    text-align: center;
    font-size: 16px;
}

.ModalSearch {
    margin-bottom: 10px;
}

.ivu-modal-footer {
    border-top: 0px;
    text-align: center;
}

.ivu-input-group-append,
.ivu-input-group-prepend {
    background: #49a0d5;
    color: #fff;
    border: 1px solid #49a0d5;
    cursor: pointer;
}
</style>
