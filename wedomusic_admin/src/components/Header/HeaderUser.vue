<template>
    <div>
        <Poptip width='150'  placement="bottom" v-model='show'>
          <span>张三 <Icon class="icons" type="arrow-down-b" size='20'></Icon></span>
          <div class="api" slot="content">
            <span @click="go_out">退出登陆</span>
          </div>
        </Poptip>
    </div>
</template>
<script>
  export default {
    name: 'header-dropdown-accnt',
    data(){
      return { 
        show:false
      }
    },
    methods:{
      go_out(){
        this.show=false
        localStorage.removeItem('token');   // 清除token
        localStorage.removeItem('right');
        location.reload();   // 强制刷新
      }
    }
  }
</script>

<style lang="scss" scoped>
.icons {
  line-height: 10px;
}
</style>

