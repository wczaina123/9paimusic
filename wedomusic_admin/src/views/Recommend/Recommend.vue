<template>
  <div>
    <div class="topbox">
      <div class="content big_content">
        <div class="contentlist order bg" @click="order">
          <span>推荐位顺序/模块</span>
        </div>
        <div class="contentlist home" @click="home" style="position:relative;">
          <span >首页推荐位管理</span>
          <p class="hide_home"><i class="icon-arrow-up icons font-2xl d-block mt-4 " style="z-index:222;color:rgb(206,206,206);position: absolute; left: 40%; bottom: -4px; background: #fff;"></i></p>
        </div>
        <div class="contentlist find" @click="find"  style="position:relative;"><span>发现推荐位管理</span>
         <p class="hide_find"><i class="icon-arrow-up icons font-2xl d-block mt-4 " style="z-index:222;color:rgb(206,206,206);position: absolute; left: 40%; bottom: -4px; background: #fff;"></i></p>
       </div>
       <div class="contentlist shopping" @click="shopping" style="position:relative;"><span>商城推荐位管理</span>
       <p class="hide_shop"><i class="icon-arrow-up icons font-2xl d-block mt-4" style="z-index:222;color:rgb(206,206,206);position: absolute; left: 40%; bottom: -4px; background: #fff;"></i></p>
     </div>
   </div>
 </div>
 <br>
 <order v-show="tech"></order>
</div>
</template>

<script>
import order from "./order";//推荐位管理/推荐位顺序 模块


export default {
  components: { order },
  name: "dashboard",
  data() {
    return {
      style: 'light',
      tech: true,
      tetbook: false,
      mst: false,
      cos: false,
    }
  },
  methods: {
    order() {
      $(".order").addClass("bg").siblings().removeClass("bg");
      $(".order").siblings().find("p").removeClass("show");
      this.tech = true
      this.mst = false
      this.tetbook = false
      this.cos = false
    },
    home() {
      this.$router.push({path:'/recommend/index'})
    },
    find() {
      this.$router.push({path:'/recommend/find'})
    },
    shopping() {
      this.$router.push({path:'/recommend/shop'})
    },
  },
}
</script>
<style lang="scss" scoped>
  @import '../../assets/css/index.scss';
  .hide_home,.hide_find,.hide_shop{
    display:none;
  }
  .show{
    display:block;
  }
  .big_content{
    position:relative;
    /*height:80px;*/
    overflow: hidden;
  }
  .small_box{
    position:absolute;
    left:100px;
    bottom:-30px;
    z-index:11;
    .small{
      width:40px;
      height:40px;
      transform:rotate(45deg);
    }
  }
 /*点击切换的颜色*/
  .bg{
    color:#363F4C !important;
    font-weight:bolder !important;
  }
  @media screen and(max-width:510px) {
    .ivu-menu-light {
      background: #fff;
    }
    .ivu-menu-horizontal {
      line-height: 60px;
    }
  }
</style>
