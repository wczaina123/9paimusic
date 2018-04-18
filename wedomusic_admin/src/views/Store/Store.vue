<template>
<div>
  <div class="topbox">
    <div class="content big_content content_padding_delete">
      <div class="contentlist" @click="goods"><span class="goodslist">商品列表</span></div>
      <div class="contentlist" @click="order"><span class="orderlist">订单管理</span></div>
      <div class="contentlist" @click="pro"><span class="promotion">促销管理</span></div>
      <div class="contentlist" @click="categorys"><span class="category">品类管理</span></div>
      <!-- <div class="contentlist" @click="excile"><span class="promotion">报表</span></div>       -->
    </div>
</div>
<div class="mainbox" style="margin:30px 0;">
<goods v-show="goodslists"></goods>
</div>

</div>
</template>

<script>
import goods from './goodslist/goodslist'

export default {
components:{goods},
data () {
    return {
      goodslists:true,
    }
  },
  mounted(){
    $('.goodslist').css({'color':'#363F4C','font-weight':'bolder'})
  },
  methods:{
    goods(){
      this.$router.push({path:'/store'})
    },
    order(){
      this.$router.push({path:'/store/order'})
    },
    pro(){
      this.$router.push({path:'/store/timelimit'})
    },
    categorys(){
      this.$router.push({path:'/store/category'})
    }
    
  },
}
</script>


<style  lang="scss">
  // @import '../../assets/css/index.scss';
   .content_padding_delete{
    padding:0 !important;
  }
</style>