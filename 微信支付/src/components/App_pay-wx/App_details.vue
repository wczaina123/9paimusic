<template>
  <div class="details">
    
<div id="member">
    <header class="member_header">
      <img src="../../assets/bg.png" alt="">
      <div class="header_top">
            <p>ID号：<span>{{userid}}</span></p>
            <div class="member_user">
              <div class="member_user_left">
                <p>{{username}}</p>
                <img src="../../assets/huiyuan.png" alt="" v-if="testvip">
              </div>
              <div class="member_user_right">
                <span @click="exit">更换账号</span>
                <!-- <span @click="golink">更换账号</span> -->
                <span @click="gorecode">充值记录</span>
              </div>
            </div>
      </div>
      <div class="header_middle">
        <h6>我的金币余额</h6>
        <h5>{{allow_number}}</h5>
      </div>
    </header>
    <a href="javascript:;" style="display:block;width:100%;height:5px;background:#f6f6f6;"></a>
    <section class="member_section">
      <p>请选择充值金额</p>
      <div class="gold_member_list">
        <ul>
          <li v-for="(item,index) in monetList" :key="index.id" @click="wxpay(item.id,item.price)">
            <h3>{{item.name}}</h3>
            <h4>￥<span>{{item.price}}</span></h4>
          </li>
        </ul>
      </div>
      <!-- <div v-if="isvip"> -->
      <div>
        <p>成为会员</p>
  			<h2>年费套餐<span>￥<em>{{price}}</em></span></h2> 
      </div>
       
    </section>
</div>
</div>
</template>

<script>
import axios from "axios"
import linkurl from "../App_linkurl.js"

