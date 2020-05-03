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
      transitionName: "fade" // use slide left|right transitions
    };
  },
  beforeRouteUpdate(to, from, next) {
    // change transition name
    console.log(to, this.$route);
    if (
      (to.name === "Therapists" && from.name === "ChatThreads") ||
      (to.name === "PeerProfile" &&
        (from.name === "Therapists" || from.name === "ChatThreads"))
    ) {
      this.transitionName = "slide-right";
    } else if (
      (to.name === "Therapists" && from.name === "PeerProfile") ||
      (to.name === "ChatThreads" &&
        (from.name === "Therapists" || from.name === "PeerProfile"))
    ) {
      this.transitionName = "slide-left";
    } else {
      this.transitionName = "fade";
    }

    next();
  },
  created() {
    if (this.$route.fullPath === "/user") {
      this.$router.replace({ name: "ChatThreads" });
    }
  }
};
</script>

<style lang="scss">
/* >>>>>>> */

.slide-left-leave-active,
.slide-left-enter-active,
.slide-right-leave-active,
.slide-right-enter-active {
  transition-duration: 0.3s;
}

/* >>>>>>> */

.slide-left-enter {
  opacity: 0;
  @include transform(translate(-50vw, 0));
  // transform: translate(-50vw, 0);
}

.slide-left-enter-to,
.slide-left-leave {
  opacity: 1;
  transform: translate(0, 0);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translate(50vw, 0);
}

/* >>>>>>> */

.slide-right-enter {
  opacity: 0;
  transform: translate(50vw, 0);
}

.slide-right-enter-to,
.slide-right-leave {
  opacity: 1;
  transform: translate(0, 0);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translate(-50vw, 0);
}

/* >>>>>>> */
</style>
