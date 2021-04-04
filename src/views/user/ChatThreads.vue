<template>
  <v-app class="ct-h-100">
    <v-app-bar app fixed light color="white" elevate-on-scroll height="64px">
      <a class="ml-5"><AppLogo /></a>
      <v-spacer />
      <div class="mr-5">
        <v-btn
          depressed
          rounded
          class=" text-white"
          color="primary"
          :disabled="findingPeers || findingPeersDisabled"
          @click="findPeers()"
          v-if="chats.length"
        >
          <v-icon>{{ findingPeersBtnIcon }}</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-content>
      <transition name="fade" mode="out-in" appear>
        <!-- LOADING PAGE -->
        <Loading v-if="isLoadingChats">Getting chats </Loading>

        <v-container v-else class="fill-height">
          <transition name="fade" mode="out-in">
            <!-- IF CHAT EMPTY -->
            <v-row v-if="chats.length === 0" class="mx-auto">
              <v-col cols="12"  class="text-center">
                 <img src="/img/illustrations/sharing_articles.svg" alt="Find someone to talk to" id="bgChatThreads"/>
                <h3>Find someone to talk to</h3>
                <p>CloudTherapy is a safe space for you to anonymously share with your peers</p>
                <v-btn         
                  class="px-5 text-white mt-3 w-16rem"
                  color="primary"
                  :disabled="findingPeers || findingPeersDisabled"
                  @click="findPeers()"
                  id="btnFindPeers"
                >
                  {{ findingPeersBtnText }}
                </v-btn>
              </v-col>
            </v-row>

            <v-list id="chatThreadList" three-line v-else>
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
                    <!-- <v-img :src="chat.avatar" v-if="chat.therapist" /> -->
                    <h5
                      class="black--text headline m-0 font-weight-bold"
                      style="font-size: 0.875rem !important; opacity: 0.32;"
                    >
                      {{ chat.otherUser.name | initials }}
                    </h5>
                  </v-list-item-avatar>

                  <v-list-item-content class="align-items-start">
                    <v-list-item-title class="d-flex align-center">
                      {{ chat.otherUser.name }}
                      <!-- <v-chip
                        class="ml-3"
                        v-if="chat.therapist"
                        x-small
                        pill
                        color="green white--text lighten-2"
                      >
                        THERAPIST
                      </v-chip> -->
                    </v-list-item-title>

                    <!-- Chat message -->
                    <v-list-item-subtitle class="pb-0 align-items-start">
                      <v-row class="mt-0">
                        <v-col class="pt-0">
                          <template v-if="chat.isNew">
                            <h5 class="primary--text">New chat</h5>
                          </template>
                          <template v-else>
                            {{ chat.lastMessage.text | truncateString }}
                          </template>
                        </v-col>

                        <v-col class="shrink pt-0">
                          <h6 class="grey--text text--darken-1 text-right ma-0">
                            {{ getTime(chat.dateUpdated.seconds) }}
                          </h6>
                        </v-col>
                      </v-row>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider :key="`div-${index}`" inset />
              </template>
            </v-list>
          </transition>
        </v-container>
      </transition>
    </v-content>

    <v-snackbar v-model="openSnackBar" bottom>
      {{ snackBarMessage }}
    </v-snackbar>
  </v-app>
</template>

<script>
import AppLogo from "@/components/AppLogo.vue";

// Mixins
import UserMixin from "@/mixins/UserMixin";

// Services
import PeerService from "@/services/PeerService";
import ChatService from "@/services/ChatService";

// Utils
import { getOtherUser } from "@/utils/chat";
import { getTime } from "@/utils/date";

export default {
  name: "ChatThreads",
  components: {
    AppLogo
  },
  mixins: [UserMixin],
  data() {
    return {
      findingPeers: false,
      findingPeersDisabled: false,
      openSnackBar: false,
      snackBarMessage: ""
    };
  },
  computed: {
    findingPeersBtnText() {
      if (this.findingPeersDisabled) return "matching closed";
      return !this.findingPeers ? "Start a conversation" : "Finding peers...";
    },
    findingPeersBtnIcon(){
      if (this.findingPeersDisabled) return "mdi-clock-alert-outline";
      return !this.findingPeers ? "mdi-comment-plus-outline" : "mdi-comment-processing-outline";
    },
    isLoadingChats() {
      return this.$store.state.chatStore.isLoadingChat;
    },
    chats() {
      return this.$store.state.chatStore.chats || [];
    }
  },
  filters: {
    truncateString(text, desiredLength = 80) {
      let truncated = text.substring(0, desiredLength);
      if (text.length >= 80) {
        truncated += "...";
      }

      return truncated;
    }
  },
  methods: {
    getOtherUser,
    getTime,
    findPeers() {
      // trigger an overlay or something
      //    loading state
      this.findingPeers = true;

      PeerService.matchPeers().then(({ data: response }) => {
        this.findingPeers = false;

        this.snackBarMessage = response.message;
        this.openSnackBar = true;

        this.findingPeersDisabled = !!response.data.count;

        if (this.findingPeersDisabled) {
          setTimeout(() => {
            this.findingPeersDisabled = false;
          }, 60000);
        }
      });
    }
  },
  created() {
    document.title = "Chats - Cloud Therapy";
    this.waitForUser().then(user =>
      ChatService.getChats(
        user.uid,
        // Before chat check begins
        () => {
          this.$store.commit("chatStore/updateProp", {
            name: "isLoadingChat",
            value: true
          });
        },
        // Once chats are found
        chats => {
          // Update the chat store
          this.$store.commit("chatStore/updateProp", {
            name: "chats",
            value: chats
          });

          this.$store.commit("chatStore/updateProp", {
            name: "isLoadingChat",
            value: false
          });
        }
      )
    );
  }
};
</script>

<style lang="scss">
  h3{
    line-height: 200%;
  }

  #btnFindPeers{
    height:3.6rem;
    min-width:18rem;
    border-radius: 3rem !important;
  }

  #bgChatThreads {
    opacity: 0.8;
    width: 100%;
    min-width:18rem;
    max-width: 45rem;
    max-height: 50vh;
  }

  #chatThreadList{
    width: 100%;
    height: 100%;
  }
</style>
