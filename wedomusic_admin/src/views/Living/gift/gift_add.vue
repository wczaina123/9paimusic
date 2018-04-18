<!--增加礼物-->
<template>
  <div>
   <p class="line_p">
    <a href="javascript:;" @click="exit">礼物管理</a>&gt;
    <a href="javascript:;">编辑礼物</a>
  </p>

  <div class="content content_model content_model_add" style="margin-bottom:30px;">
    <p class="home_text">新增礼物</p>
    <div class="input_div" style="margin-top:30px;">
      <a class="table_a">名称:</a>
      <Input style="width: 300px" placeholder="请输入礼物名称" ng-model="formData.name"></Input>
    </div>
    <div class="input_div">
      <a class="table_a">价格:</a>
      <Input style="width: 300px" placeholder="请输入礼物价格，单位：金币" ng-model="formData.price"></Input>
    </div>
    <div class="input_div">
      <a class="table_a">安卓横屏参数:</a>
      <Input style="width: 300px" placeholder="请输入安卓横屏配置参数" ng-model="formData.h_android_config"></Input>
    </div>
    <div class="input_div">
      <a class="table_a">安卓竖屏参数:</a>
      <Input style="width: 300px" placeholder="请输入安卓竖屏配置参数" ng-model="formData.v_android_config"></Input>
    </div>
    <div class="input_div">
      <a class="table_a">iOS横屏参数:</a>
      <Input style="width: 300px" placeholder="请输入iOS横屏配置参数" ng-model="formData.h_ios_config"></Input>
    </div>
    <div class="input_div">
      <a class="table_a">iOS竖屏参数:</a>
      <Input style="width: 300px" placeholder="请输入iOS竖屏配置参数" ng-model="formData.v_ios_config"></Input>
    </div>
    <div class="input_div">
      <a class="table_a">使用状态:</a>
      <div style="float:left;height:30px;width:50%;"  @click='test'>
        <i-switch  size="large" v-model='change'>
        <span slot="open" >开启</span>
        <span slot="close" >关闭</span>
      </i-switch>
    </div>
  </div>
  <div class="input_div">
    <a class="table_a">上传缩略图:</a>
    <form style="width:300px;background:#f6f6f6;margin-left:135px;">
      <div class="live_img_box">
        <a class="live_img_main">
          <span class="fa fa-plus"></span>
          <input type="file" name="file" id="">
        </a>
      </div>
    </form>
  </div>
  <div class="input_div">
    <a class="table_a">上传横屏礼物压缩包:</a>
    <form style="width:300px;background:#f6f6f6;margin-left:135px;">
     <div class="live_img_box">
       <a class="live_img_main">
         <span class="fa fa-plus"></span>
         <input type="file" name="file" id="">
       </a>
     </div>
   </form>
 </div>
 <div class="input_div" style="margin-bottom:30px;">
  <a class="table_a">上传竖屏礼物压缩包:</a>
  <form style="width:300px;background:#f6f6f6;margin-left:135px;">
   <div class="live_img_box">
    <a class="live_img_main">
      <span class="fa fa-plus"></span>
      <input type="file" name="file" id="">
    </a>
  </div>
</form>
</div>
<div style="position:absolute;right:70px;margin:-10px 0 0 0 ;">
  <button @click="exit" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;margin-right:20px;">取消</button>
  <button ng-click="processForm()" ng-disabled="submitDisabled" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
</div>
</div>
<!-- <div id="myboxstyle">
  <div class="edit-title">编辑礼物</div>
  <div class="edit-title-return"><a href="#/gift" class="icon-close"></a></div>
  <div class="edit-row">
    <input type="text" placeholder="请输入礼物名称" ng-model="formData.name" style="width:100%;">
  </div>
  <div class="edit-row">
    <input type="text" placeholder="请输入礼物价格，单位：金币" ng-model="formData.price">
  </div>
  <div class="edit-row">
    <input type="text" placeholder="请输入安卓横屏配置参数" ng-model="formData.h_android_config">
  </div>
  <div class="edit-row">
    <input type="text" placeholder="请输入安卓竖屏配置参数" ng-model="formData.v_android_config">
  </div>
  <div class="edit-row">
    <input type="text" placeholder="请输入iOS横屏配置参数" ng-model="formData.h_ios_config">
  </div>
  <div class="edit-row">
    <input type="text" placeholder="请输入iOS竖屏配置参数" ng-model="formData.v_ios_config">
  </div>
  <div class="edit-row">
    <div style="display:flex">
      <div class="control-label gift-edit-status">使用状态：</div>
      <div style="float:left;height:50px;width:50%;"  @click='test'>
        <i-switch  size="large" v-model='change'>
        <span slot="open" >开启</span>
        <span slot="close" >关闭</span>
      </i-switch>
    </div>
  </div>
</div>
<div>
  <div>
    <div>上传缩略图</div>
    <form>
      <div class="live_img_box">
        <a class="live_img_main">
          <span class="fa fa-plus"></span>
          <input type="file" name="file" id="">
        </a>
      </div>
    </form>
  </div>
  <div>
    <div>上传横屏礼物压缩包</div>
    <form>
      <div class="live_img_box">
        <a class="live_img_main">
          <span class="fa fa-plus"></span>
          <input type="file" name="file" id="">
        </a>
      </div>
    </form>
  </div>
  <div>
    <div>上传竖屏礼物压缩包</div>
    <form>
      <div class="live_img_box">
        <a class="live_img_main">
          <span class="fa fa-plus"></span>
          <input type="file" name="file" id="">
        </a>
      </div>
    </form>
  </div>
</div>
<div class="edit-row">
  <button type="button" class="btn btn-block button-default " ng-click="processForm()" ng-disabled="submitDisabled">提交</button>
</div>
</div> -->
<div class="col-md-2 col-sm-2 col-xs-2 col-lg-2"></div>
<div class="clearboth"></div>
</div>
</template>

<script>

  export default {
    data(){
      return{
        change:true,
      }
    },
    methods:{
    exit() {  // 退出
      this.$router.push({ path: '/living' })
    },
    test(){
      console.log(this.change)
    },
  },
  
}
</script>

<style scoped lang='scss'>
 @import '../../../assets/css/input_style.scss';
 @import '../../../assets/css/alert.css';
 .input_div .table_a{
  display:inline-block;
  width:130px;
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
.live_img_box{
  width: 100%;
  height: 200px;
  position: relative;
  .live_img_main{
    cursor:pointer;
    span{
      position: absolute;
      top: 82px; 
      left: 50%;               
      // margin-left:-30%; 
      font-size: 30px;


    }
    input{
      position: absolute;
      left: 0;
      top: 82px;
      opacity: 0;
      height: 40px;
      cursor:pointer;
    }
  }
}

</style>

