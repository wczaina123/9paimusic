<template>
  <div>

 <p class="line_p">
        <a href="javascript:;" @click="eixt">教材管理</a>&gt;
        <a href="javascript:;">音频管理</a>
      </p>
    <div class="mainbox" style="margin:30px 0">
      <!--头部-->
      <div class="maintop-one">
        <span>音频管理</span>
      </div>
      <!--添加栏-->
    <!-- <div class="minetoplink">
        {{textname}}
        <span style="margin-left:30px;color:#287AF2;" @click="add">
            <i class="fa fa-plus-square-o fa-lg mt-4"></i>
            新增
        </span>
      </div> -->
      <p class="home_p">
      {{textname}}
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
              <a @click="changemusic(res.id)">修改</a>  
              <a style="margin-left:6px;" @click="deletemusic(res.id)">删除</a>
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
        textname:localStorage.getItem('text_name'),
        musiclist:"",
        soldout:false,
      // 参数
      music_id:"",
      delid:"",
    }
  },
  mounted(){
    this.geturlid()
    
  },
  methods:{

    get_teaching_detial(){   // 获取列表
      this.$axios({
        url: this.$linkurl.get_teaching_materials_resource_list,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
          resource_category_id:1,
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
    
    deletemusic(id){  // 删除音频
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

    geturlid(){   // 获取音频id
      let urlid = window.location.search
      this.music_id = urlid.substring(1)
      this.get_teaching_detial()
    },

    add(){
      this.$router.push({path:'/textbookmusicadd'})
    },

    changemusic(id){
      this.$router.push({path:'/textbookmusicadd'+'?'+id})
    },

    changeclass(){  

    },
    cancel(){
      this.soldout = false
    },
    eixt() {  // 退出
      this.$router.push({ path: '/education/textbook' })
    },
  },
}
</script>

<style scoped lang="scss">
 /* @import '../../assets/css/app.css'; */
 @import '../../../assets/css/alert.css';
 .line_p{
  width:100%;
  margin-top:30px;
  a{
    color:#7D93B2;
    &:nth-child(1){
      color:#7D93B2;
      padding-right:3px;
    }
    &:nth-child(2){
      padding-left:3px;
      color:#596980;
    }
    &:hover{
      text-decoration: none;
    }
  }
}
</style>