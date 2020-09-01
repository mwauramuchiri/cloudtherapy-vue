import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import VueAnalytics from "vue-analytics";
import App from "./App.vue";
import Loading from "./components/Loading.vue";
import UiMixin from "./mixins/UiMixin";
import vuetify from "./plugins/vuetify";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { formatDate } from "./utils/date";

// Configuration VueAnalytics
Vue.use(VueAnalytics, {
  id: "UA-176953508-1",
   router
});

// Globals
Vue.mixin(UiMixin);

Vue.filter("formatDate", formatDate);

Vue.component("Loading", Loading);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
