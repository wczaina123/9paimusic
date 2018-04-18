<!--套餐管理-->
<template>
    <div>
        <!--状态选择-->
        <div class="mainstyle">
            <div class="mainstyleone">
                <Select v-model="model" style="width:160px;height:30px;" @on-change='change_statue'>
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <span @click="addcombo">
                    <i class="fa fa-plus-square-o fa-lg mt-4"></i>
                    新增
                </span>
            </div>
        </div>
        <!--表格-->
        <div>
            <table class="table-list">
                <thead>
                    <tr>
                        <!-- <th style="display:none"></th> -->
                        <th style="width:5%;">套餐ID</th>
                        <th style="width:8%;">套餐名称</th>
                        <!-- <th style="width:5%;">商品ID</th> -->
                        <th v-for="(res,index) in content" :key="res.id" style="width:15%;">商品{{index+1}}名称</th>
                        
                        <!-- <th style="width:10%;">库存</th> -->
                        <!-- <th style="width:8%;">有效日期</th> -->
                        <th style="width:15%;">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="res in list_main" :key="res.id">
                        <td style="text-align:center;">{{res.id}}</td>
                        <td style="text-align:center;">{{res.name}}</td>
                        <!-- <td style="text-align:center;">1</td> -->
                        <td v-for="ress in res.content" style="text-align:center;" :key="ress.id">{{ress.name}}</td>
                        
                        <!-- <td style="text-align:center;">66666</td> -->
                        <!-- <td style="text-align:center;">11.1-12.3</td> -->
                        <td style="text-align:center;" class="acolor">
                            <a>修改</a>
                            <a>库存管理</a>
                            <a @click="putways">{{(res.is_show==1)?'下架':'上架' }}</a>
                            <a @click="del_goods(res.id)">删除</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p class="table_bottom_p" @click="addcombo">
                <i class="fa fa-plus-circle fa-lg mt-4"></i>
                <span>新增</span>
            </p>
        </div>
        <!--新增套餐弹框-->
        <div>
            <Modal width="660" v-model="addtc" class-name="vertical-center-modal">
                <div slot="header" style="text-align:center;font-size:16px;padding:15px 0 15px 0;margin:0">新增套餐</div>
                <div style="padding-top=20px;">
                    <div style="padding:0 0 20px 0">
                        <span style="font-size: 14px;color: #363F4C; margin:0 19px 20px 20px">套餐名称:</span>
                        <template>
                            <Input placeholder="请输入套餐名称" style="width: 160px"></Input>
                        </template>
                    </div>
                    <div style="margin:0 19px 20px 20px">
                        <span style="font-size: 14px;color: #363F4C; padding:0 19px 0 15px;">商品ID:</span>
                        <template>
                            <Input placeholder="请输入商品ID" style="width: 160px"></Input>
                        </template>
                        <Button style="background:#F0B46E;margin-left:10px;color:white">添加搭配商品</Button>
                        <Icon type="android-alert" style="color:#7D93B2;font-size:16px;margin-left:20px;"></Icon>
                        <span style="font-size:12px;color:#7D93B2;">至多可添加五种商品</span>
                    </div>
                    <div style="margin:0 19px 20px 20px">
                        <span style="font-size: 14px;color: #363F4C;line-height: 30px;">套餐商品：</span>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th style="width:120px;height:28px;margin:0">搭配商品ID</th>
                                        <th style="width:173px;height:28px;margin:0">商品名称</th>
                                        <th style="width:103px;height:28px;margin:0">原价</th>
                                        <th style="width:76px;height:28px;margin:0">数量</th>
                                        <th style="width:112px;height:28px;margin:0">操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style="text-align: center;">
                                        <td>/</td>
                                        <td>/</td>
                                        <td>/</td>
                                        <td>/</td>
                                        <td>/</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div style="padding:0 0 20px 0">
                        <span style="font-size: 14px;color: #363F4C; margin:0 19px 20px 20px">商品总价:500元</span>
                    </div>
                    <div style="padding:0 0 20px 0">
                        <span style="font-size: 14px;color: #363F4C; margin:0 19px 20px 20px">套餐价格:</span>
                        <template>
                            <Input placeholder="请输入套餐优惠价格" style="width: 160px"></Input>
                        </template>
                    </div>
                    <div style="padding:0 0 20px 27px">
                        <span style="font-size: 14px;color: #363F4C; margin:0 19px 20px 20px">运费:</span>
                        <template>
                            <Input placeholder="请输入邮费金额" style="width: 160px"></Input>
                        </template>
                    </div>
                    <div style="padding:0 0 20px 27px">
                        <span style="font-size: 14px;color: #363F4C; margin:0 19px 20px 20px">库存:</span>
                        <template>
                            <Input placeholder="请输入库存金额" style="width: 160px"></Input>
                        </template>
                    </div>
                    <div style="padding:0 0 20px 0">
                        <span style="font-size: 14px;color: #363F4C; margin:0 19px 20px 20px">库存预警:</span>
                        <template>
                            <Input placeholder="可不填" style="width: 160px"></Input>
                        </template>
                    </div>
                </div>
                <div slot="footer">
                    <button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;" @click="clearputway">取消</button>
                    <button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
                </div>
            </Modal>
        </div>
        <!--删除-->
        <div id="app2">
            <Modal v-model="del_good" width="376" class-name="vertical-center-modal">
                <div class="tit">是否确定删除商品</div>
                <div slot="footer" class="btns">
                    <button class="btn btn1" @click="clearputway">取消</button>
                    <button class="btn btn2" @click="del_ok">确定</button>
                </div>
            </Modal>
        </div>

        <!--上架弹框-->
        <div>
            <Modal width="360" v-model="putaways" class-name="vertical-center-modal">
                <div slot="header" style="text-align:center;font-size:16px;padding:15px 0 15px 0;margin:0">套餐信息</div>
                <div style="padding:0 0 20px 27px">
                    <span style="font-size: 14px;color: #363F4C; margin:0 19px 20px 20px">库存:</span>
                    <template>
                        <Input placeholder="请输入库存" style="width: 160px"></Input>
                    </template>
                </div>
                <div style="padding:0 0 20px 27px">
                    <span style="font-size: 14px;color: #363F4C; margin:0 11px 20px 0">库存预警:</span>
                    <template>
                        <Input placeholder="可不填写" style="width: 160px"></Input>
                    </template>
                </div>
                <div slot="footer">
                    <button style="width:80px;height:30px;border:none;border-radius:5px;background:#7D93B2; color:white;" @click="clearputway">取消</button>
                    <button style="width:80px;height:30px;border:none;border-radius:5px;background:#F0B46E; color:white;">上架</button>
                </div>
            </Modal>
        </div>
    </div>
