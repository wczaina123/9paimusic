<template>
<div>

  <div class="topbox">
    <div class="content big_content content_padding_delete">
      <div class="contentlist" @click="teach"><span ref="teachlist" class="teachlist">教学品类</span></div>
      <div class="contentlist" @click="textbook"><span class="booklist">教材管理</span></div>
      <div class="contentlist" @click="master"><span class="masterlist">大师管理</span></div>
      <div class="contentlist" @click="course"><span class="courselist">视频课程管理</span></div>
      <div class="contentlist" @click="ware"><span class="warelist">课件管理</span></div>      
      <div class="contentlist" @click="music"><span class="warelist">乐曲管理</span></div>      
    </div>
  </div>

    <br>
    <div class="mainbox">
    <div>
   <!--  <div class="maintop-one">
        <span>教学品类</span>
    </div> -->
        <p class="home_text">
        教学品类
    </p>
    <!-- <div class="mainstyle">
        <span style="margin-left:30px;color:#287AF2;" @click="add = true">
            <i class="fa fa-plus-square-o fa-lg mt-4"></i>
            新增品类
        </span>
    </div> -->
    <p class="home_p">
      <em class="add_jia delete_padding" @click="add = true">
        <i class="fa fa-plus-square-o fa-lg mt-4"></i>
        <a>新增</a>
      </em>
    </p>
    <!--表格-->
    <div class="tablebox">
      <table class="table-list">
        <thead>
        <tr>
          <th>编号</th>
          <th style="width:59%;">名称</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="res in classlist" :key="res.id">
            <td style="text-align:center;">{{res.id}}</td>
            <td style="text-align:center;">{{res.name}}</td>
            <td style="text-align: center;" class="acolor">
              <a @click="change(res.id)">修改</a>  
              <a style="margin-left:6px;" @click="delclass(res.id)">删除</a>
            </td>
          </tr>
          
        </tbody>
    </table>
  </div>
    <!--弹框新增品类-->
    <div class="aaa">
        <Modal width="400" v-model="add" style="text-align:center" class-name="vertical-center-modal">
        <div slot="header" style="text-align:center;font-size:16px;margin:0">新增品类</div>
          <div style="display:inline-block;">品类名称：</div><Input v-model="classname" placeholder="请输入教学品类名称" style="width: 160px"></Input>
          <div slot="footer" class="btns">
            <button class="btn btn1" @click="cancel">取消</button>
            <button class="btn btn2" @click="changeok">确定</button>
          </div>
        </Modal>
    </div>
  <!--修改-->
  <div class="aaa">
        <Modal  width="400"  v-model="changadd" style="text-align:center"
          class-name="vertical-center-modal"
        >
           <div slot="header" style="text-align:center;font-size:16px;margin:0">新增品类</div>
           <div style="display:inline-block;">品类名称：</div><Input v-model="classname" placeholder="输入教学品类名称" style="width: 160px"></Input>
          <div slot="footer" class="btns">
            <button class="btn btn1" @click="cancel">取消</button>
            <button class="btn btn2" @click="changeadd">确定</button>
          </div>
        </Modal>
    </div>

  <!--删除弹框-->
  <div class="aaa">
      <Modal v-model="soldout" width="400" class-name="vertical-center-modal">
        <div class="tit" style="margin-top:20px;">是否确定删除品类</div>
        <div slot="footer" class="btns">
            <button class="btn btn1" @click="cancel">取消</button>
            <button class="btn btn2" @click="deletclass">确定</button>
        </div>
    </Modal>
  </div>
      
</div>
    </div>
</div>
</template>

<script>

// import axios from 'axios'
// import linkurl from '../All-commonality/LinkUrl.js'

export default {
  
  data () {
    return {
    add:false,
    soldout:false,
    changadd:false,
    name:"",
    classlist:"",
    classname:"",
    classid:"",
    changeid:"",
    }
  },
  mounted(){
    $('.teachlist').css({'color':'#363F4C','font-weight':'bolder'})
    // this.$refs.teachlist.style.color = '#363F4C'
    this.getcategory_list()
  },
  methods:{
    teach(){
      this.$router.push({path:'/education'})
    },
    textbook(){
      this.$router.push({path:'/education/textbook'})
    },
    master(){
     this.$router.push({path:'/education/master'})
    },
    music(){
     this.$router.push({path:'/education/music_list'})      
    },
    course(){
     this.$router.push({path:'/education/video'})
    },
    ware(){
      this.$router.push({path:'/education/courseware'})
    },
    cancel () {  // 取消事件
        this.soldout = false
        this.add = false
        this.changadd = false
    },
    getcategory_list(){   //  获取类别列表
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
            // console.log(res.data.data)
            this.classlist = res.data.data
        })
        .catch(err=>{
            console.log("获取分类失败",err)
        })
    },

    change(id){
        this.changadd = true
        this.changeid = id
        
    },

    
    changeadd(){   // 修改品类
      this.$Message.destroy()   // 只让出现一次提示框
      if(this.classname != ''){
        this.$axios({
            url: this.$linkurl.handle_ategory,
            method: 'POST',
            data: {
              token: localStorage.getItem('token'),
              id:this.changeid,
              name:this.classname
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
              this.classname = ''
              this.changadd = false
              this.getcategory_list()
          })
          .catch(err=>{
              console.log("新增失败",err)
          })
      }else{
        this.$Message.config({top:50})
        this.$Message.warning('教学品类不能为空');
      }
        
    },

    delclass(id){    // 删除
        this.soldout = true
        this.classid = id
    },

    changeok(){    // 弹框新增
      this.$Message.destroy()   // 只让出现一次提示框
      if(this.classname != ''){
        this.$axios({
            url: this.$linkurl.handle_ategory,
            method: 'POST',
            data: {
              token: localStorage.getItem('token'),
              id:0,
              name:this.classname
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
              // console.log(res.data.data)
              this.classname = ""
              this.getcategory_list()
              this.add = false
              
              // this.classlist = res.data.data
          })
          .catch(err=>{
              console.log("新增失败",err)
          })
        }else{
          this.$Message.config({top:50})
          this.$Message.warning('教学品类不能为空');
        }
        
    },

    deletclass(){    // 弹框的删除事件
        this.$axios({
          url: this.$linkurl.delete_category,
          method: 'POST',
          data: {
            token: localStorage.getItem('token'),
            id:this.classid
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
          // console.log(res.data.code)
          if(res.data.code==2){
            this.soldout = false
            this.$Message.error('因存在教材无法删除')
          }else{
            this.soldout = false
            this.getcategory_list()
          }
            
            
            // this.classlist = res.data.data
        })
        .catch(err=>{
            console.log("删除失败",err)
        })
    },
  },
}
</script>

<style>
@import '../../assets/css/index.scss';
@import '../../assets/css/alert.css';
.content_padding_delete{
  padding:0 !important;
}
</style>

