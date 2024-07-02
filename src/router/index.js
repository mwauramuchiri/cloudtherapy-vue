import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Auth from "../views/Auth.vue";

// User views
import UserRoutes from "./user";

Vue.use(VueRouter);

const routes = [
  // Site routes
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth
  },

  // User route
  ...UserRoutes
];

const router = new VueRouter({
  routes
});

export default router;
