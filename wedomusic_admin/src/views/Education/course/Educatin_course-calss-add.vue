<template>
  <div>
   <p class="line_p">
    <a href="javascript:;" @click="exit">课程章节管理</a>&gt;
    <a href="javascript:;">课程章节</a>
  </p>
  <div class="content content_model content_model_add" style="margin-bottom:30px;">
    <div class="home_text">课程章节
      <div>
        <button @click="exit" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;margin-right:20px;">取消</button>
        <button  @click="add_main" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
      </div>
    </div>
    <div class="input_div">
     <a class="table_a">标题:</a>
     <Input placeholder="请输入章节标题" style="width: 300px" v-model="name"></Input>
   </div>
   <div class="input_div">
     <a class="table_a">序列号:</a>
     <Select  style="width:300px !important;" v-model="sort">
      <Option value=1>EX 1</Option>
      <Option value=2>EX 2</Option>
      <Option value=3>EX 3</Option>
      <Option value=4>EX 4</Option>
      <Option value=5>EX 5</Option>
      <Option value=6>EX 6</Option>
      <Option value=7>EX 7</Option>
      <Option value=8>EX 8</Option>
      <Option value=9>EX 9</Option>
      <Option value=10>EX 10</Option>
      <Option value=11>EX 11</Option>
      <Option value=12>EX 12</Option>
      <Option value=13>EX 13</Option>
      <Option value=14>EX 14</Option>
      <Option value=15>EX 15</Option>
      <Option value=16>EX 16</Option>
      <Option value=17>EX 17</Option>
      <Option value=18>EX 18</Option>
      <Option value=19>EX 19</Option>
      <Option value=20>EX 20</Option>
    </Select>
  </div>
  <div class="input_div">
   <a class="table_a">描述:</a>
   <textarea rows="4" style="width:400px;border:1px solid #999;padding:6px;font-size:14px;" placeholder="请输入章节描述" v-model="description"></textarea>
 </div>

 <p class="home_text home_text_p" style="margin-bottom:20px;">
  视频列表
  <a href="javascript:;" @click="add_video">新增视频</a>
</p>
 
<div class="edit-row edit_row_child" v-for="(res,index) in video_main" :key="index">
  <div ng-repeat="video_row in formData.video_list" class="list-group">
    <div style="display:none"></div>
    <div class="input_div">
      <a class="table_a">标签:</a>
      <Input style="width: 300px" placeholder="请输入视频标签" v-model='res.name'></Input>
    </div>
    <div class="input_div">
      <a class="table_a">序列号:</a>
        <input type="text" style="width:300px;" :placeholder="index+1" id=""  v-model='res._index'>
    </div>
    <div class="input_div">
      <a class="table_a">上传文件:</a>
      <form name=theform style="width:300px;background:#f6f6f6;margin-left:85px;">
        <div class="modify-img-border upload-bg" :id="'video'+index+'_content'" style="padding-top:50%;">
          <div class="edit-upload-plus" style="margin-top:15px;">
            <a href="javascript:void(0);" class="upload-file" :id="'video'+index+'_plus'" >
              <span class="fa fa-plus" :id="'video'+index+'_span'"></span>
              <input type="file" name="file" :id="'video'+index"  @change="upload('video'+index,index)" >
            </a>
          </div>
          <div id="video_pro_con" class="upload-pro-con">
            <div class="upload-pro-border">
              <div id="video_progress" class="upload-progress"></div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</div> 
 
</div>


</div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  export default {
    data () {
      return {
        name:"",
        sort:'',
        description:"",
        ware_id : localStorage.getItem('w_id'),
        textid:"",
        video_main:[
        {
          name:"",
          _index:"",
          video_url:'',
        },
        ],

      }
    },

    mounted(){
      this.getosstoken()
      this.geturl_id()
    },
    computed:{
        ...mapState({uptoken:'uptoken'}),

    },
    updated(){
    //  this.get_main()
    },
    methods:{

      ...mapActions({getosstoken:'get_token'}),  // 获取oss token

      exit(){
        this.$router.push({path:'/education/courseclass' + '?' + localStorage.getItem('w_id')})
      },

      add_video(){
        this.video_main.push({
          name:"",
          _index:"",
          video_url:"",
        })
      },



    geturl_id(){   // 获取urlid
      let urlid = window.location.search
      this.textid = urlid.substring(1)
      if(this.textid == ""){
        return ;
      }else{
        this.textid = urlid.substring(1)
        this.get_main() 
      }
    },

    get_main(){  // 获取详情
      this.$axios({
        url: this.$linkurl.get_video_course_resource_detail,
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
            let i = res.data.data
            console.log(i,'i')
            this.name = i.name
            this.description = i.description
            this.sort = i.sort.toString()
            // 视频详情
            let arr = res.data.data.res_url; 
            if(res.data.data.res_url == 'null'){
              this.video_main = [{ name:"",_index:"",video_url:"",}] 
            }
            if(res.data.data.res_url != 'null'){
              this.video_main = JSON.parse((JSON.parse(arr)));
              for(let l=0;l<this.video_main.length;l++){
                console.log(this.video_main[l])
                if(this.video_main[l].video_url != ''){
                  $('#video'+l+'_content').css('background-image','url(http://cdn.9beats.com/website/admin/images/uploaded.png)')
                    // $('#video'+i+'_span').css('display','none')
                    // console.log(l,'l')
                  }
                }
              }
            })
      .catch(err=>{
        console.log("获取全部教材列表",err)
      })
    },

    add_main(){  // 增加或修改
      this.$axios({
        url: this.$linkurl.handle_video_course_resource,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
              id:this.textid,  // 0增加
              name:this.name,
              video_course_id:this.ware_id,
              video_urls:JSON.stringify(this.video_main),
              description:this.description,
              sort:this.sort,
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
              // this.video_list = res.data.data
              this.$router.push({path:'/education/courseclass'+ '?' + this.ware_id} )
            })
          .catch(err=>{
            console.log("修改失败",err)
          })
    },

    // 上传
    upload(id,_index){   // 上传
        this.$Loading.start();
        var cdnDomain = this.$linkurl.ossurl;
        var timestamp=new Date().getTime();
        if(!document.getElementById(id).files[0].name ){return false;}
        var filename = document.getElementById(id).files[0].name;
        var index = filename.lastIndexOf(".");
        var ext = filename.substr(index+1);
        var key =  id + '/' + timestamp + '.' +  ext

        if(ext!='mp4'){
          this.$Message.warning('请上传"mp4"')
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
            if(oReq.readyState == 4){
              if(oReq.status==200){ 
                for(let i = 0;i<that.video_main.length;i++){
                  if(i == _index){
                    that.video_main[_index].video_url = cdnDomain + key
                  }
                }
                  that.$Loading.finish();
                  // $('#' + id + '_content').css('background-image','url("../../../../static/img/zhanwei.png")');
                  $('#' + id + '_content').css('background-image','url(http://cdn.9beats.com/website/admin/images/uploaded.png)');
                  $('#' + id + '_span').css('display','none') 
                }else{
                  that.$Loading.error();
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
  .input_div .table_a{
    display:inline-block;
    width:80px;
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
  .edit_row_child{
    padding:0;
    margin:0;
    &:last-child{
      margin-bottom:30px;
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