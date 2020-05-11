export default {
  namespaced: true,
  state: {
    isLoading: true,
    chats: [],
    messages: []
  },
  mutations: {
    updateChatProp(state, [prop, value]) {
      state[prop] = value;
    }
  }
};
