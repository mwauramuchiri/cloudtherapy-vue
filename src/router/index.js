import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Auth from "../views/Auth.vue";

// User views
import ChatThreads from "../views/user/ChatThreads.vue";
import Conversation from "../views/user/Conversation.vue";
import Therapists from "../views/user/Therapists.vue";
import TherapistDetails from "../views/user/TherapistDetails.vue";
import UserDetails from "../views/user/UserDetails.vue";

// Peer views
import PeerProfile from "../views/peer/Profile.vue";

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

  // User routes
  {
    path: "/user/chats",
    name: "ChatThreads",
    component: ChatThreads
  },
  {
    path: "/user/chats/details/:chatThreadId",
    name: "UserDetails",
    component: UserDetails
  },
  {
    path: "/user/chats/:chatThreadId",
    name: "Conversation",
    component: Conversation
  },
  {
    path: "/user/therapists",
    name: "Therapists",
    component: Therapists
  },
  {
    path: "/user/therapists",
    name: "Therapists",
    component: Therapists
  },
  {
    path: "/user/therapists/:therapistId",
    name: "TherapistDetails",
    component: TherapistDetails
  },

  // Peer routes
  {
    path: "/peer/profile",
    name: "PeerProfile",
    component: PeerProfile
  },

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
  routes
});

export default router;
