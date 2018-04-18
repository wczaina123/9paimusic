<template>
    <div>
        <div class="topbox">
            <div class="content big_content content_padding_delete">
                <div class="contentlist" @click="goods"><span class="goodslist">商品列表</span></div>
                <div class="contentlist" ><span class="orderlist">订单管理</span></div>
                <div class="contentlist" @click="pro"><span class="promotion">促销管理</span></div>
                <div class="contentlist" @click="categorys"><span class="category">品类管理</span></div>
                <!-- <div class="contentlist" @click="excile"><span class="promotion">报表</span></div>       -->
            </div>
        </div>
        <div class="mainbox" style="margin-top:30px">
            <p class="home_text home_text_p">
                订单管理
                <a href="javascript:;" @click="onexport('out-table')">导出excel表</a>
            </p>
            <p class="home_p" style="position:relative;">
                <select class="form-control" style="width:160px !important; font-size:12px;float:left;"  @change="getstate" v-model="state">
                    <option value='-1'>订单状态</option>
                    <option :value='0' >未付款</option>
                    <option :value='1'>已付款</option>
                    <option :value='2'>已发货</option>
                    <option :value='3'>已完成</option>
                    <option :value='4'>已关闭</option>
                </select>
                <span class="add_today" style="float:right;margin-right:30px;">
                    <a href="javascript:;">今日新增:<span style="color:red">000</span></a>
                </span>
                <a class="add_all" style="float:right;margin-right:20px;">
                    <a href="javascript:;">订单总数:<span style="color:red;">000</span></a>
                </a>
            </p>
            <div id="out-table" class="list-group" v-for="res in list_main" :key="res.id">
                <div style="border:1px solid #eee;text-align: left;padding:20px;">
                    <div class="delivery_header">
                        <span style="font-size:16px;margin-right:20px;">订单号：{{res.order_no}}</span>
                        <span style="font-size:16px;">用户ID：{{res.user_id}}</span>
                        <div></div>
                        <div>
                            <button class="btn_style">修改订单</button>
                            <button class="btn_style">关闭订单</button>
                        </div>
                    </div>
                    <div class="delivery_top">
                        <span>创建时间：{{res.created_at*1000|formatDate}}</span>
                        <span>付款时间：{{res.pay_time*1000|formatDate}}</span>
                      
                    </div>
                    <div class="delivery_top">
                        <span>发货时间：{{res.delivery_time*1000|formatDate}}</span>
                        <span>完成时间：{{res.finish_time*1000|formatDate}}</span>
                    </div>
                    <div class="delivery_top">
                       <!--  <span>收货人：<input type="text" :value="res.name" class="changeinput"></span>
                        <span>联系电话：<input type="text" :value="res.phone" class="changeinput"></span> -->
                         <span>收货人：{{res.name}}</span>
                        <span class="margin_left_question">联系电话：{{res.phone}}</span>
                    </div>
                    <div class="delivery_top">
                        <span>地址：{{res.province}}-{{res.city}}-{{res.district}}-{{res.address}}</span>
                    </div>
                    <div class="delivery_top">
                        <span style="margin-right:0;">承运公司：</span>
                            <select class="form-control" style="width:95px;font-size:12px;height:32px;"   :value='res.express_company_id'>
                                <option value=''>选择承运公司</option>
                                <option v-for="(exp,key) in express" :value="key" :key="key">{{exp}}</option>
                            </select>
                        <!-- 
                        <span style="line-height: 32px;margin-left:85px;">运单号：<input type="text" :value="res.express_no" class="changeinput"></span> -->

                        <span style="line-height: 32px;margin-left:85px;">运单号：{{res.express_no}}</span>
                    </div>
                    <div class="delivery_top">
                        <!-- <span>总金额：<input type="text" class="changeinput" :value="res.total_money"></span> -->
                       <!--  <span style="margin-left:15px;">总运费：<input type="text" class="changeinput" :value="res.total_freight"></span> -->
                        <span>总金额：{{res.total_money}}</span>
                        <span style="margin-left:80px;">总运费：{{res.total_freight}}</span>
                        <span>支付方式：111111</span>
                    </div>
                    <div  class="delivery_top">
                        <span>备注：{{res.remark}}</span>
                    </div>
                    <div>
                        <table class="table-list">
                            <thead>
                                <tr>
                                    <th style="width:15%;">商品品类</th>
                                    <th style="width:55%;">商品名称</th>
                                    <th style="width:10%;">单价</th>
                                    <th style="width:10%;">数量</th>
                                    <th style="width:10%;">运费</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="ress in res.goods_list" :key="ress.id">
                                    <td style="text-align:center;">{{ress.goods_category}}</td>
                                    <td style="text-align:center;">{{res.name}}</td>
                                    <td  style="text-align: center;">{{ress.price}}</td>
                                    <td  style="text-align: center;">{{ress.amount}}</td>
                                    <td  style="text-align: center;">{{ress.freight}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--已付款才显示-->
                    <div style="text-align: center;margin:10px;" v-if="show">
                        <div style="float: left;margin-right:10px;">
                            <select class="form-control" style="font-size:12px;height:32px;" @change="changeexpress"  v-model="express_change">
                                <option value=''>选择承运公司</option>
                                <option v-for="(exp,key) in express" :value="key" :key="key">{{exp}}</option>
                            </select>
                        </div>
                        <div style="float: left;margin-right:10px;">
                            <input type="text" placeholder="运单号" v-model="express_no" style="padding:4px;width:200px;" >
                        </div>
                        <div style="float:left;">
                            <button type="button" class="btn button-default" @click="Consignment(res.id)">发货</button>
                        </div>
                        <div style="clear: both;"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import linkurl from '../../All-commonality/LinkUrl'
    import {formatDate} from './data'
    export default {
        data(){
            return{
            state:-1,   // 订单状态
            show:false,
            express:'',   // 快递
            list_main:'',
            express_change:"",
            express_no:"",  // 订单号 
        }
    },
    mounted(){
        $('.orderlist').css({'color':'#363F4C','font-weight':'bolder'})
        this.get_express()
        this.get_list()
    },
    methods:{
        // 导出excle表
        onexport(evt){
            var wb = XLSX.utils.table_to_book(document.getElementById(evt));
            var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
            var data = new Date()
            var moun = data.getMonth()+1
            var a = data.getFullYear()+'-'+moun+'-'+data.getDate()
            saveAs(new Blob([this.s2ab(wbout)], { type: 'application/octet-stream'}),'订单列表-'+a+'.xlsx');
        
        },

        s2ab(s){
            if(typeof ArrayBuffer != 'undefined') {
                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                return buf;
            }  
            else {
            var buf = new Array(s.length);
            for (var i=0; i!=s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
            return buf;
            }
    },


        goods(){

            this.$router.push({path:'/store'})
        },
        pro(){
            this.$router.push({path:'/store/timelimit'})
        },
        categorys(){
            this.$router.push({path:'/store/category'})
        },
        
        getstate(e){   // 选择订单状态
            console.log(e.target.value)
            if(e.target.value==1){
                this.show = true
                this.state = e.target.value
                this.get_list()
            }else{
                this.show = false
                this.state = e.target.value
                this.get_list()
            }
            
        },

        changeexpress(e){   // 选择快递公司
            // console.log(e.target.value)
            this.express_change = e.target.value
        },

        Consignment(id){   // 发货
            this.$axios({
                url: linkurl.order_delivery,
                method: 'POST',
                data: {
                    token: linkurl.token,
                    id:id,
                    express_company_id:this.express_change ,
                    express_no:this.express_no
                },
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(res=>{
                console.log(res.data.data)
                this.get_list()      
            })
        },

        get_express(){  // 获取快递信息
            this.$axios({
                url: linkurl.get_express_company,
                method: 'POST',
                data: {
                    token: linkurl.token,
                },
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(res=>{
                // console.log(res.data.data)
                this.express = res.data.data

                // let msg = res.data.data
                // let arr = []
                //  for (let i in msg) {
                //     let a = {'id':i,'name':msg[i]}
                //     arr.push(a)
                // }
                // // console.log(arr)
                // this.express = arr
                
            })
            .catch(err=>{
                console.log("获取分类列表失败",err)
            })
        },

        get_list(){    // 获取列表
            this.$axios({
                url: linkurl.get_order_list,
                method: 'POST',
                data: {
                    token: linkurl.token,
                    status_id:this.state,
                    page:0
                },
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(res=>{
                    // console.log(res.data.data)
                    this.list_main = res.data.data
                })
            .catch(err=>{
                console.log("获取分类列表失败",err)
            })
        },
    },

    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd');
        }
    }
}
</script>

<style  scoped lang='scss'>
    @import '../../../assets/css/alert.css';   
    .btn_style{
        width: 80px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        border: none;
        border-radius: 5px;
        color:#fff;
        background: #7d93b2;
    } 
    .maintop-one{
        span{
            font-size: 18px;
        }
    }

    .changeinput{
        width:90px;
        border: none;
        border-bottom: 1px solid #DEE5EE;
        outline-style: none;
    }

</style>
