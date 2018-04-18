<!--修改密码-->
<template>
  <!--导航栏-->
  <div>
    <p class="home_text home_text_p">
      密码修改
    </p>
    <div class="input_div">
      <a class="table_a">当前密码:</a>
      <Input  placeholder="请输入当前密码" v-model='old_password' style="width: 300px"></Input>
    </div>
    <div class="input_div">
      <a class="table_a">新密码:</a>
      <Input  placeholder="请输入新密码" v-model='new_password' style="width: 300px"></Input>
    </div>
     <div class="input_div">
      <a class="table_a">再次输入新密码:</a>
      <Input  placeholder="请再次输入新密码" v-model='news_password' style="width: 300px"></Input>
    </div>
      <div class="setting_money_btn">
        <Button @click='get_res' type="warning" style="background:#F0B46E;border:none;width:150px;height:30px;">确定</Button>
    </div>
  </div>
</template>

<script>
  export default {

    data(){
      return{
        old_password:'',
        new_password:'',
        news_password:'',
      }
    },
    mounted(){

    },
    methods:{
        get_res(){   // 确定
          this.$axios({
          url: this.$linkurl.get_course_homework,
          method: 'POST',
          data: {
            token: localStorage.getItem('token'),
            password:this.new_password,
            re_password:this.news_password
          },
          transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
        })
        .then(res=>{
          console.log(res.data)
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import '../../../assets/css/alert.css';
 @import '../../../assets/css/input_style.scss';
  .input_div{
  margin:20px 0;
 }
 .input_div .table_a{
  display:inline-block;
  float:left;
  width:120px;
  text-align:right;
  height:30px;
  line-height:30px;
  margin-right:5px;
}
</style>

