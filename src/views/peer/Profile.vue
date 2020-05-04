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
        class="--container"
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
        <div class="mt-8 pb-5">
          <v-select :items="form.genders" label="Gender" outlined></v-select>
          <v-select :items="form.genders" label="Age" outlined></v-select>
          <v-select :items="form.genders" label="County" outlined></v-select>
          <v-select
            :items="form.genders"
            label="Sub-County"
            outlined
          ></v-select>
          <v-btn
            x-large
            class="mb-5 mt-5"
            block
            color="primary"
            :disabled="isSavingProfile"
            @click="saveProfile"
          >
            {{ btnText }}
          </v-btn>
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
      isSavingProfile: false,
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
    btnText() {
      if (this.isSavingProfile) {
        return "Saving...";
      }

      if (this.isNewUser) {
        return "Save Profile";
      }

      return "Update Profile";
    }
  },
  methods: {
    saveProfile() {
      this.isSavingProfile = true;

      setTimeout(() => {
        this.isSavingProfile = false;
      }, 1500);
    }
  },
  created() {
    // get form options
    // console.log(this.$store);
    this.loadingPage = false;
  }
};
</script>

<style lang="scss"></style>
