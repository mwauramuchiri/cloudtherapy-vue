<template>
  <v-app>
    <v-container align="center" fluid class="fill-height">
      <v-row class="text-center" vertical align="center" justify="center">
        <v-col>
          <!-- LOGO -->
        </v-col>

        <v-col style="margin-top: 80px;">
          <v-row vertical align="center" justify="center">
            <v-col>
              <h3 class="font-weight-bold">Hi There</h3>
              <h5 class="font-weight-light">Let's get started</h5>
            </v-col>

            <transition name="fade" mode="out-in" appear>
              <!-- BUTTONS -->
              <v-col class="mt-5" v-if="!loading">
                <v-btn class="mt-5" @click="btnClick('')"></v-btn>
                <v-btn class="mt-5" @click="btnClick('')"></v-btn>
                <v-btn class="mt-5" @click="btnClick('')"></v-btn>
              </v-col>
            </transition>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style lang="scss"></style>

<script>
export default {
  name: "Auth",
  methods: {
    btnClick() {
      //
    }
  }
};
</script>
