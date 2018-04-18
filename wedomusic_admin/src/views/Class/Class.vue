<template>
  <div>
    <div class="topbox">
      <div class="content big_content">
        <div class="contentlist theclass bg" @click="theclass">
          <span>班级管理</span>
        </div>
        <div class="contentlist classroom" @click="classroom">
          <span>教室管理</span>
        </div>
      </div>
    </div>
    <br>
    <theclass v-show="tech"></theclass>
    <classroom v-show="mst"></classroom>
  </div>
</template>

<script>
import theclass from './class_in/theclass';//班级管理/班级管理
import classroom from './class_in/classroom'; //班级管理/教室管理

export default {
  components: { theclass,classroom },
  name: "dashboard",
  data() {
    return {
      style: 'light',
      tech: true,
      mst: false,
    }
  },
  methods: {
    theclass() {
      $(".theclass").addClass("bg").siblings().removeClass("bg");
      this.tech = true
      this.mst = false
    },

    classroom() {
      $(".classroom").addClass("bg").siblings().removeClass("bg");
      this.tech = false
      this.mst = true
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
