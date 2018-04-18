<!--新增直播-->
<template>
  <div>
<p class="line_p">
        <a href="javascript:;" @click="exit">直播管理</a>&gt;
        <a href="javascript:;">新增直播</a>
      </p>
    <div class="mainbox" style="margin:30px 0">
     <p class="home_text home_text_p">
      编辑直播
    </p>

    <div class="addmain">
     <div class="main_left">
       <div class="live-img-title">上传直播封面(宽高比例 16:9)：</div>
       <div>
         <form>
          <div class="live_img_box"  id="live_content">
            <a class="live_img_main">
              <span class="fa fa-plus"></span>
              <input type="file" name="file" id="live" @change="upload('live')">
            </a>
          </div>
        </form>
      </div>
      <div class="main_link_style">推流方式：</div>
      <div>
       <label ><input type="radio" name="type"   style="margin-right:6px;" v-model="type_id" value="0">手机横屏/OBS</label>
       <label style="padding-left:10px;"><input type="radio" name="type" v-model="type_id"  value="1" style="margin-right:6px;">手机竖屏</label>
     </div>
     <div class="main_link_style">主播手机： <input type="text" v-model="phone" placeholder="请输入主播注册的手机号" style="width:160px;margin-left:10px;padding:4px;height:30px;font-size:12px;"></div>

     <div class="main_link_main">
        <RadioGroup v-model="pop_show" @on-change='change_pop_see'>
          <Radio label="全部用户可见"></Radio>
          <Radio label="指定用户可见"></Radio>
        </RadioGroup>
       <!-- <select class="form-control" style="font-size:12px;height:30px;width:160px;" >
          <option value="">全部状态</option>
          <option value="0">未开播</option>
          <option value="1">直播中</option>
          <option value="2">已结束</option>
      </select> -->
    </div>
    <div v-if='pop_show_id'>
       <div class="main_link_main" style="padding-top:20px;" >
        <!-- <Radio v-model="teach">老师可见</Radio> -->
        <input type="radio" name="wss" style='margin-top:10px;margin-right:10px;'><span>老师可见</span>     
        <Select  >
            <Option value="">全部状态</Option>
            <Option value="0">未开播</Option>
            <Option value="1">直播中</Option>
            <Option value="2">已结束</Option>
        </Select>
    </div>
    <div class="main_link_main" style="padding-top:20px;" >
        <!-- <Radio v-model="stu">学生可见</Radio> -->
        <input type="radio" name="wss" style='margin-top:10px;margin-right:10px;'><span>学生可见</span>       
        <Select  >
            <Option value="">全部状态</Option>
            <Option value="0">未开播</Option>
            <Option value="1">直播中</Option>
            <Option value="2">已结束</Option>
        </Select>
    </div>
    </div>
   
        
    
  </div>
  <div class="main_right">
       <!-- <div style="display:flex">
         <span>直播类型：</span>
       <select class="form-control" style="font-size:12px;height:30px;width:160px;padding-bottom:10px;" >
            <option value="">会员</option>
            <option value="0">老师</option>
            <option value="1">专家</option>
            <option value="2">小6</option>
        </select>
      </div> -->

      <div class="live-form-title" >直播标题(不超过50个字符)</div>
      <div><input type="text" placeholder="请输入直播标题" v-model="name" style="width:100%;"></div>
      <div class="live-form-title" style="margin-top:20px;" >预计开播时间</div>
      <div><input type="text" placeholder="时间格式(YYYY-MM-DD HH:MM)" v-model="pre_time" style="width:100%;"></div>
      <div class="live-form-title" style="margin-top:20px;">推流地址(系统生成，不能修改)</div>
      <div><input type="text"  disabled="disabled" v-model="publish_url" style="width:100%;"></div>
      <div class="live-form-title" style="margin-top:20px;">推流参数(系统生成，不能修改)</div>
      <div><input type="text"  disabled="disabled" v-model="publish_para" style="width:100%;"></div>
      <div class="live-form-title" style="margin-top:20px;">普通用户观看价格(金币数，免费请输入0)</div>
      <div><input type="text"  style="width:100%;" v-model="price"></div>
      <div class="live-form-title" style="margin-top:20px;">VIP会员观看价格(金币数，免费请输入0)</div>
      <div><input type="text"  style="width:100%;" v-model="vip_price"></div>
    </div>
  </div>
  <div style="padding-top:10px;">直播简介:
   <div style="padding:0 10px 10px 10px;">
    <textarea ng-model="formData.summary" rows="4" style="width:400px;border:1px solid #999;padding:6px;font-size:14px;margin-top:8px;" placeholder="请输入直播简介" v-model="remark"></textarea>
  </div>
