<!--企业基本信息-->
<template>
<div>
  <div class="input_div" >
      <a class="table_a">企业名称:</a>
      <Input v-if="input_show" placeholder="请输入企业名称" style="width: 300px" :readonly='red_only' v-model="name"></Input>
      <span v-else>{{name}}</span>      
  </div>
 <div class="input_div">
      <a class="table_a">企业性质:</a>
            <RadioGroup v-model="single" style="line-height:30px" >
                <Radio :label="1" :disabled='single_disabled'>法人企业</Radio>
                <Radio :label='2' :disabled='single_disabled'>非法人企业(含个体工商户)</Radio>
            </RadioGroup>
  </div>
 <div class="input_div">
      <a class="table_a">企业注册地区:</a>
       <div style="float:left;">
            <Cascader :data="data" trigger="hover" style="width: 300px" v-model="test" :disabled='red_only'></Cascader>
        </div>
  </div>
   <div class="input_div" style="clear:both;margin-top:70px;">
      <a class="table_a">详细地址:</a>
      <Input v-if="input_show" placeholder="请输入详细地址" style="width: 300px" :readonly='red_only' v-model="address"></Input>
      <span v-else>{{address}}</span>            
  </div>
   <div class="input_div">
      <a class="table_a">联系人姓名:</a>
      <Input v-if="input_show" placeholder="请输入联系人姓名" style="width: 300px" :readonly='red_only' v-model="liable_name"></Input>
      <span v-else>{{liable_name}}</span>                  
  </div>
   <div class="input_div">
      <a class="table_a">联系人手机号:</a>
      <Input v-if="input_show" placeholder="请输入联系人手机号" style="width: 300px" :readonly='red_only' v-model="liable_phone"></Input>
      <span v-else>{{liable_phone}}</span>                        
  </div>
   <div class="input_div">
      <a class="table_a">统一社会信用代码:</a>
      <Input v-if="input_show" placeholder="请输入统一社会信用代码" style="width: 300px" :readonly='red_only' v-model="mechanism_code"></Input>
      <span v-else>{{liable_phone}}</span>                              
  </div>
  <div class="input_div">
      <a class="table_a">营业执照:</a>
      <div class="uplode_box">
        <form name=theform style="width:400px;background:#f6f6f6;margin-left:120px;">
          <div class="modify-img-border upload-bg"  id="textbook_home_content" style="padding-top:100%;">
            <div class="edit-upload-plus">
              <a href="javascript:void(0);" class="upload-file" id="textbook_home_plus">
                <div id="textbook_home_span"  v-if="input_show">
                  <Icon type="images" size="52" style="color:white;"></Icon>
                  <p style="font-size: 10px;color: #7D93B2;padding-bottom:15px;">图片支持 jpg/png 格式，RGB模式，不超过500k</p>
                  <button id="uplode_btn" style="width: 120px;height: 30px;background:#F0B46E;color: white;border: none;">点击上传</button>  
                </div>
                <input type="file" name="file" id="textbook_home" @change="upload('textbook_home')">
              </a>
            </div>
          </div>
        </form>
      </div> 
    </div>

    <div class="setting_money_btn" style="margin-top:30px;">
        <Button @click="if_have" type="warning" style="background:#F0B46E;border:none;width:150px;height:30px;" v-show="shoe_change" >确定</Button>
        <Button @click="chang_red_only" type="warning" style="background:#F0B46E;border:none;width:150px;height:30px;" v-show="shoe_yes">修改</Button>
    </div>

    <!--成功后的提示框-->
    <div id="app2">
        <Modal width="400" v-model="add" class-name="vertical-center-modal">
            <h5>已将新的需求提交至哆来学，将由工作人员和您进行详细的沟通。</h5>   
            <div slot="footer" style="text-align:center;">
                <button @click="add=false" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
            </div>
        </Modal>
    </div>
</div>
   
</template>

<script>
import City from '../../All-commonality/City'
import {mapState,mapActions} from 'vuex'



