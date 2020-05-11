import { updateProp } from "./_helpers";

// import { auth as firebaseAuth } from "@/utils/firebase";

// firebaseAuth.onAuthStateChanged(user=>console.log);

export default {
  namespaced: true,
  state() {
    return {
      isLoggedIn: false,
      isLoadingAuth: true
    };
  },
  mutations: {
    updateProp
  }
};
