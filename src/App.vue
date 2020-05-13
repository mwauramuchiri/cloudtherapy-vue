<template>
  <div id="app">
    <transition name="fade" mode="out-in" appear>
      <Loading v-if="isLoadingAuth" full-screen />
      <router-view v-else />
    </transition>
  </div>
</template>

<script>
import { auth as firebaseAuth } from "@/utils/firebase";
import { handleAuthChanged } from "@/callbacks/Auth";

// Mixins
import UserMixin from "@/mixins/UserMixin";

export default {
  name: "App",
  mixins: [UserMixin],
  watch: {
    $route() {
      this.waitForUser().then(user => {
        if (user.isNew && this.$route.name !== "userProfile") {
          this.goTo({
            name: "userProfile"
          });
        }
      });
    },
    // [Logged in] Chats to Auth
    async isLoggedIn(newVal) {
      if (!newVal) {
        await this.$nextTick();

        this.goTo("/");
      }
    }
  },
  computed: {
    isLoadingAuth() {
      return this.$store.state.auth.isLoadingAuth;
    },
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    }
  },
  created() {
    firebaseAuth.onAuthStateChanged(handleAuthChanged);
  }
};
</script>

<style lang="scss">
// Global CSS
@import "./assets/css/cloudtherapy.scss";

.bg-img {
  width: 100%;
  background-size: cover;
  background-repeat: none;
}
.bg-img-center {
  background-position: center;
}

.bg-overlay {
  padding: 0;
  height: inherit;
  min-height: initial;
  width: 100%;
  position: relative;
  right: 0;
  left: 0;
}
</style>
