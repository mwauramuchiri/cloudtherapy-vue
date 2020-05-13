import UserView from "../views/user/UserView.vue";
import ChatThreads from "../views/user/ChatThreads.vue";
import Therapists from "../views/user/Therapists.vue";
import PeerProfile from "../views/peer/Profile.vue";

import Conversation from "../views/user/Conversation.vue";
// import TherapistDetails from "../views/user/TherapistDetails.vue";
import UserDetails from "../views/user/UserDetails.vue";

export default [
  {
    path: "/user",
    name: "UserView",
    component: UserView,
    children: [
      {
        path: "chats",
        alias: "",
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
        name: "userProfile",
        component: PeerProfile
      }
    ]
  },
  {
    path: "/user/chats/details/:chatThreadId",
    name: "UserDetails",
    component: UserDetails,
    props: true
  },
  {
    path: "/user/chats/:chatThreadId",
    name: "Conversation",
    component: Conversation,
    props: true
  },
  {
    path: "/user/therapists/:therapistId",
    name: "TherapistConversation",
    component: Conversation,
    props(route) {
      return {
        therapist: true,
        therapistId: route.params.therapistId
      };
    }
  }
];