</template>

<script>
import linkurl from '../../All-commonality/LinkUrl'

export default {
    data() {
        return {
            model: '-1',
            cityList: [
                {
                    value: '-1',
                    label: '全部'
                },
                {
                    value: '1',
                    label: '正在促销'
                },
                {
                    value: '0',
                    label: '已过期促销'
                },
            ],
            addtc: false,
            putaways: false,
            del_good:false,
            list_main:"",
            content:'',
            del_id:'',
        }
    },
    mounted(){
        this.get_list()
    },
    methods: {
        change_statue(){  // 选择状态
            this.get_list()
        },
        clearputway() {  // 关闭
            this.putaways = false
            this.del_good = false
        },
        addcombo() { // 新增套餐
            this.addtc = true;
        },
        putways() { // 上下架弹框
            this.putaways = true;
        },

        put_down(){   // 上下架事件
            this.$axios({
            url: linkurl.shelve_goods_package,
            method: 'POST',
            data: {
                token: linkurl.token,
                id:this.del_id,
                is_shelve:'',
            },
            transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
            }],
            })
            .then(res=>{
                this.putaways = false
                this.get_list()
            })
        },
        

        del_goods(id){  // 删除弹框
            this.del_good = true
            this.del_id = id
        },

        del_ok(){  // 删除事件
            this.$axios({
            url: linkurl.delete_goods_package,
            method: 'POST',
            data: {
                token: linkurl.token,
                id:this.del_id,
            },
            transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
            }],
            })
            .then(res=>{
                this.del_good = false
                this.get_list()
            })
        },

        get_list(){   // 套餐列表
            this.$axios({
            url: linkurl.get_goods_package_list,
            method: 'POST',
            data: {
                token: linkurl.token,
                status:this.model,
                page:0,
            },
            transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
            }],
            })
            .then(res=>{
                console.log(res.data.data)
                this.list_main = res.data.data
                for(let i =0;i<this.list_main.length;i++){
                    this.content = this.list_main[i].content
                }
            })
        },

    },
}
</script>

<style scoped lang='scss'>
.changestyle {
    a {
        color: #287AF2;
    }
}

// @import '../../../assets/css/index.scss'
</style>