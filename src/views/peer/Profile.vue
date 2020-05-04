<template>
  <v-sheet class="ct-h-100">
    <v-app-bar
      app
      fixed
      light
      color="transparent"
      elevation="0"
      height="86px"
    />

    <transition name="fade" mode="out-in" appear>
      <!-- LOADING PAGE -->
      <v-container
        align="center"
        justify="center"
        class="fill-height"
        v-if="loadingPage"
      >
        <LoadingSpinner center />
      </v-container>

      <v-container
        style="max-width: 440px !important;"
        class="--container mb-5"
        v-else
      >
        <template v-if="isNewUser">
          <h3 class="text-center">Welcome Onboard</h3>
          <h4 class="text-center grey--text text--darken-1 font-weight-light">
            Please complete your profile to continue
          </h4>
        </template>
        <template v-else>
          <h3 class="text-center">Welcome {{ userName }}</h3>
        </template>
        <!-- div -->
        <div class="mt-8">
          <v-select :items="form.genders" label="Gender" outlined></v-select>
          <v-select :items="form.genders" label="Age" outlined></v-select>
          <v-select :items="form.genders" label="County" outlined></v-select>
          <v-select
            :items="form.genders"
            label="Sub-County"
            outlined
          ></v-select>
        </div>
      </v-container>
    </transition>
  </v-sheet>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PeerProfile",
  data() {
    return {
      isNewUser: false,
      userGender: undefined,
      userAge: undefined,
      userCounty: undefined,
      userSubCounty: undefined,
      form: {
        genders: [],
        ages: [],
        counties: [],
        subCounties: []
      }
    };
  },
  computed: {
    // eslint-disable-next-line prettier/prettier
    ...mapGetters("user", [
      'userName'
    ]),
  },
  created() {
    // get form options
    // console.log(this.$store);
    this.loadingPage = false;
  }
};
</script>

<style lang="scss"></style>
