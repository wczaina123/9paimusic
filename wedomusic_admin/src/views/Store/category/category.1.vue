<!--品类管理-->
<template>
<div>
    <!--头部导航-->
    <div class="topbox">
        <div class="content big_content">
        <div class="contentlist" @click="goods"><span class="goodslist">商品列表</span></div>
        <div class="contentlist" @click="order"><span class="orderlist">订单管理</span></div>
        <div class="contentlist" @click="pro"><span class="promotion">促销管理</span></div>
        <div class="contentlist" @click="categorys"><span class="category">品类管理</span></div>
        <!-- <div class="contentlist" @click="excile"><span class="promotion">报表</span></div>       -->
        </div>
    </div>
    <!--底部内容-->
    <div class="mainbox" style="margin-top:30px">
        <div class="maintop-one">
            <span>品类管理</span>
        </div>
        <div class="mainstyle">
            <span style="margin-left:30px;color:#287AF2;">
                <i class="fa fa-plus-square-o fa-lg mt-4"></i>
                新增
            </span>
            <span style="color: #7D93B2">
                <Icon type="android-alert"></Icon>
                <span>至多添加五个分类 每个分类可添加五个子分类，拖拽可以排序分类</span>
            </span>
        </div>
        <!--表格-->
        <div>
            <table class="table-list">
                <thead>
                <tr>
                <th style="width:25%;">项目名称</th>
                <th style="width:25%;">图标</th>
                <th style="width:25%;">子分类数</th>
                <th style="width:25%;">操作</th>
                </tr>
                </thead>
                <tbody v-for="res in list_main" :key="res.id">
                <tr >
                    <td style="text-align:center;"  v-if="open_ch" @click="open_child">
                        <Icon type="arrow-right-b" class="icon_style"></Icon>
                        <span>{{res.name}}</span>
                    </td>
                    <td style="text-align:center;" @click="close_child" v-if="child_list">
                        <Icon type="arrow-down-b"></Icon>
                        <span>{{res.name}}</span>
                    </td>
                    
                    <td style="text-align:center;"><img :src="res.cover_url"></td>
                    <td style="text-align:center;">{{res.sub.length}}</td>
                    <td style="text-align:center;" class="acolor">
                    <a>修改</a>
                    <a>删除</a>
                    </td>
                </tr>
                    <!--子项-->  
                        <tr class="child_table" v-for="ress in res.sub" :key="ress.id" :id="'child'+res.id" v-model="test" >
                            <td style="text-align:center; border-right: none;" >{{ress.name}}</td>
                            <td style="text-align:center;border-left: none;" class="acolor">
                                <a>修改</a>
                                <a>删除</a>
                            </td>
                        </tr>


                </tbody>
                
                
            </table>
            <p class="table_bottom_p">
                <i class="fa fa-plus-circle fa-lg mt-4"></i>
                <span>新增</span>
            </p>
        </div>
    </div>
</div>
</template>

<script>
import linkurl from '../../All-commonality/LinkUrl'

export default {
data () {
  return {
      open_ch:true,
      child_list:false,
      list_main:'',
      test:false,
  }
},
mounted(){
    $('.category').css({'color':'#363F4C','font-weight':'bolder'})
    this.get_list()
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
    },

    open_child(){  // 开
        this.open_ch = false
        this.child_list = true
    },
    close_child(){  // 关闭
        this.open_ch = true
        this.child_list = false
    },

    get_list(){
        this.$axios({
          url: linkurl.get_goods_category_list,
          method: 'POST',
          data: {
            token: linkurl.token,
          },
          transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
          }],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(res=>{
            console.log(res.data.data)
            this.list_main = res.data.data
        })
        .catch(err=>{
            console.log("获取分类列表失败",err)
        })
    },


},
}
</script>

<style scoped lang='scss'>

.changestyle{
            display: flex;
            justify-content:space-around;
            a{
                
                line-height: 53px;
                width: 53px;
                color:#287AF2 ;
            }
        }

.table-list{
    tr{
        td{
            height: 60px;
        }
    }
        .child_table{
            display: block;
            width: 400%;
            td{
                border-top: none;

                width: 3%;
            }
        }
        

}



</style>