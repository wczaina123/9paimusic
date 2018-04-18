<template>
  <header class="app-header navbar">
    
    <div class="navbar-brand"></div>
    
    <div class="headr_box">
      <div class="headrs_box">
          <span><HeaderAddInfo/></span>
          <span><HeaderInfo/></span>
          <span><HeaderUser/></span>
      </div>
    </div>
    
  </header>
</template>
<script>
import HeaderAddInfo from './HeaderAddInfo.vue'
import HeaderUser from './HeaderUser.vue'
import HeaderInfo from './HeaderInfo.vue'
import HeaderHelp from './HeaderHelp.vue'
export default {
  name: 'header',
  components: {
    HeaderUser,
    HeaderAddInfo,
    HeaderInfo,
    HeaderHelp,
  },
  methods: {
    sidebarToggle (e) {
      // console.log("收缩按钮")
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      // console.log(e)
      e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    },
    asideToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    }
  }
}
</script>

<style lang="scss" scoped>
  .headr_box{
    width: 200px;
    position: absolute;
    right: 0;
  }
  .headrs_box{
    display: flex;
    justify-content: space-between;
    span{
      width: 100px;
      text-align: center;
    }
  }
</style>
