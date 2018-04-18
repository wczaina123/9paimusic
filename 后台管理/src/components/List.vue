<template>
  <div>
    
    <div class="box">
      <i class="el-icon-edit"></i>
        <el-input v-model="input" placeholder="请输入密码" style="width:350px;"></el-input>
        <br>
        <el-button type="success" style="margin-top:50px;" @click="gettoken">登陆</el-button>
        
             
    </div>
  </div>
</template>

<script>

import axios from "axios"
import linkurl from "./linkurl"

  export default {

    data() {
      return {
          input:"",
          password:"",
          token:"",
          
      };
    },
    mounted(){
      // 找到登陆密码，然后进行登录，取出token   然后在别的页面中将请求的token加入参数
    },
    methods: {
      gettoken:function(){  // 登陆获取token
        axios({
          url: linkurl.loging,
          method: 'post',
          data: {
            password:this.input
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
          console.log(res.data.data)
          this.token = res.data.data
          if(this.token != null){
            sessionStorage.setItem("token",this.token)
            this.$router.push({path:"/list"})
          }else{
            this.$message({
              message: '密码错误'
             });
          }
          // nbtxZY1
        })
        .catch((err)=>{
          console.log("获取登陆信息错误")
        })
      },

    },
  };
</script>


<style scoped>
.box{
  width: 600px;
  height: 200px;
  /* border:1px solid #000000; */
  margin: 0 auto;
  margin-top: 300px;
}
</style>