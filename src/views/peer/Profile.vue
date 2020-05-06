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
          <v-row class="align-start">
            <v-col class="grow-shrink-0">
              <v-text-field
                label="Anonymous name"
                outlined
                :value="userName"
                readonly
              ></v-text-field>
            </v-col>
            <v-col class="shrink">
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
            v-model="userGender"
            label="Gender"
            outlined
          ></v-select>
          <v-slider
            v-model="userAge"
            :thumb-size="24"
            :min="13"
            :max="80"
            thumb-label="always"
            label="Age"
            class="mt-5"
          ></v-slider>
          <v-select
            :items="form.counties"
            v-model="userCounty"
            label="County"
            outlined
          ></v-select>
          <v-select
            :items="form.subCounties"
            v-model="userSubCounty"
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
import chance from "chance";

const _chance = new chance();

export default {
  name: "PeerProfile",
  data() {
    return {
      isNewUser: true,
      isSavingProfile: false,
      isGeneratingName: false,
      userGender: "male",
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
    // get form options
    this.loadingPage = false;
  }
};
</script>

<style lang="scss"></style>
