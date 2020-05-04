<template>
  <v-app>
    <v-app-bar app height="86px" color="rgba(255, 255, 255, 0)" elevation="0" />
    <v-content style="padding-top: var(--top-app-bar-height) !important;">
      <transition :name="transitionName" appear mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>
    <!-- BOTTOM NAV -->
    <v-bottom-navigation fixed color="blue">
      <v-btn :to="{ name: 'ChatThreads' }">
        <span>Chats</span>
        <v-icon>mdi-forum-outline</v-icon>
      </v-btn>

      <v-btn :to="{ name: 'Therapists' }">
        <span>Therapists</span>
        <v-icon>mdi-heart-pulse</v-icon>
      </v-btn>

      <v-btn :to="{ name: 'PeerProfile' }">
        <span>Profile</span>
        <v-icon>mdi-account-outline</v-icon>
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
    this.transitionName = "fade";
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
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  position: fixed !important;
  width: 100% !important;
  top: 0px !important;
}

.slide-left-leave-active .--container,
.slide-left-enter-active .--container,
.slide-right-leave-active .--container,
.slide-right-enter-active .--container {
  margin-top: $ct-app-top-bar-height !important;
}

/* >>>>>>> */

.slide-left-enter {
  opacity: 0 !important;
  @include transform(translate(-100vw, 0));
}

.slide-left-enter-to,
.slide-left-leave {
  opacity: 1 !important;
  @include transform(translate(0, 0));
}

.slide-left-leave-to {
  opacity: 0 !important;
  @include transform(translate(100vw, 0));
}

@media screen and (min-width: $lg-width) {
  .slide-left-enter {
    @include transform(translate(-50vw, 0));
  }
  .slide-left-leave-to {
    @include transform(translate(50vw, 0));
  }
}

/* >>>>>>> */

.slide-right-enter {
  opacity: 0 !important;
  @include transform(translate(100vw, 0));
}

.slide-right-enter-to,
.slide-right-leave {
  opacity: 1 !important;
  @include transform(translate(0, 0));
}

.slide-right-leave-to {
  opacity: 0;
  @include transform(translate(-100vw, 0));
}

@media screen and (min-width: $lg-width) {
  .slide-right-enter {
    @include transform(translate(50vw, 0));
  }
  .slide-right-leave-to {
    @include transform(translate(-50vw, 0));
  }
}
/* >>>>>>> */
</style>
