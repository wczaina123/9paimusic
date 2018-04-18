<!--促销管理列表-->
<template>
    <div>
        <div class="topbox">
            <div class="content big_content content_padding_delete">
                <div class="contentlist" @click="goods"><span class="goodslist">商品列表</span></div>
                <div class="contentlist" @click="order"><span class="orderlist">订单管理</span></div>
                <div class="contentlist" ><span class="promotion">促销管理</span></div>
                <div class="contentlist" @click="categorys"><span class="category">品类管理</span></div>
                <!-- <div class="contentlist" @click="excile"><span class="promotion">报表</span></div>       -->
            </div>
        </div>
        <!--顶部标示-->
        <div class="content  content_model content_padding">
            <ul class="content_uls">
                <li class="content_order topleft bgg" @click="lims">
                    <span>限时促销</span>
                </li>
                <li class="content_order topleft2" @click="coms">
                    <span>套餐</span>
                </li>
            </ul>
            <limit v-if="lim"></limit>
            <com v-if="com"></com>
        </div>

    </div>
</template>

<script>
    import limit from './timelimit'
    import com from './combo'
    export default {
        components:{limit,com},
        data () {
          return {
              lim:true,
              com:false,
          }
      },
    methods:{
        lims(){
            $('.topleft').addClass("bgg").siblings().removeClass("bgg");
            this.lim = true
            this.com = false
        },
        coms(){
            $('.topleft2').addClass("bgg").siblings().removeClass("bgg");
            this.lim = false
            this.com = true
        },
        categorys(){
            this.$router.push({path:'/store/category'})
        },

        goods(){
            this.$router.push({path:'/store'})
        },

        order(){
            this.$router.push({path:'/store/order'})
        },
    },
}
</script>

<style scoped lang='scss'>
    .content_padding_delete{
        padding:0 !important;
    }
    .content_padding .content_uls{
    height: 60px;
    background: #eee;
}

    .content_order {
        float: left;
        height:60px;
        line-height:60px;
        padding:0 12px;
        margin:0;
        cursor:pointer;

    }
    .content_order span{
        font-size:16px;
    }

    .bgg {
        background: rgb(197, 209, 226)
    }
</style>