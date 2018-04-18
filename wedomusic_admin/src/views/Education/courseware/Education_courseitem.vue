<template>
  <div>
    <p class="line_p">
      <a href="javascript:;" @click="exit">子项管理</a>&gt;
      <a href="javascript:;">新增练习</a>
    </p>
    <div class="content content_model content_model_add" style="margin-bottom:80px;">
      <div class="home_text">新增练习
          <div>
            <button @click="exit" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;margin-right:20px;">取消</button>
            <button @click="not_null" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
          </div>
      </div>
      <div class="input_div" style="margin-top:30px;">
        <a class="table_a">上传跟谱压缩包(.zip格式):</a>
        <form name=theform style="width:300px;background:#f6f6f6;margin-left:200px;">
          <div class="modify-img-border upload-bg" id="textbook_zip_content" style="padding-top:50%;">
            <div class="edit-upload-plus" style="margin-top:20px;">
              <a href="javascript:void(0);" class="upload-file" id="textbook_zip_plus">
                <span class="fa fa-plus"></span>
                <input type="file" name="file" id="textbook_zip" @change="upload('textbook_zip','zip')">
              </a>
            </div>
            <div id="textbook_audio_pro_con" class="upload-pro-con">
              <div class="upload-pro-border">
                <div id="textbook_audio_progress" class="upload-progress"></div>
              </div>
            </div>
          </div>
          <input id="textbook_audio_value" ng-model="formData.audio_url" style="display: none;">
        </form>
      </div>
      <div class="input_div">
        <a class="table_a">上传跟谱练习Music(.xml格式):</a>
        <form name=theform style="width:300px;background:#f6f6f6;margin-left:200px;">
          <div class="modify-img-border upload-bg" id="textbook_audio_content" style="padding-top:50%;">
            <div class="edit-upload-plus" style="margin-top:20px;">
              <a href="javascript:void(0);" class="upload-file" id="textbook_audio_plus">
                <span class="fa fa-plus"></span>
                <input type="file" name="file" id="textbook_audio" @change="upload('textbook_audio','xml')">
              </a>
            </div>
            <div id="textbook_audio_pro_con" class="upload-pro-con">
              <div class="upload-pro-border">
                <div id="textbook_audio_progress" class="upload-progress"></div>
              </div>
            </div>
          </div>
          <input id="textbook_audio_value" ng-model="formData.audio_url" style="display: none;">
        </form>
      </div>
      <div class="input_div">
        <a class="table_a">标题:</a>
        <Input style="width: 300px" placeholder="请输入跟谱练习标题" v-model="name"></Input>
      </div>
        <div class="input_div"  style="margin-bottom:30px;">
        <a class="table_a">顺序码:</a>
        <Select  style="width:300px !important;" v-model="change">
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

        <div class="input_div">
          <a class="table_a">
            <Checkbox v-model="height_set" @on-change='change_hei'>高级设置</Checkbox>
          </a>
        </div>
        <div v-if='hei'>
          <div class="input_div">
            <a class="table_a">速度:</a>
            <Input style="width: 300px" placeholder="请输入速度（不输入则为默认）" v-model="name"></Input>
          </div>
          <div class="input_div">
            <a class="table_a">循环次数:</a>
            <!-- <Input style="width: 300px" placeholder="请输入速度" v-model="name"></Input> -->
            <Select  style="width:300px !important;" placeholder="请选择循环次数（不输入则为0)" v-model="change">
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
            </Select>
          </div>
          <div class="input_div">
            <a class="table_a" >
              <Checkbox v-model="height_stop" @on-change='change_heis'>添加限制</Checkbox>
            </a>
          </div>
          <div v-if='heis'>
              <br>
              <RadioGroup v-model="chang_Limit" vertical>
                  <Radio label="apple">
                      <span>时间限制:</span>
                       <Input style="width: 220px" placeholder="请输入数字（单位：秒）" ></Input>
                  </Radio>
                  <Radio label="android">
                      <span>次数限制:</span>
                      <Input style="width: 220px" placeholder="请选择最小缩放次数（不输入则为0)" ></Input>
                  </Radio>
              </RadioGroup>
          </div>

        </div>
        
           
    </div>
  </div>
</template>

<script>
  // import axios from 'axios'
  // import linkurl from '../../All-commonality/LinkUrl'
  import {mapState,mapActions} from 'vuex'  
  export default {
    data () {
      return {
        courseware_id:localStorage.getItem('ware_id'),
        name:"",
        change:'',
        textid:"",
        json_url:"",
        xml_url:"",
        height_set:false,  // 高级设置
        height_stop:false,
        chang_Limit:'',
        hei:false,
        heis:false,
        Limits:''

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

    ...mapActions({getosstoken:'get_token'}),  // 获取oss token      

    change_hei(){    // 高级
        if(this.height_set==true){
          this.hei = true
        }else{
          this.hei = false
        }
    },

    change_heis(){  // 限制
        if(this.height_stop==true){
          this.heis = true
        }else{
          this.heis = false
        }
    },

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
        this.get_main() 
      }
    },

    get_main(){   // 获取详情
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
        this.name = i.name
        this.change = i.sort
        this.json_url = i.json_url
        this.xml_url = i.xml_url

        if(i.json_url != ''){
          $('#textbook_zip_content').css('background-image','url(http://cdn.9beats.com/website/admin/images/uploaded.png)');                
        }
        if(i.xml_url != ''){
          $('#textbook_audio_content').css('background-image','url(http://cdn.9beats.com/website/admin/images/uploaded.png)');                
        }


      })
      .catch(err=>{
        console.log("获取详情失败",err)
      })
    },

    not_null(){
      if(this.name==''){
        this.$Message.warning('请输入标题')
      }else if(this.change==''){
        this.$Message.warning('请选择顺序码')
      }else if(this.json_url==''){
        this.$Message.warning('请上传压缩包')
      }else if(this.xml_url==''){
        this.$Message.warning('请上传曲谱练习')
      }else{
        this.add()
      }
    },

    add(){  // 新增
      this.$axios({
        url: this.$linkurl.handle_course_ware_resource,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
            id:this.textid,    // 0是增加  1以上为修改
            name:this.name,
            courseware_id:this.courseware_id,
            resource_category_id:3,  // 1板书 2视频 3跟铺
            res_url:"",
            xml_url:this.xml_url,
            json_url:this.json_url,
            sort:this.change,
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

    upload(id,name){   // 上传
      this.$Loading.start();
      var cdnDomain = this.$linkurl.ossurl;
      var timestamp=new Date().getTime();
      if(!document.getElementById(id).files[0].name ){return false;}
      var filename = document.getElementById(id).files[0].name;
      var index = filename.lastIndexOf(".");
      var indexname =  filename.substr(0,index)
      var ext = filename.substr(index+1);
      var key =  id + '/' + timestamp + '.' +  ext

      if(ext != name){
        this.$Loading.error();  
        this.$Message.warning('请选择正确格式上传');
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
              if(id == 'textbook_zip'){
                that.json_url = cdnDomain + key;
                $('#' + id + '_content').css('background-image','url(http://cdn.9beats.com/website/admin/images/uploaded.png)');
                $('#' + id + '_span').css('display','none')
                that.$Loading.finish();
              }
              if(id == 'textbook_audio'){
                that.xml_url = cdnDomain + key;
                $('#' + id + '_content').css('background-image','url(http://cdn.9beats.com/website/admin/images/uploaded.png)');
                $('#' + id + '_span').css('display','none')
                that.$Loading.finish();
              }

            }else{
              that.$Loading.error();  
              that.$Message.config({top:50})
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
  width:195px;
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