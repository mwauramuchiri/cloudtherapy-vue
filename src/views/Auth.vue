<template>
  <v-app>
    <v-container fluid>
      <v-row class="text-center mt-8">
        <v-col cols="12">
          <!-- LOGO -->
          CLOUD THERAPY LOGO
        </v-col>

        <v-col cols="12" style="margin-top: 36px;">
          <v-row vertical align="center" justify="center">
            <v-col cols="12">
              <h1 class="font-weight-bold">Hi There</h1>
              <h3 class="font-weight-light">Let's get started</h3>
            </v-col>

            <transition name="fade" mode="out-in" appear>
              <!-- BUTTONS -->
              <v-col cols="12" class="mt-5" v-if="!loadingPage">
                <v-btn
                  :width="228"
                  x-large
                  class="mt-8 ct-btn-facebook ct-shadow"
                  @click="btnClick('')"
                >
                  <v-icon left>mdi-facebook</v-icon>
                  Facebook
                </v-btn>
                <div></div>
                <v-btn
                  :width="228"
                  x-large
                  class="mt-8 ct-btn-twitter ct-shadow"
                  @click="btnClick('')"
                >
                  <v-icon left>mdi-twitter</v-icon>
                  Twittter
                </v-btn>
                <div></div>
                <v-btn
                  :width="228"
                  x-large
                  class="mt-8 ct-btn-google ct-shadow"
                  @click="btnClick('')"
                >
                  <v-icon left>mdi-google</v-icon>
                  Google
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
export default {
  name: "Auth",
  methods: {
    btnClick() {
      //
    }
  },
  created() {
    this.loadingPage = false;
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
