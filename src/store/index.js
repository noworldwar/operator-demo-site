import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      wallet: [],
      balance: "",
      nickname: Vue.prototype.$cookies.get("nickname")
    }
  },
  mutations: {
    updateNickname(state, nickname) {
      state.user.nickname = nickname;
      Vue.prototype.$cookies.set("nickname", nickname);
    },
    updateBalance(state, balance) {
      state.user.balance = balance;
    },
    updateWallet(state, wallet) {
      state.user.wallet = wallet;
    }
  }
})
