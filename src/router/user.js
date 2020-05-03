import UserView from "../views/user/UserView.vue";
import ChatThreads from "../views/user/ChatThreads.vue";
import Therapists from "../views/user/Therapists.vue";
import PeerProfile from "../views/peer/Profile.vue";

import Conversation from "../views/user/Conversation.vue";
import TherapistDetails from "../views/user/TherapistDetails.vue";
import UserDetails from "../views/user/UserDetails.vue";

export default [
  {
    path: "/user",
    name: "UserView",
    component: UserView,
    children: [
      {
        path: "chats",
        name: "ChatThreads",
        component: ChatThreads
      },
      {
        path: "therapists",
        name: "Therapists",
        component: Therapists
      },
      // Peer routes
      {
        path: "profile",
        name: "PeerProfile",
        component: PeerProfile
      }
    ]
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
    path: "/user/therapists/:therapistId",
    name: "TherapistDetails",
    component: TherapistDetails
  }
];
