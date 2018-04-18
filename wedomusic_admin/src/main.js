// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import qs from 'qs'
import store from './_vuex/store'
import vueFullcalendar from 'vue-fullCalendar'

import '../static/UE/ueditor.config'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'

import axios from 'axios'
import linkurl from '../src/views/All-commonality/LinkUrl'

Vue.prototype.$axios = axios
Vue.prototype.$linkurl = linkurl
Vue.prototype.qs = qs
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.config.productionTip = false   


// axios.interceptors.request.use(
//     config => {
//         let token = localStorage.getItem('token')
//         if (token) {
//             config.headers.Authorization = token;
//         }
//         return config
//     },
//     error => {
//         return Promise.reject(error)
//     }
// );


// const fc = vueFullcalendar;

// module.exports = fc;

// Vue.use(BootstrapVue)
Vue.use(iView)
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
})