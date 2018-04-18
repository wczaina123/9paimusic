<!--作业管理-->
<template>
  <div>
    <p class="line_p">
      <a href="javascript:;" @click="exit">课件管理</a >&gt;
      <a href="javascript:;">编辑作业</a >
    </p >
    <div class="content content_model content_model_add" >
      <div class="home_text">作业管理
          <div>
            <button @click="exit" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;margin-right:20px;">取消</button>
            <button @click='add_aork' style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
          </div>
      </div>
      <div class="input_div" style="margin-top:20px;">
       <a class="table_a">跟谱练习:</a >
       <span >
          <Tag v-for="item in testitem" :key="item" :name="item"  closable @on-close="handleClose">{{ item }}</Tag>
       </span>
       <span style="line-height: 30px;cursor:pointer" @click="show_xml">添加</span>
     </div>

     <div class="input_div" style="margin-bottom:30px;">
       <a class="table_a">作业描述:</a >
      <!-- <textarea  rows="10" style="width:400px;border:1px solid #999;padding:6px;font-size:14px;"  placeholder="请输入学生作业的默认描述"></textarea> -->
      <Input  type="textarea" style="width:300px;" v-model="work_materials_describe" :rows="4" placeholder="请输入学生作业的默认描述"></Input>
     </div>

     <div class="input_div">
       <a class="table_a" style="width:30px;"></a >
      <CheckboxGroup v-model="show_low" style="line-height: 30px;" @on-change='show_lows'>
            <Checkbox label="1">扩展提高</Checkbox>
      </CheckboxGroup>
     </div>

    

   <div v-if="show_add">
     <div class="input_div" style="margin-top:20px;">
       <a class="table_a" style="width">上传作业视频:</a >
       <RadioGroup v-model="vertical" vertical>
            <Radio label="1">
                <span>已有视频课程</span>
                <Tag v-for="item in all_video_item" :key="item" :name="item"  closable @on-close="video_close">{{ item }}</Tag>
                <span @click="add_have_videl">添加</span>
            </Radio>
            <Radio label="2">
                <span>上传新视频</span>
                <span @click='add_new_move'>添加</span> 
                1111             
            </Radio>
        </RadioGroup>
     </div>
     
     <div class="input_div" style="margin-bottom:30px;">
       <a class="table_a">作业描述:</a >
      <Input  type="textarea" style="width:300px;" v-model="work_video_describe" :rows="4" placeholder="请输入视频作业的默认描述"></Input>
     </div>
     </div>
    </div>
  <!--跟谱弹框-->
   <div class="aaa">
      <Modal v-model="soldout" width="376" class-name="vertical-center-modal">
        <div class="tit">请选择跟谱</div>
        <div style="padding-top:20px">
            <div class="input_div">
              <a class="table_a">教材:</a >
              <Select  style="width:150px !important;" placeholder="请选择教材" v-model="edu_id" @on-change="change_edu">
                  <Option v-for="res in edu_List" :key="res.id" :value="res.id">{{res.name}}</Option>
              </Select>
            </div>
            <div class="input_div">
              <a class="table_a">课程:</a >
              <Select  style="width:150px !important;" placeholder="请选择课时" v-model="lesson_id" @on-change="change_lesson_id">
                  <Option value="1">lesson 1</Option>
                  <Option value="2">lesson 2</Option>
                  <Option value="3">lesson 3</Option>
                  <Option value="4">lesson 4</Option>
                  <Option value="5">lesson 5</Option>
                  <Option value="6">lesson 6</Option>
                  <Option value="7">lesson 7</Option>
                  <Option value="8">lesson 8</Option>
                  <Option value="9">lesson 9</Option>
                  <Option value="10">lesson 10</Option>
                  <Option value="11">lesson 11</Option>
                  <Option value="12">lesson 12</Option>
                  <Option value="13">lesson 13</Option>
                  <Option value="14">lesson 14</Option>
                  <Option value="15">lesson 15</Option>
                  <Option value="16">lesson 16</Option>
                  <Option value="17">lesson 17</Option>
                  <Option value="18">lesson 18</Option>
                  <Option value="19">lesson 19</Option>
                  <Option value="20">lesson 20</Option>
              </Select>
            </div>
        </div>
        <div style="padding-top:20px">
          <div class="input_div">
            <a class="table_a"></a >
            <CheckboxGroup v-model="edu_arr" @on-change='changearr'>
                <Checkbox v-for="res in musiclist" :key="res.id" :label="(res.name+','+res.id)" >{{res.name}}</Checkbox>
            </CheckboxGroup>
             <span v-if='no_class'>暂无课程请选择其他课时...</span>
          </div>
        </div>
        <div slot="footer" class="btns">
          <button class="btn btn1" @click="soldout=false">取消</button>
          <button class="btn btn2" @click="add_xml">确定</button>
        </div>
      </Modal>
   </div>

  <!--提高练习-->
   <div class="aaa">
      <Modal v-model="have_videl" width="376" class-name="vertical-center-modal">
        <div class="tit">选择已有视频课程</div>
        <div style="padding-top:20px">
            <div class="input_div">
              <a class="table_a">视频:</a >
              <Select  style="width:150px !important;" v-model="video_id" @on-change="change_videos">
                  <Option v-for="res in new_videolist" :key="res.id" :value="res.id">{{res.name}}</Option>
              </Select>
            </div>
            <div class="input_div">
              <a class="table_a">章节号:</a >
              <Select  style="width:150px !important;" v-model="video_ids" @on-change="traverse_videos">
                  <Option value="1">EX 1</Option>
                  <Option value="2">EX 2</Option>
                  <Option value="3">EX 3</Option>
                  <Option value="4">EX 4</Option>
                  <Option value="5">EX 5</Option>
                  <Option value="6">EX 6</Option>
                  <Option value="7">EX 7</Option>
                  <Option value="8">EX 8</Option>
                  <Option value="9">EX 9</Option>
                  <Option value="10">EX 10</Option>
                  <Option value="11">EX 11</Option>
                  <Option value="12">EX 12</Option>
                  <Option value="13">EX 13</Option>
                  <Option value="14">EX 14</Option>
                  <Option value="15">EX 15</Option>
                  <Option value="16">EX 16</Option>
                  <Option value="17">EX 17</Option>
                  <Option value="18">EX 18</Option>
                  <Option value="19">EX 19</Option>
                  <Option value="20">EX 20</Option>
              </Select>
            </div>
            <div class="input_div">
              <a class="table_a">视频标题:</a >
              <Select  style="width:150px !important;" v-model="video_arr" @on-change='video_main'>
                  <Option v-for="res in video_list" :key="res.id" :value="res.id">{{res.name}}</Option>
              </Select>
            </div>
        </div>
        <div style="padding-top:20px">
          <div class="input_div">
            <a class="table_a"></a >
            <CheckboxGroup v-model="video_arrs" @on-change='add_video_arr'>
                <Checkbox v-for="res in res_url_arr" :key="res.name" :label="(res.name+','+res.video_url)">{{res.name}}</Checkbox>
            </CheckboxGroup>
            <span v-if='no_video'>暂无视频课程请选择其他课时...</span>
          </div>
        </div>
        <div slot="footer" class="btns">
          <button class="btn btn1" @click="have_videl=false">取消</button>
          <button class="btn btn2" @click="add_xml">确定</button>
        </div>
      </Modal>
   </div>

   <!--上传新视频-->
   <div class="aaa">
      <Modal v-model="new_move" width="376" class-name="vertical-center-modal">
        <div class="tit">上传新视频</div>
        <div style="padding-top:20px">
            <div class="input_div" style="margin-top:20px;">
              <div  style="width">上传作业视频:</div>
              <form name=theform style="width:300px;background:#f6f6f6;margin:10px auto">
                <div class="modify-img-border upload-bg" id="courseware_content" style="padding-top:56%;">
                  <div class="edit-upload-plus" style="margin-top:20px;">
                    <a href="javascript:void(0);" class="upload-file" id="courseware_plus">
                      <span class="fa fa-plus"></span>
                      <input type="file" name="file" id="courseware" @change="upload('courseware')">
                    </a >
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
        </div>
        <div slot="footer" class="btns">
          <button class="btn btn1" @click="new_move=false">取消</button>
          <button class="btn btn2" @click="add_xml">确定</button>
        </div>
      </Modal>
   </div>


