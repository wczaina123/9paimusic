<template>
  	<div id="login">
        <div class="login_null"></div>
		<div class="login_phone">
			<input type="text" placeholder="请输入手机号码,暂时只支持中国大陆" v-model="phone">
		</div>
		<div class="login_password">
			<input type="text" placeholder="请输入密码" v-model="password">
		</div>
		<p class="login_forget">忘记密码</p>
		<div class="login_button">
			<button @click="getLogin">登 录</button>
		</div>
		<!--该手机号尚未注册-->
         <div class="no_phone">
           <hsy-dialog class="confirm" v-model="username">
                 <div slot="title" class="title" id="test1" style="text-align:center;"><img src="../../assets/beizhu.png"/><span>提示</span></div>
                <div slot="body" class="body">
                    <div style="font-size:20px;color:#999;text-align: center;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);margin:10px 0;">该手机号尚未注册</div>
                    <div class="alert_button" style="padding-top:35px;margin-left:15px;">
                        <div @click="test">注册</div>
                        <div @click="username = false">取消</div>
                    </div>
                </div>
            </hsy-dialog>
         </div>
         <!--密码错误-->
         <div class="error_password">
            <hsy-dialog class="confirm" v-model="paswd" >
                <div slot="title" id="pwd" class="title"  style="text-align:center;"><img src="../../assets/beizhu.png"/><span>提示</span></div>
                <div slot="body" class="body" style="margin:0;padding:0;margin-top:-20px;height:50px;line-height:50px;background:#fff;" >
                    <div style="font-size:20px;color:#999;text-align: center;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);margin:10px 0;">密码错误</div>
                    <div class="alert_button" style="padding-top:35px;">
                        <div @click="paswd = false" style="padding-left:30px;">重    试</div>
                        <div @click="test">忘记密码</div>
                    </div>
                </div>
            </hsy-dialog>
         </div>
	</div>
</template>

<script>
import linkurl from "../App_linkurl.js"
import axios from "axios"

export default {
  name: 'Login',
  data () {
    return {
      username:false,
      paswd:false,
      phone:"",
      password:"",
      ret:"", // 状态
      message:"",
      nick_name:"",
      vip_surplus:"",
      token:"",
    }
  },
  mounted:function(){
    
  },
  methods:{
    test:function(){  // 跳转app
      location.href = "jiupaipeinilian://ninebeatsteachertv.jiupai.com"
    },
    downlod:function(){
      location.href = linkurl.app_download  // 跳转到应用宝
    },
    // 检测账号状态
    dectionmesg:function(){
      if (this.ret==2 && this.message == "该手机号没有注册！"){
        this.username = true
      }
      if(this.ret==2 && this.message == "密码输入错误，请重新输入！"){
        this.paswd = true
      }
      if(this.ret == 0){
        // this.$router.push({path:'detail/'})
        window.location.href = "http://pay.9beats.com/beecloud_pay.php"

      }
    },
    //登陆接口
    getLogin:function(){
      axios({
        url: linkurl.app_login,
        method: 'post',
        data: {
          // phone: "12345678901",
          phone:this.phone,
          // password: "123456",
          password:this.password,
          type:"h5"
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then((res)=>{
        console.log(res.data.data.data.vip_surplus)
        this.ret = res.data.ret
        this.message = res.data.message
        this.dectionmesg()  
        sessionStorage.setItem("username",res.data.data.data.nick_name)
        sessionStorage.setItem("userid",res.data.data.data.userid)
        sessionStorage.setItem("vip",res.data.data.data.vip_surplus)      
        sessionStorage.setItem("token",res.data.data.token,)      
      })
      .catch((err)=>{
        console.log("获取登陆信息失败")
      })
    },
    ////////////

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
*{
    outline:none;
    font-size: 16px;
}
//下面是弹出框的内容
.hsy-dialog .main .title{
  margin:0 150px;
}
.hsy-dialog .main .title .content div{
  margin-left:0;
  font-weight:600;
}
.hsy-dialog .main .title .content div img{
  width:20px;
  height: 20px;
  margin-right:10px;
  margin-top:15px;
}
.hsy-dialog .main .title .content div span{
  display:block;
  margin-top:-42px;
  margin-left:50px;
}
.hsy-dialog .main .body{
    border-top:0;padding:0;
    margin-top:-20px;
    height: 50px;
    line-height:50px;
    background:#fff;
}
.main .inner .body{
  border-top:normal;
}
.hsy-dialog .main .body div{
  width:100%;
}
.hsy-dialog .main .body .alert_button{
  width:135%;
  height:50px;
}
.hsy-dialog .main .body .alert_button div{
  float:left;
  width:50%;
  height:50px;
  line-height:50px;
  border:0;
  color:#4a90e2;
  font-size:18px;
  font-weight:600;
  padding:0 20px;
}
// 以上为弹出框的内容

#login{
    width:100%;
    height:100%;
    background:#ECF0F3;
    .login_null{
        width:100%;
        height:37px;
    }
    .login_phone{
        width:88%;
        height: 44px;
        margin-left:6%;
        input{
            width:100%;
            height:100%;
            border:0;
            padding-left:15px;
            background:#fff;
            border-radius:5px;
        }
    }
    .login_password{
        margin-top:10px;
        width:88%;
        height: 44px;
        margin-left:6%;
        input{
            width:100%;
            height:100%;
            border:0;
            padding-left:15px;
            background:#fff;
            border-radius:5px;
        }
    }
    .login_forget{
        float:right;
        margin-right:6%;
        color:#4a90e2;
        margin-top:10px;
        font-size:14px;
        text-decoration: underline;
    }
    .login_button{
        margin-top:60px;
        width:88%;
        height: 44px;
        margin-left:6%;
        button{
            width:100%;
            height:100%;
            border:0;
            padding-left:15px;
            background: #da6666;
            color:white;
            border-radius:5px;
        }
    }
   #test1{
     font-size: 12px;
   }
}

</style>
