<!--注册-->
<template>
<div class="loging_bg">
  <!--顶部-->
  <div class="logingtop">
    <div class="topdiv">
      <div style="float:left"><img src="../../../../static/img/logo.png"></div>
      <div style="float:left;color:white;">注册</div>
      <div style="color:white;float:right;font-size: 12px;" @click="gologing">已有账号，<span style="color: #F0B46E;cursor:pointer;">立即登录</span></div>
    </div>
  </div>
  <!--内容-->
  <div class="loging_main">
    <div class="loing_main-main">
        <div style="padding-top:70px;padding-bottom: 30px;font-size:20px;color:#363F4C;border-width:800;text-align: center;">注册</div>
        <div style="width:250px;margin:0 auto;">
            <div >
              <Input  placeholder="请输入手机号" style="width: 250px"></Input>
            </div>
            <div style="width:350px;padding-top:14px;">
              <Input  placeholder="请输入短信验证码" style="width: 250px;"></Input>
              <button class="telbtn">发送验证码</button>
            </div>
            
        </div>
        <div style="text-align: center;"><button class="login_btn" @click="gonext">下一步</button></div>
        
    </div>
    
  </div>
  <!--底部-->
  <div class="loging_end">
    @2018 哆来学科技有限公司版权所有 京ICP备1136253号-6
  </div>
    <router-view></router-view>
</div>

</template>

<script>
export default {
  data(){
    return{

    }
  },
  mounted(){

  },
  methods:{
    gologing(){
      this.$router.push({path:'/'})
    },
    gonext(){
      this.$router.push({path:'/logingpwd/pwdnext/newsignin_sign'})
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
    div{
      line-height: 60px;
      font-size: 20px;
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

.loging_end{
  width: 70%;
  padding-top: 100px;
  margin: 0 auto;
  text-align: center;
  font-size: 12px;
  color: #7D93B2;
}
.telbtn{
  height: 30px;color: white;
  border-radius: 5px;
  background: rgb(240, 180, 110);
  border: none;
  font-size: 12px;;
}
</style>

