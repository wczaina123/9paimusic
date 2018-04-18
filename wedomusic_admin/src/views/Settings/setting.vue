<!--系统管理-->
<template>
<!--导航栏-->
  <div class="topbox">
    
    <div class="content big_content">
      <div class="contentlist teachlist bg" @click="gomessage">
      	<span>企业信息</span>
      </div>
      <div class="contentlist passlist" @click="gopassword">
      	<span>修改密码</span>
      </div>    
    </div>
<!--内容-->
    <div class="mainbox" style="margin-top:30px">
      <firm v-if="firm"></firm>
      <pwd v-if="pwd"></pwd>
    </div>  
  </div>
</template>

<script>
import firm from './firm_message/firm_message'
import pwd from './password/password'
import store from '../../_vuex/store'

export default {
  components:{firm,pwd},
  store,
  data(){
      return{
        firm:true,
        pwd:false
      }
  },
  computed:{
  },
   mounted(){
    // this.get_token()
  },
  methods:{
    gomessage(){
      $('.teachlist').addClass("bg").siblings().removeClass("bg");     
      this.firm = true
      this.pwd = false
    },
    gopassword(){
      $('.passlist').addClass("bg").siblings().removeClass("bg");  
      this.firm = false
      this.pwd = true
    },

  },
}
</script>
<style lang="scss" scoped>
 /*点击切换的颜色*/
  .bg{
    color:#363F4C !important;
    font-weight:bolder !important;
  }
 .content{
    padding:0;
  }
</style>

