<template>
  <v-app class="ct-h-100">
    <v-app-bar app fixed light color="white" elevate-on-scroll height="64px">
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

    <v-content>
      <transition name="fade" mode="out-in" appear>
        <!-- LOADING PAGE -->
        <Loading v-if="isLoadingChats">Getting chats </Loading>

        <v-container v-else :class="{ 'fill-height': chats.length === 0 }">
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
                      <v-row>
                        <v-col class="pt-0">
                          <template v-if="chat.isNew">
                            <h5 class="primary--text">New chat</h5>
                          </template>
                          <template v-else>
                            {{ chat.message }}
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
  </v-app>
</template>

<script>
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
  mixins: [UserMixin],
  data() {
    return {
      findingPeers: false
    };
  },
  computed: {
    findingPeersBtnText() {
      return !this.findingPeers ? "Find Peers" : "Working...";
    },
    isLoadingChats() {
      return this.$store.state.chatStore.isLoadingChat;
    },
    chats() {
      return this.$store.state.chatStore.chats || [];
    }
  },
  methods: {
    getOtherUser,
    getTime,
    findPeers() {
      // trigger an overlay or something
      //    loading state
      this.findingPeers = true;

      PeerService.matchPeers().then(() => {
        this.findingPeers = false;
      });
    }
  },
  created() {
    this.waitForUser().then(() => ChatService.getChats());
  }
};
</script>

<style lang="scss"></style>
