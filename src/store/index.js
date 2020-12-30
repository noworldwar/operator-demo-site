import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
Vue.use(Vuex)

const user = JSON.parse(sessionStorage.getItem('user'))
const initialState = user?{status:{loggedIn:true},user:user}:{status:{loggedIn:false},user:null}

export default new Vuex.Store({
  state: initialState,
  mutations: {
    loginSuccess(state){
      state.status = {loggedIn:true};
      router.push('/')
    },
    logout(state) {
      state.status = {loggedIn:false};
      sessionStorage.clear()
      router.push('/login')
    }
  },
  actions: {
    login(context) {
      context.commit('loginSuccess')
    },
    logoutAction({commit}) {
      commit('logout')
    }
  },
  modules: {
  }
})
