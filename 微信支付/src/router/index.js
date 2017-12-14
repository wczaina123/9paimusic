import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/App_pay-wx/App_login.vue"
import Details from "../components/App_pay-wx/App_details.vue"
import Recode from "../components/App_pay-wx/App_recharge-recode.vue"
import Success from "../components/App_pay-wx/App_success.vue"
// import beecloud from "../components/beecloud_pay.php"

Vue.use(Router)

export default new Router({
  mode : 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path : '/detail',
      name : 'Details',
      component: Details
    },
    {
      path : '/recode',
      name : 'Recode',
      component: Recode
    },
    {
      path : '/success',
      name : 'Success',
      component: Success
    },
   
  ]
})
