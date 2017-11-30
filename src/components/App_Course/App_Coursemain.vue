<!--这是教程列表页-->

<template>
    <div class="couselist">
      <header class="header">
          <div></div>  
        <div>
          <p>第<span>{{lesson_id}}</span>课</p>
          <p>{{title}}</p>
        </div>
          <div></div>
      </header>
      <section class="section">
        <div  class="section_video">
          <video :src='videourl' controls='controls' style="width:100%; height:100%;margin:0 auto"webkit-playsinline="true" x-webkit-airplay="true" playsinline="true" id= "videoid" :key="videourl"></video>
        </div>
        <div class="section_scroll">
          <ul>
            <li v-for="(item,index) in video_list" :key="item.id" @click="li_change(index)" :class="{'li_bg':index===number}" >{{item.tag}}</li>
          </ul>
        </div>
        <div class="section_list">
          <p>章节介绍</p>
          <ul>
            <li>{{description}}<span></span></li>
          </ul>
        </div>
      </section>
      <sharrhead></sharrhead>
    </div>
</template>

<script>
import linkurl from "../App_linkurl"
import axios from "axios"
import sharrhead from "../Public/App_share-head"

export default {
  name: 'Coursemain',
  components:{sharrhead},
  data () {
      return{
        player:null,
        arr : [],
        urlid : "",
        classNo : "",
        title:"",
        videourl:"",
        videourl2:"",
        videourl3:"",

        li_bg:false,
        number:0,

        jiazai:"../../assets/huifang3.png",
        video_list:[],
        description:"",
        title:'',//课程title
        lesson_id:"",//第几课
        
      }
	},
  beforeCreate:function(){
    document.title = "欢迎来到九拍教学"
  },
  mounted:function(){
    this.name()
  },
  methods:{

   //点击效果
    li_change:function(index){
      this.number=index;
      this.videourl = this.arr[index].video
      document.getElementById("videoid").pause()
      document.getElementById('videoid').play()      
    },

    name:function(){
     var id = window.location.pathname
     var ids = id.substring(1)
     var idss = ids.split("/")
     var idsss = idss[2]
     this.urlid = idsss
    //  console.log(idsss)
    var that = this
    axios({
        url: linkurl.app_coursemain,
        method: 'post',
        data: {
          userid: 0,
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
        // console.log(res.data.data)
        that.classNo = res.data.data.no
        that.title = res.data.data.title  
        that.arr = res.data.data.video_list
        that.videourl = res.data.data.video_list[0].video
        that.video_list = res.data.data.video_list
        that.description = res.data.data.description
        that.title = res.data.data.title
        that.lesson_id = res.data.data.lesson_id
        // console.log(that.lesson_id)
      }) 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  .couselist{
    width:100%;
    height:100%;
    .header{
      width:100%;
      height: 80px;
      display: flex;
      justify-content:space-around;
      align-items:center;
      div{
        text-align: center;
        p{
          font-size:14px;
          &:nth-child(2){
            margin-top:-5px;
          }
        }
        img{
          width:22px;
          height:22px;
        }
      }
    }
    .section{
      .section_video{
        background: black;
        width:100%;
        height: 2rem;
      }
      .section_scroll{
        background:#ecf0f3;
        padding-bottom:0.1rem;
        ul{
          background:#fff;
          width:100%;
          height:44px;
          line-height:44px;
          padding:10px 0;
          li{
            float:left;
            color:#9c9c9c;
            border:1px solid #9c9c9c;
            background:#f9f9f9;
            height:24px;
            line-height:24px;
            padding:0 10px;
            border-radius:3px;
            margin-left:15px;

          }
          .li_bg{
            background:#da6666;
            color:#fff;
            border:0;
          }
          .unactive{
            color:#9c9c9c;
            border:1px solid #9c9c9c;
            background:#f9f9f9;
          }
        }
      }
      .section_list{
        background:#fff;
        padding: 0 0.08rem;
        font-size:14px;
        color:#9c9c9c;
        p{
          height:0.17rem;
          padding-top:0.17rem;
        }
        ul{
          li{
            height:46px;
            line-height:46px;
            color:#9c9c9c;
            padding-left:0.1rem;
            border-bottom:1px solid #eee;
            span{
              img{
              float: right;
              margin-top:10px;
              width:22px;
              height:22px;
            }
            }
          }
        }
      }
    }
  }
</style>
