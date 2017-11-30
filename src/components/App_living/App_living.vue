
<template>
<div>
   <div class="apppast" v-for="(items,index) in living" :key="items.id">  
    <div class="living">
      <div class="living-bg" @click="tabchange(items.id)">
        <button>直播中</button>
          <div class="txts">
            <span>{{items.title}}</span>
            <h6>
               <img  :src="items.user_headimg" />
              <span>{{items.user_name}}</span>
            </h6>
            <p><span>{{items.p_number}}</span>人观看</p >
          </div>
        <img  :src="items.cover" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Living',
  props:['living'],
  data () {
    return {
      
    }
  },
  methods:{

    tabchange:function(id){
      this.$router.push({path:'living/'+id})
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.apppast{
  margin: 0;
  padding: 0 0 0.1rem 0;
  background: #ecf0f3;
    button{
      position: absolute;;
      top: 0.1rem;
      left: 0.1rem;
      width: 0.5rem;
      height: 0.18rem;
      line-height:0.18rem;
      text-align:center;
      background: #da6666;
      font-size: 0.1rem;
      border: none;
      color: white;
      font-weight: normal;
      border-radius:0.03rem;
    }
  .living{
    .living-bg{
      background: #feffff;
      width: 100%;
      height: 2.22rem;
      overflow: hidden;
      opacity:0.9;
      position: relative;
      img{
        border:none;width: 100%;top:0;height: 100%;
      }
      .txts{
        position: absolute;
        top: 1.4rem;
        left: 0.1rem;
        color: white;
        width:100%;
        height:auto;
        span{
          height:0.36rem;
          line-height: 0.36rem;
          font-size: 0.16rem;
        }
    h6{
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
      }
    }
    p{
      position:absolute;
      right:0.2rem;
      bottom:-0.28rem;
      font-size:0.12rem;
      span{
        font-size:0.12rem;
      }
    }
  }
  }
  }
}
</style>
