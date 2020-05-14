<template>
  <v-app>
    <transition-group
      class="ct-h-100"
      tag="div"
      name="fade-delay"
      mode="out-in"
      appear
    >
      <!-- LOADING PAGE -->
      <v-container
        key="ct-chat-loading-state"
        class="fill-height"
        v-if="loadingPage"
      >
        <Loading />
      </v-container>

      <template v-else>
        <v-app-bar
          class="ct-shadow ct-app-bar"
          key="ct-chat-top-bar"
          app
          fixed
          color="white"
          height="56px"
        >
          <v-btn
            icon
            title="back to chats"
            class="ml-xs-2 ml-sm-and-up-5"
            @click="goTo({ name: 'ChatThreads' })"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <!-- <v-spacer /> -->
          <v-avatar class="ml-5" size="36" color="grey lighten-2">
            <h5
              class="black--text headline m-0 font-weight-bold"
              style="font-size: 0.875rem !important; opacity: 0.32;"
              v-if="currentChatIsLoaded"
            >
              {{ chat.otherUser.name | initials }}
            </h5>
          </v-avatar>

          <h5 class="ml-3" v-if="currentChatIsLoaded">
            {{ currentChat.otherUser.name }}
          </h5>
          <v-spacer />
          <div class="mr-xs-2 mr-sm-and-up-5">
            <v-menu bottom left>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list dense>
                <v-list-item @click="unmatch">
                  <v-list-item-title>Unmatch</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-app-bar>

        <v-content class="ct-h-100 grey lighten-5" key="ct-chat-content">
          <v-banner single-line sticky v-if="therapist" color="green lighten-5">
            <h4 class="grey--text text--darken-4 font-weight-regular">
              I am here to help. Feel free to call me anytime
            </h4>

            <template v-slot:actions>
              <v-btn text color="yellow accent-4">Call Anne</v-btn>
            </template>
          </v-banner>

          <!-- LOADING CHATS -->
          <v-container class="fill-height" v-if="!currentChatIsLoaded">
            <Loading />
          </v-container>

          <template v-else class=" ct-h-100">
            <!--  // TODO: Get this from the message data -->
            <ChatBubble
              v-for="(chatMessage, i) in chatMessages"
              :key="i"
              :message="chatMessage"
              :isSelf="true"
            />
          </template>
        </v-content>

        <!-- BOTTOM BAR -->
        <v-footer
          key="ct-chat-bottom-bar"
          app
          fixed
          class="elevation-0 justify-center py-5"
          color="grey lighten-3"
        >
          <!-- CHAT TEXTAREA -->
          <!-- CHAT SEND BTN -->
          <ChatInput />
        </v-footer>
      </template>
    </transition-group>
  </v-app>
</template>

<script>
// Components
import ChatInput from "@/components/ChatInput.vue";
import ChatBubble from "@/components/ChatBubble.vue";

// Mixins
import UserMixin from "@/mixins/UserMixin";

// Services
import ChatService from "@/services/ChatService";

export default {
  name: "Conversation",
  components: {
    ChatInput,
    ChatBubble
  },
  props: ["therapist", "therapistId"],
  mixins: [UserMixin],
  data() {
    return {
      messages: []
    };
  },
  watch: {
    $route() {
      this.loadCurrentConverstion();
    }
  },
  computed: {
    //! Not tested
    chatMessages() {
      return this.$store.chatStore.messages;
    },
    currentChat() {
      return this.$store.state.chatStore.currentChat;
    },
    currentChatIsLoaded() {
      return Object.keys(this.currentChat).length > 0;
    }
  },
  methods: {
    loadCurrentConversation() {
      const currentChatThreadId = this.$route.params.chatThreadId;

      // Set active chat
      ChatService.getChatById(currentChatThreadId);

      // Get the chat messages for this chat
      ChatService.getChatMessages(currentChatThreadId);
    },
    unmatch() {
      // TODO: Add functionality ~ Service function missing
    }
  },
  async created() {
    this.waitForUser().then(() => {
      this.loadingPage = false;
    });
  }
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: $lg-width) {
  .v-content {
    // [FooterHeight]px + [ExtraPadding]px
    padding-bottom: 140px !important;
  }
}
</style>
