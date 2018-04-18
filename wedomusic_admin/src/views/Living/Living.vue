<!--直播主模版-->
<template>
<div>
  <div class="topbox">
    <div class="content big_content content_padding_delete">
      <div class="contentlist living bg" @click="living">
        <span>直播管理</span>
      </div>
      <div class="contentlist whitelist" @click="whitelist"><span>白名单管理</span></div>
      <div class="contentlist gift" @click="gift"><span >礼物管理</span></div>
      <!-- <div class="contentlist cate" @click="cate"><span>品类管理</span></div>       -->
    </div>
  </div>
  <div class="content content_model content_min content_bottom">
    <living v-if="livinglist"></living>
    <whitelist v-if="userlist"></whitelist>
    <gift v-if="giftlist"></gift>
  </div>

</div>
</template>

<script>
import living from './livingadmin/Living'
import whitelist from './whitelist/whitelist'
import gift from './gift/gift'

export default {
  components:{living,whitelist,gift},
  data(){
    return{
      livinglist:true,
      userlist:false,
      giftlist:false,
    }
  },
  mounted(){
    this.livinglist = true
  },
  methods:{
    living(){
      $('.living').addClass("bg").siblings().removeClass("bg");
      this.livinglist = true
      this.userlist = false
      this.giftlist = false      
    },
    whitelist(){
    
      $('.whitelist').addClass("bg").siblings().removeClass("bg");
      this.livinglist = false
      this.userlist = true
      this.giftlist = false
    },
    gift(){
    
      $('.gift').addClass("bg").siblings().removeClass("bg");
      this.giftlist = true
      this.livinglist = false
      this.userlist = false
    },
    cate(){

    },

  },
}
</script>

<style scoped>
 /*点击切换的颜色*/
  .bg{
    color:#363F4C !important;
    font-weight:bolder !important;
  }
  .content_padding_delete{
    padding:0 !important;
  }
</style>

