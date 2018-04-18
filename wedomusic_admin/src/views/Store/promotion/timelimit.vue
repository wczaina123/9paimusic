<!--促销管理-->
<template>
  <div>

    <!-- <div class="topbox">
        <div class="content big_content">
        <div class="contentlist" @click="goods"><span class="goodslist">商品列表</span></div>
        <div class="contentlist" @click="order"><span class="orderlist">订单管理</span></div>
        <div class="contentlist" ><span class="promotion">促销管理</span></div>
        <div class="contentlist" @click="categorys"><span class="category">品类管理</span></div>
        </div>
      </div> -->
      <!--状态选择-->
     <!--  <div class="mainstyle">
        <div class="mainstyleone">
          <Select v-model="model" style="width:160px;height:30px;" @on-change='change_statue'>
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <span style="margin-left:30px;color:#287AF2;" @click="putorder('0')">
            <i class="fa fa-plus-square-o fa-lg mt-4"></i>
            新增
          </span>
        </div>
      </div> -->

<p class="home_p">
  <Select v-model="model" style="width:160px;height:30px;" @on-change='change_statue'>
    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
  </Select>
  <em class="add_jia" @click="putorder('0')">
    <i class="fa fa-plus-square-o fa-lg mt-4"></i>
    <a>新增</a>
  </em>
