<template>
   <div id="wrap">
  <p>往期回顾</p> 
  <div class="vaildation" v-for="(item,index) in playback" :key="item.id"> 
   
    <div class="living">
      <div class="living-bg" @click="tabChange(item.id)">
          <img :src="item.cover">
          <div class="txts">
            <span>{{item.title}}</span>
            <h6>{{item.user_name}}</h6>
          </div>  
           <h5>
               <img :src="item.user_headimg">
              <span>{{item.user_name}}</span>
          </h5>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Playblack',
  props: ['playback'],
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    #wrap{
    background:#fff;
  }
    p{
      padding:0.1rem 0 0.3rem 0.1rem;
      margin: 0;
      width: 1.12rem;
      height: 0.32rem;
      font-size:0.16rem;
      color:#000;
      font-weight:600;
    }
  .vaildation{
    margin: 0;
    margin: 0 0 11px 0;
    background: #fff;
    .living{
      .living-bg{
        padding: 0 10px 10px 10px;
        width: 100%;
        height: 2rem;
        overflow: hidden;
        opacity:0.9;
        position: relative;
        position:relative;
        img{
          width: 100%;
          height: 100%;
        }
        .txts{
          color:#fff;
          position: absolute;
          left: 50%;
          top: 50%;
          transform:translate(-50%,-50%);
          text-align:center;
          span{
            font-size:0.24rem;
            font-weight:600;
            text-align: center;
          }
          h6{
            text-align: center;
            margin-top: 5px;
            padding: 0;
            font-size:0.14rem;
          }
          
        }
        h5{
          position:absolute;
          left:0.2rem;
          bottom:0.3rem;
          height:0.2rem;
          font-weight:400;
          margin:0; 
          img{
            width:0.2rem;
            height:100%;
            border-radius:50%;
            margin-bottom: -0.05rem;
          }
          span{
            font-size:0.12rem;
            color:#fff;
          }
        }
        
      }
    }
  }
</style>
