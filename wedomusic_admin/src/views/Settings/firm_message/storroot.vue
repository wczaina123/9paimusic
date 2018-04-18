<!--商城授权管理-->
<template>

  <div style="width:100%;">
      <p class="home_p">
        <Select v-model="txtbook" style="width:160px !important;" @on-change="change">
            <Option v-for="item in goodsist" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <em class="add_jia" v-if="icon_chaneg" @click="add('0')">
          <i class="fa fa-plus-square-o fa-lg mt-4"></i>
          <a>新增</a>
        </em>
       <em class="add_jia" v-else @click="adds('0')">
         <i class="fa fa-plus-square-o fa-lg mt-4"></i>
         <a>新增</a>
       </em>
      </p>
      <!--品牌-->
      <div class="tablebox" v-if="goods">
        <table class="table-list">
          <thead>
            <tr>
              <th style="width:15%;">序号</th>
              <th style="width:25%;">品牌</th>
              <th style="width:35%;">有效期</th>
              <th >操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(res,index) in icon_list" :key="res.id">
              <td style="text-align:center;">{{index+1}}</td>
              <td style="text-align:center;">{{res.name}}</td>
              <td style="text-align:center;">{{res.start_date *1000 | formatDate}}至{{res.end_date*1000 | formatDate}}</td>
              <td style="text-align: center;" class="acolor">
                <a @click="add(res.id)">详情</a>  
                <!-- <a style="margin-left:6px;" >续期</a> -->
              </td>
            </tr>
            
          </tbody>
        </table>
      </div>
      <!--供应商-->
      <div class="tablebox" v-if="supplier">
        <table class="table-list">
          <thead>
            <tr>
              <!-- <th style="display:none"></th> -->
              <th style="width:15%;">序号</th>
              <th style="width:25%;">供应商</th>
              <th style="width:35%;">有效期</th>
              <th >操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(res,index) in suppliers" :key="res.id">
              <td style="text-align:center;">{{index+1}}</td>
              <td style="text-align:center;">{{res.name}}</td>
              <td style="text-align:center;">{{res.start_date *1000 | formatDate}}至{{res.end_date*1000 | formatDate}}</td>
              <td style="text-align: center;" class="acolor">
                <a @click="adds(res.id)">详情</a>  
                <!-- <a style="margin-left:6px;" >续期</a> -->
              </td>
            </tr>
            
          </tbody>
        </table>
      </div>
      <!--品牌弹框-->
      <Modal width="600" v-model="goodsindex">
        <div slot="header" style="text-align:center;font-size:16px;margin:0">品牌授权管理</div>    

        <div class="setting_money">
          <span style="padding-left:54px;">名称：</span>
          <Input  placeholder="请输入品牌名称" style="width: 160px" v-model="name"></Input>
        </div>
        <div class="setting_time">
          <span style="padding-left:14px;">促销有效期：</span>
          <div>
            <DatePicker type="date" v-model="start_date" placeholder="开始日期"  style="width: 160px"></DatePicker>
          </div>
          <span class="time_span">至</span>
          <div>
            <DatePicker type="date" v-model="end_date" placeholder="结束日期" style="width: 160px" ></DatePicker>
          </div>
        </div>

        <div class="uplode_class">
          <span style="padding-left:11px;width:20%;">销售许可证：</span>
          <div class="uplode_box" style="margin-left:-15px;">
            <form name=theform style="background:#f6f6f6;width:300px;">
              <div class="modify-img-border upload-bg"  id="textbook_home_content" style="padding-top:100%;">
                <div class="edit-upload-plus">
                  <a href="javascript:void(0);" class="upload-file" id="textbook_home_plus" >
                    <div id="textbook_home_span" style="margin-top:30px;">
                      <Icon type="images" size="52" style="color:white;"></Icon>
                      <p style="font-size: 10px;color: #7D93B2;">图片支持 jpg/png 格式，RGB模式，不超过500k</p>
                      <button class="uplode_btn">点击上传</button>  
                    </div>
                    <input type="file" name="file" id="textbook_home" @change="upload('textbook_home')">
                  </a>
                </div>
              </div>
            </form>
          </div>  
        </div>

        <div slot="footer">
          <button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;" @click="clear">取消</button>
          <button  style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;" @click="not_nulls">确定</button>
        </div>

    </Modal>

    <!--供应商-->
    <Modal width="600" v-model="goods_supplier">
      <div slot="header" style="text-align:center;font-size:16px;padding:15px 0 15px 0;margin:0">供应商授权管理</div>    
      <div class="setting_money">
        <span style="padding-left:54px;">名称：</span>
        <Input  placeholder="请输入品牌名称" style="width: 300px" v-model="name"></Input>
      </div>
      <div class="setting_time">
        <span style="padding-left:14px;">促销有效期：</span>
        <div>
          <DatePicker type="date" v-model="start_date" placeholder="开始日期"  style="width: 200px" ></DatePicker>
        </div>
        <span class="time_span">至</span>
        <div>
          <DatePicker type="date" v-model="end_date" placeholder="结束日期" style="width: 200px" ></DatePicker>
        </div>
      </div>

      <div class="uplode_class">
        <span style="padding-left:11px;width:20%;">销售许可证：</span>
        <div class="uplode_box">
          <form name=theform  style="background:#f6f6f6;width:300px;">
            <div class="modify-img-border upload-bg"  id="supplier_content" style="padding-top:100%;">
              <div class="edit-upload-plus">
                <a class="upload-file" id="supplier_plus">
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
        <button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;" @click="clear">取消</button>
        <button  style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;" @click="not_null">确定</button>
      </div>    

    </Modal>


