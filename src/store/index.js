import Vue from 'vue'
import Vuex from 'vuex'
import Utils from '../plugins/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user_profile: null,
    bookmark_foods: {},
    latest_foods: {}
  },
  getters: {
    getUserProfile(state) {            
      return state.user_profile
    },
    getBookmarkFoods(state) {
      return state.bookmark_foods
    },
    getLatestFoods(state){
      return state.latest_foods
    }
  },
  mutations: {
    setUserProfile(state, data) {
      state.user_profile = data
    },
    setBookmarkFoods(state, data) {
      state.bookmark_foods = data
    },
    setLatestFoods(state, data) {
      state.latest_foods = data
    }
  },
  actions: {
    loadBookmarkFoods({commit}) {
      let bookmarkFoods = localStorage.getItem('bookmark_foods') || null
      bookmarkFoods = (bookmarkFoods) ? JSON.parse(bookmarkFoods) : {}
      commit('setBookmarkFoods', bookmarkFoods)
    },
    addBookmarkFood({state, commit}, payload) {
      const foodData = Utils.cloneObject(payload)
      let bookmarkFoods = state.bookmark_foods
      const key = foodData.name
      if(bookmarkFoods[key]) return
      foodData.created_ts = new Date().getTime()
      bookmarkFoods[key] = foodData
      localStorage.setItem('bookmark_foods', JSON.stringify(bookmarkFoods))      
      commit('setBookmarkFoods', Utils.cloneObject(bookmarkFoods))
    },
    removeBookmarkFood({state, commit}, foodName) {      
      let bookmarkFoods = state.bookmark_foods      
      if(!bookmarkFoods[foodName]) return
      delete bookmarkFoods[foodName]      
      localStorage.setItem('bookmark_foods', JSON.stringify(bookmarkFoods))
      commit('setBookmarkFoods', Utils.cloneObject(bookmarkFoods))
    },
    // loadLatestFoods({commit}) {
    //   let latestFoods = localStorage.getItem('latest_foods') || null
    //   latestFoods = (latestFoods) ? latestFoods.split(',') : []
    //   commit('setLatestFoods', latestFoods)
    // },
    // addLatestFood({state, commit}, food) {
    //   let latestFoods = state.latest_foods
    //   const existsIndex = latestFoods.indexOf(food)
    //   if(existsIndex > -1) return
    //   latestFoods.unshift(food)
    //   localStorage.setItem('latest_foods', latestFoods.toString())
    //   commit('setLatestFoods', latestFoods)
    // },
    // removeLatestFood({state, commit}, food) {
    //   let latestFoods = state.latest_foods
    //   const existsIndex = latestFoods.indexOf(food)
    //   if(existsIndex < 0) return
    //   latestFoods.splice(existsIndex, 1)
    //   localStorage.setItem('latest_foods', latestFoods.toString())
    //   commit('setLatestFoods', latestFoods)
    // }
  },
  modules: {
  }
})
