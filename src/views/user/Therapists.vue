<template>
  <div class="ct-h-100">
    <v-app-bar fixed light color="white" elevate-on-scroll height="86px">
      <a class="ml-5">LOGO</a>
      <v-spacer />
      <div class="mr-5"></div>
    </v-app-bar>

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

      <v-container v-else class="pt-5 --container">
        <!-- div -->
        <div style="min-height: 64px;">
          <v-input v-model="search.value" :loading="search.loading">
            <input
              placeholder="Search for a Therapist"
              class="ct-shadow ct-border-radius ct-searchbar py-5 px-3"
              type="text"
            />
          </v-input>
        </div>

        <!-- THERAPISTS -->
        <h5 class="font-weight-light text--secondary my-5 text-center">
          Tap any therapist to chat with them
        </h5>

        <template v-for="(therapist, index) in therapists">
          <!--  -->
          <v-hover :key="index" v-slot:default="{ hover }" close-delay="100">
            <v-sheet
              :key="index"
              class="ct-transition-fast ct-cursor-pointer mb-4 px-5 pt-2 pb-4 ct-shadow ct-border-radius grey lighten-5"
              :elevation="hover ? 8 : 4"
              @click="
                goTo({ name: 'TherapistDetails', params: { therapistId: id } })
              "
            >
              <div class="d-flex align-start">
                <h3 v-html="therapist.name"></h3>
                <v-spacer />
                <OnlineNotify :online="therapist.online" />
              </div>
              <div class="d-flex mt-2">
                <v-chip
                  :key="id"
                  v-for="{ id, profession } in therapist.professions"
                  dark
                  :ripple="false"
                  class="mr-2 mt-2"
                >
                  {{ profession }}
                </v-chip>
              </div>
            </v-sheet>
          </v-hover>
        </template>
      </v-container>
    </transition>
  </div>
</template>

<script>
import OnlineNotify from "@/components/OnlineNotify.vue";

export default {
  name: "Therapists",
  components: {
    OnlineNotify
  },
  data() {
    return {
      search: {
        value: "",
        loading: false
      },
      therapists: [
        {
          id: 454353,
          name: "Anne Waiguru",
          online: true,
          professions: [
            {
              id: 5554,
              profession: "Depression"
            },
            {
              id: 554,
              profession: "PTSD"
            },
            {
              id: 555,
              profession: "Anxiety"
            }
          ]
        }
      ]
    };
  },
  computed: {
    searchResults() {
      return this.therapists;
    }
  },
  created() {
    this.loadingPage = false;
    setTimeout(() => {}, 1000);
  }
};
</script>

<style lang="scss">
.ct-searchbar {
  font-size: $h4-size;
  height: $h4-size;
  width: 100%;
  line-height: 1.3;
  box-sizing: content-box;
}
</style>
