<template>
 <!--  <b-nav-item-dropdown right no-caret>
    <template slot="button-content">
      <i class="fa fa-question-circle fa-lg mt-4"></i>
      <b-badge pill variant="info"></b-badge>
    </template>
    <div>
      <b-dropdown-header tag="div" style="text-align:left" @click="help_info"><strong>帮助</strong></b-dropdown-header>
    </div>
  </b-nav-item-dropdown> -->
</template>
<script>
  export default {
    name: 'header-dropdown-mssgs',
    data(){
      return { itemsCount: 7 }
    },
    methods:{
      help_info(){
        this.$router.push({
          path:'/helpinfo'
        })
      }
    }
  }
</script>