export default {
  name:"",
  data(){
      return{
        test:[1,2],
        add:false,
        name:"",
        liable_name:"",
        liable_phone:"",
        mechanism_code:"",   // 机构代码
        province:"",   // 省
        // city:"",         // 市
        district:"",       // 区
        address:"",     // 详细
        image_url:'',

        from_city:"",
        single:'1',
        self:false,
        data: City(),
        shoe_change:false,
        shoe_yes:true,
        red_only:true,
        input_show:false,
        single_disabled:true,
      }
  },

  mounted(){
      this.getosstoken()
      this.get_main()
  },
  computed:{
      ...mapState({uptoken:'uptoken'})
  },
  methods:{

    if_have(){  // 判断
        this.$Message.config({top: 50})
        if(this.name==''){
            this.$Message.warning('请输入企业名称');
        }
        else if(this.liable_name==''){
            this.$Message.warning('请输入联系人姓名');
        }
        else if(this.liable_phone==''){
            this.$Message.warning('请输入联系人电话');
        }
        else if(this.mechanism_code==''){
            this.$Message.warning('请输入统一社会信用代码');
        }
        else if(this.address==''){
            this.$Message.warning('请输入详细地址');
        }
        else{
            this.change_main()
        }
    },

    chang_red_only(){
        this.shoe_yes = false
        this.shoe_change = true
        this.red_only = false
        this.input_show = true
        this.single_disabled = false
    },
      
    get_main(){  // 获取详情
        this.$axios({
        url: this.$linkurl.get_mechanism_detail,
        method: 'POST',
        data: {
        token: localStorage.getItem('token'),
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
        console.log(res.data.data)
        let i = res.data.data
        this.name = i.name  // 企业名称
        this.liable_name = i.liable_name  // 联系人姓名
        this.liable_phone = i.liable_phone  // 联系人电话
        this.mechanism_code = i.mechanism_code    // 机构代码
        this.address = i.address  // 地址详情
        this.single = i.mechanism_type_id  // 企业性质
        let province = i.province*1
        let city = i.city*1
        let district = i.district*1
        this.test = [province,city,district]    // 地区
        })
        .catch(err=>{
            console.log("获取信息失败",err)
        })
    },


    change_main(){   // 修改
        let Obj = {
            token: localStorage.getItem('token'),
            name:this.name,
            mechanism_type_id:this.single,
            province:this.test[0],
            city:this.test[1],
            district:(this.test[2])?this.test[2]:0,
            address:this.address,
            liable_name:this.liable_name,
            liable_phone:this.liable_phone,
            license_url:this.image_url,
            mechanism_code:this.mechanism_code
        }

        this.$axios({
        url: this.$linkurl.update_mechanism_info,
        method: 'POST',
        data: Obj,
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
            if(res.data.message=='成功'){
                this.add = true
                this.get_main()
                this.shoe_change = false
                this.shoe_yes = true
                this.red_only = true
                this.input_show = false
                this.single_disabled = true
            }else{
                this.$Message.config({top: 50})
                this.$Message.error('修改失败');
            }   
        })
    },


    // 上传
    ...mapActions({getosstoken:'get_token'}),  // 获取oss token
    
    upload(id){   // 上传1
        this.$Message.config({top: 50})    
      var cdnDomain = 'http://cdn.9beats.com/';
      var timestamp=new Date().getTime();
      var filename = document.getElementById(id).files[0].name;
      var index = filename.lastIndexOf(".");
      var indexname =  filename.substr(0,index)
      var ext = filename.substr(index+1);
      var key =  id + '/' + timestamp + '.' +  ext
      if(ext!='png'&&ext!='jpg'){
          this.$Message.warning('图片必须以png或者jpg结尾');
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
          
          oReq.open("POST", 'http://9beats.oss-cn-beijing.aliyuncs.com')
          oReq.send(oMyForm) 
          var that = this
          oReq.onreadystatechange = function(e){   // 上传oss后改变图片
        //   console.log(oReq.status)
          if(oReq.readyState == 4){
            if(oReq.status==200){ 
              that.image_url = cdnDomain + key;
              $('#' + id + '_content').css('background-image','url("'+ that.image_url +'")');
              $('#' + id + '_span').css('display','none')
            }else{
              that.$Message.config({top:50})
              that.$Message.warning('上传失败');
            }
          }
        };
      },



  }
}
</script>

<style lang="scss" scoped>
 @import '../../../assets/css/input_style.scss';
 @import '../../../assets/css/alert.css';
 .input_div{
  margin:20px 0;
  span{
    line-height: 32px;
    height: 32px;
    font-size: 14px;
  }
 }
 .input_div .table_a{
  display:inline-block;
  float:left;
  width:120px;
  text-align:right;
  height:30px;
  line-height:30px;
  margin-right:5px;
}
.uplode_class{
    padding: 30px 0;
    display: flex;
    .uplode_box{
      padding-left: 50px;
      width: 80%;
      background: #D8D8D8;
      border: none;
      #uplode_btn{
        width: 120px;
        height: 30px;
        background:#F0B46E;
        color: white;
        border: none;

      }
    }
  }

  #textbook_home{
    width: 100%;
    height: 100%;
  }

.topspan{
    font-size: 16px;
    font-weight: 800;
}
.setting_time{
    display: flex;
    .time_span{
        margin: 0 10px;
    }
}

.input{
    width: 100%;
    height: 300px;
    background: #D8D8D8;
    
}

.vertical-center-modal h5 {
    font-size: 14px;
    color: #596980;
    width: 80%;
    margin-left: 10%;
    text-align: center;
    padding-top:30px;
}


</style>

