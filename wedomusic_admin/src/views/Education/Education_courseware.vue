<!--教材管理-->
<template>
  <div>
    <div class="topbox">
      <div class="content big_content content_padding_delete">
        <div class="contentlist" @click="teach"><span class="teachlist">教学品类</span></div>
        <div class="contentlist" @click="textbook"><span class="booklist">教材管理</span></div>
        <div class="contentlist" @click="master"><span class="masterlist">大师管理</span></div>
        <div class="contentlist" @click="course"><span class="courselist">视频课程管理</span></div>
        <div class="contentlist" @click="ware"><span class="warelist">课件管理</span></div>      
        <div class="contentlist" @click="music"><span class="courselist">乐曲管理</span></div>      
      </div>
    </div>
    <br>
    <div class="mainbox">
      <!--头部-->
      <p class="home_text home_text_p">
        课件管理
      </p>
      <p class="home_p">
        <Select v-model="coursebook" style="width:160px !important"  @on-change="changeclass" placeholder="请选择课件分类">
          <Option v-for="item in moveList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
         <Select  style="width:160px !important"   placeholder="请选择课件期数">
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
          <Option value="4">4</Option>
          <Option value="5">5</Option>
          <Option value="6">6</Option>
          <Option value="7">7</Option>
          <Option value="8">8</Option>
          <Option value="9">9</Option>
          <Option value="10">10</Option>
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
              <th style="width:20%;">标题</th>
              <th style="width:10%;">期数</th>
              <th style="width:10%;">课数</th>
              <th style="width:10%;">子项操作</th>
              <th style="width:10%;">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="res in ware_list" :key="res.id">
              <td style="text-align:center;">{{res.id}}</td>
              <td style="text-align:center;">{{res.category}}</td>
              <td style="text-align:center;">{{res.name}}</td>
              <td style="text-align: center;" >{{res.semester_number}}</td>
              <td style="text-align:center;">{{res.lesson_number}}</td>
              <td style="text-align: center;"  class="acolor">
                <a @click="changechild(res.id)">子项管理</a>  
                <a @click="go_work_contor(res.id,res.category_id)">作业管理</a>  
              </td>
              <td style="text-align: center;" class="acolor">
                <a @click="changeadd(res.id)">修改</a>  
                <a style="margin-left:6px;" @click="delware(res.id)">删除</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--删除弹框-->
    <div class="aaa">
      <Modal v-model="soldout" width="376" class-name="vertical-center-modal">
        <div class="tit">是否确定删除</div>
        <div slot="footer" class="btns">
          <button class="btn btn1" @click="cancel">取消</button>
          <button class="btn btn2" @click="deleteware">确定</button>
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
        
        coursebook:'',
        ware_list:"",
        moveList:"",
        class_id:"",
        soldout:false,
        del_id:"",
      }
    },
    mounted(){
      $('.warelist').css({'color':'#363F4C','font-weight':'bolder'})
      this.gettecha_class()
      this.get_course_ware_list()
    },
    methods:{

    get_course_ware_list(){   // 获取列表
      this.$axios({
        url: this.$linkurl.get_course_ware_list,
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
            console.log(res.data.data)
            this.ware_list = res.data.data

          })
      .catch(err=>{
        console.log("获取课件列表失败",err)
      })
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
        this.moveList.unshift({id:0,name:"全部类型"})
      })
      .catch(err=>{
        console.log("获取分类列表",err)
      })
    },

    changeclass(id){    // 切换分类
      this.class_id = id
      this.get_course_ware_list()
    },

    delware(id){  // 获取删除id
      this.soldout = true
      this.del_id = id
    },

    deleteware(){   // 删除
      this.$axios({
        url: this.$linkurl.delete_course_ware,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
          id:this.del_id,
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
        this.get_course_ware_list()
        this.soldout = false
      })
      .catch(err=>{
        console.log("删除音频失败",err)
      })
    },


    go_work_contor(id,c_id){   // 跳转到作业管理
      sessionStorage.setItem('c_id',c_id)
      this.$router.push({path:'/education/work'+'?'+id})
    },

    cancel(){
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
    course(){
     this.$router.push({path:'/education/video'})
    },
    ware(){
      this.$router.push({path:'/education/courseware'})
    },
    music(){
      this.$router.push({path:'/education/music_list'})
    },
    add(){
      this.$router.push({path:'/education/coursewareadd'})
    },

    changeadd(id){
      this.$router.push({path:'/education/coursewareadd' + '?' + id})
    },

    changechild(id){
      localStorage.setItem("ware_id",id)
      this.$router.push({path:'/education/coursechildlist' +'?'+ id})
    }
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