</div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'  

  export default {
    data () {
      return {
        lesson:"",  // 上传
        show_low:[],
        show_add:false,
        // show_add:true,
        soldout:false,
        edu_id:'',
        edu_List:'',
        edu_arr:[],
        musiclist:[],
        new_musiclist:'',
        vertical:'',
        have_videl:false,
        new_move:false,
        testitem:[],
        testarrs:[],
        lesson_id:'',
        no_class:false,
        work_materials_describe:'',  // 作业描述
        work_video_describe:'',  // 视频描述 

        new_videolist:'',  // 视频列表
        new_videolist_arr:[],
        videolist_arr:[],
        video_id:'',
        video_ids:'',
        video_arr:[],
        no_video:false,
        video_item:[],
        all_video_item:[],
        video_list:[],
        res_url_arr:[],
        video_arrs:[],
        
      }
  },
  computed:{
        ...mapState({uptoken:'uptoken'}),
  },
  mounted(){
    this.getosstoken()
    this.get_change_video()
    this.get_url()
  },
  methods:{

    ...mapActions({getosstoken:'get_token'}),  // 获取oss token
     
    /**
    解析url拿到详情
     */
    get_url(){   // 解析url
      let urlid = window.location.search.substring(1)
      if(urlid == ""){
        this.textid = 0
        return ;
      }else{
        this.textid = urlid
        this.get_main() 
      }
    },

    get_main(){    // 获取详情
      this.$axios({
        url: this.$linkurl.get_course_homework,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
            id:this.textid,    // 0是增加  1以上为修改
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
          console.log(res.data.data,'data')
          let i = res.data.data
          this.show_low.push((i.is_vip).toString())
          if(this.show_low == 1){   // 是否扩展提高
              this.show_add = true
          }else{
            this.show_add = false
          }

          this.work_materials_describe = i.textbook_describe
          this.work_video_describe = i.video_describe
          this.vertical = i.video_url_or_ids
          for(let a=0;a<i.textbook_ids.length;a++){    // 跟谱
            this.testitem.push(i.textbook_ids[a].name)
            this.testarrs.push(i.textbook_ids[a].id)
            // 绑定跟谱id
            let obj = i.textbook_ids[a].name +','+i.textbook_ids[a].id
            this.edu_arr.push(obj)
          }
          this.video_item = i.video_url
          // this.video_arrs=i.video_url
          console.log(this.video_arrs,'1111')          
          for(let a=0;a<i.video_url.length;a++){
            this.all_video_item.push(i.video_url[a].name)
            let arr = i.video_url[a]
            let b = {'name':arr.name,'video_url':arr.url,'_index':''}
            this.video_arrs.push(b)
          }
          console.log(this.video_arrs,'2222')
      })
    },

    /**
    跟谱
    this.edu_arr (数组) 给后端跟谱参数
    */
    show_xml(){   // 跟谱弹框
        this.soldout = true
        this.musiclist = []
        this.lesson_id = ''
        this.edu_id = ''
        this.no_class = false
        this.get_edu_List()
    },

    change_edu(e){   // 下拉教材
      this.musiclist = []
      this.no_class = false
      this.lesson_id = ''
      this.get_change_edu(e)
    },

    get_edu_List(){   // 获取教材列表
        this.$axios({
        url: this.$linkurl.get_materials_list,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
          category_id:sessionStorage.getItem('c_id'),
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
              this.edu_List = res.data.data
        })
    },

    change_lesson_id(e){   // 跟谱单元下拉
      let len = 0;
      let a = '';
      if(e!=a){
        this.musiclist = []
        this.no_class = true
      }
      for(let i=0;i<this.new_musiclist.length;i++){
        if(e==this.new_musiclist[i].relation_unit){
          a = this.new_musiclist[i].relation_unit
            this.musiclist.push(this.new_musiclist[i])
            this.no_class = false
        }
      }
    },
    
    get_change_edu(id){     // 获取跟谱列表
      this.$axios({
        url: this.$linkurl.get_teaching_materials_resource_list,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
          resource_category_id:2,
          textbook_id:id,
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
        this.new_musiclist = res.data.data
        console.log(this.new_musiclist,'this.new_musiclist')

      })
    },

    changearr(item){   // 跟谱勾选  筛选数据
      let newitem = item.map(i=>{
        let arrs = i.split(',');
        return arrs[0]
      })
      let newarr = item.map(i=>{
        let arrs = i.split(',');
        return arrs[1]
      })
      this.testitem = newitem;
      this.testarrs = newarr;  
      console.log(this.edu_arr)
      console.log(this.testarrs,this.testitem)
    },

    handleClose (event, name) {   // 跟谱删除标签
      const index = this.testitem.indexOf(name);
      this.testitem.splice(index, 1);
      this.edu_arr.splice(index, 1);   
      this.testarrs.splice(index, 1);
      console.log(this.edu_arr,this.testarrs,this.testitem)
    },
    
    /**
      扩展提高
      this.video_item    传递数组给后端
     */
    add_have_videl(){ // 已有视频弹框
      this.have_videl = true
      this.video_id = ''
      this.video_ids = ''
      this.video_arr = ''
      this.res_url_arr = []
    },

    change_videos(e){   // 视频下拉
      this.new_videolist_arr = []
      this.video_arr = ''
      this.no_video = false
      this.video_ids = ''
      this.change_video(e)
    },

    get_change_video(id){     // 获取视频列表
      this.$axios({
        url: this.$linkurl.get_video_course_list,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
          category_id:sessionStorage.getItem('c_id'),
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
        this.new_videolist = res.data.data
        
      })
    },

    traverse_videos(e){    // 章节号下拉菜单
      let len = 0;
      let a = '';
      if(e!=a){
        this.video_list = []
      }
      for(let i=0;i<this.videolist_arr.length;i++){
        if(e==this.videolist_arr[i].sort){
          a = this.videolist_arr[i].sort
            this.video_list.push(this.videolist_arr[i])
            this.no_video = false
        }
        if(e!=this.videolist_arr[i].sort){
          this.res_url_arr = []
        }
      }
    },

    change_video(e){   // 视频下拉列表
        this.$axios({
        url: this.$linkurl.get_video_course_resource_list,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
          video_course_id:e,
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
        // this.new_videolist_arr = res.data.data
        this.videolist_arr = res.data.data   // 拿来便利的数组
        console.log(this.videolist_arr)
        // if(this.new_videolist_arr==''){
        //   this.no_video = true
        // }else{
        //   this.no_video = false
        // }
        // console.log( this.new_videolist_arr,' this.new_videolist_arr')
      })

    },

    video_main(){   // 视频详情（数组）
      if(this.video_arr==''){
        return;
      }
      this.$axios({
        url: this.$linkurl.get_video_course_resource_detail,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
          id:this.video_arr,
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
        let r = res.data.data
        this.res_url_arr = JSON.parse((JSON.parse(r.res_url)));
      })
    },

    add_video_arr(item){   // 视频勾选 筛数据
      // let newitem = item.map(i=>{
      // let arrs = i.split(',');
        
      //   return  arrs[0]
      // })
      // let newarr = item.map(i=>{
      //   let arrs = i.split(',');
      //   return arrs[1]
      // })
      // this.video_item = newitem;
      // this.all_video_item = newarr; 
      console.log(JSON.stringify(this.video_arrs))
      let new_arr = []
      let arr_name = []
      for(let i=0;i<item.length;i++){
        let res ={'name':item[i].name,'url':item[i].video_url}
        new_arr.push(res)
      }
      for(let i=0;i<item.length;i++){
        arr_name.push(item[i].name)
      }
      this.video_item = new_arr
      this.all_video_item = arr_name
      
    },

    video_close(event,name){   // 删除视频
      const index = this.testitem.indexOf(name);
      this.video_item.splice(index, 1);    // 传给后端（数组，url）
      this.all_video_item.splice(index, 1);
      console.log(this.video_item,this.all_video_item)
    },

    /**
      以有视频上传
     */


    
    


    

    show_lows(){  // 扩展提高
      if(this.show_low == '1'){
          this.show_add = true
      }else{
        this.show_add = false
      }
    },

    add_xml(){   // 确认键
      
    },

    add_new_move(){   // 上传新视频弹框
        this.new_move = true
    },

    add_aork(){   // 添加
      console.log(this.video_item,'11111')
      // return;
      this.$axios({
        url: this.$linkurl.course_homework,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
          id:this.textid,
          textbook_ids:JSON.stringify(this.testarrs),
          textbook_describe:this.work_materials_describe,
          is_vip:this.show_low,
          video_url:JSON.stringify(this.video_item),
          video_describe:this.work_video_describe,
          video_url_or_ids:this.vertical,
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
        console.log(res.data)
      })
    },


    

    



    /**
      上传
     */

    upload(id){   // 上传
      this.$Loading.start();
      var cdnDomain = this.$linkurl.ossurl;
      var timestamp=new Date().getTime();
      var filename = document.getElementById(id).files[0].name;
      var index = filename.lastIndexOf(".");
      var indexname =  filename.substr(0,index)
      var ext = filename.substr(index+1);
      var key =  id + '/' + timestamp + '.' +  ext
      if(ext!='mp4'&&ext!='mov'){
        this.$Message.warning('请上传".mp4"或".mov"视频')
        this.$Loading.error();
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
              $('#' + id + '_content').css('background-image','url("'+ that.lesson +'?x-oss-process=video/snapshot,t_7000,f_jpg'+'")');
              $('#' + id + '_span').css('display','none')
              that.$Loading.finish();
            }else{
              that.$Message.warning('上传失败');
              that.$Loading.error();
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