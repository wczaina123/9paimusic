<template>
  <div>
   <p class="line_p">
    <a href="javascript:;" @click="eixt">大师管理</a>&gt;
    <a href="javascript:;">编辑大师</a>
  </p>
  <div class="content content_model content_model_add" style="margin-bottom:30px;">
    <div class="home_text">新增大师频道
      <div>
        <button @click="eixt" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;margin-right:20px;">取消</button>
        <button  @click="not_null" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
      </div>
    </div>
    <div class="input_div" style="margin-top:30px;">
    <a class="table_a">上传封面:</a>
      <form style="width:300px;background:#f6f6f6;margin-left:65px;">
        <div class="modify-img-border upload-bg" :src="masterurl" id="master_content" style="padding-top:40%;">

          <div class="edit-upload-plus">
            <a href="javascript:void(0);" class="upload-file" id="master_plus">
              <span class="fa fa-plus" id="master_span"></span>
              <input type="file" name="file" id="master" @change="upload('master')">
            </a>
          </div>
          <div id="master_pro_con" class="upload-pro-con">
            <div class="upload-pro-border">
              <div id="master_progress" class="upload-progress"></div>
            </div>
          </div>
        </div>
        <input id="master_value" style="display: none;">
      </form>
    </div>
    <div class="input_div">
      <a class="table_a">教学:</a>
      <Select  placeholder="请选择教学" style="width:300px !important;" v-model="classid" @on-change="changelist(classid)">
        <Option  v-for="(res) in classlist" :key="res.id" :value="res.id" >
          {{res.name}}
        </Option> 
      </Select>
    </div>
     <div class="input_div">
      <a class="table_a">大师:</a>
       <Input placeholder="请输入大师姓名" style="width: 300px" v-model="mastername"></Input>
      </div>
       <div class="input_div" style="margin-bottom:30px;">
      <a class="table_a">简介:</a>
       <textarea  rows="6" style="width:400px;border:1px solid #999;padding:6px;font-size:14px;" placeholder="请输入大师简介" v-model="masterintro"></textarea>
      </div>
  </div>

  <div class="col-md-4 col-sm-4 col-xs-4 col-lg-4"></div>
  <div class="clearboth"></div>
</div>
</template>

<script>
import {mapState,mapActions} from 'vuex'

  export default {
    data () {
      return {
        classlist:"",
        classid:"",
        mastername:"",
        masterintro:"",
        masterurl:"",
        masterid:Number,
      }
    },
    mounted(){
      this.getosstoken()
      this.geturlid()
      this.getteastlist()
    },
    computed:{
        ...mapState({uptoken:'uptoken'})
    },
    methods:{
      eixt(){
        this.$router.push({path:'/education/master'})
      },
      suss(){
        this.$router.push({path:'/education'})
      },

    changelist(id){    // 取出大师id
      this.classid = id
    },

    geturlid(){    // 取到url的id
      let urlid = window.location.search
      this.masterid = urlid.substring(1)
      if(this.masterid == ""){
        this.masterid = 0
      }else{
        this.masterid = urlid.substring(1)
            this.getmastermain()   // 获取详情
          }
    },

    getteastlist(){   // 获取分类
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
            //   console.log(res.data.data)
            this.classlist = res.data.data
          })
      .catch(err=>{
        console.log("获取分类失败",err)
      })
    },

    not_null(){    // 判断
      if(this.classid == ""){
        this.$Message.warning('请选择教学分类');
      }else if(this.mastername == ''){
        this.$Message.warning('大师姓名不能为空');
      }else if(this.masterintro == ''){
        this.$Message.warning('请输入大师简介');
      }else if(this.masterurl == ''){
        this.$Message.warning('请上传封面');
      }else{
        this.addmasterlist()
      }
    },

    addmasterlist(){    // 大师增加或者修改
      this.$axios({
        url: this.$linkurl.handle_master,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
          id:this.masterid,
          name:this.mastername,
          category_id:this.classid,
          cover_url:this.masterurl,
          description:this.masterintro
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
            this.$router.push({path:'/education/master'})
          })
      .catch(err=>{
        console.log("上传失败",err)
      })
    },


    getmastermain(){    // 获取大师详情
      this.$axios({
        url: this.$linkurl.get_master_detail,
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
        //   console.log(res.data.data.category_id)
        this.mastername = res.data.data.name
        this.masterintro = res.data.data.description
        this.masterurl = res.data.data.cover_url   
        this.classid = res.data.data.category_id
        if(this.classid == undefined){
          this.classid = ''
        }
        $('#master_content').css('background-image','url("'+ this.masterurl +'")');
        $('#master_span').css('display','block')
      })
      .catch(err=>{
        console.log("获取大师详情失败",err)
      })
    },
    
    ...mapActions({getosstoken:'get_token'}),  // 获取oss token
    
    upload(id){   // 上传
      var cdnDomain = this.$linkurl.ossurl;
      var timestamp=new Date().getTime();
      if(!document.getElementById(id).files[0].name ){return false;}
      var filename = document.getElementById(id).files[0].name;
      var index = filename.lastIndexOf(".");
      var indexname =  filename.substr(0,index)
      var ext = filename.substr(index+1);
      var key =  id + '/' + timestamp + '.' +  ext

      if(ext!='png' && ext!='jpg'){ 
        this.$Message.warning('请上传"jpg"或"png"的图片')
        return;
      }

        var data = {
          OSSAccessKeyId: this.uptoken.accessid,
          policy: this.uptoken.policy,
          signature: this.uptoken.signature,
          success_action_status:'200', 
            key:key         // 定义文件名
          };

          var oMyForm = new FormData();

          for(var field_name in data){
            oMyForm.append(field_name,data[field_name]);
          }

          oMyForm.append("file", document.getElementById(id).files[0]);

          var oReq = new XMLHttpRequest();

          oReq.open("POST", this.$linkurl.osspost)
          oReq.send(oMyForm) 
          var that = this
        oReq.onreadystatechange = function(e){   // 上传oss后改变图片
          if(oReq.readyState == 4  ){
            if(oReq.status==200){
              that.masterurl = cdnDomain + key;
              $('#' + id + '_content').css('background-image','url("'+that.masterurl+'")');
              $('#' + id + '_span').css('display','none')
            }
            else{
              that.$Message.warning('上传失败');
            }
          }  
        };
      },

    },
  }
</script>

<style scoped lang="scss">
 @import '../../../assets/css/input_style.scss';
 @import '../../../assets/css/alert.css';

 .masterpostion{
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
}

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

.input_div .table_a{
  display:inline-block;
  width:65px;
  text-align:right;
  height:30px;
  line-height:30px;
  float:left;
  margin-right:5px; 
}

.home_text{   // 弹性和
    display: flex;
    justify-content: space-between;
    div{
        button{
        margin-top: 15px;
        line-height: 30px;
        }
    }
}
</style>