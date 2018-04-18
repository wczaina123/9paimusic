<template>
  <div>
    <div class="topbox">
      <div class="content big_content">
        <div class="contentlist Verification bg" @click="Verification"><span >校区验证码管理</span></div>
        <div class="contentlist management" @click="management"><span >校区管理</span></div>
      </div>
    </div>
    <br>
    <Verification v-show="tech"></Verification>
    <management v-show="mst"></management>
  </div>
</template>

<script>
import Verification from "./campus_in/Verification_code";//校区/师资管理/校区验证码管理
import management from './campus_in/campus_management'; //校区/师资管理/师资管理

export default {
  components: { Verification, management},
  name: "dashboard",
  data() {
    return {
      style: 'light',
      tech: true,
      mst: false,
    }
  },
  methods: {
    Verification() {
      $(".Verification").addClass("bg").siblings().removeClass("bg");
      this.tech = true
      this.mst = false
    },
    management() {
      $(".management").addClass("bg").siblings().removeClass("bg");
      this.tech = false
      this.mst = true
    },
  },
}
</script>
<style lang="scss" scoped>
  @import '../../assets/css/index.scss';
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
