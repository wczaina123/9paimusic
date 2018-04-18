<template>
<div>
  <p class="line_p">
        <a href="javascript:;" @click="exit">乐曲管理</a>&gt;
        <a href="javascript:;">专辑详情</a>
      </p>

<div class="mainbox" style="margin:30px 0;">
    <!--头部-->
     <p class="home_text home_text_p">
        专辑详情
    </p>
    <p class="home_p">
        <em class="add_jia delete_padding" @click="addcourseclass">
            <i class="fa fa-plus-square-o fa-lg mt-4"></i>
            <a>新增</a>
        </em>
    </p>
    <!--表格-->
    <div>
      <table class="table-list">
        <thead>
        <tr>
          <!-- <th style="display:none"></th> -->
          <th style="width:20%;">乐曲号</th>
          <th style="width:50%;">标题</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="res in video_list" :key="res.id">
            <td style="text-align:center;">{{res.id}}</td>
            <td style="text-align:center;">{{res.name}}</td>
            <td style="text-align: center;color" class="acolor" >
              <a @click="addcourseclass_id(res.id)">修改</a>  
              <a style="margin-left:6px;" @click="del(res.id)">删除</a>
            </td>
          </tr>
          
        </tbody>
    </table>
  </div>
    <!--删除弹框-->
    <div class="app1">
        <Modal v-model="soldout" width="400" class-name="vertical-center-modal">
            <div class="tit" style="margin-top:20px;">是否确定该教材</div>
            <div slot="footer" class="btns">
                <button class="btn btn1" @click="cancel">取消</button>
                <button class="btn btn2" @click="delevideo">确定</button>
            </div>
        </Modal>
    </div>
</div>
</div>
</template>

<script>

export default {
data () {
  return {
      video_list:"",
      textid:"",
      soldout:false,
      del_id:"",
      
  }
},
mounted(){
    this.get_url()
    this.get_list()
    console.log('1111')
},
methods:{
  exit() {  // 退出
      this.$router.push({ path: '/education/music_list' })
    },
    go_list(){
        this.$router.push({path:'/education/music_list'})
    },

    get_url(){   // 解析url
        let urlid = window.location.search.substring(1)
        if(urlid == ""){
            this.textid = 0
            return ;
        }else{
            this.textid = urlid
            // console.log(this.textid)
            // this.get_list() 
        }
    },

    get_list(){   // 获取列表
        this.$axios({
          url: this.$linkurl.get_video_course_resource_list,
          method: 'POST',
          data: {
            token: localStorage.getItem('token'),
            video_course_id:this.textid,
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

    del(id){
        this.soldout = true
        this.del_id = id
    },

    delevideo(){
        this.$axios({
          url: this.$linkurl.delete_video_course_resource,
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
            this.get_list()
            this.soldout = false
        })
        .catch(err=>{
            console.log("删除失败",err)
        })
    },

    cancel(){
        this.soldout = false
    },
    
    addcourseclass(){  // 增加
        this.$router.push({path:'/education/special_add'})
    },

    addcourseclass_id(id){
        this.$router.push({path:'/education/special_add'+'?'+id})
    },

},
}
</script>

<style scoped lang="scss">
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