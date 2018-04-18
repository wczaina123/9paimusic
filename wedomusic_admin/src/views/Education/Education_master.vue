<template>
  <div>
    <div class="topbox">
      <div class="content big_content content_padding_delete">
        <div class="contentlist" @click="teach"><span class="teachlist">教学品类</span></div>
        <div class="contentlist" @click="textbook"><span class="booklist">教材管理</span></div>
        <div class="contentlist" @click="master"><span class="masterlist">大师管理</span></div>
        <div class="contentlist" @click="course"><span class="courselist">视频课程管理</span></div>
        <div class="contentlist" @click="ware"><span class="warelist">课件管理</span></div>      
        <div class="contentlist" @click="music"><span class="warelist">乐曲管理</span></div>      
      </div>
    </div>
    <br>
    <div class="mainbox" style="margin-bottom:30px;">
      <!--头部-->
     <p class="home_text home_text_p">
        大师管理
    </p>
      <!--新增-->
           <!--  <div class="minetoplink">
                <span style="margin-left:30px;color:#287AF2;" @click="addmaster">
                    <i class="fa fa-plus-square-o fa-lg mt-4"></i>
                    新增
                </span>
              </div> -->

              <p class="home_p">
              <em class="add_jia delete_padding"  @click="addmaster">
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
                    <th style="width:12%;">封面</th>
                    <th style="width:20%;">姓名</th>
                    <th style="width:50%;">描述</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="res in masterlist" :key="res.id">
                    <td style="text-align:center;">{{res.id}}</td>
                    <td style="text-align:center;"><img :src="res.cover_url"></td>
                    <td style="text-align:center;">{{res.name}}</td>
                    <td style="text-align:center;">{{res.description}}</td>
                    <td style="text-align: center;" class="acolor">
                      <a @click="changemaster(res.id)">修改</a>  
                      <a style="margin-left:6px;" @click="delmst(res.id)">删除</a>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
            <!--删除弹框-->
            <div class="aaa">
              <Modal v-model="soldout" width="376" class-name="vertical-center-modal">
                <div class="tit" style="margin-top:20px;">是否确定删除大师</div>
                <div slot="footer" class="btns">
                  <button class="btn btn1" @click="cancel">取消</button>
                  <button class="btn btn2" @click="delmaster">确定</button>
                </div>
              </Modal>
            </div>
          </div>

        </div>
      </template>

<script>
  // import axios from 'axios' 
  // import linkurl from '../All-commonality/LinkUrl'
  export default {
    data () {
      return {
        masterlist:"",
        masterid:"",
        soldout:false
      }
    },
    mounted(){
      $('.masterlist').css({'color':'#363F4C','font-weight':'bolder'})
      this.getmsaterlist()
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

    addmaster(){   // 新增大师
      this.$router.push({path:'/education/masteradd'})
    },
    changemaster(id){  // 修改大师
      this.$router.push({path:'/education/masteradd' +'?'+ id})
    },
    
    cancel(){  
      this.soldout = false
    },
    
    delmst(id){
      this.soldout = true
      this.masterid = id
    },

    getmsaterlist(){   // 获取大师列表
      this.$axios({
        url: this.$linkurl.get_master_list,
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
            //   console.log(res.data.data)
            this.masterlist = res.data.data

          })
      .catch(err=>{
        console.log("获取大师列表失败",err)
      })
    },

    delmaster(){  // 删除大师
      this.$axios({
        url: this.$linkurl.delete_master,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
          id:this.masterid,
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
        this.masterlist = res.data.data
        this.getmsaterlist()
        this.soldout = false

      })
      .catch(err=>{
        console.log("删除大师失败",err)
      })
    },


  },
}
</script>

<style scoped>
  @import '../../assets/css/index.scss';
  @import '../../assets/css/alert.css';
  .content_padding_delete{
    padding:0 !important;
  }
  .minetoplink{
    margin-bottom:30px; 
    cursor:pointer;
  }
</style>