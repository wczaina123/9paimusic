<template>
  <div>
    
    <Poptip width='150'  placement="bottom" v-model='show'>
      
            <Badge  count="5">
                <Icon type="ios-bell-outline" size="26" style="color: #000000"></Icon>
            </Badge>
            <div class="api" slot="content">
              <span style="color:#000000">您有 {{itemsCount}} 条未读通知</span>
              <li>a</li>
              <li>a</li>
              <li>a</li>
              <span class="look_more" @click="more_info">查看更多</span>
            </div>
    </Poptip>

  </div>
</template>
<script>
export default {
  name: 'header-dropdown-notif',
  data(){
    return{ 
      itemsCount:5,
      show:false,
    }
  },
  methods:{
    more_info(){
      this.$router.push({path:'/moreinfo'})
      this.show = false
    }
  }
}
</script>
<style lang="scss" scoped>
.look_more {
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: blue;
  
}
</style>

