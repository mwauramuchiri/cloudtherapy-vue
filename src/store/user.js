export default {
  namespaced: true,
  state: {
    user_: {
      id: 4444,
      name: "Brenda"
    }
  },
  getters: {
    userName(state) {
      return state.user_.name;
    }
  }
};
