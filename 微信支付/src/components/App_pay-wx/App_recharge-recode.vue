<template>
  <div class="recode">
    
     <div class="recode_div">
	 	<div id="recode">
	 	   <p><em>2017</em>年<span>12</span>月</p>
	 	   <ul class="recode_uls">
	 	   	<li v-for="(msg,index) in arrmax" :key="index">
	 	   		<p>
	 	   			<a href="javascript:;">金币充值</a>
	 	   			<time>{{msg.time | formatDate}}</time>
				  </p>
				<span>+{{msg.number}}</span>
	 	   	</li>
        <!-- <li v-for="(msg,index) in time" :key="index">
        <p>
          <a href="javascript:;">金币充值</a>
          <time>{{msg.time | formatDate}}</time>
				</p>
				<span>+{{msg.number}}</span>
	 	   	</li> -->
	 	   </ul>
	 	</div>
	 </div>
  </div>
</template>

<script>

import axios from "axios"
import linkurl from "../App_linkurl"
import {formatDate} from "../App_timeFilters.js"

export default {
  name: 'Recode',
  data () {
    return {
      from_way:"",
      time:[],
      userid:sessionStorage.getItem("userid"),
      token:sessionStorage.getItem("token"), 
      jia:false,
      test:"",
      arrmax:[],
      arrnum:[]

    }
  },
  beforeCreate:function(){
    document.title = "充值记录"
  },
  mounted:function(){
    this.getdetail()
    
  },
  methods:{
    testtime:function(){   // 遍历数组
      var arr = this.time
      var arrmax = []
      for(let i=0;i<arr.length;i++){
        if(arr[i].from_way == "充值"){
          this.arrmax.push(arr[i])
        }
      }      
    },
    //////
    getdetail:function(){ // 获取金币记录详情
      axios({
        url: linkurl.app_moneyDetail,
        method: 'post',
        data: {
          user_id:this.userid,
          token:this.token,

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
      .then((res)=>{
        // console.log(res.data.data)  
        this.time = res.data.data
        this.testtime()        
      })
      .catch((err)=>{
        console.log("获取金币详情失败")
      })
    },
  },
  filters:{  // 自定义管道符
      formatDate(time){ // 进行时间戳转换
        let date = new Date(time*1000)
        return formatDate(date,'MM-dd hh:mm')
      },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
*{
		padding:0;
		margin:0;
		list-style: none;
		font-size:16px;
    color:#4a4a4a;
    text-decoration:none;
	}
  body,html,.recode_div{
    width:100%;
    height:100%;
  }
	.recode_div{
		background:#f6f6f6;
	}
	#recode{
    p{
      width:100%;
      height: 44px;
      line-height:44px;
      padding-left:15px;
      em{
        font-style:normal;
      }    
    }
    .recode_uls{
      width:100%;
      height: auto;
      background:#fff;
      li{
        width:100%;
        height: 58px;
        border-bottom:1px solid #f5f5f5;
        display: flex;
        justify-content:space-between;
        padding:0 15px;
        p{
          height:58px;
          position: relative;
          a{
            font-size:16px;
            position: absolute;
            left: 0;top:-3px;
          }
          time{
            position: absolute;
            bottom:-3px;
            left:0;
            font-size:14px;
            color:#999;
            margin-top:5px;
          }
        }
        span{
          align-items:center;
          height: 58px;
          line-height:58px;
          font-size:20px;
          font-weight:600;
        }
      }

    }
	}
</style>
