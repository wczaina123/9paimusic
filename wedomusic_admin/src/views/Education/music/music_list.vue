<!--专辑列表-->
<template>
  <div>
    <div class="topbox">
      <div class="content big_content content_padding_delete">
        <div class="contentlist" @click="teach"><span class="teachlist">教学品类</span></div>
        <div class="contentlist" @click="textbook"><span class="booklist">教材管理</span></div>
        <div class="contentlist" @click="master"><span class="masterlist">大师管理</span></div>
        <div class="contentlist" @click="course"><span class="warelist">视频课程管理</span></div>
        <div class="contentlist" @click="ware"><span class="warelist">课件管理</span></div>      
        <div class="contentlist" ><span class="courselist">乐曲管理</span></div>      
      </div>
    </div>
    <br>
    <div class="mainbox">
      <p class="home_text home_text_p">
        乐曲管理（暂无数据）
      </p>
      <p class="home_p">
        <Select v-model="txtmove" style="width:160px !important" @on-change="changeclass" placeholder="请选择乐曲分类">
          <Option v-for="item in moveList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
        <em class="add_jia" @click="add">
          <i class="fa fa-plus-square-o fa-lg mt-4"></i>
          <a>新增</a>
        </em>
      </p>
      <!--表格-->
      <div class="tablebox">
        <table class="table-list">
          <thead>
            <tr>
              <!-- <th style="display:none"></th> -->
              <th style="width:5%;">ID</th>
              <th style="width:12%;">类别</th>
              <th style="width:15%;">专辑名</th>
              <th style="width:35%;">乐曲数</th>
              <th style="width:20%;">专辑详情</th>
              <th style="width:13%;">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="res in video_list" :key="res.id">
              <td style="text-align:center;">{{res.id}}</td>
              <td style="text-align:center;"><img :src="res.cover_url"></td>
              <td style="text-align: center;" >
                <a >{{res.category}}</a>  
                <td style="text-align:center;">{{res.name}}</td>
                <td style="text-align: center;"  class="acolor">
                  <a @click='go_special(res.id)' >专辑详情</a>
                </td>
                <td style="text-align: center;" class="acolor" >
                  <a @click="changeadd(res.id)">修改</a>  
                  <a style="margin-left:6px;" @click="del_video(res.id)">删除</a>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
      <!--删除弹框-->
      <div class="aaa">
        <Modal v-model="soldout" width="400" class-name="vertical-center-modal">
        <div class="tit" style="margin-top:20px;">是否确定该视频</div>
          <div slot="footer" class="btns">
            <button class="btn btn1" @click="cancel">取消</button>
            <button class="btn btn2" @click="deletetextbook">确定</button>
          </div>
        </Modal>
      </div>


    </div>
  </template>

  <script>
    // import axios from 'axios'
    // import linkurl from '../All-commonality/LinkUrl'
    export default {
      data () {
        return {
          txtmove:'',
          moveList:[],
          video_list:"",
          class_id:"",
          soldout:false,

          list_id:"",
          push_homeid:"",

        }
      },
      mounted(){
        $('.courselist').css({'color':'#363F4C','font-weight':'bolder'})
        this.gettecha_class()
        this.getvideo_list()

      },
methods:{
    getvideo_list(){   // 获取全部视频列表
      this.$axios({
        url: this.$linkurl.get_video_course_list,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
          category_id:this.class_id,
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
        this.video_list = res.data.data
      })
      .catch(err=>{
        console.log("获取全部教材列表",err)
      })
    },

    changeclass(id){    // 切换分类
      this.class_id = id
      this.getvideo_list()
    },

    gettecha_class(){   // 获取分类
      this.$axios({
        url: this.$linkurl.get_category_list,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
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
        this.moveList = res.data.data
        this.moveList.unshift({id:0,name:"全部品类"})
      })
      .catch(err=>{
        console.log("获取分类列表",err)
      })
    },

    del_video(id){  // 获取删除id
      this.soldout = true
      this.list_id = id
    },

    deletetextbook(id){   // 删除教材
      this.$axios({
        url: this.$linkurl.delete_video_course,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
          id:this.list_id,
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
        this.getvideo_list()
        this.soldout = false
      })
      .catch(err=>{
        console.log("删除音频失败",err)
      })
    },


    cancel(){   //  关闭
      this.soldout = false
    },

    teach(){
      this.$router.push({path:'/education'})
    },
    textbook(){
      this.$router.push({path:'/education/textbook'})
    },
    master(){
      this.$router.push({path:'/education/master'})
    },
    go_special(id){
      this.$router.push({path:'/education/special' + '?' + id })        
    },
    course(){
     this.$router.push({path:'/education/video'})
   },
   ware(){
     this.$router.push({path:'/education/courseware'})
   },
   add(){
    this.$router.push({path:'/education/music_add'})
  },

  changeadd(id){
    this.$router.push({path:'/education/music_add'+'?'+id})
  },
},
}
</script>

<style scoped>
  @import '../../../assets/css/index.scss';
  @import '../../../assets/css/alert.css';
  .content_padding_delete{
    padding:0 !important;
  }
  .minetoplink{
    margin-bottom:30px; 
    cursor:pointer;
  }
</style>