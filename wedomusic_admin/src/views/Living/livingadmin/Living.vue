<!--直播主模版-->
<template>
<div>
    <!--头部-->
    <p class="home_text">直播管理</p>
    <!--添加栏-->
    <div class="minetoplink">
        <div>
          <Select   v-model="live_statue" style="width:160px !important" @on-change="change_live_statue(live_statue)">
            <Option value="-1">全部状态</Option>
            <Option value="0">未开播</Option>
            <Option value="1">直播中</Option>
            <Option value="2">已结束</Option>
          </Select>
        </div>
        <span style="cursor:pointer;" @click="addliving"> 
            <i class="fa fa-plus-square-o fa-lg mt-4"></i>
            新增直播
        </span>
    </div>
    <!--表格-->
    <div class="tablebox">
      <table class="table-list">
            <thead>
            <tr>
                <th style="display:5%">ID</th>
                <th style="width:10%;">封面</th>
                <th style="width:20%;">主题</th>
                <th style="width:15%;">主播</th>
                <th style="width:15%;">时间</th>
                <th style="width:10%;">状态</th>
                <th style="width:14%;">操作</th>
                <th style="width:8%;">导播</th>
                <th style="width:8%;">分析</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="res in live_list" :key="res.id">
                  <td >{{res.id}}</td>                
                  <td><img :src="res.cover_url" style="width:100%;"></td>
                  <td >{{res.name}}</td>
                  <td >{{res.user_name}}</td>
                  <td  style="text-align: center;">{{((res.status_id == 0)?res.pre_time *1000:(res.status_id == 1)?res.time *1000:(res.status_id == 2)?res.end_time *1000:"")| formatDate}}</td>
                  <td style="text-align: center;">{{res.status_text}}</td>
                  <td class="acolor"><a @click="change_live(res.id)">修改</a><a style="margin-left:6px;" @click="show_del(res.id)">删除</a></td>
                  <td  class="acolor"><a  @click="livingup(res.id,res.status_id)">{{(res.status_id ==0)?'开播':(res.status_id ==1)?'关播':''}}</a></td>
                  <td class="acolor"><a>数据分析</a></td>                                  
              </tr>
            </tbody>
        </table>
    </div>
    <!--删除弹框-->
    <div class="aaa">
        <Modal v-model="soldout" width="376" class-name="vertical-center-modal">
            <div class="tit">是否确认删除</div>
            <div slot="footer" class="btns">
                <button class="btn btn1" @click="cancel">取消</button>
                <button class="btn btn2" @click="deletetextbook">确定</button>
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
      live_list:"",
      live_statue:'-1',
      soldout:false,
      del_id:''
    }
  },
  mounted(){
    this.get_list()
  },
  methods:{
    cancel(){
      this.soldout = false
    },

    livingup(id,up){   //  直播状态
      let status= up + 1
      this.$axios({
          url: this.$linkurl.stop_start_live,
          method: 'POST',
          data: {
            token: localStorage.getItem('token'),
            id:id,
            status:status
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
          this.get_list()
        })
    },


    addliving(){
       this.$router.push({path:'/living/livingadd'})
    },

    change_live(id){
      this.$router.push({path:'/living/livingadd' + '?' + id})
    },

    change_live_statue(name){   // 切换
      this.live_statue = name
      this.get_list()
    },

    show_del(id){  // 删除id
      this.soldout = true
      this.del_id = id
    },

    deletetextbook(){  // 删除
        this.$axios({
          url: this.$linkurl.delete_live,
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
          this.soldout = false
          this.get_list()
        })
    },

    get_list(){   // 直播列表
      this.$axios({
          url: this.$linkurl.get_live_list,
          method: 'POST',
          data: {
            token: localStorage.getItem('token'),
            status_id:this.live_statue,
            keyword:'',
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
    
    
  },
  filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    },

  
}
</script>

<style scoped lang='scss'>
@import '../../../assets/css/alert.css';
.minetoplink{
  display: flex;
  margin:30px 0 ; 
  span{
    color:#287AF2;
    line-height: 30px;
    i{
    	color:#287AF2;
    }
  }
}
.table-list{
  tbody{
    tr{
      td{
        text-align: center;
      }
    }
  }
}
</style>

