<!--编辑课件-->
<template>
  <div>
    <p class="line_p">
      <a href="javascript:;" @click="exit">课件管理</a>&gt;
      <a href="javascript:;">编辑课件</a>
    </p>
    <div class="content content_model content_model_add" >
      <div class="home_text">新增课件
          <div>
            <button @click="exit" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;margin-right:20px;">取消</button>
            <button @click="not_null" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
          </div>
      </div>
      <div class="input_div" style="margin-top:20px;">
       <a class="table_a">上传课件封面:</a>
       <form name=theform style="width:300px;background:#f6f6f6;margin-left:95px;">
         <div class="modify-img-border upload-bg" id="courseware_content" style="padding-top:56%;">
           <div class="edit-upload-plus" style="margin-top:20px;">
             <a href="javascript:void(0);" class="upload-file" id="courseware_plus">
               <span class="fa fa-plus"></span>
               <input type="file" name="file" id="courseware" @change="upload('courseware')">
             </a>
           </div>
           <div id="courseware_pro_con" class="upload-pro-con">
             <div class="upload-pro-border">
               <div id="courseware_progress" class="upload-progress"></div>
             </div>
           </div>
         </div>
         <input id="courseware_value"  style="display: none;">
       </form>
     </div>
     <div class="input_div">
     <a class="table_a">课件分类:</a>
     <Select  style="width:300px !important;" v-model="class_id">
         <Option v-for="res in classList" :key="res.id" :value="res.id">{{res.name}}</Option>
     </Select>
     </div>
     <div class="input_div">
       <a class="table_a">课件标题:</a>
        <Input style="width: 300px"  placeholder="请输入课件标题" v-model="ware_name"></Input>
     </div>
     <div class="input_div">
       <a class="table_a">课件期数:</a>
       <Select  style="width:300px !important;" v-model="ware_semester">
           <Option value=0>体验课</Option>
           <Option value=1>1 期</Option>
           <Option value=2>2 期</Option>
           <Option value=3>3 期</Option>
           <Option value=4>4 期</Option>
           <Option value=5>5 期</Option>
           <Option value=6>6 期</Option>
           <Option value=7>7 期</Option>
           <Option value=8>8 期</Option>
           <Option value=9>9 期</Option>
           <Option value=10>10 期</Option>
           <Option value=11>11 期</Option>
           <Option value=12>12 期</Option>
           <Option value=13>13 期</Option>
           <Option value=14>14 期</Option>
           <Option value=15>15 期</Option>
           <Option value=16>16 期</Option>
           <Option value=17>17 期</Option>
           <Option value=18>18 期</Option>
           <Option value=19>19 期</Option>
           <Option value=20>20 期</Option>
       </Select>
     </div>
     <div class="input_div">
       <a class="table_a">课件数目:</a>
       <Select  style="width:300px !important;" v-model="ware_lesson">
           <Option value=0>体验课</Option>
           <Option value=1>1 课</Option>
           <Option value=2>2 课</Option>
           <Option value=3>3 课</Option>
           <Option value=4>4 课</Option>
           <Option value=5>5 课</Option>
           <Option value=6>6 课</Option>
           <Option value=7>7 课</Option>
           <Option value=8>8 课</Option>
           <Option value=9>9 课</Option>
           <Option value=10>10 课</Option>
           <Option value=11>11 课</Option>
           <Option value=12>12 课</Option>
           <Option value=13>13 课</Option>
           <Option value=14>14 课</Option>
           <Option value=15>15 课</Option>
           <Option value=16>16 课</Option>
           <Option value=17>17 课</Option>
           <Option value=18>18 课</Option>
           <Option value=19>19 课</Option>
           <Option value=20>20 课</Option>
       </Select>
     </div>
     <div class="input_div">
       <a class="table_a">学习级别:</a>
        <Select  style="width:300px !important;" v-model="live"> <!--二期-->
          <Option value=1>LV 1</Option>
          <Option value=2>LV 2</Option>
          <Option value=3>LV 3</Option>
          <Option value=4>LV 4</Option>
          <Option value=5>LV 5</Option>
          <Option value=6>LV 6</Option>
          <Option value=7>LV 7</Option>
          <Option value=8>LV 8</Option>
          <Option value=9>LV 9</Option>
          <Option value=10>LV 10</Option>
          <Option value=11>LV 11</Option>
          <Option value=12>LV 12</Option>
          <Option value=13>LV 13</Option>
          <Option value=14>LV 14</Option>
          <Option value=15>LV 15</Option>
          <Option value=16>LV 16</Option>
          <Option value=17>LV 17</Option>
          <Option value=18>LV 18</Option>
          <Option value=19>LV 19</Option>
          <Option value=20>LV 20</Option>
        </Select>
      </div>
     <div class="input_div" style="margin-bottom:30px;">
       <a class="table_a">描述:</a>
      <textarea  rows="10" style="width:400px;border:1px solid #999;padding:6px;font-size:14px;" v-model="ware_description" placeholder="请输入学生作业的默认描述"></textarea>
     </div>
   </div>


