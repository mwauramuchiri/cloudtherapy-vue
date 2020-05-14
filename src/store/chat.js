import { updateProp } from "./_helpers";

export default {
  namespaced: true,
  state: {
    isLoadingChat: false,
    chats: [],
    messages: [],
    currentChat: {}
  },
  mutations: {
    updateProp
  }
};
