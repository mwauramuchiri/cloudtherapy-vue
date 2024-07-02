import { updateProp } from "./_helpers";

export default {
  namespaced: true,
  state: {
    user: {}
  },
  getters: {
    userName(state) {
      return state.user.name;
    }
  },
  mutations: {
    newUserName(state, name) {
      state.user.name = name;
    },
    userData(state, [prop, data]) {
      state.user[prop] = data;
    },
    updateProp
  }
};
