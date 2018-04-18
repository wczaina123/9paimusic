<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
*{
    box-sizing: border-box;
    
}
html{
    font-size:100px;
}
body{
    font-size: 12px;
    -webkit-text-size-adjust:100% !important;
    
}
body,html,#app,.main-box{
    margin:0;padding:0;
    width:100%;
    height:100%;
} 
ul,li{
    margin: 0;padding: 0;list-style: none;
    
}
</style>
