<!-- 整体模版 -->

<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
      <Sidebar :navItems="nav"/>
      <main class="main">
        <!-- <breadcrumb :list="list"/> -->   <!-- 目录 -->
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <!-- <AppAside/> -->   <!-- 右侧侧边栏 -->
    </div>
    <!-- <AppFooter/> -->  <!-- 底部组件 -->
  </div>
</template>

<script>
import nav from '../_nav'
// import { Header as AppHeader, Sidebar, Aside as AppAside, Footer as AppFooter, Breadcrumb } from '../components/'   // 初始化
import { Header as AppHeader, Sidebar, Footer } from '../components/'
import $ from "jquery"
export default {
  name: 'full',
  components: {
    AppHeader,
    Sidebar,
    // AppAside,
    // AppFooter,
    // Breadcrumb
  },
  data () {
    return {
      nav: nav.items
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched
    }
    
  },
  created:function(){
  }
}
</script>
<style lang="scss">
*{
  font-family:"微软雅黑";
}
.sidebar-minimizer,.sidebar-nav,.sidebar .nav{
  background:#3F4B5D;
}
// 正常状态的文字颜色
.sidebar .nav-link, .sidebar .navbar .dropdown-toggle, .navbar .sidebar .dropdown-toggle{
  color:#CCE1FF;
}
// 左边栏
.sidebar{
  background:#596980;

}
.sidebar-nav{
  width:auto !important;
}
// 左边栏划过状态
.sidebar .nav-link:hover, .sidebar .navbar .dropdown-toggle:hover, .navbar .sidebar .dropdown-toggle:hover{
  background:#596980 ;
  color:#fff;
}
// 左边栏点击状态
.sidebar .nav-link.active, .sidebar .navbar .active.dropdown-toggle, .navbar .sidebar .active.dropdown-toggle{
  background:#596980 ;
  color:#fff;
}
//下面按钮
.sidebar .sidebar-minimizer{
  background:#3F4B5D;
}
// 导航栏背景
.app-header.navbar{
  background-color:#fff;
  border-bottom:1px solid #eee;
}

// 导航栏的logo
.app-header.navbar .navbar-brand{
  background-color:#363F4C;
  // width:200px;
}
// icon颜色
.mt-4, .my-4{
  margin-top:0 !important;
  color:#596980;
}
// 页面最大992时
@media screen and (max-width:992px){
  //左边栏宽度
  .sidebar,.nav,.sidebar-nav{
    width:200px !important;
  }
  // 导航栏背景
.app-header.navbar{
  background-color:#3F4B5D;
}
  // 这是跟左边栏一样的那个颜色
  .app-header.navbar .navbar-brand{
  background-color:#3F4B5D;
}
// 这是白色的
//  .app-header.navbar .navbar-brand{
//   background-color:#fff;
//   background-image:url(../../static/img/logo_hei.png);
// }
}
@media screen and (min-width:992px){
  //当页面大于992的时候划过图标
  .sidebar-minimized .sidebar .nav-link:hover, .sidebar-minimized .sidebar .navbar .dropdown-toggle:hover, .navbar .sidebar-minimized .sidebar .dropdown-toggle:hover{
    background:#3F4B5D;
  }
  .sidebar .sidebar-minimizer:hover{
    background-color:#596980;
  }
  .app-header.navbar .navbar-toggler{
    display:none;
  }
 .navbar-toggler-icon{
    cursor: default;
    background-color:red;
  }
.brand-minimized .app-header.navbar .navbar-brand{
  background-color:#596980;
}
.sidebar .nav-link i, .sidebar .navbar .dropdown-toggle i, .navbar .sidebar .dropdown-toggle i {
  font-size:18px;
}
}
</style>

