<!--系统管理-->
<template>
<div>
  <!--头部-->
    <div class="maintop-one">
        <span @click="showfrim" class="showfrim">企业基本信息</span>
        <span @click="showmoney" class="showmoney">企业财务信息管理</span>
        <span @click="showshoping" class="showshoping">商城资质管理</span>
        <span @click="storroots" class="storroot">商城授权管理</span>
    </div>
    <!--添加栏-->
    <div class="setting_list">
        <message v-if="message"></message>
        <money v-if="money"></money>
        <shoping v-if="shoping"></shoping>
    </div>
    <storroot v-if="storroot"></storroot>
</div>
   
</template>

<script>
import message from './frimmessage'
import money from './moner'
import shoping from './shoping'
import storroot from './storroot'
export default {
  components:{money,shoping,storroot,message},
  data(){
      return{
        message:true,
        money:false,
        shoping:false,
        storroot:false,
      }
  },
  mounted(){
    $('.showfrim').css('background','#C5D1E2')
  },
  methods:{
    showfrim(){
    $('.showfrim').css('background','#C5D1E2')   
    $('.showshoping').css('background','#DEE5EE')         
    $('.showmoney').css('background','#DEE5EE')  
    $('.storroot').css('background','#DEE5EE')           
      this.message = true
      this.money = false
      this.shoping = false
      this.storroot = false
      
    },
    showmoney(){
    $('.showmoney').css('background','#C5D1E2')     
    $('.showfrim').css('background','#DEE5EE')     
    $('.showshoping').css('background','#DEE5EE') 
    $('.storroot').css('background','#DEE5EE')           
      this.message = false 
      this.money = true
      this.shoping = false
      this.storroot = false
      
    },
    showshoping(){
      $('.showshoping').css('background','#C5D1E2')     
      $('.showmoney').css('background','#DEE5EE')     
      $('.showfrim').css('background','#DEE5EE') 
      $('.storroot').css('background','#DEE5EE')           
      this.message = false       
      this.money = false
      this.shoping = true
      this.storroot = false
    },
    storroots(){
      $('.storroot').css('background','#C5D1E2')           
      $('.showshoping').css('background','#DEE5EE')     
      $('.showmoney').css('background','#DEE5EE')     
      $('.showfrim').css('background','#DEE5EE') 
      this.message = false       
      this.money = false
      this.shoping = false
      this.storroot = true
    },
  },
}
</script>
<style lang="scss" scoped>

</style>

