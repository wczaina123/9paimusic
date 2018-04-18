<!--这是教程列表页-->

<template>
    <div class="couselist">
       <div id="test">
	    <div class="ban">
	    	<img :src="cover" alt="">
	    </div>
	    <div class="test_font">
	        <h1>{{title}}</h1>    
	    	<h2><span></span></h2>
	    	<h3>{{category}}</h3>
	    </div>
		<div class="test_list">
			<ul>
				<li>
					<p>课程</p>
					<span><em>{{lesson_period}}</em>课时</span>
				</li>
				<li>
					<p>平均学习</p>
					<span><em>{{average_days}}</em>天</span>
				</li><li>
					<p>级别</p>
					<span><em>LV{{level}}</em></span>
				</li>
			</ul>
		</div>
	    <button @click="skipLink(mainId)">参加课程</button>
	</div>

		<div class="couse-main">
			<div class="main-top">
				<p @click="tabchang" :class='p_style'>课程介绍</p>
				<p @click="tabchang2" :class='p_styles'>课程内容</p>
			</div>
		</div>
		<div class="couse-end-one" v-if="!isshow">
			<p>{{description}}</p>
			
		</div>

		<div class="couse-end-two" v-if="isshow">
			<ul>
				<li v-for="(item,index) in items" :key="index">
					<span>{{index+1}}</span>
					<span @click="skipLink((item.id))" >{{item.title}}</span>
					<em>></em>
				</li>
			</ul>
		</div>
		<sharrhead></sharrhead>
    </div>
	
</template>

<script>
import linkurl from "../App_linkurl"
import axios from "axios"
import sharrhead from "../Public/App_share-head"

export default {
  name: 'Course',
  components:{
	  sharrhead
  },
  data () {
      return{
				id : "",
				isshow:true,
				category:"",
				cover:"",
				description:"",
				items:[], // 准备遍历数组
				lesson_period:"",
				level:"",
				mainId:"",
				p_style:"",
				p_styles:"p_style",
				title:"",
				average_days:""
      }
	},
	beforeCreate:function(){
		 // 获取url 传过来的ID
		var id = window.location.pathname
		var ids = id.substring(1)
		var idss = ids.split("/")
		var idsss = idss[1]
		this.urlid = idsss
		// 改变title
		document.title="欢迎来到九拍教学"
	},


  mounted:function(){
    this.getlink()
    this.token()
  },
  methods:{
		// 切换div
		tabchang:function(){
			this.isshow = false
			this.p_style="p_style"
			this.p_styles=""
			
		},
		tabchang2:function(){
			this.isshow = true
			this.p_style=""
			this.p_styles="p_style"
			
		},
		// 路由跳转
		skipLink:function(id){
			this.$router.push({path:'coursemain/'+id})
		},
		// 请求数据
		getlink:function(){ 
		var that = this
		axios({
        url: linkurl.app_course,
        method: 'post',
        data: {
          userid: 0,
		//   id: 11,
		  id : this.urlid
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
			.then(function(res){
				//console.log(res.data.data) // 接口已经接通
				that.category = res.data.data.category
				that.cover = res.data.data.cover
				that.description = res.data.data.description
				that.items = res.data.data.items
				that.lesson_period = res.data.data.lesson_period
				that.level = res.data.data.level
				that.mainId = res.data.data.items[0].id
				that.title = res.data.data.title
				that.average_days = res.data.data.average_days
			})
			.catch(function(err){
				console.log("获取课程列表报错")
			})
    },
    
    // 微信分享
    token:function(){
        this.urls = window.location.href
        var that = this
        axios({       
        url: linkurl.app_wxjsdk,
        method: 'post',
        data: {
            url: this.urls,
        },
        transformRequest: [function (data) { // 转换成fromdata格式
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
        .then(function(res){
            that.urls = res.data.url
            
        //引入jssdk
        wx.config({
        debug: false, 
        appId: res.data.appId,  // appid
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
        signature: res.data.signature,// 必填，签名，见附录1
        jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
        ] 
        });
        // 调用方法
        wx.ready(function(){
            wx.onMenuShareTimeline({
                title:  "欢迎来到九拍教学",
                link: that.urls,
                desc:  that.title,
                imgUrl: that.cover
        });

        wx.onMenuShareAppMessage({
          title:  "欢迎来到九拍教学课程",
          desc:  that.title,
          link: that.urls,
          imgUrl: that.cover,
          type: '',
          dataUrl: '',
          success: function () {    
          },
          cancel: function () {
          }
        });
      });
    })   
    },


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
body{
	font-weight: normal;
}

.couselist{
#test{
		width:100%;
		height:3rem;
		position: relative;
		color:#fff;
		.ban{
			position: absolute;
			left:0;
			top:0;
			width:100%;
			height:100%;
			img{
				width:100%;
				height:100%;
			}
		}
		.test_font{
			position:absolute;
			top:0.2rem;
			left:0;
			bottom:0;
			right:0;
			margin:auto;
            text-align:center;
            h1{
                font-size:26px;
                margin-bottom:10px;
            }
            h2{
                font-size:12px;
                margin-bottom:10px;
                font-weight:400;
            }
            h3{
                font-size:0.12px;
                font-weight:400;
            }
		}
		.test_list{
            position: absolute;
            bottom:1rem;
			width:92%;
			height:45px;
			margin-left:4%;
			ul{
				display:flex;
				justify-content:space-between;
				align-items:center;
				li{
					color:#fff;
					text-align:center;
					p{
						display:block;
						font-size:12px ;
					}
					span{
						font-size:12px;
						em{
							font-style:normal;
							font-size:24px;
							font-weight:600;
							margin:0 0.05rem;
						}
					}
				}
			}
		}
		button{
            position: absolute;
            bottom:0.15rem;
			width: 92%;
			height: 44px;
			margin-left:4%;
			background: #DA6666;
			font-size: 16px;
			color: #fff;
			font-weight: normal;
			border:0;
			border-radius:0.06rem;
		}
	}
	.couse-main{
		.main-top{
			width: 100%;
			height:44px;
			display: flex;
			justify-content: space-around;
			border-bottom:1px solid #ddd;
		p{
			margin: 0;
			padding:0;
			text-align: center;
			font-size: 14px;
			letter-spacing: 2px;
			line-height: 40px;
		}
		.p_style{
			border-bottom:2px solid #da6666;
		}
		}
	}
	.couse-end-one{
		width:94%;
		margin-left:3%;
		p{
			text-indent:2em;
			line-height:26px;
			font-size:12px;
			display:-webkit-box;
			word-break:break-all;
			-webkit-line-clamp:3;
			-webkit-box-orient:vertical;
			overflow:hidden;
		}
	}
	.couse-end-two{
		font-size: 14px;
		color: #000000;
		letter-spacing: 2px;
		line-height: 40px;
		overflow-y:scroll;
		ul{
			li{
				margin-left:15px;
				height: 49px;
				display: flex;
				justify-content: space-between;
				align-items:center;
				border-bottom: 1px solid #eee;
				span:nth-child(1){
					width: 10%;
				}
				span:nth-child(2){
					width: 90%;
					font-size: 14px;
					color: #4A4A4A;
				}
				em{
					font-style:normal;
					margin-right:15px;
				}
				&:last-child{
					border-bottom:none;
				}
			}
		}
	}
}
</style>
