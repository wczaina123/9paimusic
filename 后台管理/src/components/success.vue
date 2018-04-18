<template>
<div>
 <ul>
        <li class="box_head"> 
          <div style="width:150px">日期</div>
          <div style="width:200px">到账时间</div>
          <div style="width:100px">姓名</div>
          <div style="width:180px">银行</div>   
          <div style="width:200px">银行卡号</div> 
          <div>状态</div> 
          <div style="width:100px">金额</div>      
          <div>手续费</div>
          <div>实际到账</div>
          <div style="width:230px">备注</div>                
           <!-- <el-button type="text" @click="open5">点击打开 Message Box</el-button> -->
        </li>
        <li v-for="(msg,index) in arrmax" :key="index" class="box_main">
          <div style="width:150px" >{{msg.time}}</div>
          <div style="width:150px">{{msg.finish_time}}</div>
          <div style="width:150px">{{msg.name}}</div>
          <div style="width:150px">{{msg.bank}}</div>
          <div style="width:200px">{{msg.card_number}}</div>
          <div style="width:100px">{{msg.status}} &nbsp;&nbsp;<a @click="cl(msg.id)" style="text-decoration:underline;color:red;cursor:pointer;">(修改)</a></div>
          <div style="width:100px">{{msg.withdrawals_money}}</div>
          <div style="width:100px">{{msg.poundage}}</div>
          <div style="width:100px">{{msg.withdrawals_money - msg.poundage}}</div>
          <div style="width:200px">{{msg.remark}}</div>          
          <!-- <div style="width:149px">
            <template>
              <el-radio v-model="radio" label="1">成功</el-radio>
              <el-radio v-model="radio" label="2">失败</el-radio>
            </template>
          </div> -->
          <!-- <div><el-input v-model="input" placeholder="请填写备注" size="mini"></el-input></div> -->
          
          
        </li>
      </ul>

        <el-button-group>
        <el-button type="primary" icon="el-icon-arrow-left" @click="pageadd()">上一页</el-button>
        <el-button type="primary" @click="pagemin()">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>
      <!--弹框-->
      <div class="teacher_alert" v-if="username" transiton="fade_teacher">
      <div class="teacher_zhezhao"></div>
      <div class="teacher_content">
          <h5><template >
              <el-radio v-model="radio" label="1">成功</el-radio>
              <el-radio v-model="radio" label="2">失败</el-radio>
            </template></h5>
          <p><el-input v-model="input" placeholder="请填写备注" size="mini"></el-input></p>
          <div>
              <button @click="yescl">确定</button>
              <button @click="exit">取消</button>
          </div>
        </div>
    </div>
</div>    
</template>

<script>

import axios from "axios"
import linkurl from "./linkurl"

  export default {
  props:['pronull'],
  data() {
    return {
        tableData: [],
        arr: [],
        name:"",
        arrmax:[],
        // 状态
        input:"",
        uid:"",
        status:"",
        remark:"",
        message:"",
        radio:"1",
        pages:0,
        token:sessionStorage.getItem("token"),
        username:false,
        ids:"",
        
    }
    },
    mounted:function(){
      this.getlist()
    },
    methods:{
      exit(){  // 取消弹框
        this.username = false;
      },
      cl(id){  // 点击（修改）触发弹框
        this.username = true;
        this.ids = id
      },
      yescl(){   // 弹框的确认=>触发状态更改事件
          console.log(this.ids)
          this.changestat()
          this.username = false;
      },
      pageadd:function(){    // 切页
        if(this.pages<=0){
          this.pages = 0
        }
        this.pages--
        this.getlist()
      },
      pagemin:function(id){  // 切页
        this.pages++
        this.getlist()
      },

        getlist:function(){   // 请求全部列表
          axios({
          url: linkurl.get_list,
          method: 'post',
          data: {
            token: this.token,
            page:this.pages,
            status: "成功",
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
          this.arrmax = res.data.data
        })
        .catch(()=>{
          console.log("获取全部列表错误")
        })
      },
      
        changestat:function(){   // 提交更改状态
          axios({
          url: linkurl.putlist,
          method: 'post',
          data: {
            token: this.token,
            id:this.ids,
            status: (this.radio == 1)?"成功":"失败",
            remark:this.input
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
          console.log(res.data.message)
            this.message = res.data.message
            this.getlist()
        })
        .catch(()=>{
          console.log("更改成功状态失败")
        })
      },

    },
    updated:function(){
        
    },
    
    
  };
</script>


<style scoped >
/* ---- */
.teacher_zhezhao {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); }

.teacher_content {
  width: 400px;
  margin: auto;
  background: #ffffff;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  vertical-align: middle; }
  .teacher_content h5 {
    padding: 25px 0;
    font-weight: 400;
    color: #333;
    margin-top: 0.25rem;
    margin-bottom: 0.12rem;
    width: 100%;
    text-align: center;
    font-size: 18px; }
  .teacher_content p {
    color: #999;
    width: 78%;
    margin-left: 11%;
    line-height: 20px;
    font-size: 14px;
    height: 180px;
     }
  .teacher_content button {
    width: 100%;
    height: 48px;
    text-align: center;
    vertical-align: middle;
    margin-top: 10px;
    color: #4a90ea;
    border: 0;
    border-radius: 0 0 10px 10px;
    background: #fff;
    border-top: 1px solid #ddd;
    font-size: 18px;
    font-weight: 600;
    outline: none; }

.teacher_content {
  border: 0; }
  .teacher_content p {
    height: 60px; }
    .teacher_content p span {
      color: #999;
      font-size: 14px; }
  .teacher_content div {
    display: flex;
    justify-content: space-around;
    align-items: center; }
    .teacher_content div button {
      border-top: 1px solid #ccc; }
      .teacher_content div button:first-child {
        border-right: 1px solid #ccc; }

.fade_rules-enter-active, .fade_teacher-enter-active, .fade_teacher-leave-active, .fade_rules-leave-active {
  transition: opacity 0.6s; }

.fade_rules-enter, .fade_teacher-enter, .fade_teacher-leave-active, .fade_rules-leave-active {
  opacity: 0; }

/*# sourceMappingURL=style.css.map */

/* ------ */

ul{
padding: 0;margin: 0;

}
ul li{
list-style: none;
height: 40px;
}
.box_head{
display: flex;
}
.box_head div{
width: 100px;
height: 40px;
text-align: center;
}
.box_main{
  font-size: 12px;
display: flex;
/* border: 1px solid #000000; */
line-height: 40px;
}
.box_head div{
  
width: 100px;
}
#msgtime{
  align: center;
  
}

.location{
  position: absolute;
  right: 0;
  top: 200px;
}

</style>