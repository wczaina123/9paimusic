<template>
<div class="loging_bg">
  <!--顶部-->
  <div class="logingtop">
    <div class="topdiv">
      <span><img src="../../../static/img/logo.png"></span>
      <span>账号登陆</span>
    </div>
  </div>
  <!--内容-->
  <div class="loging_main">
    <div class="loing_main-main">
        <div style="padding-top:70px;padding-bottom: 30px;font-size:20px;color:#363F4C;border-width:800;text-align: center;">哆来学后台系统</div>
        <div style="width:250px;margin:0 auto;">
          <div class="input-group mb-3">
            <span class="input-group-addon"><i class="icon-user"></i></span>
            <input type="text" class="form-control" v-model="meg.phone" placeholder="请输入手机号">
          </div>
          <div class="input-group mb-4">
            <span class="input-group-addon"><i class="icon-lock"></i></span>
            <input type="password" class="form-control" v-model="meg.password" @keyup.enter='go_login' placeholder="请输入密码">
          </div>
        </div>
        
        <div class="loging_pwd" @click="gopwd">忘记密码?</div>
        <div style="text-align: center;"><button class="login_btn"  @click="go_login">确认</button></div>
        <div style="text-align: center;font-size: 12px;color: #7D93B2;cursor: pointer;" @click="newtel">还没有账号？立即注册</div>
    </div>
    
  </div>
  <!--底部-->
  <div class="loging_end">
    @2018 哆来学科技有限公司版权所有 京ICP备1136253号-6
  </div>
  <!-- <router-view></router-view> -->
</div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data(){
    return{
      meg:{
        phone:'',
        password:'',
        router:this.$router,
        err:this.$Message,
      }
    }
  },
  mounted(){

  },
  methods:{
    gopwd(){
      this.$router.push({path:'/logingpwd'})
    },
    newtel(){
      this.$router.push({path:'/logingpwd/pwdnext/newsignin'})
    },

    go_login(){
        this.$store.commit("login_msg" , this.meg)
        this.$store.dispatch('log_in')
    },
    
  },
}
</script>

<style lang="scss" scoped>
.loging_bg{

}
.logingtop{
  width: 100%;
  height: 60px;
  background: #363F4C;
  
  box-shadow: 2px 0 4px 0 rgba(0,0,0,0.20);
  .topdiv{
    width: 70%;
    height: 60px;
    margin: 0 auto;
    span{
      font-size: 20px;
      color: white;
      line-height: 60px;
      img{
        height: 50px;
        padding: 0.5rem 1rem;
        // margin: 0.5rem 0 0 0;
        line-height: 60px;
      }
    }
  }
}
.loging_main{
  background: white;
  width: 70%;
  height: 360px;
  margin: 0 auto;
  margin-top: 40px;
  .loing_main-main{
    width: 40%;
    margin: 0 auto;
  }
}

.login_btn{
  margin: 15px 0;
  color: white;
  border: none;
  background: rgb(240, 180, 110);
  width: 250px;
  border: none;
  height: 40px;
  border-radius: 5px;
}
.loging_pwd{
  padding-left:261px;
  font-size: 12px;
  color: #7D93B2;
  cursor: pointer;
}

.loging_end{
  width: 70%;
  padding-top: 100px;
  margin: 0 auto;
  text-align: center;
  font-size: 12px;
  color: #7D93B2;
}
</style>

