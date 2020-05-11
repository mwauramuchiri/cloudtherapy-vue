<template>
  <div id="app">
    <transition name="fade" mode="out-in" appear>
      <template v-if="isLoadingAuth">
        <!--  -->
        <h6>Please wait...</h6>
      </template>

      <router-view v-else />
    </transition>
  </div>
</template>

<script>
import { auth as firebaseAuth } from "@/utils/firebase";
import { handleAuthChanged } from "@/callbacks/Auth";

export default {
  name: "App",
  computed: {
    isLoadingAuth() {
      return this.$store.state.auth.isLoadingAuth;
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
