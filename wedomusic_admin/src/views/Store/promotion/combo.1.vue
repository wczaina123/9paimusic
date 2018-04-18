<!--套餐管理-->
<template>
    <div>
        <!--状态选择-->
        <div class="mainstyle">
            <div class="mainstyleone">
                <p class="home_p">
                    <Select v-model="model" style="width:160px;height:30px;" @on-change='change_statue'>
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <em class="add_jia" @click="addcombo">
                        <i class="fa fa-plus-square-o fa-lg mt-4"></i>
                        <a>新增</a>
                    </em>
                </p>
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
                                    <!-- <a >库存管理</a> -->
                                    <a @click="putways(res.id,res.is_show)">{{(res.is_show==1)?'下架':'上架' }}</a>
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
                    <Modal width="600" v-model="addtc" class-name="vertical-center-modal">
                        <div slot="header" style="text-align:center;font-size:16px;margin:0">新增套餐</div>
                        <div style="padding-top=20px;">
                            <div style="padding:0 0 20px 0">
                                <span style="font-size: 14px;color: #363F4C; margin:0 19px 20px 20px">套餐名称:</span>
                                <template>
                                    <Input placeholder="请输入套餐名称" v-model="name" style="width: 160px"></Input>
                                </template>
                            </div>
                            <div style="margin:0 19px 20px 20px">
                                <span style="font-size: 14px;color: #363F4C; padding:0 19px 0 15px;">商品ID:</span>
                                <Input placeholder="请输入商品ID" v-model="shoping_id" style="width: 160px"></Input>
                                <Button style="border:0;background:#F0B46E;margin-left:10px;color:white" @click="add_goods">添加搭配商品</Button>
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
                                            <tr v-for="(res,index) in goods_arr" style="text-align: center;">
                                                <td>{{res.id}}</td>
                                                <td>{{res.name}}</td>
                                                <td>{{res.price}}</td>
                                                <td>1</td>
                                                <td @click="del_goods_sku(index)">删除</td>
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
                                <Input placeholder="请输入套餐优惠价格" v-model="price" style="width: 160px"></Input>
                            </div>
                            <div style="padding:0 0 20px 27px">
                                <span style="font-size: 14px;color: #363F4C; margin:0 19px 20px 20px">运费:</span>
                                <Input placeholder="请输入邮费金额" v-model="freight" style="width: 160px"></Input>
                            </div>
                            <!-- <div style="padding:0 0 20px 27px">
                                <span style="font-size: 14px;color: #363F4C; margin:0 19px 20px 20px">库存:</span>
                                    <Input placeholder="请输入库存金额" style="width: 160px"></Input>
                            </div>
                            <div style="padding:0 0 20px 0">
                                <span style="font-size: 14px;color: #363F4C; margin:0 19px 20px 20px">库存预警:</span>
                                    <Input placeholder="可不填" style="width: 160px"></Input>
                                </div> -->
                        </div>
                        <div slot="footer">
                            <button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;" @click="clearputway">取消</button>
                            <button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;" @click="add_package">确定</button>
                        </div>
                    </Modal>
                </div>
                <!--删除-->
                <div id="app2">
                    <Modal v-model="del_good" width="376" class-name="vertical-center-modal">
                        <div class="tit" style="padding-top:20px;">是否确定删除商品</div>
                        <div slot="footer" class="btns">
                            <button class="btn btn1" @click="clearputway">取消</button>
                            <button class="btn btn2" @click="del_ok">确定</button>
                        </div>
                    </Modal>
                </div>

                <!--上下架弹框-->
                <div id="app2">
                    <Modal v-model="soldout" width="376" class-name="vertical-center-modal">
                        <div class="tit" style="padding-top:20px;">是否确定商品{{soldout_name}}架</div>
                        <div slot="footer" class="btns">
                            <button class="btn btn1" @click="clearputway">取消</button>
                            <button class="btn btn2" @click="down_ok">确定</button>
                        </div>
                    </Modal>
                </div>
            </div>
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
            putways_id: '',
            putways_name: '',
            del_good: false,
            soldout: false,  // 上下架
            soldout_name: '',
            list_main: "",
            content: '',
            del_id: '',
            shoping_id: '',// 商品id 
            goods_arr: [],
            goods_arr_id: [],
            name: "",
            price: "",
            freight: '',

        }
    },
    mounted() {
        this.get_list()
    },
    methods: {
        change_statue() {  // 选择状态
            this.get_list()
        },
        clearputway() {  // 关闭
            this.putaways = false
            this.del_good = false
            this.soldout = false
        },
        addcombo() { // 新增套餐
            this.addtc = true;
        },
        putways(id, name) { // 上下架弹框
            if (name == 1) {
                this.soldout_name = '下'
            } else {
                this.soldout_name = '上'
            }
            this.putways_id = id
            this.putways_name = name
            this.soldout = true;
        },

        down_ok() {   // 上下架事件
            this.$axios({
                url: linkurl.shelve_goods_package,
                method: 'POST',
                data: {
                    token: linkurl.token,
                    id: this.putways_id,
                    is_shelve: (this.putways_name == 1) ? 0 : 1,
                },
                transformRequest: [function(data) {
                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
            })
                .then(res => {
                    this.soldout = false
                    this.get_list()
                })
        },


        del_goods(id) {  // 删除弹框
            this.del_good = true
            this.del_id = id
        },

        del_ok() {  // 删除事件
            this.$axios({
                url: linkurl.delete_goods_package,
                method: 'POST',
                data: {
                    token: linkurl.token,
                    id: this.del_id,
                },
                transformRequest: [function(data) {
                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
            })
                .then(res => {
                    this.del_good = false
                    this.get_list()
                })
        },

        get_list() {   // 套餐列表
            this.$axios({
                url: linkurl.get_goods_package_list,
                method: 'POST',
                data: {
                    token: linkurl.token,
                    status: this.model,
                    page: 0,
                },
                transformRequest: [function(data) {
                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
            })
                .then(res => {
                    console.log(res.data.data)
                    this.list_main = res.data.data
                    for (let i = 0; i < this.list_main.length; i++) {
                        this.content = this.list_main[i].content
                    }
                })
        },

        add_goods() {  // 增加商品
            this.$axios({
                url: linkurl.get_goods_detail,
                method: 'POST',
                data: {
                    token: linkurl.token,
                    id: this.shoping_id,
                },
                transformRequest: [function(data) {
                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
            })
                .then(res => {
                    console.log(res.data.data)
                    let arr = []
                    let i = res.data.data
                    let i_id = res.data.data.id
                    if (res.data.data.id) {
                        this.goods_arr.push(i)         // 前端渲染的数据
                        this.goods_arr_id.push(i_id)   // 传给后端的数组
                    } else {
                        this.$Message.config({ top: 50 })
                        this.$Message.error('商品不存在')
                    }

                })
        },

        del_goods_sku(id) {   // 删除商品
            this.goods_arr.pop()
            this.goods_arr_id.pop()
        },

        add_package() {  // 新增套餐
            this.$axios({
                url: linkurl.handle_goods_package,
                method: 'POST',
                data: {
                    token: linkurl.token,
                    id: 0,
                    name: this.name,
                    price: this.price,
                    freight: this.freight,
                    content: JSON.stringify(this.goods_arr_id)
                },
                transformRequest: [function(data) {
                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
            })
                .then(res => {
                    console.log(res.data.data)
                    this.addtc = false
                    this.get_list()

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
} // @import '../../../assets/css/index.scss'
</style>