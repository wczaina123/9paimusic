import Vue from 'vue'
import Router from 'vue-router'

import Applist from '@/components/App_list.vue'

import liveingmain from "../components/App_living/App_living-main.vue"
import playblack from "../components/App_living/App_playblack-main.vue"
import share from "../components/App_living/App_Validation-main.vue"
import Course from "../components/App_Course/App_Course-list.vue"
import Coursemain from "../components/App_Course/App_Coursemain.vue"

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',  
      name: 'Applist',
      component: Applist
    },
    {
      path: '/living/:id',  // 直播0
      name: 'Livingmain',
      component: liveingmain
    },
    {
      path: '/past',  // 回放
      name: 'playblack',
      component: playblack
    },
    {
      path: '/validation/:id',  // 预约
      name: 'Share',
      component: share
    },
    {
      path:'/course/:id',  // 这是教程列表
      name:'Course',
      component:Course,
        children:[
          
        ]
    },
    {
      path:'/course/coursemain/:id',  // 这是教程主页
      name:'Coursemain',
      component:Coursemain
    },
  ]
})
