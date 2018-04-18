<template>
  <header class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <b-link class="navbar-brand" to="#"></b-link>
    <button class="navbar-toggler sidebar-toggler d-md-down-none mr-auto" type="button" @click="sidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <b-navbar-nav class="ml-auto">
      <b-nav-item class="d-md-down-none">
      <!-- 加号 添加通知-->
        <HeaderAddInfo/>
      </b-nav-item>
      <b-nav-item class="d-md-down-none">
        <!-- 通知 -->
        <HeaderInfo/>
      </b-nav-item>
      <b-nav-item class="d-md-down-none">
      <!-- 帮助 -->
        <HeaderHelp/>
      </b-nav-item>
      <b-nav-item class="d-md-down-none">
      <!-- 用户信息 -->
      <HeaderUser/>
      </b-nav-item>
    </b-navbar-nav>
    <!-- <button class="navbar-toggler aside-menu-toggler d-md-down-none" type="button" @click="asideToggle">
      <span class="navbar-toggler-icon"></span>
    </button>  -->
  </header>
</template>
<script>
import HeaderAddInfo from './Header/HeaderAddInfo.vue'
import HeaderUser from './Header/HeaderUser.vue'
import HeaderInfo from './Header/HeaderInfo.vue'
import HeaderHelp from './Header/HeaderHelp.vue'
export default {
  date(){
    return{
      
    }
  },
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
    // asideToggle (e) {
    //   e.preventDefault()
    //   document.body.classList.toggle('aside-menu-hidden')
    // }
  }
}
</script>
