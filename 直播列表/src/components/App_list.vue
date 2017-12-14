<template>
  <div class="Applist">
    <Appliving :living="living"></Appliving>
    <AppVaildation :preparation="preparation"></AppVaildation>
    <!-- <Appplayblack :playback="playback"></Appplayblack> -->
    
  </div>
</template>

<script>

import Appliving from "../components/App_living/App_living"
import Appplayblack from "../components/App_living/App_playblack"
import AppVaildation from "../components/App_living/App_Validation"

import linkurl from "./App_linkurl.js"
import axios from 'axios'

export default {
  name: 'Applist',
  components:{Appliving,Appplayblack,AppVaildation},
  data () {
    return {
      username:"",
      password:"",
      living:[],  // 直播
      playback:[], //   回放
      preparation:[], // 预告页

    }
  },
  mounted:function(){
    console.log(this.$store)
    this.test()
  },
  methods:{
    test:function(){
      // 直播列表信息
      axios({
        url: linkurl.app_list,
        method: 'post',
        data: {
          userid: this.username,
          page: this.password
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
      .then(this.GetdateSucc.bind(this))
      .catch(this.GetdateErr)
    },
    GetdateSucc:function(res){  // 传递 直播信息
      // console.log(res)
      this.living = res.data.liveing;
      this.playback = res.data.playback;
      this.preparation = res.data.preparation;
      
    },
    GetdateErr:function(error){
      console.log("获取后直播列表数据失败")
    }, 
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Applist{
   background: #ecf0f3;
   font-size: 0.12rem;
  }
</style>