</div>
</template>

<script>
  // import  axios from 'axios'
  // import linkurl from '../../All-commonality/LinkUrl'
  import {mapState,mapActions} from 'vuex'  

  export default {
    data () {
      return {
        ware_name:"",
        ware_description:"",
        classList:"",
        textid:"",

      class_id:"0",  // 分类id
      ware_semester:"",
      ware_lesson:"",
      lesson:"",
      live:'',// 暂无
    }
  },
  computed:{
        ...mapState({uptoken:'uptoken'})
  },
  mounted(){
    this.getosstoken()
    this.get_url()
    this.gettecha_class()
  },
  methods:{

    ...mapActions({getosstoken:'get_token'}),  // 获取oss token
    
    get_url(){   // 解析url
      let urlid = window.location.search.substring(1)
      if(urlid == ""){
        this.textid = 0
        return ;
      }else{
        this.textid = urlid
        this.get_ware_main() 
      }
    },

    get_ware_main(){   // 获取详情
      this.$axios({
        url: this.$linkurl.get_course_ware_detail,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
          id:this.textid,
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
        let i = res.data.data 
        this.ware_name = i.name
        this.class_id = i.category_id
        this.ware_description = i.description
        this.ware_semester = i.semester_number.toString()
        this.ware_lesson= i.lesson_number.toString()
        this.lesson = i.cover_url
        $('#courseware_content').css('background-image','url("'+ i.cover_url +'")');
      })
      .catch(err=>{
        console.log("获取详情失败",err)
      })
    },

    not_null(){    //判断
      if(this.ware_name==''){
        this.$Message.warning('请输入课件标题')
      }else if(this.class_id==''){
        this.$Message.warning('请选择课件分类')
      }else if(this.ware_semester==''){
        this.$Message.warning('请选择课件期数')
      }else if(this.ware_lesson==''){
        this.$Message.warning('请选择课件数目')
      }else if(this.ware_description==''){
        this.$Message.warning('请输入描述')
      }else if(this.lesson==''){
        this.$Message.warning('请上传封面')
      }else{
        this.add_ware()
      }
    },

    add_ware(){  // 新增
      this.$axios({
        url: this.$linkurl.handle_course_ware,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
            id:this.textid,    // 0是增加  1以上为修改
            name:this.ware_name,
            category_id:this.class_id,
            cover_url:this.lesson,
            description:this.ware_description,
            semester_number:this.ware_semester,
            lesson_number:this.ware_lesson,
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
            this.$router.push({path:'/education/courseware'})
      })
      .catch(err=>{
        console.log("修改失败或者新建",err)
      })
    },

    gettecha_class(){   // 获取课程分类
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
        this.classList = res.data.data
      })
      .catch(err=>{
        console.log("获取课程分类列表",err)
      })
    },



    // 上传

    upload(id){   // 上传
      var cdnDomain = this.$linkurl.ossurl;
      var timestamp=new Date().getTime();
      var filename = document.getElementById(id).files[0].name;
      var index = filename.lastIndexOf(".");
      var indexname =  filename.substr(0,index)
      var ext = filename.substr(index+1);
      var key =  id + '/' + timestamp + '.' +  ext
      if(ext!='jpg'&&ext!='png'){
        this.$Message.warning('请上传"png"或"jpg"图片')
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
          // console.log(oReq.status)
          if(oReq.readyState == 4){
            if(oReq.status==200){ 
              that.lesson = cdnDomain + key;
              $('#' + id + '_content').css('background-image','url("'+ that.lesson +'")');
              $('#' + id + '_span').css('display','none')
            }else{
              that.$Message.warning('上传失败');
            }
          }
        };
      },

    exit(){   // 退出
      this.$router.push({path:'/education/courseware'})
    },

  },
}
</script>

<style scoped lang='scss'>
 /* @import '../../assets/css/app.css'; */
 @import '../../../assets/css/input_style.scss';
 @import '../../../assets/css/alert.css';
 .input_div .table_a{
   display:inline-block;
   width:90px;
   text-align:right;
   height:30px;
   line-height:30px;
   float:left;
   margin-right:5px;
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