<template>
  <div>
    <div class="topbox">
      <div class="content big_content">
        <!-- <div class="contentlist Activity " @click="Activity">
          <span>会员活动管理</span>
        </div> -->
        <div class="contentlist Money bg" @click="Money">
          <span>会员价格管理</span>
        </div>
        <div class="contentlist Permissions " @click="Permissions">
          <span>会员权限管理</span>
        </div>
      </div>
    </div>
    <br>
    <Activity v-show="mst"></Activity>
    <Money v-show="mon"></Money>
    <Permissions v-show="tech"></Permissions>
  </div>
</template>

<script>
import Activity from './Vip_in/vip_activity'; //会员管理/活动管理
import Money from './Vip_in/vip_money';//会员管理/价格管理
import Permissions from "./Vip_in/vip_permissions";//会员管理/权限管理
export default {
  components: { Activity, Permissions, Money },
  name: "dashboard",
  data() {
    return {
      style: 'light',
      // tech: false,
      // mst: true,
      // mon: false,
      mon:true,
      tech:false,
      mst:false,
    }
  },
  methods: {
    Activity() {
      $(".Activity").addClass("bg").siblings().removeClass("bg");
      this.mst = true
      this.tech = false
      this.mon = false
    },
    Money() {
      $(".Money").addClass("bg").siblings().removeClass("bg");
      this.mon = true
      this.tech = false
      this.mst = false
    },
    Permissions() {
      $(".Permissions").addClass("bg").siblings().removeClass("bg");
      this.tech = true
      this.mst = false
      this.mon = false
    },

  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/alert.css';
@import '../../assets/css/index.scss';
.big_content {
  position: relative;
  /*height:80px;*/
  overflow: hidden;
}

.small_box {
  position: absolute;
  left: 100px;
  bottom: -30px;
  z-index: 11;
  .small {
    width: 40px;
    height: 40px;
    transform: rotate(45deg);
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
