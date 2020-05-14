import Vue from "vue";
import Vuex from "vuex";

import userStore from "./user";
import chatStore from "./chat";
import authStore from "./auth";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userStore,
    chatStore,
    authStore
  }
});
