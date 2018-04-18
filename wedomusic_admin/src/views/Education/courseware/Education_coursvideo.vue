<!--视频-->
<template>
  <div>
   <p class="line_p">
    <a href="javascript:;" @click="exit">子项管理</a>&gt;
    <a href="javascript:;">新增视频</a>
  </p>
  <div class="content content_model content_model_add" style="margin-bottom:30px;">
    <div class="home_text">新增视频
        <div>
          <button @click="exit" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;margin-right:20px;">取消</button>
          <button @click="not_null" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
        </div>
    </div>
    <div class="input_div" style="margin-top:30px;">
     <a class="table_a">上传课件视频:</a>
     <form name=theform  style="width:300px;background:#f6f6f6;margin-left:95px;">
      <div class="modify-img-border upload-bg" id="courseware_item_content" style="padding-top:50%;">
        <div class="edit-upload-plus">
          <a href="javascript:void(0);" class="upload-file" id="courseware_item_plus">
            <span class="fa fa-plus"></span>
            <input type="file" name="file" id="courseware_item" @change="upload('courseware_item')">
          </a>
        </div>
        <div id="courseware_item_pro_con" class="upload-pro-con">
          <div class="upload-pro-border">
            <div id="courseware_item_progress" class="upload-progress"></div>
          </div>
        </div>
      </div>
      <input id="courseware_item_value" ng-model="formData.res_url" style="display: none;">
    </form>
  </div>
  <div class="input_div">
   <a class="table_a">标题:</a>
   <Input style="width: 300px" placeholder="请输入视频标题" v-model="video_name"></Input>
 </div>
 <div class="input_div" style="margin-bottom:30px;">
   <a class="table_a">顺序码:</a>
   <Select  style="width:300px !important;" v-model="video_change">
    <Option value=1>1</Option>
    <Option value=2>2</Option>
    <Option value=3>3</Option>
    <Option value=4>4</Option>
    <Option value=5>5</Option>
    <Option value=6>6</Option>
    <Option value=7>7</Option>
    <Option value=8>8</Option>
    <Option value=9>9</Option>
    <Option value=10>10</Option>
    <Option value=11>11</Option>
    <Option value=12>12</Option>
    <Option value=13>13</Option>
    <Option value=14>14</Option>
    <Option value=15>15</Option>
    <Option value=16>16</Option>
    <Option value=17>17</Option>
    <Option value=18>18</Option>
    <Option value=19>19</Option>
    <Option value=20>20</Option>
    <Option value=21>21</Option>
    <Option value=22>22</Option>
    <Option value=23>23</Option>
    <Option value=24>24</Option>
    <Option value=25>25</Option>
    <Option value=26>26</Option>
    <Option value=27>27</Option>
    <Option value=28>28</Option>
    <Option value=29>29</Option>
    <Option value=30>30</Option>
    <Option value=31>31</Option>
    <Option value=32>32</Option>
    <Option value=33>33</Option>
    <Option value=34>34</Option>
    <Option value=35>35</Option>
    <Option value=36>36</Option>
    <Option value=37>37</Option>
    <Option value=38>38</Option>
    <Option value=39>39</Option>
    <Option value=40>40</Option>
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
        courseware_id:localStorage.getItem('ware_id'),
        video_name:"",
        video_change:'',
        textid:"",
        lesson:"",
      }
    },
    computed:{
        ...mapState({uptoken:'uptoken'})
    },
    mounted(){
      this.getosstoken()
      this.get_url()
    },
    methods:{

    exit(){  // 推出
      this.$router.push({path:'/education/coursechildlist' +'?'+localStorage.getItem('ware_id')})
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
        url: this.$linkurl.get_course_ware_resource_detail,
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
        this.video_change = i.sort.toString()
        this.lesson = i.res_url
        if(i.res_url != ''){
          $('#courseware_item_content').css('background-image','url(http://cdn.9beats.com/website/admin/images/uploaded.png)');
        }


      })
      .catch(err=>{
        console.log("获取详情失败",err)
      })
    },

    not_null(){   // 判断
      if(this.video_name==''){
        this.$Message.warning('请填写标题')
      }else if(this.video_change==''){
        this.$Message.warning('请选择顺序码')
      }else if(this.lesson==''){
        this.$Message.warning('请上传视频')
      }else{
        this.add_video()
      }
    },

    add_video(){   // 新增+修改
      this.$axios({
        url: this.$linkurl.handle_course_ware_resource,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
            id:this.textid,    // 0是增加  1以上为修改
            name:this.video_name,
            courseware_id:this.courseware_id,
            resource_category_id:2,  // 1板书 2视频 3跟铺
            res_url:this.lesson,
            xml_url:"",
            json_url:"",
            sort:this.video_change,
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
            this.$router.push({path:'/education/coursechildlist' +'?'+ this.courseware_id})

          })
      .catch(err=>{
        console.log("修改失败或者新建",err)
      })
    },


    // 上传
    ...mapActions({getosstoken:'get_token'}),  // 获取oss token          
    
    upload(id){   // 上传1
      this.$Loading.start();
      var cdnDomain = this.$linkurl.ossurl;
      var timestamp=new Date().getTime();
      if(!document.getElementById(id).files[0].name ){return false;}
      var filename = document.getElementById(id).files[0].name;
      var index = filename.lastIndexOf(".");
      var indexname =  filename.substr(0,index)
      var ext = filename.substr(index+1);
      var key =  id + '/' + timestamp + '.' +  ext
      if(ext!='mp4'){
        this.$Message.warning('上传mp4')
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
              $('#' + id + '_content').css('background-image','url(http://cdn.9beats.com/website/admin/images/uploaded.png)');
              $('#' + id + '_span').css('display','none')
              that.$Loading.finish();
            }else{
              this.$Loading.error();  
              that.$Message.warning('上传失败');
            }
          }
        };
      },
    },
  }
</script>
<style scoped lang="scss">
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