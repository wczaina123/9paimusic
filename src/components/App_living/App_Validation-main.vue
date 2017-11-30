<template>
<div id="vaildationmain">
	<div class="scroll">
		<div class="section_ban">
			<img :src="cover" alt="">
		</div>
		<div class="section_info">
			<h6>
				<span>直播时间</span>
				<p>
					{{pre_time}}
				</p>
			</h6>
			<h6>
				<span>参与人数</span>
				<p>
				<a>{{appointment_num}}</a>人已报名
				</p>
			</h6>
		</div>
	<div class="section_message">
            <h3>直播简介：</h3>
            <h4>{{summry}}</h4>
        </div>
	</div>
	<footer class="vai_footer" @click="download">
	立即报名
</footer>
</div>
</template>

<script>

import linkurl from "../App_linkurl.js"
import axios from 'axios'

export default {
  name: 'Sharemain',
  
  data () {
    return {
      cover:"",
      summry:"",
      pre_time:"",
			appointment_num:"",
			urls:"",
			player_headimg:"",
			player_name:"",
			
      
    }
  },
  mounted:function(){
		this.test()
		this.token()
  },
  methods:{
    
    test:function(){
     var id = window.location.pathname
     var ids = id.substring(1)
     var idss = ids.split("/")
     var idsss = idss[1]
     this.urlid = idsss
      // 分享列表信息
      axios({
        url: linkurl.app_validation,
        method: 'post',
        data: {
          userid: 0,
          liveid: this.urlid
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
      .then(this.GetdateSucc.bind(this))
      .catch(this.GetdateErr)
    },
    GetdateSucc:function(res){ 
      // console.log(res.data)
      this.cover = res.data.data.cover
      this.summry = res.data.data.summry
      this.pre_time = res.data.data.pre_time
			this.appointment_num = res.data.data.appointment_num
			this.player_headimg = res.data.data.player_headimg
			this.player_name = res.data.data.player_name
      
    },
    GetdateErr:function(error){
      console.log("获取后直播列表数据失败")
    }, 

    download:function(){  // 跳转下载
    	location.href= linkurl.app_download;
		},

		    // 调用微信分享
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
			// console.log(res)
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
            title:  that.player_name+"的直播预告",
            link: that.urls,
            desc:  "将于"+that.pre_time+"时开始，快来报名吧！",
            imgUrl: that.player_headimg
    });

    wx.onMenuShareAppMessage({
      title:  that.player_name+"的直播预告",
      desc:  "将于"+that.pre_time+"时开始，快来报名吧！",
      link: that.urls,
      imgUrl: that.player_headimg,
      type: '',
      dataUrl: '',
      success: function () {    
      },
      cancel: function () {
      }
    });
  });
})   
}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  * {
	margin: 0px;
	padding: 0px; 
	text-decoration:none;
	box-sizing:border-box;
	font-size:14px;
	font-weight: 400;
}
span,p{
	color:#636363;
}
h1,h2,h3,h4,h5,h6{
	color:#636363;
}
html,body,#vaildationmain{
	width:100%;
	height:100%;
	overflow:hidden;
	font-size: 12px;
}
#vaildationmain{
    display:flex;
    flex-direction:column;
    position:relative;
    .scroll{
        overflow-y:scroll;
    .section_ban{
        width:100%;
        height: auto;
        img{
            width:100%;
            height:100%;
        }
    }
    .section_info{
			width:94%;
			margin-left:3%;
			position: relative;
			margin-top:-1rem;
			background:#fff;
			border-radius:0.1rem;
			border:1px solid #eee;
			padding:0 0.15rem 0 0.15rem;
			h6{
				border-bottom:1px solid #eee;
				span{
					padding-top: 10px;
					display: inline-block; 
					font-size:12px; 
				}
				p{
					line-height:34px;
					font-size:12px;
				}
				&:last-child{
					border-bottom:none;
				}
			}
    }
    .section_message{
		width:94%;
		height:auto;
		margin-left:3%;
		margin-bottom:46px;
		h3{
			padding-top:10px;
			padding-bottom:5px;
			font-size:14px;
			font-style:normal;
		}
		h4{
			text-indent:2em;
			line-height: 22px;
			font-size:12px;
		}
	}
}
	.vai_footer{
		position:absolute;
		left:0;
		bottom:0;
		width:100%;
		height:45px;
		line-height:45px;
		background:#da6666;
		text-align:center;
		color:#fff;
		font-size:14px;
	}
}
</style>
