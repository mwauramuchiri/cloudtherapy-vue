import PeerProfile from "../views/peer/Profile.vue";
import ChatThreads from "../views/user/ChatThreads.vue";
import Conversation from "../views/user/Conversation.vue";
import MentalConditions from "../views/user/MentalConditions";
// import TherapistDetails from "../views/user/TherapistDetails.vue";
import UserDetails from "../views/user/UserDetails.vue";
import UserView from "../views/user/UserView.vue";

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
        component: ChatThreads,
      },
      {
        path: "topics",
        alias: "",
        name: "MentalConditions",
        component: MentalConditions,
      },
      // {
      //   path: "patients",
      //   name: "Patients",
      //   component: import(
      //     //? webpackChunkName: "therapist"
      //     "../views/therapist/Patients.vue"
      //   )
      // },
      // {
      //   path: "therapists",
      //   name: "Therapists",
      //   component: Therapists
      // },
      {
        path: "profile",
        name: "userProfile",
        component: PeerProfile,
      },
    ],
  },
  {
    path: "/user/chats/details/:chatThreadId",
    name: "UserDetails",
    component: UserDetails,
    props: true,
  },
  // * peer chat
  {
    path: "/user/chats/:chatThreadId",
    name: "Conversation",
    component: Conversation,
    props: true,
  },
  /* user to therapist chat */
  //  {
  //   path: "/user/therapists/:therapistId",
  //   name: "TherapistConversation",
  //   component: Conversation,
  //   props(route) {
  //     return {
  //       therapist: true,
  //       therapistId: route.params.therapistId,
  //     };
  //   },
  // },
  /* therapist to user chat */
  // {
  //   path: "therapist/patients/:patientId/chat",
  //   name: "PatientConversation",
  //   component: Conversation,
  //   props: true,
  // },

  // * therapist diagnosis
  // {
  //   path: "therapist/patients/:patientId/diagnosis",
  //   name: "PatientDiagnosis",
  //   component: import(
  //     /* webpackChunkName: "therapist" */
  //     "../views/therapist/PatientDiagnosis.vue"
  //   ),
  //   props: true,
  // },
];
