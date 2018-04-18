<!--直播主模版-->
<template>
<div>
    <!--头部-->
    <p class="home_text">礼物管理</p>
    <!--添加栏-->
        <!-- <div class="minetoplink">
            <div>
              <select class="form-control" style="font-size:12px;height:30px;width:160px;" >
              <option value="">全部</option>
              <option value="0">使用中</option>
              <option value="1">已停用</option>
            </select>
            </div>
            <span @click="addgift">
                <i class="fa fa-plus-square-o fa-lg mt-4"></i>
                添加礼物
            </span>
            <span style="color:#287AF2;">
                <Icon type="shuffle"></Icon>
                保存排序
            </span>
        </div> -->
    <!--表格--> 
    <!-- <div class="tablebox" ></div> -->
      <draggable v-model="testarr" class="tablebox" @start="drog" @end="drop">
        <div class="gift"  v-for="res in testarr" @click="test(res.id)" :key="res.id" :id="res.id">
          <div class="giftimg"><img :src="res.thumb_image" alt=""></div>
          <div class="giftname"><span>{{res.name}}</span></div>
          <!-- <div class="giftbtn"><Button  type="success">{{res.user}}</Button></div> -->
          <div class="giftend">
            <div><span class="fa fa-money gift-item-num-icon" style="color:#609ee9;"></span><div>20</div></div>
          </div>
        </div>
      </draggable>
      

</div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components:{draggable},
  data(){
    return{
      start:false,
      over:true,
      testarr:[],
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
    addgift(){
      this.$router.push({path:'/giftadd'})
      // this.$router.push({path:'/livingadd'})
    },
    drog(e){
      //  console.log(e.clone.attributes[1].nodeValue)
    },
    drop(e){  
      // console.log(e.newIndex)  // 拖拽后存放的下标
      // console.log(e.clone.attributes[1].nodeValue)   // 拖拽的物品id
    },
    test(id){
      // console.log(id)
    },

    get_list(){   // 礼物列表
      this.$axios({
          url: this.$linkurl.get_live_gift_list,
          method: 'POST',
          data: {
            token: localStorage.getItem('token'),
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
          this.testarr = res.data.data
        })
        .catch(err=>{
            console.log("获取列表失败",err)
        })
    },
    
  },
  
  
}
</script>

<style scoped lang='scss'>
.minetoplink{
  display: flex;
  margin:30px 0; 
  span{
    color:#287AF2;
    line-height: 30px;
    i{
    	color:#287Af2;
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

// 礼物样式
.tablebox{
  display: flex;
  justify-content:flex-start;
  flex-wrap:wrap;
  .gift{
    width: 23%;
    height: 25%;
    background-color:#fff;
    cursor: pointer;
    padding:10px 0 20px 0;
    margin: 10px;
    border: 1px solid #ddd;
    .giftimg{
      img{
        display: block;
        width: 30%;height: 30%;
        margin: 0 auto;
      }
    }
    .giftname{
      margin: 10px auto;
      text-align: center;
      span{
        font-size:14px;
      }
    }
    .giftbtn{
      text-align: center;
      padding: 10px 0;
      border-bottom: 1px solid #ddd;
    }
    .giftend{
      display: flex;
      div{
        width: 100%;
        text-align: center;
        margin-top:15px; 
        div{
          margin: 0 auto;padding: 0;
          
        }
      }
    }
    
  }
  .gift:hover{
    -webkit-box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }
}

</style>

