<!--乐曲管理-->
<template>
    <div>
       <p class="line_p">
        <a href="javascript:;" @click="exit">乐曲管理</a>&gt;
        <a href="javascript:;">编辑乐曲</a>
    </p>
    <div class="content content_model content_model_add" style="margin-bottom:30px;">
      <div class="home_text">乐曲管理
            <div>
                <button @click="exit" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;margin-right:20px;">取消</button>
                <button  @click="not_null" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
            </div>
      </div>
      <div class="input_div" style="margin-top:30px;">
        <a class="table_a">上传专辑封面:</a>
        <form name=theform  style="width:300px;background:#f6f6f6;margin-left:125px;">
            <div class="modify-img-border upload-bg" id="lesson_content" style="padding-top:100%;">
                <div class="edit-upload-plus">
                    <a href="javascript:void(0);" class="upload-file" id="lesson_plus">
                        <span class="fa fa-plus" style="margin-top:50px;"></span>
                        <input type="file" name="file" id="lesson" @change="upload('lesson')" style="height:100px;background:red;">
                    </a>
                </div>
                <div id="lesson_pro_con" class="upload-pro-con">
                    <div class="upload-pro-border">
                        <div id="lesson_progress" class="upload-progress"></div>
                    </div>
                </div>
            </div>
            <input id="lesson_value"  style="display: none;">
        </form>
    </div>
    <div class="input_div">
        <a class="table_a" style="float: left;">乐曲分类: </a>
        <Select  style="width:300px !important;" v-model="class_id" placeholder='请选择乐曲分类'>
            <Option v-for="res in classList" :value="res.id" :key="res.id">{{res.name}}</Option>
        </Select>
    </div>
    <div class="input_div">
        <a class="table_a" style="float: left;">标题: </a>
        <Input placeholder="请输入乐曲标题" style="width: 300px" v-model="video_name"></Input>
    </div>
    <div class="input_div">
        <a class="table_a" style="float: left;">价格: </a>
        <Input placeholder="请输入整张购买价格" style="width: 300px" ></Input>
    </div>
    <div class="input_div">
        <a class="table_a" style="float: left;">会员价格: </a>
        <Input placeholder="请输入会员购买价格(免费输入0)" style="width: 300px" ></Input>
    </div>
    <div class="input_div">
        <a class="table_a" style="float: left;">描述: </a>
         <Input style="width:310px;padding:6px;font-size:14px;"  type="textarea" :rows="5" placeholder="请输入乐曲描述..."></Input>
    </div>
    
   
    
    
    
</div>


</div>
</template>

<script>
import {mapState,mapActions} from 'vuex'

    
export default {
    data () {
        return {
            video_name:"",
            video_description:"",
            video_keyword:"",
            textid:"",

            classList:"",
            class_id:0,

            masterList:"",
            master_id:0,

            video_hour:'',
            video_day:'',
            video_level:'',
            video_icon:0,
            is_buy:false,
            is_buy_id:0,

            lesson:'',
            lesson_list:'',
            vertical:'',
            
        }
    },
    mounted(){
    this.getosstoken()
    this.get_url()
    this.gettecha_class()

},
computed:{
    ...mapState({uptoken:'uptoken'})
},
methods:{
    exit(){
        this.$router.push({path:'/education/music_list'})
    },


get_url(){   // 解析url
    let urlid = window.location.search.substring(1)
    if(urlid == ""){
        this.textid = 0
        return ;
    }else{
        this.textid = urlid
        this.getmain() 
    }
},

getmain(){   // 获取详情
    this.$axios({
        url: this.$linkurl.get_video_course_detail,
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
        this.video_name = i.name
        this.class_id = i.category_id
        this.video_description = i.description
        this.video_keyword = i.operate_keyword
        this.video_icon = i.coin
        if(i.is_buy == 1){   
            this.is_buy = true
        }else{
            this.is_buy = false
        }
        this.master_id = i.master_id
        this.video_hour = i. class_hour.toString()
        this.video_day = i.average_study_day.toString()
        this.video_level = i.learning_level.toString()

        this.lesson = i.cover_url
        this.lesson_list = i.list_cover_url
        $('#lesson_content').css('background-image','url("'+ i.cover_url +'")');
        $('#lesson_list_content').css('background-image','url("'+ i.list_cover_url +'")');
    })
    .catch(err=>{
        console.log("获取详情失败",err)
    })
},

not_null(){    // 判断
    if(this.video_name==''){
        this.$Message.warning('请输入标题')
    }else{
        this.add_video()
    }
},

add_video(){   // 提交
    this.$axios({
        url: this.$linkurl.handle_video_course,
        method: 'POST',
        data: {
        token: localStorage.getItem('token'),
        id:this.textid,    // 0是增加  1以上为修改
        name:this.video_name,
        category_id:this.class_id,
        cover_url:this.lesson,
        list_cover_url:this.lesson_list,
        description:this.video_description,
        operate_keyword:this.video_keyword,
        is_buy:this.is_buy_id,
        coin:this.video_icon,
        master_id:this.master_id,
        class_hour:this.video_hour,
        average_study_day:this.video_day,
        learning_level:this.video_level,
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
        this.$router.push({path:'/education/video'})
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
    if(ext!='png'&&ext!='jpg'){
        this.$Message.warning('请上传"png"或"jpg"')
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
            if(id == 'lesson'){
                that.lesson = cdnDomain + key;
                $('#' + id + '_content').css('background-image','url("'+ that.lesson +'")');
                $('#' + id + '_span').css('display','none')
            }
            if(id == 'lesson_list'){
                that.lesson_list = cdnDomain + key;
                $('#' + id + '_content').css('background-image','url("'+ that.lesson_list +'")');
                $('#' + id + '_span').css('display','none')
            }
        }else{
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
  width:120px;
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