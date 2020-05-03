<template>
  <v-app>
    <v-content>
      <transition :name="transitionName" appear mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>
    <!-- BOTTOM NAV -->
    <v-bottom-navigation>
      <v-btn :to="{ name: 'ChatThreads' }">
        <span>Chats</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn :to="{ name: 'Therapists' }">
        <span>Therapists</span>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn :to="{ name: 'PeerProfile' }">
        <span>Profile</span>
        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: "UserView",
  data() {
    return {
      transitionMode: "fade" // use slide left|right transitions
    };
  }
};
</script>

<style></style>
