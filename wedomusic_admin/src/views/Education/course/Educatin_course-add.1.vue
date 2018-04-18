<!--编辑课程-->
<template>
    <div>
       <p class="line_p">
        <a href="javascript:;" @click="exit">视频课程管理</a>&gt;
        <a href="javascript:;">编辑课程</a>
    </p>
    <div class="content content_model content_model_add" style="margin-bottom:30px;">
      <div class="home_text">新增视频课程
            <div>
                <button @click="exit" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;margin-right:20px;">取消</button>
                <button  @click="not_null" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
            </div>
      </div>
      <div class="input_div" style="margin-top:30px;">
        <a class="table_a">上传课程封面:</a>
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
        <a class="table_a">上传课程列表封面:</a>
        <form name=theform  style="width:300px;background:#f6f6f6;margin-left:125px;">
            <div class="modify-img-border upload-bg" id="lesson_list_content" style="padding-top:40%;">
                <div class="edit-upload-plus">
                    <a href="javascript:void(0);" class="upload-file" id="lesson_list_plus">
                        <span class="fa fa-plus"></span>
                        <input type="file" name="file" id="lesson_list" @change="upload('lesson_list')">
                    </a>
                </div>
                <div id="lesson_list_pro_con" class="upload-pro-con">
                    <div class="upload-pro-border">
                        <div id="lesson_list_progress" class="upload-progress"></div>
                    </div>
                </div>
            </div>
            <input id="lesson_list_value"  style="display: none;">
        </form>
    </div>
    <div class="input_div">
        <a class="table_a" style="float: left;">课程分类: </a>
        <Select  style="width:300px !important;" v-model="class_id" placeholder='请选择课程分类'>
            <Option v-for="res in classList" :value="res.id" :key="res.id">{{res.name}}</Option>
        </Select>
    </div>
    <div class="input_div">
        <a class="table_a" style="float: left;">标题: </a>
        <Input placeholder="请输入课程标题" style="width: 300px" v-model="video_name"></Input>
    </div>
    <div class="input_div">
        <a class="table_a" style="float: left;">描述: </a>
        <textarea  rows="6" style="width:400px;border:1px solid #999;padding:6px;font-size:14px;" v-model="video_description" placeholder="请输入课程描述"></textarea>
    </div>
    <div class="input_div">
        <a class="table_a" style="float: left;">关键词: </a>
        <textarea  rows="3" style="width:400px;border:1px solid #999;padding:6px;font-size:14px;" v-model="video_keyword" placeholder="请输入运营关键词，例如：高级技巧进阶，家庭音乐节等，多个关键词用逗号分割"></textarea>
    </div>
    <div class="input_div">
        <a class="table_a" style="float: left;">是否需要解锁: </a>
        <span class="checkbox"><label><input type="checkbox" :checked="is_buy" @change="video_buy">是</label></span>
    </div>
    <div class="input_div">
        <a class="table_a" style="float: left;">解锁价格: </a>
        <Input  placeholder="请输入解锁价格（金币数）" v-model="video_icon" style="width: 300px"></Input>
    </div>
    <div class="input_div">
        <a class="table_a" style="float: left;">大师: </a>
        <Select  style="width:300px !important;" v-model="master_id" placeholder='请选择大师'>
            <Option v-for="res in masterList" :value="res.id" :key="res.id">{{res.name}}</Option>
        </Select>
    </div>
    <div class="input_div">
        <a class="table_a" style="float: left;">课时:</a>
        <Select  style="width:300px !important;" v-model="video_hour" placeholder='请选择课程'>
            <Option value=1>1 课时</Option>
            <Option value=2>2 课时</Option>
            <Option value=3>3 课时</Option>
            <Option value=4>4 课时</Option>
            <Option value=5>5 课时</Option>
            <Option value=6>6 课时</Option>
            <Option value=7>7 课时</Option>
            <Option value=8>8 课时</Option>
            <Option value=9>9 课时</Option>
            <Option value=10>10 课时</Option>
            <Option value=11>11 课时</Option>
            <Option value=12>12 课时</Option>
            <Option value=13>13 课时</Option>
            <Option value=14>14 课时</Option>
            <Option value=15>15 课时</Option>
            <Option value=16>16 课时</Option>
            <Option value=17>17 课时</Option>
            <Option value=18>18 课时</Option>
            <Option value=19>19 课时</Option>
            <Option value=20>20 课时</Option>
            <Option value=21>21 课时</Option>
            <Option value=22>22 课时</Option>
            <Option value=23>23 课时</Option>
            <Option value=24>24 课时</Option>
            <Option value=25>25 课时</Option>
            <Option value=26>26 课时</Option>
            <Option value=27>27 课时</Option>
            <Option value=28>28 课时</Option>
            <Option value=29>29 课时</Option>
            <Option value=30>30 课时</Option>
            <Option value=31>31 课时</Option>
            <Option value=32>32 课时</Option>
            <Option value=33>33 课时</Option>
            <Option value=34>34 课时</Option>
            <Option value=35>35 课时</Option>
            <Option value=36>36 课时</Option>
            <Option value=37>37 课时</Option>
            <Option value=38>38 课时</Option>
            <Option value=39>39 课时</Option>
            <Option value=40>40 课时</Option>
        </Select>
    </div>
    <div class="input_div">
        <a class="table_a" style="float: left;">学习天数: </a>
        <Select  style="width:300px !important;" v-model="video_day" placeholder='请选择学习天数'>
            <Option value=1>1 天</Option>
            <Option value=2>2 天</Option>
            <Option value=3>3 天</Option>
            <Option value=4>4 天</Option>
            <Option value=5>5 天</Option>
            <Option value=6>6 天</Option>
            <Option value=7>7 天</Option>
            <Option value=8>8 天</Option>
            <Option value=9>9 天</Option>
            <Option value=10>10 天</Option>
            <Option value=11>11 天</Option>
            <Option value=12>12 天</Option>
            <Option value=13>13 天</Option>
            <Option value=14>14 天</Option>
            <Option value=15>15 天</Option>
            <Option value=16>16 天</Option>
            <Option value=17>17 天</Option>
            <Option value=18>18 天</Option>
            <Option value=19>19 天</Option>
            <Option value=20>20 天</Option>
            <Option value=21>21 天</Option>
            <Option value=22>22 天</Option>
            <Option value=23>23 天</Option>
            <Option value=24>24 天</Option>
            <Option value=25>25 天</Option>
            <Option value=26>26 天</Option>
            <Option value=27>27 天</Option>
            <Option value=28>28 天</Option>
            <Option value=29>29 天</Option>
            <Option value=30>30 天</Option>
            <Option value=31>31 天</Option>
            <Option value=32>32 天</Option>
            <Option value=33>33 天</Option>
            <Option value=34>34 天</Option>
            <Option value=35>35 天</Option>
            <Option value=36>36 天</Option>
            <Option value=37>37 天</Option>
            <Option value=38>38 天</Option>
            <Option value=39>39 天</Option>
            <Option value=40>40 天</Option>
        </Select>
    </div>
    <div class="input_div" style="margin-bottom:30px;">
        <a class="table_a" style="float: left;">学习级别: </a>
        <Select  style="width:300px !important;" v-model="video_level" placeholder='请选择学习级别'>
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

        }
    },
    mounted(){
    this.getosstoken()
    this.get_url()
    this.gettecha_class()
    this.getmaster_class()
},
computed:{
    ...mapState({uptoken:'uptoken'})
},
methods:{
    exit(){
        this.$router.push({path:'/education/video'})
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
    }else if(this.class_id ==''){
        this.$Message.warning('请选择课程分类')            
    }else if(this.video_description==''){
        this.$Message.warning('请输入描述') 
    }else if(this.video_keyword==''){
        this.$Message.warning('请输入关键词') 
    }else if(this.master_id==''){
        this.$Message.warning('请选择大师') 
    }else if(this.video_hour==''){
        this.$Message.warning('请选择课时')
    }else if(this.video_day==''){
        this.$Message.warning('请选择学习天数')
    }else if(this.video_level==''){
        this.$Message.warning('请选择学习级别')
    }else if(this.lesson==''){
        this.$Message.warning('请选择课程封面')
    }else if(this.lesson_list==''){
        this.$Message.warning('请选择课程列表封面')
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



getmaster_class(){   // 获取大师分类
    this.$axios({
        url: this.$linkurl.get_master_list,
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
        this.masterList = res.data.data
    })
    .catch(err=>{
        console.log("获取课程分类列表",err)
    })
},

video_buy(e){   // 是否购买
    if(e.target.checked == false){
        this.is_buy = false
        this.is_buy_id = 0
        this.video_icon = ""
        this.video_icon = 0
    }else{
        this.is_buy = true
        this.is_buy_id = 1
        this.video_icon = ''
    }
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