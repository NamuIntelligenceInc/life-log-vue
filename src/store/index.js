import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user_profile: null
  },
  getters: {
    getUserProfile(state) {      
      return state.user_profile
    }
  },
  mutations: {
    setUserProfile(state, data) {
      state.user_profile = data
    }
  },
  actions: {
  },
  modules: {
  }
})
