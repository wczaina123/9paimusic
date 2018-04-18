<template>
<div id="wrap" >
	<div class="app_section" v-show="all">
		<div class="app_sec_ban">
    <video id="playing_video" width="100%" height="100%" controls webkit-playsinline="true" x-webkit-airplay="true" playsinline="true" x5-video-player-type="h5" x5-video-orientation="h5" x5-video-player-fullscreen="true" preload="auto" style="background:black" :poster="backimg">
     <source :src="url" type="application/x-mpegURL">
</video>
		</div>
	</div>

  	<div class="app_section" v-if="half" :key="keyid">
		<div class="app_sec_ban">
    <video id="playing_video" width="100%" height="40%" controls webkit-playsinline="true" x-webkit-airplay="true" playsinline="true" x5-video-player-type="h5" x5-video-orientation="h5" x5-video-player-fullscreen="true" preload="auto" style="background:black" :poster="cover">
     <source :src="url" type="application/x-mpegURL">
    </video>
      
      <!--显示左边主播名称 观看人数  -->
			<!-- <div class="app_sec_ban_people">
        <div class="people_left">
          <img :src="pict" alt="">
  				<div class="font-size">
  					<p>{{text}}</p>
  					<p>{{peop}}人在线</p>
  				</div>
  				<button @click="download">
  					{{clear}}
  				</button>
        </div>
        <div class="people_right" @click="download">
          下载九拍陪你练
        </div>
			</div> -->
		</div>
	</div>


  <!-- <div>内容介绍</div> -->
  <shareHead></shareHead>
</div>
</template>

<script>
import linkurl from "../App_linkurl.js"
import axios from "axios"
import shareHead from "../Public/App_share-head"

export default {
  name: 'Livingmain',
  components:{shareHead},
  data () {
    return {
      url:"",
      cover:"",
      backimg:"",
      type:"",
      all:true,
      half:false,
      img:"../../assets/jiazai_bg.png",
      keyid : "",
      urls:"",
      text:"",
      imgbg:"",
    }
  },
  mounted:function(){
    this.getData()
    this.token() // 执行调用jssdk
  },
  methods:{
    changevideo:function(){
      if(this.type == 1){
        this.all = true
        this.half = false
      }
      if(this.type == 0){
        this.all = false
        this.half = true
      }
    },
    getData:function(){
    // 取出id
    var id = window.location.pathname
     var ids = id.substring(1)
     var idss = ids.split("/")
     var idsss = idss[1]
     this.urlid = idsss
      // 直播列表信息
      axios({
        url: linkurl.app_living,
        method: 'post',
        data: {
          id:this.urlid
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
    GetdateSucc:function(res){  // 传递 直播信息
      
      // console.log(res.data.data)
      this.text = res.data.data.title;
      this.imgbg = res.data.data.headimg
      this.url =  res.data.data.url
      this.cover = res.data.data.cover
      this.type = res.data.data.type
      this.backimg = res.data.data.backimg
      this.keyid = res.data.data.id
      this.changevideo()
    },
    GetdateErr:function(error){
      console.log("获取后直播列表数据失败")
    },
    //////////////////////////////////////////////////////////////
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
            title:  that.text+" 正在直播",
            link: that.urls,
            desc:  "快进入直播间，与同学们一起互动吧",
            imgUrl: that.imgbg
    });

    wx.onMenuShareAppMessage({
      title:  that.text,
      desc:  "快进入直播间与同学们一起互动吧!",
      link: that.urls,
      imgUrl: that.imgbg,
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
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

html,body,#wrap{
width:100%;
height:100%;
}
#wrap{
  width:100%;
  height:100%;
  display:flex;
  flex-direction:column;
  position:relative;
  overflow: scroll;
  .app_section{
    width:100%;
    height:100%;
    overflow: hidden;
    .app_sec_ban{
      overflow: hidden;
      width:100%;
      height:100%;
      #id_test_video{
        position: absolute;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        .vcp-player .touchable .vcp-playing{
          width: 100%;
          height: 100%;
        }
        .vcp-error-tips{
          margin: 0;padding: 0;
        }
        .vcp-loading{
          margin: 0;padding: 0
        }
      }
      .app_sec_ban_people{
        height:70px;
          display: flex;
          justify-content:space-between;
          align-items:center;
        .people_left{
          position: absolute;
          top:0.1rem;
          left:0.1rem;
          overflow: hidden;
          background:rgba(0,0,0,0.6);
          border-radius:0.3rem;
          display: flex;
          height:36px;
          justify-content:space-between;
          align-items:center;
          padding:0 6px;
          img{
            width:20px;
            height:20px;
            border-radius:50%;
            float: left;
            margin-right:8px;
          }
          .font-size{
            p{
              color:#fff;
              font-size:14px;
              width:60px;
              white-space:nowrap;
              text-overflow:ellipsis;
              overflow:hidden;
              &:nth-child(2){
                font-size:12px;
                display: block;
                font-weight:400;
              }
            }
          }
          button{
            padding:5px 12px;
            border:0;
            border-radius:0.2rem;
            background:#da6666;
            color:#fff;
            font-size:10px;
          }
        }
        .people_right{
          position: absolute;
          top:0.1rem;
          right:0.1rem;
          padding:10px 17px;
          text-align: center;
          background:#da6666;
          border-radius:0.17rem;
          color:#fff;
          font-size:14px;
        }
      }
    }  
  }
}
/* 横屏*/
@media screen and (orientation: landscape) {
    
    .app_box{
      display: none;
    }
}
</style>
