<!--直播主模版-->
<template>
<div>
    <!--头部-->
    <div class="maintop-one">
        <span>礼物管理</span>
    </div>
    <!--添加栏-->
    <div class="minetoplink">
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
    </div>
    <!--表格--> 
    <div class="tablebox" >
      <div class="gift" v-drag>
        <div class="giftimg"><img src="../../../../static/img/logo-symbol.png" alt=""></div>
        <div class="giftname"><span>九拍</span></div>
        <div class="giftbtn"><Button  type="success">使用中</Button></div>
        <div class="giftend">
          <div style="border-right:1px solid #ddd"><span class="fa fa-money gift-item-num-icon" style="color:#609ee9;"></span><div>20</div></div>
          <div><span class="fa fa-graduation-cap gift-item-num-icon" style="color:#30b8e3;"></span></div>
        </div>
      </div>
      <!--例子 可删除-->
      <div class="gift">
        <div class="giftimg"><img src="../../../../static/img/logo-symbol.png" alt=""></div>
        <div class="giftname"><span>九拍</span></div>
        <div class="giftbtn"><Button  type="success">使用中</Button></div>
        <div class="giftend">
          <div style="border-right:1px solid #ddd"><span class="fa fa-money gift-item-num-icon" style="color:#609ee9;"></span><div>20</div></div>
          <div><span class="fa fa-graduation-cap gift-item-num-icon" style="color:#30b8e3;"></span></div>
        </div>
      </div><div class="gift">
        <div class="giftimg"><img src="../../../../static/img/logo-symbol.png" alt=""></div>
        <div class="giftname"><span>九拍</span></div>
        <div class="giftbtn"><Button  type="success">使用中</Button></div>
        <div class="giftend">
          <div style="border-right:1px solid #ddd"><span class="fa fa-money gift-item-num-icon" style="color:#609ee9;"></span><div>20</div></div>
          <div><span class="fa fa-graduation-cap gift-item-num-icon" style="color:#30b8e3;"></span></div>
        </div>
      </div><div class="gift">
        <div class="giftimg"><img src="../../../../static/img/logo-symbol.png" alt=""></div>
        <div class="giftname"><span>九拍</span></div>
        <div class="giftbtn"><Button  type="success">使用中</Button></div>
        <div class="giftend">
          <div style="border-right:1px solid #ddd"><span class="fa fa-money gift-item-num-icon" style="color:#609ee9;"></span><div>20</div></div>
          <div><span class="fa fa-graduation-cap gift-item-num-icon" style="color:#30b8e3;"></span></div>
        </div>
      </div><div class="gift">
        <div class="giftimg"><img src="../../../../static/img/logo-symbol.png" alt=""></div>
        <div class="giftname"><span>九拍</span></div>
        <div class="giftbtn"><Button  type="success">使用中</Button></div>
        <div class="giftend">
          <div style="border-right:1px solid #ddd"><span class="fa fa-money gift-item-num-icon" style="color:#609ee9;"></span><div>20</div></div>
          <div><span class="fa fa-graduation-cap gift-item-num-icon" style="color:#30b8e3;"></span></div>
        </div>
      </div>
      <!--结束-->
    </div>
    

</div>
</template>

<script>

export default {
  data(){
    return{
      start:false,
      over:true,
    }
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
    drag(el,bindings){
        el.onmousedown = function(e){
            var disx = e.pageX - el.offsetLeft;
            var disy = e.pageY - el.offsetTop;
            document.onmousemove = function (e){
                el.style.left = e.pageX - disx+'px';
                el.style.top = e.pageY - disx+'px';
            }
            document.onmouseup = function(){
                document.onmousemove = document.onmouseup = null;
            }
        }
    },
    
  },
  directives:{
      drag(el,bindings){
        console.log("1")
          el.onmousedown = function(e){
            console.log(el,bindings)
              var disx = e.pageX - el.offsetLeft;
              var disy = e.pageY - el.offsetTop;
              document.onmousemove = function (e){
                  console.log("2")                  
                  el.style.left = e.pageX - disx+'px';
                  el.style.top = e.pageY - disx+'px';
              }
              document.onmouseup = function(){
                
                  document.onmousemove = document.onmouseup = null;
              }
          }
      },
      test(){
        console.log('1')
      },
  },
  
}
</script>

<style scoped lang='scss'>
.minetoplink{
  display: flex;
  margin-bottom:30px; 
  span{
    color:#287AF2;
    line-height: 30px;
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
        width: 50%;
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

