import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import List from "../components/List.vue"

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/list',
      component: HelloWorld
    },
    {
      path: '/',
      component: List
    }
  ]
})
