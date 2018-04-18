<!--商城资质管理-->
<template>

  <div>
    <span class="topspan">销售许可证管理</span>
    <div class="input_div">
      <a class="table_a">编号:</a>
      <Input v-if="input_show" placeholder="请输入销售许可证编号" :readonly='readonly' v-model="code" style="width: 300px"></Input>
      <span v-else>{{code}}</span>      
    </div>
    <div class="input_div">
      <a class="table_a">有效期:</a>
      <div style="float:left;">
        <DatePicker v-if="input_show" type="date" v-model="start_date" :readonly='readonly' placeholder="开始日期"  style="width: 160px"></DatePicker>
        <span v-else>{{start_date | formatDate}}</span>
      </div>
      <span class="time_span" style="float:left;margin:0 2px;">至</span>
      <div>
        <DatePicker v-if="input_show" type="date" v-model="end_date" :readonly='readonly'   placeholder="结束日期"  style="width: 160px"></DatePicker>
        <span v-else>{{end_date | formatDate}}</span>
      </div>
    </div>
    <div class="input_div">
      <a class="table_a">销售许可证:</a>
      <div class="uplode_box">
        <form name=theform style="width:400px;background:#f6f6f6;margin-left:95px;">
          <div class="modify-img-border upload-bg"  id="textbook_home_content" style="padding-top:100%;">
            <div class="edit-upload-plus">
              <a href="javascript:void(0);" class="upload-file" id="textbook_home_plus">
                <div id="textbook_home_span">
                  <Icon type="images" size="52" style="color:white;"></Icon>
                  <p style="font-size: 10px;color: #7D93B2;">图片支持 jpg/png 格式，RGB模式，不超过500k</p>
                  <button class="uplode_btn" style="width: 120px;height: 30px;background:#F0B46E;color: white;border: none;">点击上传</button>  
                </div>
                <input type="file" name="file" id="textbook_home" @change="upload('textbook_home')">
              </a>
            </div>
          </div>
        </form>
      </div> 
    </div>

    <div class="setting_money_btn">
    <Button v-if="resyes"  type="warning" style="background:#F0B46E;border:none;width:150px;height:30px;" @click="soldout_yes">确定</Button>
      <Button v-else style="background:#F0B46E;color:white;border:none;width:150px;height:30px;" @click="getchange">修改</Button>
    </div>

    <div id="app">
      <Modal v-model="soldout" width="376" class-name="vertical-center-modal">
        <div class="tit" style="margin-top:20px;">是否确定修改</div>
        <div slot="footer" class="btns">
          <button class="btn btn1" @click="soldout_clik">取消</button>
          <button class="btn btn2" @click="change_main">确定</button>
        </div>
      </Modal>
    </div>

  </div>

</template>

<script>
  import {mapState,mapActions} from 'vuex'
  import {formatDate} from '../../All-commonality/data'
  export default {
    data(){
      return{
        readonly:true,
        resyes:false,
        soldout:false,
        start_date:Number,
        end_date:Number,
        code:"",
        image_url:"",
        input_show:false,

      }
    },
    computed:{
      ...mapState({uptoken:'uptoken'})
    },
    mounted(){
      this.getosstoken()
      this.get_main()

    },
    methods:{

      getchange(){  // 修改
        this.input_show = true
        this.resyes = true
        $('#textbook_home_span').css('display','block')
        this.readonly = false
        this.soldout = false
        // this.soldout = true
      },

      soldout_clik(){  // 取消
        this.soldout = false
        this.resyes = false

      },

      soldout_yes(){  // 确认
        this.soldout = true
      },

        change_main(){   // 修改
          this.$axios({
            url: this.$linkurl.update_mall_aptitude,
            method: 'POST',
            data: {
              token: localStorage.getItem('token'),
              code:this.code,
              image_url:this.image_url,
              start_date:new Date(this.start_date),
              end_date:new Date(this.end_date),
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

            this.get_main()
            this.$Message.config({top:50})
            this.$Message.success('修改成功')
            this.readonly = true
            this.input_show = false 
            this.resyes = true
            this.soldout = false
            
          })
          .catch(err=>{
            console.log("获取详细信息失败",err)
          })
      },


      get_main(){   // 获取详情
        this.$axios({
          url: this.$linkurl.get_mall_aptitude_info,
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
          this.code = i.code
          this.start_date = i.start_date *1000
          this.end_date = i.end_date *1000
          this.image_url = i.image_url

          if(i.image_url != ''){
            $('#textbook_home_content').css('background-image','url("'+ i.image_url +'")')
            $('#textbook_home_span').css('display','none')
          }
          if(res.data.data == ''){
            this.resyes = true
          }else{
            this.resyes = false
          }

        })
        .catch(err=>{
          console.log("获取详细信息失败",err)
        })
      },  

      // 上传
      ...mapActions({getosstoken:'get_token'}),  // 获取oss token

      upload(id){   
        var cdnDomain = 'http://cdn.9beats.com/';
        var timestamp=new Date().getTime();
        var filename = document.getElementById(id).files[0].name;
        var index = filename.lastIndexOf(".");
        var indexname =  filename.substr(0,index)
        var ext = filename.substr(index+1);
        var key =  id + '/' + timestamp + '.' +  ext
          // var key = 'music/' + 'a' + '.' + ext;

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
            // console.log(oReq.status)
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
      },
      filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd');
      }
    }
  }
</script>
<style lang="scss" scoped>
@import '../../../assets/css/input_style.scss';
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
  width:90px;
  text-align:right;
  height:30px;
  line-height:30px;
  margin-right:5px;
}

  .uplode_class{
    padding: 30px 0;
    display: flex;
    .uplode_box{
      width: 80%;
      background: #D8D8D8;
      border: none;
      .uplode_btn{
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
</style>

