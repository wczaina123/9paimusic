import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import linkurl from '../views/All-commonality/LinkUrl'



Vue.use(Vuex);
let Base64 = require('js-base64').Base64;

const state = {
    
    uptoken:"",  // oss token
    login_meg:'',
    token:'',
    recommend:'',
    campus:true,
    school:false,

}

const mutations={


    token(state){   // 获取osstoken
        axios({
            url: 'http://service.9beats.com/getalisign.php',
            method: 'get',
            data: {},
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(res=>{
            state.uptoken = res.data
            // console.log(res.data)
          })
    },

    login_msg(state,obj){
        state.login_meg = obj
        // console.log(state.login_meg)
    },

    login(state){  // 登陆
        state.login_meg.err.destroy()  
        axios({
            url: 'http://test_duolaixue_admin.9beats.com/login',
            method: 'post',
            data: {
                phone:state.login_meg.phone,
                password:state.login_meg.password,
            },
            transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
          })
          .then(res=>{
            if(res.data.token){
                state.token = res.data.token
                localStorage.setItem('token',state.token)    // 拿到token
                let token = res.data.token   // 判断校区还是机构
                let a = token.split('==')[1]+'==.'
                let b = JSON.parse(Base64.decode(a))
                console.log(b)
                if(b.school==0){  // 机构                    
                    console.log('我是机构，我在vuex里')
                    state.school = 0
                    localStorage.setItem('right',state.school) 
                }else{            // 校区
                    console.log('我是校区，我在vuex里')                    
                    state.school = 1
                    localStorage.setItem('right',state.school) 
                }
                state.login_meg.router.push({path:'/index'})
                
            }else{
                state.login_meg.err.error('账号或密码错误');
            }
          })
    },

    get_recommend_list(state){   // 获取推荐位列表
        axios({
            url: linkurl.get_recommend_module_content_all_list,
            // url: 'http://test_duolaixue_admin.9beats.com/get_recommend_module_content_all_list',
            method: 'post',
            data: {
                token: localStorage.getItem('token'),
                type_id:1,
            },
            transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
          })
          .then(res=>{
            state.recommend = res.data.data
            console.log(state.recommend,'stor')
          })
    },

}

const actions ={

    get_token({commit}){   // 获取osstoken
        commit('token')
    },

    log_in({commit}){
        commit('login')
    },

    get_recommend({commit}){
        commit('get_recommend_list')
    }

    

}

const store = new Vuex.Store({
	state,mutations,actions
})



export default store