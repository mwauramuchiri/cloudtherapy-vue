<template>
  <v-app>
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
      <v-avatar
        class="ml-5"
        size="36"
        :color="
          `${currentChatIsLoaded ? 'primary lighten-3' : 'grey lighten-2'}`
        "
      >
        <h5
          class="black--text headline m-0 font-weight-bold"
          style="font-size: 0.875rem !important; opacity: 0.54;"
          v-if="currentChatIsLoaded"
        >
          {{ currentChat.otherUser.name | initials }}
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

    <v-content
      class="ct-h-100 grey lighten-5"
      key="ct-chat-content"
      id="chat-thread-container"
    >
      <!-- CHATS EMPTY -->
      <v-container class="fill-height" v-if="!chatMessages.length" id="bgConversation">
  
        
        <ConversationStarters />

        <v-alert
        class="d-flex justify-center grow mx-auto"
          dense
          color="primary"
          icon="mdi-information-outline"
          text
          outlined
        >
          {{ startTip }}
        </v-alert>
      </v-container>

      <div v-else class=" ct-h-100">
        <ChatBubble
          v-for="(chatMessage, i) in chatMessages"
          :key="i"
          :message="chatMessage"
          :isSelf="isSelf(chatMessage)"
        />
      </div>
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
      <ChatInput/>
    </v-footer>
  
    <v-snackbar v-model="openSnackBar" top>
      {{ snackBarMessage }}
    </v-snackbar>
  </v-app>
</template>

<script>
// Components
import ChatInput from "@/components/ChatInput.vue";
import ChatBubble from "@/components/ChatBubble.vue";
import ConversationStarters from "@/components/ConversationStarters.vue";

// Mixins
import UserMixin from "@/mixins/UserMixin";
import ChatMixin from "@/mixins/ChatMixin";

// Services
import ChatService from "@/services/ChatService";

// Utils
import { isSelf } from "@/utils/chat";
import { getRandomNumInRange } from "@/utils/random";

// Lang
import { tips } from "@/lang";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Conversation",
  components: {
    ChatInput,
    ChatBubble,
    ConversationStarters
  },
  data() {
    return {
      openSnackBar: false,
      snackBarMessage: "",
    };
  },
  props: ["therapist", "therapistId"],
  mixins: [UserMixin, ChatMixin],
  watch: {
    $route(){
      this.loadCurrentConversation();
    }
  },
  computed: {
    chatMessages() {
      return this.$store.state.chatStore.messages;
    },
    /** Tip for the user when the conversation is new */
    startTip(){
      const conversationTips = tips.conversation;
      const tipIndex = getRandomNumInRange(0,conversationTips.length);

      return conversationTips[tipIndex];
    }
  },
  methods: {
    isSelf,
    //TODO: Check this implementation and hookt his up to a card with a conversation starter tip
    setConversationStarter(conversationStarter){
      this.$emit('setMessage', conversationStarter);
    },
    loadCurrentConversation() {
      ChatService.getChatById(this.currentChatThreadId);

      // Get the chat messages for this chat
      ChatService.getChatMessages(this.currentChatThreadId,null,
        (chatMessages)=>{
          // Update the store
          this.$store.commit("chatStore/updateProp", {
            name: "messages",
            value: chatMessages
          });
        }
      );
    },
    unmatch() {
      this.snackBarMessage = "Unmatching...";
      this.openSnackBar = true;

      ChatService.unmatch(this.currentChatThreadId)
      .then(() => {
        this.openSnackBar = false;
        this.goTo({
          name: "ChatThreads"
        });
      });
    }
  },
  async created() {
    this.waitForUser().then(() => {
      this.loadCurrentConversation();
      document.title = `Conversation - Cloud Therapy`;
      this.loadingPage = false;
    });
  },
  mounted() {
    const $chatThreadContainer = document.getElementById("chat-thread-container");
    // Scroll to last message
    const myObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        // Only scroll if chat messages were found
        if(this.chatMessages.length){
          window.scrollTo(0, entry.contentRect.height);
        }
      });
    });

    myObserver.observe($chatThreadContainer);   
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

#chat-thread-container {
  width: 100%;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
}

#bgEmptyConversation{
  width:100%;
}

#bgConversation::before{
  content: ' ';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("../../../public/img/illustrations/online_discussion.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x:right;
  opacity: 0.25;
   
}
</style>