export default {
  name: 'Details',
  data () {
    return {
    username:sessionStorage.getItem("username"),
    userid:sessionStorage.getItem("userid"),
    vip:sessionStorage.getItem("vip"),  // 是否为vip的状态
    token:sessionStorage.getItem("token"), 
    testvip:"",      // 是否为vip的状态
    allow_number:"", // 剩余金额
    monetList:[],     // 金币列表
    isvip:"",
    price:"",
    wxpayid:"",
    wxprice:"",
    order_no:"", // 订单号
    wxsign:"",
    urls:""
    }
  },
  beforeCreate:function(){
    
  },
  computed:{
    if(){

    }
  },
  mounted:function(){
    // this.getToken()
    this.getOpenid()   
    this.getMoney()
    this.getMoneylist()
    this.ifvip()
    this.getYermoney() 
    
  },
  methods:{
    // 跳转页面
    // golink:function(){
    //   self.location='http://testapi.9beats.com/beecloud_pay.php'; 
    // },

    wxpay:function(id,price){  // 微信支付
      this.wxpayid = id
      this.price = price   
      this.getOrder()     // 获取订单号
      //this.getsign()      // 获取 sign
      //this.wxpaymoney()   // 触发微信支付
      
    },
    wxpaymoney:function(){  // beecloud支付功能
      // console.log(BC)
       BC.err = function(data) {
            //注册错误信息接受
            alert(data["ERROR"]);
            // alert("错误")
        }

        BC.click({
            
            "title":this.order_no, //商品名
            "amount":this.price,  //总价（分）
            "out_trade_no": this.order_no, //自定义订单号
            "sign":this.wxsign, //商品信息hash值，含义和生成方式见下文
            "return_url" : "http://payservice.beecloud.cn/spay/result.php", //支付成功后跳转的商户页面,可选，默认为http://payservice.beecloud.cn/spay/result.php
            //"openid" : "<%=openid%>", // openid 
            "optional" : "",//可选，自定义webhook的optional回调参数
        });
    },
    exit:function(){   //退出到登陆页
      this.$router.push({path:'/'})
    },
    gorecode:function(){  // 进入到充值记录
      this.$router.push({path:'/recode'})
    },
    ifvip:function(){  // 判断是否为会员
     if(this.vip >0  ){
        this.testvip = true
        this.isvip = false
     }else{
       this.testvip = false
       this.isvip = true
     }
    },

    getMoney:function(){ // 请求金币余额
      axios({
        url: linkurl.app_myMoney,
        
        method: 'post',
        data: {
          user_id : this.userid,
          token : this.token,
        },
        
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
        },
      })
      .then((res)=>{
        // console.log(res.data)
        this.allow_number = res.data.data.count
      })
      .catch((err)=>{
        console.log("获取金币余额失败")
      })
    },
    ///////////////
    getMoneylist:function(){  // 请求金币列表
      axios({
        url: linkurl.app_moneyList,
        method: 'post',
        data: {
          f:"h5"
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
        },
        
      })
      .then((res)=>{
        // console.log(res.data.data.c_data)
        this.monetList = res.data.data.c_data
      })
      .catch((err)=>{
        console.log("获取金币列表失败")
      })
    },
    /////////////////
    getYermoney:function(){  // 请求vip价格
      axios({
        url: linkurl.app_getyerMoney,
        method: 'post',
        data: {
          f:"h5"
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
        },
        
      })
      .then((res)=>{
        // console.log(res.data.data)
        this.price = res.data.data[0].price
      })
      .catch((err)=>{
        console.log("获取年费会员失败")
      })
    },
    ///////////
    getOrder:function(){   // 获取订单号
      axios({
        url: linkurl.app_getOrder,
        method: 'post',
        data: {
          user_id: this.userid,
          goods_id:this.wxpayid,
          f:"h5",
          token:this.token
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
        },
        
      })
      .then((res)=>{
        // console.log(res.data)
        this.order_no = res.data.data.order_no
        console.log(this.order_no)
        this.getsign()
      })
      .catch((err)=>{
        console.log("获取订单号失败")
      })
    },

    // 请求url
    getToken:function(){   
      // alert(this.urls)
      axios({
        url: this.urls,
        method: 'get',
        data: {
          
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'

        },
      })
      .then((res)=>{
        console.log(res,11111)
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    

    getOpenid:function(){   // 获取微信openid
      // alert("1")
      axios({
        url: linkurl.app_openid,
        method: 'get',
        data: {
        //  params:{"contentType": "application/json;charset=utf-8"}
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
        },
        
      })
      .then((res)=>{
        console.log(res)
        this.urls = res.data
        // self.location = this.urls; 
         //window.location.href= this.urls  // 页面跳转获取openid
        
        console.log(this.urls)
        // this.getToken()
      })
      .catch((err)=>{
        alert(err)
      })
    },


    ///////////
    getsign:function(){   // 获取加密签名
      axios({
        url: linkurl.app_getsign,
        method: 'post',
        data: {
          user_id: this.userid,
          token: this.token,
          order_no: this.order_no
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
        },
        
      })
      .then((res)=>{
        // console.log(res.data.data)
        this.wxsign = res.data.data
        // console.log(this.wxsign,111111)
        this.wxpaymoney()
      })
      .catch((err)=>{
        console.log(err)
        console.log("获取签名失败")
      })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
*{
    margin:0;
    padding:0;
    font-weight:400;
}
#member,#nonmember{
width:100%;
height:100%;
font-size:16px;
overflow: hidden;
overflow-y: scroll;
.member_header{
    width:100%;
    height:1.5rem;
    position:relative;
    img{
        width:100%;
        height:100%;
    }
    .header_top{
        width:100%;
        padding:20px 3% 0 3%;
        position: absolute;
        left: 0;top:0;
        border-bottom:1px solid #fff;
        p{
            font-size:0.14rem;
            color:#fff;
            margin:0;
        }
.member_user{
    width:100%;
    height:0.5rem;
    display:flex;
    justify-content: space-between;
    align-items:center;
    .member_user_left{
      height:0.5rem;
      line-height:0.5rem;
        p{
            font-size:0.2rem;
            white-space:nowrap;
            text-overflow:ellipsis;
            overflow:hidden;
            float:left;
            vertical-align:middle;
        }
        img{
            width:0.18rem;
            height:0.18rem;
            margin-left:5px;
            vertical-align:middle;
        }
    }
    .member_user_right{
        color:#fff;
        span{
            font-size:0.14rem;
            &:first-child{
                border-right:1px solid #fff;
                padding:0 5px;
            }
        }
    }
}
}
.header_middle{
    width:100%;
    height:0.6rem;
    position: absolute;
    left:0;
    bottom:0;
    display: flex;
    justify-content: space-between;
    align-items:center;
    padding:0 3%;
    color:#fff;
    font-weight:400;
    font-size:0.16rem;
    float:left;
    h6{
        font-weight:400;
        font-size:16px;
    }
    h5{
        font-size:0.26rem;
    }
}
}
.member_section{
    width:90%;
    margin-left:5%;
    padding:10px 0 0 0;
    p{
        height: 36px;
        line-height:36px;
        font-size:18px;
        color:#9c9c9c;
    }
.gold_member_list{
    width:100%;
    ul{
      width:100%;
      display: flex;
      justify-content: space-between;
      align-items:center;
      flex-wrap:wrap;
      li{
        width:30%;
        margin:6px 4px;
        padding:10px;
        background: #f6f6f6;
        border-radius:5px;
        h3{
          text-align:center;
          color:#b49e69;
          font-size:20px;
        }
        h4{
          margin-top:5px;
          text-align:center;
          font-size:16px;
        }
      }
    }
}
    h2{
        width:100%;
        height: 64px;
        line-height:64px;
        font-size:16px;
        color:#333;
        padding-left:15px;
        background:#f6f6f6;
        border-radius:6px;
        span{
            float: right;
            margin-right:24px;
            color:#b49e69;
            font-size:16px;
            em{
                font-style:normal;
                font-size:24px;
            }
        }
    }
}
}
</style>
