<template>
  <v-app>
    <v-container fluid>
      <v-row class="text-center mt-8">
        <v-col cols="12">
          <!-- LOGO -->
          CLOUD THERAPY LOGO
        </v-col>

        <v-col cols="12" style="margin-top: 36px;" v-if="!isLoggedIn">
          <v-row vertical align="center" justify="center">
            <v-col cols="12">
              <h1 class="font-weight-bold">Hi There</h1>
              <h3 class="font-weight-light">Let's get started</h3>
            </v-col>

            <transition name="fade" mode="out-in" appear>
              <!-- SOCIAL LOGIN BUTTONS -->
              <v-col cols="12" class="mt-5" v-if="true">
                <v-btn
                  :min-width="228"
                  width="300px"
                  x-large
                  class="mt-8 ct-btn-facebook ct-shadow"
                  @click="signInWithRedirect('facebook')"
                >
                  <v-icon left>mdi-facebook</v-icon>
                  Sign in with Facebook
                </v-btn>
                <div></div>
                <v-btn
                  :min-width="228"
                  width="300px"
                  x-large
                  class="mt-8 ct-btn-twitter ct-shadow"
                  @click="signInWithRedirect('twitter')"
                >
                  <v-icon left>mdi-twitter</v-icon>
                  Sign in with Twitter
                </v-btn>
                <div></div>
                <v-btn
                  :min-width="228"
                  width="300px"
                  x-large
                  class="mt-8 ct-btn-google ct-shadow"
                  @click="signInWithRedirect('google')"
                >
                  <v-icon left>mdi-google</v-icon>
                  Sign in with Google
                </v-btn>
              </v-col>
            </transition>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { signInWithRedirect } from "@/utils/auth";

export default {
  name: "Auth",
  watch: {
    // [Logged in] Auth to chats
    async isLoggedIn(newVal) {
      if (newVal) {
        this.goTo({
          name: "UserView"
        });
      }
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    }
  },
  methods: {
    signInWithRedirect
  },
  mounted() {
    //? Consider moving this to Mixin to allow for plugin redirects to other pages if user is logged in
    if (this.isLoggedIn) {
      this.goTo({
        name: "UserView"
      });
    }
  }
};
</script>

<style lang="scss">
.ct-btn-facebook {
  background-color: #28589c !important;
}
.ct-btn-twitter {
  background-color: #1da1f2 !important;
}
.ct-btn-google {
  background-color: #db4a39 !important;
}

.ct-btn-facebook,
.ct-btn-twitter,
.ct-btn-google {
  color: #fff !important;
}
</style>
