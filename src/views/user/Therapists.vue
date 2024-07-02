<template>
  <v-app class="ct-h-100">
    <v-app-bar app fixed light color="white" elevate-on-scroll height="64px">
      <a class="ml-5"><AppLogo /></a>
      <v-spacer />
      <div class="mr-5"></div>
    </v-app-bar>

    <v-content>
      <transition name="fade" mode="out-in" appear>
        <!-- LOADING PAGE -->
        <v-container
          align="center"
          justify="center"
          class="fill-height"
          v-if="loadingPage"
        >
          <Loading />
        </v-container>

        <v-container v-else class="pt-5">
          <v-dialog v-model="dialog" max-width="290">
            <v-card>
              <v-card-title class="headline"></v-card-title>

              <v-card-text>
                {{ dialogMessage }}
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="green darken-1" text @click="dialogDecline()">
                  Decline
                </v-btn>

                <v-btn color="green darken-1" text @click="dialogOnAccept()">
                  Okay
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- SEARCHBAR -->
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
          <v-row>
            <v-col
              cols="12"
              :key="`th-${index}`"
              v-for="(therapist, index) in therapists"
            >
              <!--  -->
              <v-hover v-slot:default="{ hover }" close-delay="100">
                <v-sheet
                  class="ct-transition-fast ct-cursor-pointer mb-4 px-5 pt-2 pb-4 ct-shadow ct-border-radius grey lighten-5"
                  :elevation="hover ? 8 : 4"
                  @click="clickTherapist(therapist.id, therapist.name)"
                >
                  <div class="d-flex align-start">
                    <h3 v-html="therapist.name"></h3>
                    <v-spacer />
                    <OnlineNotify :online="therapist.online" />
                  </div>
                  <div class="d-flex mt-2">
                    <v-chip
                      :key="`${therapist.id}-${id}`"
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
            </v-col>
          </v-row>
        </v-container>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import OnlineNotify from "@/components/OnlineNotify.vue";
import AppLogo from "@/components/AppLogo.vue";

export default {
  name: "Therapists",
  components: {
    OnlineNotify,
    AppLogo
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
      ],
      dialog: false,
      dialogOnAccept: () => {},
      dialogMessage: "Chat with therapist?"
    };
  },
  computed: {
    searchResults() {
      return this.therapists;
    }
  },
  methods: {
    clickTherapist(therapistId, therapistName) {
      this.dialog = true;

      this.dialogOnAccept = () => {
        this.goTo({
          name: "TherapistConversation",
          params: { therapistId }
        });
      };

      this.dialogMessage = `Chat with ${therapistName}?`;
    },

    async dialogDecline() {
      this.dialog = false;
      this.dialogOnAccept = () => {};

      await this.$nextTick();
      await this.$nextTick();

      setTimeout(() => {
        this.dialogMessage = "Chat with therapist?";
      }, 800);
    }
  },
  created() {
    document.title = "Therapists - Cloudtherapy";
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
