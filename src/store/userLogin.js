import * as userServ from "@/api/user";

export default {
  namespaced: true,
  state: {
    user: null,
    loading: false,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    async login({ commit }, { username, password }) {
      commit('setLoading', true);
      const user = await userServ.Login(username, password);
      commit('setUser', user);
      commit('setLoading', false);
      return user;
    },
    loginOut({ commit }) {
      commit("setLoading", true);
      userServ.loginOut();
      commit("setUser", null);
      commit("setLoading", false);
    },
    whoAmI({ commit }) {
      commit("setLoading", true);
      const user = userServ.whoAmI();
      commit("setUser", user);
      commit("setLoading", false);
      return user;
    },
  }
}