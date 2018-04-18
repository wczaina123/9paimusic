<template>
   <div class="success_div">
        <div id="success">
        <h1><img src="../../assets/duigou.png" alt=""></h1>
        <h2>您已成功充值<span>111</span>金币</h2> 
        <h3>金币将在<span>322</span>分钟内到账</h3>
        <h4>如果有问题请联系官方微信号：<span>九拍</span></h4>
    </div>
   </div>
</template>
<script>
export default {
  name:"Success",
  data(){
      return {

      }
  }
}
</script>

<style lang="scss" scoped>
    *{
        padding:0;
        margin:0;
    }
    body,html{
    	width:100%;
    	height:100%;
    }
    .success_div{
        width:100%;
        height:100%;
        background: #ecf0f3;
    }
    #success{
        width:100%;
        height: auto;
        padding:30px 0 ;
        background:#fff;
        display: flex;
        justify-content: space-around;
        align-items:center;
        flex-wrap:wrap;
        h1{
        	width:100%;
        	text-align:center;
            margin:0 auto;
            img{
            	width:34px;
            	height: 34px;
            }
        }
        h2{
        	width:100%;
        	text-align:center;
            margin:0 auto;
            margin-top:15px;
            color:#654a0c;
            font-size:18px;
            span{
                font-size:22px;
                margin:0 6px;
            }
        }
        h3{
        	width:100%;
        	text-align:center;
            margin:0 auto;
        	height:30px;
        	line-height:30px;
            color:#666;
            font-size:16px;

        }
        h4{
        	width:100%;
        	text-align:center;
            margin:0 auto;
            height: 74px;
            line-height:74px;
            font-size:14px;
            color:#999;
        	font-weight:400;
        }
    }
</style>
