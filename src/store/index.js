import { createStore } from 'vuex'
import userLogin from './userLogin'

export default createStore({
  state: {
    // 存储菜单的路由
    menuRoutes: []
  },
  getters: {
  },
  mutations: {
    setMenuRoutes(state, routes) {
      state.menuRoutes = routes;
    }
  },
  actions: {
    setAsyncMenuRoutes({ commit }, routes) {
      commit('setMenuRoutes', routes);
    }
  },
  modules: {
    userLogin
  }
})
