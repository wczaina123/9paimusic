<template>
<Poptip width='150'  placement="bottom" v-model='show'>
      <div class="add_info">
        <Icon type="plus" style="color:#000000"></Icon>
      </div>
      <div class="api" slot="content" @click="add_info">
            <span id="add_span">增加通知</span>
      </div>
</Poptip>
</template>
<script>
  export default {
    name: 'header-dropdown-tasks',
    data(){
      return{
        show:false
      }
    },
    methods:{
      add_info(){
        this.$router.push({path:'/addinfo'})
        this.show = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  #add_info{
    width: 50px;
    height: 50px;
    font-size: 16px;
  }
  #add_span{
    color: #888;
  }
</style>