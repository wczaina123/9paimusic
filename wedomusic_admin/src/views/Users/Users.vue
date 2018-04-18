<template>
  <div>
    <div class="topbox">
      <div class="content big_content">
        <div class="contentlist Teachers bg" @click="Teachers">
          <span>教师管理</span>
        </div>
        <div class="contentlist Students" @click="Students">
          <span>学生管理</span>
        </div>
        
  <div class="contentlist Blacklist" @click="Blacklist">
    <span>黑名单管理</span>
  </div>

      </div>
    </div>
    <br>
    <Teachers v-show="tech"></Teachers>
    <Students v-show="mst"></Students>
    <Blacklist v-show="black"></Blacklist>
  </div>
</template>

<script>
import Teachers from "./user_in/Teachers_management";//用户管理/教师管理
import Students from './user_in/Students_management'; //用户管理/学生管理
import Blacklist from './user_in/Blacklist'; //用户管理/黑名单管理

export default {
  components: { Teachers, Students,Blacklist },
  name: "dashboard",
  data() {
    return {
      style: 'light',
      tech: true,
      mst: false,
      black:false,

    }
  },
  methods: {
    Teachers() {
      $(".Teachers").addClass("bg").siblings().removeClass("bg");
      this.tech = true
      this.mst = false
       this.black=false
    },

    Students() {
      $(".Students").addClass("bg").siblings().removeClass("bg");
      this.mst = true
      this.tech = false
       this.black=false      
    },
     Blacklist() {
      $(".Blacklist").addClass("bg").siblings().removeClass("bg");
       this.black=true    
      this.tech = false
      this.mst = false
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