</p>

      <!--表格-->
      <div >
        <table class="table-list">
          <thead>
            <tr>
              <!-- <th style="display:none"></th> -->
              <th style="width:8%;">顺序</th>
              <!-- <th style="width:15%;">有效期</th> -->
              <th style="width:10%;">商品ID</th>
              <th style="width:30%;">商品名称</th>
              <th style="width:25%;">操作</th>
            </tr>
          </thead>
          <tbody>

            <tr v-for="(res,index) in list_main" :key="res.id">
              <td style="text-align:center;">{{index+1}}</td>
              <!-- <td style="text-align:center;">{{res.start_date *1000| formatDate}}至{{res.end_date*1000|formatDate}}</td>             -->
              <td style="text-align:center;">{{res.goods_id}}</td>
              <td style="text-align:center;" >{{res.name}}</td>
              <td style="text-align:center;" class="acolor">
                <a @click="putorder(res.id,res.goods_id)">修改</a>  
                <a v-if="(res.is_show==1)?true:false" @click="go_sku_list(res.goods_id)">库存管理</a>
                <a v-if="(res.is_show==1)?false:true" @click="del_goods(res.id)">删除</a>                
                <a @click="putaway(res.id,res.is_show)">{{(res.is_show==1)?"下架":'上架'}}</a>
                <a v-if="(res.is_show==1)?true:false" style="width:100px;" @click="goodslindex(res.id)">推送至商城首页</a>

              </td>
            </tr>
          </tbody>
        </table>
        <p class="table_bottom_p" @click="putorder('0')">
          <i class="fa fa-plus-square-o fa-lg mt-4" style="color:#287af2"></i>
          <span>新增</span>
        </p>
      </div>
      <!--推送至首页-->
      <Modal
      width="660"
      title="推送至商城首页"
      v-model="goodsindex"
      >
      <div slot="header" style="text-align:center;font-size:16px;padding:15px 0 15px 0;margin:0">推送至商城首页</div>    
      <div class="uplode_class">
        <div class="uplode_box">
          <form name=theform>
            <div class="modify-img-border upload-bg"  id="supplier_content" style="padding-top:100%;">
              <div class="edit-upload-plus">
                <a href="javascript:void(0);" class="upload-file" id="supplier_plus">
                  <div id="supplier_span">
                    <Icon type="images" size="52" style="color:white;"></Icon>
                    <p style="font-size: 10px;color: #7D93B2;">图片支持 jpg/png 格式，RGB模式，不超过500k</p>
                    <button class="uplode_btn">点击上传</button>  
                  </div>
                  <input type="file" name="file" id="supplier" @change="upload('supplier')">
                </a>
              </div>
            </div>
          </form>
        </div>  
      </div>

      <div slot="footer">
        <button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;" @click="table_down">取消</button>
        <button  style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;" @click="goods_lindex">确定</button>
      </div>
    </Modal>

    <!--上下架-->
    <div id="app2">
      <Modal v-model="soldout" width="376" class-name="vertical-center-modal">
        <div class="tit" style="padding-top:20px;">是否确定套餐{{soldout_name}}架</div>
        <div slot="footer" class="btns">
          <button class="btn btn1" @click="table_down">取消</button>
          <button class="btn btn2" @click="down_ok">确定</button>
        </div>
      </Modal>
    </div>
    <!--删除-->
    <div id="app2">
      <Modal v-model="del_good" width="376" class-name="vertical-center-modal">
        <div class="tit" style="padding-top:20px;">是否确定删除套餐</div>
        <div slot="footer" class="btns">
          <button class="btn btn1" @click="table_down">取消</button>
          <button class="btn btn2" @click="del_ok">确定</button>
        </div>
      </Modal>
    </div>
    <!--新增-->
    <div id="app2">
      <Modal
      width="500" v-model="goodsorder" class-name="vertical-center-modal">
      <div slot="header" style="text-align:center;font-size:16px;">新增限时促销</div>
      <div style="padding-top:20px;">
        <div style="padding:0 0 20px 20px">
          <span style="font-size: 14px;color: #363F4C;display:inline-block;width:70px;text-align:right;">商品ID:</span>
          <Input  placeholder="请输入商品ID" v-model="goods_ids" style="width: 160px"></Input>
        </div>
        <div style="margin:0 19px 20px 20px">
          <span style="font-size: 14px;color: #363F4C;display:inline-block;width:70px;text-align:right;">价格:</span>
          <Input  placeholder="请填写价格" v-model="price" style="width: 160px"></Input>
        </div>
        <!-- <div style="display:flex">
            <span style="font-size: 14px;color: #363F4C;line-height: 30px;">促销有效期：</span>
            <Row style="display:flex"> 
                <Col span="12">
                    <DatePicker type="date" placeholder="请选择起始时间" style="width: 160px;height:30px"></DatePicker>
                </Col>
                <span style="font-size: 14px;color: #363F4C; line-height: 30px;padding:0 10px 0 0">至</span>
                <Col span="12">
                    <DatePicker type="date" placeholder="请选择结束时间" style="width: 160px;height:30px"></DatePicker>
                </Col>
            </Row>  
          </div> -->
          <div style="margin:20px 19px 20px 20px" >
            <span style="display:inline-block;width:70px;text-align:right;">库存管理:</span>
            <button class="ku_cun" @click="go_sku_lists" style="width:80px;height:30px;line-height:30px;text-align:center;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;">库存管理</button>
          </div>
        </div>
        <div slot="footer">
          <button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;" @click="table_down">取消</button>
          <button  style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;" @click="add_goods">确定</button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import linkurl from '../../All-commonality/LinkUrl'
  import {formatDate} from '../../All-commonality/data'
  import {mapState,mapActions} from 'vuex'
  export default {
    data () {
      return {
        model:"0",
        cityList: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '正在促销'
        },
        {
          value: '2',
          label: '已下架'
        },
        ],
        goodsindex:false,
        goodsorder:false,
        soldout:false,
        del_good:false,
        list_main:"",
        soldout_name:'',
        soldout_id:'',
        down_id:'',
        del_id:'',
        image_url:'',
        goods_index_id:'',
        goodssku_id:'',
     price:'', // 价格
     goods_ids:'', // 商品id
     ids:'',// 促销商品id
   }
 },
 mounted(){
  $('.promotion').css({'color':'#363F4C','font-weight':'bolder'})
  this.get_list()
  this.gettoken()
},
computed:{
  ...mapState({uptoken:'uptoken'})
},
methods:{

    ...mapActions({gettoken:'get_token'}), // 拿到token
    change_statue(){  // 选择状态
      this.get_list()
    },
    go_sku_list(id){  // 查看库存管理
      this.sku_id = id
      this.$router.push({path:'/store/goods/sku'+'?'+this.sku_id})
    },
    go_sku_lists(){  // 内部看库存
      this.$router.push({path:'/store/goods/sku'+'?'+this.goodssku_id})
    },
    categorys(){
      this.$router.push({path:'/store/category'})
    },

    goods() {
      this.$router.push({ path: '/store' })
    },

    order() {
      this.$router.push({ path: '/store/order' })
    },

    table_down(){  // 关闭
      this.goodsindex = false
      this.goodsorder = false
      this.soldout = false
      this.del_good = false
    },

    add_goods(){  // 新增修改
      this.$axios({
        url: linkurl.handle_goods_time_limit,
        method: 'POST',
        data: {
          token: linkurl.token,
          id:this.ids,
          goods_id:this.goods_ids,
          price:this.price
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
        this.goodsorder = false
        this.get_list()
        this.goods_ids = ''
        this.price = ''
      })
    },


    
    putorder(id,goods_id){  // 修改
      this.ids = id
      this.goodssku_id = goods_id
      this.goodsorder=true
    },

    putaway(id,name){  // 上下架
      if(name == 1){
        this.soldout_name = '下'
        this.soldout_id = name
      }else{
        this.soldout_name = '上'
        this.soldout_id = name
      }
      this.down_id = id
      this.soldout = true
    },
    
    down_ok(){  // 上下事件
        // console.log(this.soldout_id)    
        this.$axios({
          url: linkurl.shelve_goods_time_limit,
          method: 'POST',
          data: {
            token: linkurl.token,
            id:this.down_id,
            is_shelve:(this.soldout_id==0)?1:0,
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
            // this.list_main = res.data.data
            this.soldout = false

            this.get_list()
          })
        
      },

    goodslindex(id){   // 推送到首页
      this.goodsindex=true
      this.goods_index_id = id
    },

    goods_lindex(){  // 推送到首页事件
      this.$axios({
        url: linkurl.push_goods_time_limit,
        method: 'POST',
        data: {
          token: linkurl.token,
          goods_id:this.goods_index_id,
          cover_url:this.image_url,
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
            this.goodsindex=false
            this.get_list()
          })
    },

    del_goods(id){ // 删除
      this.del_good = true
      this.del_id = id
    },
    del_ok(){  // 删除事件
      this.$axios({
        url: linkurl.delete_goods_time_limit,
        method: 'POST',
        data: {
          token: linkurl.token,
          id:this.del_id
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
        this.get_list()
      })
    },

    get_list(){  // 获取列表
      this.$axios({
        url: linkurl.get_goods_time_limit_list,
        method: 'POST',
        data: {
          token: linkurl.token,
          page:0,
          status:this.model,
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
            // console.log(res.data.data,'2222')
            this.list_main = res.data.data
          })
    },

    //  上传
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

<style scoped lang='scss'>
  @import '../../../assets/css/alert.css';
  .content_padding_delete{
    padding:0 !important;
  }
  .app {
    // 下架弹框样式
    .tit {
      text-align: center;
      font-size: 16px;
    }
    .btns {
      display: flex;
      justify-content: center;
    }
    .btns .btn {
      width: 100px;
      height: 30px;
      font-size: 14px;
      border: none;
      border-radius: 5px;
    }
    .btns .btn1 {
      background: #7D93B2;
      color: white;
    }
    .btns .btn2 {
      background: #F0B46E;
      color: white;
    }
  }


  .maintop {
    width: 100%;
    background: #DCE6F0;
    border: 1px solid #C5D1E2;
    height: 60px;
    margin-bottom: 30px;
    line-height: 60px;
    .topleft {
      float: left;
      margin: 0 20px 0 20px;
      font-size: 18px;
    }
  }

  .mainstyle {
    .mainstyleone {
      display: flex;
    }
  }

  .changestyle {
    display: flex;
    justify-content: space-between;
    border-top:0;
    border-left:0;
    a {
      line-height: 53px;
      width: 60px;
      color: #287AF2;
    }
  }

  .tablemain {
    overflow-y: scroll
  }

  .ivu-modal-header {
    .ivu-modal-header-inner {
      text-align: center;
    }
  }

  .upload {
    width: 472px;
    height: 150px;
    margin: 30px 0 30px 40px;
  }
</style>