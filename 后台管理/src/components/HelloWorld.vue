<template>
  <div>
  <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">

   

    <div>
    <el-tab-pane label="成功提现" >
     <success></success>
    </el-tab-pane>
    </div>

    <div>
      <el-tab-pane label="全部">
        <alllist></alllist>
      </el-tab-pane>
    </div>

    <div>
    <el-tab-pane label="提现申请"  name="first">
      <loding></loding>
    </el-tab-pane>
    </div>


    <div>
    <el-tab-pane label="失败提现">
      <defeated></defeated>
    </el-tab-pane>
    </div>



  </el-tabs>



  </div>

  </div>
</template>

<script>
import success from "./success.vue"
import loding from "./loding"
import defeated from "./defeated"
import alllist from "./all"

import axios from "axios"
import linkurl from "./linkurl"
  export default {
    components:{success,loding,defeated,alllist},
    data() {
      return {
        activeName2: 'first',
        pronull:[],
        arrsuce:[],  // 成功
        arrtx:[],   // 体现 
        arrsb:[],   // 失败
        pages:0,
      };
    },
    mounted(){
      // this.getmsg()
      // console.log(this.pages,1111)
    },
    methods: {
      handleClick(tab, event) {
        
      },
      clearmsg:function(){
        var  arr = this.pronull
        var  arrsuce = []
        var  arrtx = []
        var  arrsb = []
        
        for(let i=0;i<arr.length;i++){
          if(arr[i].status == "成功"){ 
            this.arrsuce.push(arr[i])   
          }
          if(arr[i].status == "提现中"){
            this.arrtx.push(arr[i])
          }
          if(arr[i].status == "失败"){
            this.arrsb.push(arr[i])
          }
        }
        // console.log(this.arrsuce,"11111")
      },
      

    }
  };
</script>


<style>
.cell{
  text-align: center;
}
</style>