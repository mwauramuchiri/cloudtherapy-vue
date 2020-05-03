import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
// import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

import LoadingSpinner from "./components/LoadingSpinner.vue";
import UiMixin from "./mixins/ui";

// Global files
Vue.mixin(UiMixin);
Vue.component("LoadingSpinner", LoadingSpinner);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
