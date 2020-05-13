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
      <Loading v-if="loadingPage" />

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
          <h3 class="text-center">Welcome Back</h3>
        </template>
        <!-- div -->
        <div class="mt-8 pb-5">
          <v-row class="align-start">
            <v-col class="grow-shrink-0">
              <v-text-field
                label="Anonymous name"
                outlined
                :value="userName"
                readonly
              ></v-text-field>
            </v-col>
            <v-col class="shrink" style="padding-top: 18px !important;">
              <v-btn
                :disabled="loadingPage"
                @click="generateName()"
                :loading="loadingPage || isGeneratingName"
                depressed
                large
                color="blue lighten-4"
              >
                Generate
              </v-btn>
            </v-col>
          </v-row>
          <v-select
            :items="form.genders"
            item-text="name"
            item-value="value"
            v-model="userGender"
            label="Gender"
            outlined
          ></v-select>
          <!-- <DatePicker v-model="userDob" label="Date of Birth" /> -->
          <v-text-field
            v-model="userDob"
            label="DOB"
            type="date"
            outlined
            prepend-inner-icon="mdi-calendar"
          ></v-text-field>

          <v-select
            :items="form.counties"
            v-model="userCounty"
            :value="userCounty"
            item-text="name"
            item-value="value"
            label="County"
            outlined
          ></v-select>
          <v-select
            :items="subCounties"
            v-model="userSubCounty"
            label="Sub-County"
            outlined
          ></v-select>

          <v-btn
            x-large
            class="mb-5 mt-5"
            block
            color="primary"
            :disabled="isSavingProfile || !canSaveProfile"
            @click="saveProfile"
          >
            {{ btnText }}
          </v-btn>
        </div>
      </v-container>
    </transition>
    <v-snackbar v-model="openSnackBar" top>
      {{ snackBarMessage }}
      <v-btn color="yellow" text @click="openSnackBar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-sheet>
</template>

<script>
import { mapGetters } from "vuex";
import chance from "chance";
import UserMixin from "@/mixins/UserMixin";
import * as _find from "lodash/find";

// Data
import kenyanCounties from "@/data/kenya_counties";

// Services
import * as UserService from "@/services/UserService";

const _chance = new chance();

export default {
  name: "PeerProfile",
  components: {
    // DatePicker
  },
  mixins: [UserMixin],
  data() {
    return {
      isSavingProfile: false,
      isGeneratingName: false,
      userGender: "male",
      userDob: undefined,
      userCounty: "Nairobi",
      userSubCounty: undefined,
      openSnackBar: false,
      snackBarMessage: "Success!",
      form: {
        genders: [
          {
            name: "Male",
            value: "male"
          },
          {
            name: "Female",
            value: "female"
          }
        ],
        counties: []
      }
    };
  },
  watch: {
    userGender() {
      if (this.loadingPage) return;
      this.generateName();
    },
    userCounty() {
      if (this.loadingPage) return;
      this.userSubCounty = this.subCounties[0];
    }
  },
  computed: {
    // eslint-disable-next-line prettier/prettier
    ...mapGetters("user", [
      'userName'
    ]),
    btnText() {
      if (this.isSavingProfile) return "Saving...";

      if (this.isNewUser) return "Save Profile";

      return "Update Profile";
    },
    subCounties() {
      // eslint-disable-next-line prettier/prettier
      return (_find(kenyanCounties, { name: this.userCounty }) || {}).sub_counties || [];
    },
    canSaveProfile() {
      return (
        this.userDob && this.userCounty && this.userSubCounty && this.userGender
      );
    },
    userData() {
      return {
        name: this.userName,
        gender: this.userGender,
        dob: this.userDob,
        county: this.userCounty,
        subCounty: this.userSubCounty
      };
    }
  },
  methods: {
    prepopulateProfile() {
      return this.waitForUser().then(user => {
        this.userDob = user.dob;
        this.userCounty = user.county;
        this.userSubCounty = user.subCounty;
        this.userGender = user.gender;
      });
    },
    saveProfile() {
      this.isSavingProfile = true;

      UserService.updateUser(this.userData).then(() => {
        this.openSnackBar = true;
        this.isSavingProfile = false;
      });
    },
    async generateName() {
      this.isGeneratingName = true;

      let i = 0;
      const guessesMaxCount = Math.ceil(Math.random() * 10);
      const $this = this;
      // console.log(`let me guess ${guessesMaxCount} times`);

      (async function generate() {
        const name = _chance.name({ gender: $this.userGender });
        $this.$store.commit("user/newUserName", name);

        await $this.$nextTick();

        if (i++ < guessesMaxCount) {
          setTimeout(generate, 250);
        } else {
          await $this.$nextTick();
          $this.isGeneratingName = false;
        }
      })();
    }
  },
  created() {
    this.form.counties = kenyanCounties.map(county => county.name);

    this.prepopulateProfile().finally(() => {
      this.loadingPage = false;
    });
  }
};
</script>

<style lang="scss"></style>
