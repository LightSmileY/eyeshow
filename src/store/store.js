import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    userInfo: {
      id: "-1",
      login_name: "",
      nickName: ""
    },
    postStatus: 0,
    viewUserId: ""
  },

  mutations: {
    ['userInfo'](state, data) {
      state.userInfo = data
    },
    ['postStatus'](state, data) {
      state.postStatus = data
    },
    ['viewUserId'](state, data) {
      state.viewUserId = data
    }
  },

  actions: {
    getUserInfo({
      commit
    }, data) {
      commit('userInfo', data)
    },
    getPostStatus({
      commit
    }, data) {
      commit('postStatus', data)
    },
    getViewUserId({
      commit
    }, data) {
      commit('viewUserId', data)
    }
  }
})