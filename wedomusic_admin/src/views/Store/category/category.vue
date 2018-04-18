<!--品类管理-->
<template>
  <div>
    <!--头部导航-->
    <div class="topbox">
      <div class="content big_content content_padding_delete">
        <div class="contentlist" @click="goods"><span class="goodslist">商品列表</span></div>
        <div class="contentlist" @click="order"><span class="orderlist">订单管理</span></div>
        <div class="contentlist" @click="pro"><span class="promotion">促销管理</span></div>
        <div class="contentlist" @click="categorys"><span class="category">品类管理</span></div>
        <!-- <div class="contentlist" @click="excile"><span class="promotion">报表</span></div>       -->
      </div>
    </div>
    <!--底部内容-->
    <div class="mainbox" style="margin:30px 0">
        <!-- <div class="maintop-one">
            <span>品类管理</span>
          </div> -->
          <p class="home_text">品类管理</p>
          <p class="home_p">
            <em class="add_jia delete_padding" @click="add_father('0')">
              <i class="fa fa-plus-square-o fa-lg mt-4"></i>
              <a>新增</a>
            </em>
            <span class="add_list">
              <i class="fa fa-exclamation-circle fa-lg mt-4"></i>
              <a>至多添加五个分类 每个分类可添加五个子分类，拖拽可以排序分类</a>
            </span>
          </p>
          <!--表格-->
          <div>
            <table class="table-list">
              <thead>
                <tr>
                  <th style="width:25%;">项目名称</th>
                  <th style="width:25%;">图标</th>
                  <th style="width:25%;">子分类数</th>
                  <th style="width:25%;">操作</th>
                </tr>
              </thead>
              <tbody v-for="(res,index) in list_main" :key="res.id">
                <tr >
                  <td style="text-align:center;"   @click="open_child(index)">
                    <Icon type="arrow-right-b" class="icon_style" v-if="!res.flag"></Icon>
                    <Icon type="arrow-down-b" v-else></Icon>
                    <span>{{res.name}}</span>
                  </td>


                  <td style="text-align:center;"><img :src="res.cover_url"></td>
                  <td style="text-align:center;">{{res.sub.length}}</td>
                  <td style="text-align:center;" class="acolor">
                    <a @click="add_father(res.id)">修改</a>
                    <a @click="del_chang_child(res.id)">删除</a>
                  </td>
                </tr>
                <!--子项-->  
                <div >
                  <tr  class="child_table" v-for="ress in res.sub" :key="ress.id" v-if="res.flag">
                    <td style="text-align:center; border-right: none;" >{{ress.name}}</td>
                    <td style="text-align:center;border-left: none;" class="acolor">
                      <a @click="show_child(res.id,ress.id)">修改</a>
                      <a @click="del_chang_child(ress.id)">删除</a>
                    </td>
                  </tr>
                  <p @click="show_child(res.id,'0')" class="table_bottom_p" v-for="ress in (res.sub,1)" :key="ress.id" v-if="res.flag" >
                    <i class="fa fa-plus-circle fa-lg mt-4"></i>
                    <span>新增</span>
                  </p>
                </div>

              </tbody>


            </table>
            
          </div>
        </div>

        <!--子弹框-->
        <div class="app1">
          <Modal v-model="soldout" width="376" class-name="vertical-center-modal">
            <div slot="header" style="text-align:center;font-size:16px;margin:0">新增子类</div>
            <div class="child_main">

              <Input class="up_inp" v-model="child_name" placeholder="输入教学品类名称" style="width: 300px"></Input>
            </div>

            <div slot="footer" class="btns">
              <button class="btn btn1" @click="cancel">取消</button>
              <button class="btn btn2" @click="chang_child">确定</button>
            </div>
          </Modal>
        </div>

        <!--父类弹框-->
        <div class="app1">
          <Modal v-model="father" width="500" class-name="vertical-center-modal">
            <div slot="header" style="text-align:center;font-size:16px;margin:0">添加类目</div>
            <div class="father_main">
              <div class="uplode_class">
                <div class="uplode_box">
                  <form name=theform>
                    <div class="modify-img-border upload-bg"  id="supplier_content" style="padding-top:100%;background:#f6f6f6;">
                      <div class="edit-upload-plus">
                        <a href="javascript:void(0);" class="upload-file" id="supplier_plus">
                          <div id="supplier_span" style="margin-top:20px;">
                            <Icon type="images" size="52" style="color:white;"></Icon>
                            <p style="font-size: 10px;color: #7D93B2;">图片支持 jpg/png 格式，RGB模式，不超过500k</p>
                            <button class="uplode_btn" style="margin-top:20px;">点击上传</button>  
                          </div>
                          <input type="file" name="file" id="supplier" @change="upload('supplier')">
                        </a>
                      </div>
                    </div>
                  </form>
                </div> 
              </div>
              <div>
                <div style="display:inline-block;">类目名称：</div><Input class="up_inp" v-model="father_name" placeholder="请输入类目名称" style="width: 160px"></Input>
              </div>
            </div>
            
            <div slot="footer" class="btns">
              <button class="btn btn1" @click="cancel">取消</button>
              <button class="btn btn2" @click="chang_father">确定</button>
            </div>
          </Modal>
        </div>

      </div>
    </template>

    <script>
      import linkurl from '../../All-commonality/LinkUrl'

      export default {
        data () {
          return {
      soldout:false,  // 子类弹框
      father:false,
      list_main:'',
      child_name:'',
      father_name:'',
      fa_id:"",
      ch_id:'',
      ch_ids:'',
      cover_url:"",
    }
  },
  mounted(){
    $('.category').css({'color':'#363F4C','font-weight':'bolder'})
    this.getosstoken()
    this.get_list()
  },
  methods:{
    cancel(){
      this.soldout = false
      this.father = false
    },
    show_child(id,ids){  // 子弹框
      this.child_name = ''
      this.ch_id = id
      this.ch_ids = ids
      this.soldout = true
      if(id != 0){
            // this.get_main(id)
          }
        },
    add_father(id){  // 父弹框
      this.cover_url = ''
      $('#supplier_content').css('background-image','url("'+this.cover_url+'")')
      this.father_name = ''
      this.fa_id = id
      this.father = true
      if(id != 0){
        this.get_main(id)
      }

    },
    goods(){
      this.$router.push({path:'/store'})
    },
    order(){
      this.$router.push({path:'/store/order'})
    },
    pro(){
      this.$router.push({path:'/store/timelimit'})
    },
    categorys(){
      this.$router.push({path:'/store/category'})
    },

    open_child(id){  // 开
      this.list_main[id].flag = !this.list_main[id].flag;
    },


    
    chang_child(){  // 修改子类
      this.$axios({
        url: linkurl.handle_goods_category,
        method: 'POST',
        data: {
          token: linkurl.token,
          id:this.ch_ids,
          name:this.child_name,
          pid:this.ch_id,
          cover_url:"",
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(res=>{
            // console.log(res.data.data)
            this.soldout = false
            this.get_list()
            this.child_name = ''
          })
      .catch(err=>{
        console.log("获取分类列表失败",err)
      })
    },

    del_chang_child(id){  // 删除
      this.$axios({
        url: linkurl.delete_goods_category,
        method: 'POST',
        data: {
          token: linkurl.token,
          id:id,

        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(res=>{
        this.get_list()
      })
      .catch(err=>{
        console.log("获取分类列表失败",err)
      })
    },

    get_main(id){  // 详情

      this.$axios({
        url: linkurl.get_goods_category_detail,
        method: 'POST',
        data: {
          token: linkurl.token,
          id:id,
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(res=>{
            // console.log(res.data.data)
            this.cover_url = res.data.data.cover_url
            this.father_name = res.data.data.name
            this.child_name = res.data.data.name
            $('#supplier_content').css('background-image','url("'+this.cover_url+'")')
          })
      .catch(err=>{
        console.log("获取分类列表失败",err)
      })
    },

    chang_father(){   // 修改父类
      this.$axios({
        url: linkurl.handle_goods_category,
        method: 'POST',
        data: {
          token: linkurl.token,
          id:this.fa_id,
          name:this.father_name,
          pid:0,
          cover_url:this.cover_url,
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(res=>{
            // console.log(res.data.data)
            this.father = false
            this.get_list()
            this.father_name = ''
          })
      .catch(err=>{
        console.log("获取分类列表失败",err)
      })
    },

    get_list(){  // 获取列表
      this.$axios({
        url: linkurl.get_goods_category_list,
        method: 'POST',
        data: {
          token: linkurl.token,
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(res=>{
            // console.log(res.data.data)
            let lmitem = res.data.data;
            lmitem.forEach(item => {
              item.flag = false;
            });
            this.list_main = lmitem;
          })
      .catch(err=>{
        console.log("获取分类列表失败",err)
      })
    },

    // 上传
    getosstoken(){    // 获取osstoken
      this.$axios({
        url: linkurl.getosstoken,
        method: 'get',
        data: {},
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(res=>{
        this.uptoken = res.data
      })
      .catch(err=>{
        console.log(err,'获osstoken失败')
      }) 
    },

    upload(id){   // 上传1
      var cdnDomain = 'http://cdn.9beats.com/';
      var timestamp=new Date().getTime();
      var filename = document.getElementById(id).files[0].name;
      var index = filename.lastIndexOf(".");
      var indexname =  filename.substr(0,index)
      var ext = filename.substr(index+1);
      var key =  id + '/' + timestamp + '.' +  ext

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
              that.cover_url = cdnDomain + key
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
  @import '../../../assets/css/alert.css';

  .father_main{
    margin: 0 auto;
    text-align: center;
  }
  .child_main{
    margin: 0 auto;
    text-align: center;
    .up_inp{
      padding-top:15px; 
    }
  }
  .uplode_class{
    font-size: 14px;
    padding:0 0 15px 0;
    // display: flex;
    .uplode_box{
      width: 60%;
      height: 50%;
      background: #D8D8D8;
      border: none;
      margin: 0 auto;
      // text-align: center;
      .uplode_btn{
        width: 100px;
        height: 30px;
        background:#F0B46E;
        color: white;
        border: none;

      }
    }
  }
  .btns{
    display: block;
  }

  .table_bottom_p {
   // 新增一行的样式样式
   width: 400%;
   height: 60px;
   line-height: 60px;
   text-align: center;
   border-top: 0;
   padding: 0;margin: 0;
   //  cursor: pointer;
   span {
     color: #287af2;
     vertical-align: middle;
     font-size: 14px;
     margin-left: 5px;
   }
 }

 .changestyle{
  display: flex;
  justify-content:space-around;
  a{

    line-height: 53px;
    width: 53px;
    color:#287AF2 ;
  }
}

.table-list{
  .child_table{
    display: block;
    width: 400%;
    td{
      border-top: none;
      line-height: 60px;
      width: 3%;
    }
  }


}



</style>