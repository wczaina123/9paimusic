<template>
  <div>
    <p class="line_p">
      <a href="javascript:;" @click="eixt">教材管理</a>&gt;
      <a href="javascript:;">跟谱练习管理</a>
    </p>
    <div class="mainbox" style="margin:30px 0;">
     <!--头部-->
     <div class="maintop-one">
      <span>跟谱练习管理</span>
    </div>
    <!--添加栏-->
    <!-- <div class="minetoplink">

      <span style="margin-left:30px;color:#287AF2;" @click="add">
        <i class="fa fa-plus-square-o fa-lg mt-4"></i>
        新增
      </span>
    </div> -->

    <p class="home_p">
  <em class="add_jia delete_padding" @click="add">
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
            <th style="width:12%;">单元</th>
            <th style="width:15%;">顺序码</th>
            <th style="width:40%;">标题</th>
            <th style="width:20%;">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="res in musiclist" :key="res.id">
            <td style="text-align:center;">{{res.relation_unit}}</td>
            <td style="text-align:center;">{{res.sort}}</td>
            <td style="text-align:center;">{{res.name}}</td>
            <td style="text-align: center;color:rgb(40, 122, 242)" >
              <a @click="adds(res.id)">修改</a>  
              <a style="margin-left:6px;" @click="delmusics(res.id)">删除</a>
            </td>
          </tr>
          
        </tbody>
      </table>
    </div>
    <!--删除弹框-->
    <div class="app1">
      <Modal v-model="soldout" width="376" class-name="vertical-center-modal">
        <div class="tit" style="margin-top:20px;">是否确定删除该音频</div>
        <div slot="footer" class="btns">
          <button class="btn btn1" @click="cancel">取消</button>
          <button class="btn btn2" @click="delmusic">确定</button>
        </div>
      </Modal>
    </div>
  </div>
</div>
</template>

<script> 
  // import axios from 'axios'
  // import linkurl from '../../All-commonality/LinkUrl'
  export default {
    data () {
      return {
        soldout:false,
        music_id:"",
        musiclist:"",
        delid:"",
      }
    },
    mounted(){
      this.geturlid()
    },
    methods:{
       eixt() {  // 退出
        this.$router.push({ path: '/education/textbook' })
      },
      add(){
        this.$router.push({path:'/textbookmusicscoreadd'})
      },

      adds(id){
        this.$router.push({path:'/textbookmusicscoreadd'+'?'+id})
      },



    geturlid(){   // 获取音频id
      let urlid = window.location.search.substring(1)
      this.music_id = urlid
      this.get_teaching_detial()
    },

    get_teaching_detial(){   // 获取列表
      this.$axios({
        url: this.$linkurl.get_teaching_materials_resource_list,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
          resource_category_id:2,
          textbook_id:this.music_id,
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
        this.musiclist = res.data.data
      })
      .catch(err=>{
        console.log("获取音频列表",err)
      })
    },

    delmusics(id){
      this.soldout = true
      this.delid = id
    },

    delmusic(){  // 删除
      this.$axios({
        url: this.$linkurl.delete_teaching_materials_resource,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
          id: this.delid,
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
        this.soldout = false
        this.get_teaching_detial()
      })
      .catch(err=>{
        console.log("删除失败",err)
      })
    },

    cancel(){
      this.soldout = false
    },


  },
}
</script>

<style scoped>
  @import '../../../assets/css/alert.css'; 
 .input_div .table_a{
  display:inline-block;
  width:160px;
  text-align:right;
  height:30px;
  line-height:30px;
  float:left;
}

</style>