</div>

</template>

<script>
  import {formatDate} from '../../All-commonality/data'
  import {mapState,mapActions} from 'vuex'

  export default {
    data(){
      return{
        icon_chaneg:true,
        goodsindex:false,
        supplier:false,
        goods_supplier:false,
        goods_supplier_id:"",
        goods:true,
        goodsist:[
        {
          value:1,
          label:"品牌授权管理"
        },
        {
          value:2,
          label:"供应商授权管理"
        },
        ],
        txtbook:1,
        icon_list:"",
        suppliers:"",

        // 弹框
        name:"",
        image_url:"",
        start_date:Number,
        end_date:Number,
        goods_id:"",
        }
      },
      mounted(){
        this.getosstoken()
        this.get_goods_list()
        this.get_list()

      },
      computed:{
        ...mapState({uptoken:'uptoken'})
      },
      methods:{
      // 公共
      change(){   // 切换供应商与品牌
        if(this.txtbook == 1){
          this.goods = true
          this.supplier = false
          this.icon_chaneg = true
        }
        if(this.txtbook == 2){
          this.goods = false
          this.supplier = true
          this.icon_chaneg = false
        }
      },

      // 供应商
      get_goods_list(){  // 商品列表
        this.$axios({
          url: this.$linkurl.get_supplier_list,
          method: 'POST',
          data: {
            token: localStorage.getItem('token')
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
            this.suppliers = res.data.data
          })
        .catch(err=>{
          console.log("获取商品列表",err)
        })
      },

      

      adds(id){
        this.name = ""
        this.start_date = Number  
        this.end_date = Number
        this.supplier_img = ''
        $('#supplier_content').css('background-image','url("")')
        this.goods_supplier = true
        if(id != '0'){
          let _id = id
          this.goods_supplier_id = id
          this.supplier_main(_id)
        }else{
          this.goods_supplier_id = 0
        }
      },

      not_null(){  // 判断品牌
        if(this.name==''){
          this.$Message.warning('名称不能为空')
        }else if(this.start_date==''){
          this.$Message.warning('时间不能为空')
        }else if(this.end_date==''){
          this.$Message.warning('时间不能为空')
        }else if(this.supplier_img==''){
          this.$Message.warning('图片不能为空')
        }else{
          this.add_supplier()
        }
      },

      add_supplier(){   // 新增品牌
        this.$axios({
          url: this.$linkurl.handle_supplier,
          method: 'POST',
          data: {
            token: localStorage.getItem('token'),
            id:this.goods_supplier_id,
            name:this.name,
            image_url:this.supplier_img,
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
          this.goods_supplier = false
          this.get_goods_list()
          this.name = ""
          this.supplier_img = ""
          this.start_date = ""
          this.end_date = ""
          $('#supplier_content').css('background-image','url("")')
          $('#supplier_span').css('display','block')

        })
        .catch(err=>{
          console.log("新增品牌失败",err)
        })
      },

      supplier_main(id){ // 品牌详情
        this.$axios({
          url: this.$linkurl.get_supplier_detail,
          method: 'POST',
          data: {
            token: localStorage.getItem('token'),
            id:id,
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
          this.name = i.name
          this.start_date = i.start_date*1000
          this.end_date = i.end_date*1000
          this.supplier_img = i.image_url
          $('#supplier_content').css('background-image','url("'+this.supplier_img+'")')


        })
        .catch(err=>{
          console.log("获取详情失败",err)
        })

      },

      // 品牌
      
      add(id){   // 打开新增
        this.name = ""
        this.start_date = ""
        this.end_date = ""
        this.image_url = ''
        $('#textbook_home_content').css('background-image','url("")')
        this.goodsindex = true
        if(id != '0'){
          let _id = id
          this.goods_id = id
          this.see_main(_id)
        }else{
          this.goods_id = 0
        }

      },

      clear(){
        this.goodsindex = false
        this.goods_supplier = false
      },

      see_main(id){ // 品牌详情
        this.$axios({
          url: this.$linkurl.get_brand_detail,
          method: 'POST',
          data: {
            token: localStorage.getItem('token'),
            id:id,
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
          this.name = i.name
          this.start_date = i.start_date*1000
          this.end_date = i.end_date*1000
          this.image_url = i.image_url
          $('#textbook_home_content').css('background-image','url("'+this.image_url+'")')


        })
        .catch(err=>{
          console.log("获取详情失败",err)
        })

      },

      not_nulls(){  // 判断品牌
        if(this.name==''){
          this.$Message.warning('名称不能为空')
        }else if(this.start_date==''){
          this.$Message.warning('时间不能为空')
        }else if(this.end_date==''){
          this.$Message.warning('时间不能为空')
        }else if(this.image_url==''){
          this.$Message.warning('图片不能为空')
        }else{
          this.add_icon()
        }
      },
      

      add_icon(){   // 新增品牌
        this.$axios({
          url: this.$linkurl.handle_brand,
          method: 'POST',
          data: {
            token: localStorage.getItem('token'),
            id:this.goods_id,
            name:this.name,
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
          this.goodsindex = false
          this.get_list()
          this.name = ""
          this.image_url = ""
          this.start_date = ""
          this.end_date = ""
          $('#textbook_home_content').css('background-image','url("")')
          $('#textbook_home_span').css('display','block')

        })
        .catch(err=>{
          console.log("获取列表",err)
        })

      },

      get_list(){  // 商品列表
        this.$axios({
          url: this.$linkurl.get_brand_list,
          method: 'POST',
          data: {
            token: localStorage.getItem('token'),
            // page:1
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
            this.icon_list = res.data.data
          })
        .catch(err=>{
          console.log("获取列表",err)
        })
      },

      // 上传
      ...mapActions({getosstoken:'get_token'}),  // 获取oss token

      upload(id){   
        var cdnDomain = 'http://cdn.9beats.com/';
        var timestamp=new Date().getTime();
        if(!document.getElementById(id).files[0].name ){return false;}
        var filename = document.getElementById(id).files[0].name;
        var index = filename.lastIndexOf(".");
        var indexname =  filename.substr(0,index)
        var ext = filename.substr(index+1);
        var key =  id + '/' + timestamp + '.' +  ext
        // var key = 'music/' + 'a' + '.' + ext;

        if(id.substr(0,5) == 'video'){
          key =  'video/' + timestamp 
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
          // console.log(oReq.status)
          if(oReq.readyState == 4){
            if(oReq.status==200){ 
              if(id == 'supplier'){
                that.supplier_img = cdnDomain + key
                $('#' + id + '_content').css('background-image','url("'+ that.supplier_img +'")');
                $('#' + id + '_span').css('display','none')
              }
              if(id == 'textbook_home'){
                that.image_url = cdnDomain + key;
                $('#' + id + '_content').css('background-image','url("'+ that.image_url +'")');
                $('#' + id + '_span').css('display','none')
              }

            }else{
              that.$Message.config({top:50})
              that.$Message.warning('上传失败');
            }
          }
        };
      },
    } ,
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd');
      }
    }
  }
</script>
<style lang="scss" scoped>
@import '../../../assets/css/alert.css';
  .uplode_class{
    font-size: 14px;
    padding: 20px 0;
    display: flex;
    .uplode_box{
      width: 60%;
      height: 50%;
      border: none;
      .uplode_btn{
        width: 120px;
        height: 30px;
        background:#F0B46E;
        color: white;
        border: none;
        margin-top:10px;
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
    padding-bottom:30px; 
  }
  .setting_time{
    display: flex;
    .time_span{
      margin: 0 10px;
    }
    span{
      font-size: 14px;
      margin:5px 0; 
    }
  }

  #textbook_home{
    width: 100%;
  }


</style>

