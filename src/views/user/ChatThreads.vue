<template>
  <v-sheet class="ct-h-100">
    <v-app-bar app fixed light color="white" elevate-on-scroll height="86px">
      <a class="ml-5">LOGO</a>
      <v-spacer />
      <div class="mr-5">
        <v-btn
          large
          class="px-5 text-white"
          color="primary"
          :disabled="findingPeers"
          @click="findPeers()"
          v-if="chats.length"
        >
          {{ findingPeersBtnText }}
        </v-btn>
      </div>
    </v-app-bar>

    <transition name="fade" mode="out-in" appear>
      <!-- LOADING PAGE -->
      <Loading v-if="loadingPage">Getting chats </Loading>

      <v-container
        v-else
        :class="[
          '--container',
          {
            'fill-height': chats.length === 0
          }
        ]"
      >
        <transition name="fade" mode="out-in">
          <!-- IF CHAT EMPTY -->
          <v-row v-if="chats.length === 0">
            <v-col cols="10" offset="1" class="text-center">
              <h2>Find a peer to start a conversation</h2>
              <v-btn
                large
                class="px-5 text-white mt-3"
                color="primary"
                :disabled="findingPeers"
                @click="findPeers()"
              >
                {{ findingPeersBtnText }}
              </v-btn>
            </v-col>
          </v-row>

          <v-list three-line v-else>
            <template v-for="(chat, index) in chats">
              <v-list-item
                :key="index"
                @click="
                  goTo({
                    name: 'Conversation',
                    params: { chatThreadId: chat.id }
                  })
                "
              >
                <v-list-item-avatar size="44" color="green lighten-5">
                  <v-img :src="chat.avatar" v-if="chat.therapist" />
                  <h5
                    class="black--text headline m-0 font-weight-bold"
                    style="font-size: 0.875rem !important; opacity: 0.32;"
                    v-else
                  >
                    {{ chat.name | initials }}
                  </h5>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title class="d-flex align-center pb-2">
                    {{ chat.name }}
                    <v-chip
                      class="ml-3"
                      v-if="chat.therapist"
                      x-small
                      pill
                      color="green white--text lighten-2"
                    >
                      THERAPIST
                    </v-chip>
                  </v-list-item-title>

                  <v-list-item-subtitle v-html="chat.message" />
                  <h6
                    class="grey--text text--darken-1 text-right ma-0"
                    v-html="chat.time"
                  ></h6>
                </v-list-item-content>
              </v-list-item>

              <v-divider :key="`div-${index}`" inset />
            </template>
          </v-list>
        </transition>
      </v-container>
    </transition>
  </v-sheet>
</template>

<script>
export default {
  name: "ChatThreads",
  data() {
    return {
      findingPeers: false,
      chats: [],
      // don't know if we need this as a data prop or computed.
      // Depends on the data for chats
      newChats: []
    };
  },
  filters: {
    initials(name) {
      return name
        .split(" ")
        .map(n => n.slice(0, 1))
        .join("")
        .toUpperCase();
    }
  },
  computed: {
    findingPeersBtnText() {
      return !this.findingPeers ? "Find Peers" : "Working...";
    }
  },
  methods: {
    findPeers() {
      // trigger an overlay or something
      //    loading state
      this.findingPeers = true;

      // ajax
      setTimeout(() => {
        this.findingPeers = false;
      }, 2000);
    }
  },
  created() {
    this.loadingPage = false;
    // this.chats = [];
  }
};
</script>

<style lang="scss"></style>
