import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Auth from "../views/Auth.vue";

// User views
import UserViews from "./user";

// Therapist views
import TherapistProfile from "../views/therapist/Profile.vue";
import Diagnosis from "../views/therapist/Diagnosis.vue";

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
  ...UserViews,

  // Therapist routes
  {
    path: "/therapist/profile",
    name: "TherapistProfile",
    component: TherapistProfile
  },
  {
    path: "/therapist/diagnosis",
    name: "Diagnosis",
    component: Diagnosis
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
