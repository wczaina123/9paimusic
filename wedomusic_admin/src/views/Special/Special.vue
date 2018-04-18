<template>
  <div>
    <div class="topbox">
      <div class="content big_content content_padding_delete">
        <div class="contentlist order bg" @click="column"><span>名师专栏</span></div>
        <div class="contentlist home" @click="newarticle"><span >新增文章</span></div>
        <div class="contentlist find" @click="Specialcolumn"><span >专栏管理</span></div>
        <div class="contentlist shopping" @click="specialdata"><span>数据</span></div>
      </div>
    </div>
    <br>
    <column v-show="tech"></column>
    <!-- <newarticle v-show="tetbook"></newarticle>
    <Specialcolumn v-show="mst"></Specialcolumn>
    <specialdata v-show="cos"></specialdata> -->
  </div>
</template>

<script>
import column from "./column";//专栏管理/名师专栏

export default {
  components: { column},
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
    column() {
      this.$router.push({path:'/special'})
    },
    newarticle() {
      this.$router.push({path:'/special/new_ticles'+'?'+0})
    },
    Specialcolumn() {
      this.$router.push({path:'/special/Specialcolumn'})
    },
    specialdata() {
      this.$router.push({path:'/special/data'})
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/index.scss';
.content_padding_delete{
  padding:0 !important;
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
