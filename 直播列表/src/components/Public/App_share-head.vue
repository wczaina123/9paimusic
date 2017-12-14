
<!--这是预告页-->

<template>
  <div class="sharehead">
     <div class="link-top">
          <div class="opabox"> <img id="one" src="../../assets/jiupailogo_100.png" alt="" />
            <span>九拍陪你练</span></div>
          <div class="link-tb">
            <button @click="download">立即下载</button>
          </div>
      </div>
  </div>
</template>

<script>
import linkurl from "../App_linkurl.js"

export default {
  name: 'sharehead',
  data () {
    return{
      
    }

  },
  methods:{
    download:function(){  
    	location.href = linkurl.app_download;
		},
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  .sharehead{
    .link-top{
        width: 100%;
        height: 70px;
        position: fixed;
        left:0;
        bottom:0;
        display: flex;
        justify-content:space-between;
        align-items:center;
        padding:0 15px;
        background:#252525;
        .opabox{
          display:flex;
          align-items:center;
          img{
            width:50px;
            height: 50px;
            border-radius:5px;
            margin-right:10px;
          }
          span{
            height: 70px;
            line-height:70px;
            font-size:18px;
            color:#fff;
          }
        }
      }
      .link-tb{
        display: flex;
        align-items:center;
        button{
          color:#fff;
          background:#da6666;
          height:34px;
          line-height:34px;
          text-align:center;
          border:0;
          border-radius:5px;
          padding:0 19px;
        }
      }
 }
</style>
