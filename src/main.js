import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@mdi/font/css/materialdesignicons.css";

import UiMixin from "./mixins/UiMixin";

import { formatDate } from "./utils/date";

import Loading from "./components/Loading.vue";

// Globals
Vue.mixin(UiMixin);

Vue.filter("formatDate", formatDate);

Vue.component("Loading", Loading);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
