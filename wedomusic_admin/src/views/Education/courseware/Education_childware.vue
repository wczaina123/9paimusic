<template>
<div>
    
 <p class="line_p">
        <a href="javascript:;" @click="go_list">课件管理</a>&gt;
        <a href="javascript:;">子项管理</a>
      </p>
<div class="mainbox" style="margin:30px 0;">
    <!--头部-->
   <!--  <div class="maintop-one">
        <span @click="go_list">课件子项</span>
    </div> -->
     <p class="home_text home_text_p">
       课件子项
    </p>
    <!--添加栏-->
   <!--  <div class="minetoplink">
        <span style="margin-left:30px;color:#287AF2;" @click="goimage">
            <i class="fa fa-plus-square-o fa-lg mt-4"></i>
            新增板书
        </span>
        <span style="margin-left:30px;color:#287AF2;" @click="govideo">
            <i class="fa fa-plus-square-o fa-lg mt-4"></i>
            新增视频
        </span>
        <span style="margin-left:30px;color:#287AF2;" @click="goitem">
            <i class="fa fa-plus-square-o fa-lg mt-4"></i>
            新增练习
        </span>
    </div> -->

    <p class="home_p">
    <em class="add_jia delete_padding" @click="goimage">
        <i class="fa fa-plus-square-o fa-lg mt-4"></i>
        <a>新增板书</a>
    </em>
    <em class="add_jia"  @click="govideo">
        <i class="fa fa-plus-square-o fa-lg mt-4"></i>
        <a>新增视频</a>
    </em>
    <em class="add_jia" @click="goitem">
        <i class="fa fa-plus-square-o fa-lg mt-4"></i>
        <a>新增练习</a>
    </em>
</p>
    <!--表单-->
    <div>
        <table class="table-list">
            <thead>
                <tr>
                    <th style="display:none"></th>
                    <th>序号</th>
                    <th>类型</th>
                    <th>标题</th>
                    <th>操作</th>
                </tr>
            </thead>
             <tbody>
            <tr v-for="res in main_liat" :key="res.id">
                <td style="text-align:center;">{{res.id}}</td>
                <td style="text-align:center;">{{res.resource_category}}</td>
                <td style="text-align:center;">{{res.name}}</td>
                <td style="text-align: center;" class="acolor">
                <a @click="changeadd(res.resource_category,res.id)">修改</a>  
                <a style="margin-left:6px;" @click="delware(res.id)">删除</a>
                </td>
            </tr>
            </tbody>
        </table>
    </div>

    <!--删除弹框-->
    <div class="app1">
        <Modal v-model="soldout" width="376" class-name="vertical-center-modal">
            <div class="tit" style="margin-top:20px;">是否确定删除</div>
            <div slot="footer" class="btns">
                <button class="btn btn1" @click="cancel">取消</button>
                <button class="btn btn2" @click="deleteware">确定</button>
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
      main_liat:"",
      soldout:false,
      del_id:"",
      
  }
},
mounted(){
    this.get_url()
    this.get_list()
},
methods:{

    go_list(){
        this.$router.push({path:'/education/courseware'})
    },

    get_url(){   // 解析url
        let urlid = window.location.search.substring(1)
        if(urlid == ""){
            this.textid = 0
            return ;
        }else{
            this.textid = urlid
            this.get_list() 
        }
    },

    get_list(){   // 获取列表
        this.$axios({
          url: this.$linkurl.get_course_ware_resource_list,
          method: 'POST',
          data: {
            token: localStorage.getItem('token'),
            courseware_id:this.textid,
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
            this.main_liat = res.data.data
        })
        .catch(err=>{
            console.log("获取列表失败",err)
        })
    },



    cancel(){
        this.soldout = false
    },

    delware(id){   // 获取删除id
        this.soldout = true        
        this.del_id = id
    },

    deleteware(){   // 删除
        this.$axios({
          url: this.$linkurl.delete_course_ware_resource,
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
            console.log("删除音频失败",err)
        })   
    },



    add(){
        this.$router.push({path:'/education/coursewareadd'})
    },
    goimage(){
        this.$router.push({path:'/education/coursimage'})
    },
    govideo(){
        this.$router.push({path:'/education/coursvideo'})
    },

    goitem(){
        this.$router.push({path:'/education/coursitem'})
    },

    changeadd(name,id){
        if(name == "板书"){
            this.$router.push({path:'/education/coursimage' + '?' + id})
        }
        if(name == "视频"){
            this.$router.push({path:'/education/coursvideo' + '?' + id})
        }
        if(name == '跟谱'){
            this.$router.push({path:'/education/coursitem' + '?' + id})
        } 
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