</div>
<!-- <div class="topbtn"><button >提交</button></div> -->
<Button @click="not_all" type="warning" style="background:#F0B46E;border:none;width:150px;height:30px;">确定</Button>
</div>
</div>
</template>

<script>

  import {mapState,mapActions} from 'vuex'
  export default {
    data(){
      return{
        name:'',
        pre_time:'',
        publish_url:'',
        publish_para:'',
        type_id:'0',
        price:0,
        vip_price:0,
        remark:'',
        phone:'',
        getids:"",

        pop_show:'', // 制定用户可见
        teach:'',
        stu:'',
        pop_show_id:false,
      }
    },
    mounted(){
      this.getosstoken()
      this.getid()   
      this.get_publish() 

    },

    computed:{
      ...mapState({uptoken:'uptoken'})
    },
    methods:{
    exit() {  // 退出
      this.$router.push({ path: '/living' })
    },

    change_pop_see(){
      if(this.pop_show == '指定用户可见'){
        this.pop_show_id = true
      }else{
        this.pop_show_id = false
      }
    },

    getid(){   // 获取urlid（教程资源id）
      let urlid = window.location.search.substring(1)
      if(urlid == ""){
        this.getids = 0
      }else{
        this.getids = urlid   
        this.get_main() 
      }
    },

    get_publish(){   // 拿到推流参数
      this.$axios({
        url: 'http://testapi.9beats.com/get_push_url',
        method: 'POST',
        data: {
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
        let i = res.data.data
        this.publish_url = i.url
        this.publish_para = i.para
      })

    },

    get_live_type(){   // 暂定

    },


    get_main(){   // 详情
      this.$axios({
        url: this.$linkurl.get_live_detail,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
          id: this.getids
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
        this.name = i.name
        this.cover_url = i.cover_url
        this.type_id = i.type_id
        this.price = i.price
        this.vip_price = i.vip_price
        this.remark = i.remark
        this.phone = i.phone
        $('#live_content').css('background-image','url("'+ this.cover_url +'")');
        let pre_time = i.pre_time
        this.get_time(pre_time)
      })
    },

    get_time(time){   // 时间戳转换
      var date = new Date(time*1000);
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      let D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
      let h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':';
      let m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes())  ;
      let s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds()) ;
      this.pre_time = Y+M+D+h+m
    },
    


    add_living(){  // 新增直播
      this.$axios({
        url: this.$linkurl.handle_live,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
          id:this.getids,
          name:this.name,
          cover_url:this.cover_url,
          pre_time:this.pre_time,
          publish_url:this.publish_url,
          publish_para:this.publish_para,
          type_id:this.type_id,
          price:this.price,
          vip_price:this.vip_price,
          remark:this.remark,
          phone:this.phone,
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
        if(res.data.data != ""){
          this.$Message.config({top:50})
          this.$Message.warning('填写完整信息');
          return;
        }else{
          this.$router.push({path:'/living'})
        }
      })
      .catch(err=>{
        console.log("修改失败",err)
      })
    },

    not_all(){  // 判断各项不为空  
        if(this.name==''){
          this.$Message.warning('直播标题不能为空');
        }else if(this.cover_url==''){
          this.$Message.warning('直播封面不能为空');
        }else if(this.pre_time==''){
          this.$Message.warning('直播时间不能为空');
        }else if(this.phone==''){
          this.$Message.warning('主播手机不能为空');
        }else if(this.remark==''){
          this.$Message.warning('直播简介不能为空');
        }else{
          this.add_living()
        }
    },

    

    ...mapActions({getosstoken:'get_token'}),

    upload(id){   // 上传
      var cdnDomain = this.$linkurl.ossurl;
      var timestamp=new Date().getTime();
      var filename = document.getElementById(id).files[0].name;
      var index = filename.lastIndexOf(".");
      var indexname =  filename.substr(0,index)
      var ext = filename.substr(index+1);
      var key =  id + '/' + timestamp + '.' +  ext
      if(ext!='jpg'&&ext!='png'){
        this.$Message.warning('上传jpg或者png的图片');
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
                that.cover_url = cdnDomain + key;
                $('#' + id + '_content').css('background-image','url("'+ that.cover_url +'")');
                $('#' + id + '_span').css('display','none')
              }else{
                that.$Message.config({top:50})
                that.$Message.warning('上传失败');
              }
            }
          };
        },
      },
    }
    
  </script>

  <style scoped lang='scss'>
    @import '../../../assets/css/index.scss';
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

