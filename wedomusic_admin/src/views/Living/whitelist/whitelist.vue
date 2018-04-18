<!--直播主模版-->
<template>
<div>
    <!--头部-->
    <p class="home_text">白名单管理</p>
    <!--添加栏-->
    <div class="minetoplink" @click="add">
        <span>
            <i class="fa fa-plus-square-o fa-lg mt-4"></i>
            添加主播
        </span>
    </div>
    <!--表格-->
    <div class="tablebox">
      <table class="table-list">
            <thead>
            <tr>
                <th style="display:none"></th>
                <th style="width:10%;">头像</th>
                <th style="width:20%;">手机号</th>
                <th style="width:20%;">昵称</th>
                <th style="width:20%;">添加时间</th>
                <th style="width:20%;">直播数</th>
                <th style="width:15%;">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="res in live_list" :key="res.id">
                <td><img :src="res.head_image" style="width:100%;"></td>
                <td >{{res.user.phone}}</td>
                <td >{{res.user.nick_name}}</td>
                <td style="text-align: center;">{{res.created_at *1000| formatDate}}</td>
                <td  style="text-align: center;">{{res.live_num}}</td>
                <td style="text-align: center;"><a @click="get_del_id(res.id)">删除</a></td>
            </tr>
            </tbody>
        </table>
    </div>
  <!--弹框-->
  <Modal
    width="400"
    v-model="putaways"
    class-name="vertical-center-modal"
    
    >
    <div slot="header" style="text-align:center;font-size:16px;margin:0" >请输入主播注册手机号</div>
    <div style="text-align: center;">
        <Input v-model="telnum" placeholder="请输入主播注册手机号" style="width: 200px"></Input>
    </div>
    <div slot="footer">
        <button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;" @click="clo_phone">取消</button>
        <button  style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;" @click="add_phone">确定</button>
    </div>
</Modal>

  <div class="aaa">
        <Modal v-model="soldout" width="376" class-name="vertical-center-modal">
            <div class="tit">是否确认删除</div>
            <div slot="footer" class="btns">
                <button class="btn btn1" @click="cancel">取消</button>
                <button class="btn btn2" @click="del_list">确定</button>
            </div>
        </Modal>
    </div>
</div>
</template>

<script>
import {formatDate} from '../../All-commonality/data'

export default {
  data(){
    return{
      start:false,
      over:true,
      putaways:false,
      telnum:'',
      live_list:"",
      soldout:false,
      del_id:"",

    }
  },
  mounted(){
    this.get_list()
  },
  methods:{
    livingup(){
      this.start = false
      this.over = true
    },
    livingdown(){
      this.start = true
      this.over = false
    },
    add(){
      this.putaways = true
    },

    get_del_id(id){
        this.del_id = id
        this.soldout = true
    },

    del_list(){  // 删除
        this.$axios({
          url: this.linkurl.delete_live_white,
          method: 'POST',
          data: {
            token: localStorage.getItem('token'),
            id:this.del_id
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
          this.live_list = res.data.data
          this.soldout = false
        })
    },

    get_list(){   // 直播列表
      this.$axios({
          url: this.$linkurl.get_live_white_list,
          method: 'POST',
          data: {
            token: localStorage.getItem('token'),
            page:0
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
          // console.log(res.data.data)
          this.live_list = res.data.data
        })
        .catch(err=>{
            console.log("获取列表失败",err)
        })
    },

    add_phone(){   //  新增
      this.$Message.destroy()
      this.$axios({
          url: this.$linkurl.add_live_white,
          method: 'POST',
          data: {
            token: localStorage.getItem('token'),
            phone:this.telnum
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
          // console.log(res.data)
          if(res.data.message =="主播手机号不存在"){
            this.$Message.warning('主播手机号不存在');
            this.telnum = ''
          }else{
            this.putaways = false
            this.get_list()
          }
          
        })
        .catch(err=>{
            console.log("新增失败",err)
        })
    },

    clo_phone(){
      this.putaways = false
    },
    cancel(){
      this.soldout = false
    },
  },
  filters: {
        formatDate(time) {
            var date = new Date(time);
            // return formatDate(date, 'yyyy-MM-dd hh:mm');
            return formatDate(date, 'yyyy-MM-dd');
        }
    },
}
</script>

<style scoped lang='scss'>
.minetoplink{
  display: flex;
  margin:30px 0 ; 
  span{
  margin-left:0;
    color:#287AF2;
    line-height: 30px;
    i{
    color:#287af2;
    }
  }
}
.table-list{
  tbody{
    tr{
      td{
        text-align: center;
        a{
          color: #287AF2;
        }
        
      }
    }
  }
}
</style>

