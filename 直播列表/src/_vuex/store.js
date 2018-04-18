import Vue from "vue"
import Vuex from "vuex" 


Vue.use(Vuex)

const state = {
    num : 1
}

const mutations = {
    add:function(state){
        state.num++
    },
}



const store = new Vuex.Store({
    state,mutations
})


export default store