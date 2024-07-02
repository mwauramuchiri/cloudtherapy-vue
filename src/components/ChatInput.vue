<template>
  <!-- <v-textarea></v-textarea> -->
  <v-sheet
    outline
    color="transparent"
    class="d-inline-flex px-2 align-end chat-input"
  >
    <v-textarea
      id="chat-input"
      ref="chat-input"
      hide-details
      autofocus
      dense
      auto-grow
      full-width
      rows="1"
      min-height="36px"
      max-height="108px"
      row-height="36px"
      placeholder="Type message"
      class="chat-input__textarea mx-3 flex-grow-1"
      v-model="text"
    >
    </v-textarea>

    <v-btn
      icon
      @click="sendText()"
      :color="textIsEmpty ? 'grey' : 'blue'"
      class="flex-grow-0"
      :disabled="textIsEmpty"
    >
      <v-icon>mdi-send</v-icon>
    </v-btn>
  </v-sheet>
</template>

<script>
// Components
import _debounce from "lodash/debounce";

// Mixins
import ChatMixin from "@/mixins/ChatMixin";

// Services
import ChatService from "@/services/ChatService";

// Utils
import { getCurrentUser, getOtherUser } from "@/utils/chat";

// Event bus
import EventBus from "@/bus";

export default {
  name: "ChatInput",
  mixins: [ChatMixin],
  data() {
    return {
      inputCursorPos: [0, 0],
      text: ""
    };
  },
  watch: {
    text: _debounce(async function() {
      await this.$nextTick();

      const input = this.$refs["chat-input"].$el.querySelector("textarea");
      this.inputCursorPos = [input.selectionStart, input.selectionEnd];
    }, 150)
  },
  computed: {
    textIsEmpty() {
      const textWithoutSpaces = this.text.replace(/\s+/g, '');
      return textWithoutSpaces.length === 0;
    }
  },
  methods: {
    sendText() {
      if (this.textIsEmpty || !this.currentChatIsLoaded) return;

      const { uid: fromUserId } = getCurrentUser(this.currentChat);
      const { uid: toUserId } = getOtherUser(this.currentChat);

      const messageData = {
        message: {
          from: fromUserId,
          to: toUserId,
          text: this.text
        }
      };

      // Empty the text message before sending it out
      this.text = "";

      return ChatService.sendMessage(
        this.currentChatThreadId,
        messageData
      );
    }
  },
  created(){
    EventBus.$on('conversationStarterSelected',textReceived=>{
      this.text = textReceived
    })
  }
};
</script>

<style lang="scss">
.chat-input {
  border-radius: $ct-border-radius !important;
  // border: 1px solid rgba($color: #000000, $alpha: 0.15) !important;
  // border-color: rgba($color: #000000, $alpha: 0.15) !important;
  // .grey .lighten-1
  // background-color: rgba($color: #fafafa, $alpha: 1) !important;
  width: 100% !important;

  > *:not(.chat-input__textarea) {
    margin-bottom: 4px !important;
  }
}

@media screen and (min-width: $lg-width) {
  .chat-input {
    max-width: 640px !important;
    padding: 6px 0 !important;
    margin-bottom: 20px !important;
  }

  .v-footer + .v-content {
    margin-bottom: 20px !important;
  }
}

.chat-input__textarea textarea {
  line-height: 150% !important;
  max-height: 240px !important;
}

.chat-input__textarea,
.chat-input__textarea *,
.chat-input__textarea *::before,
.chat-input__textarea *::after {
  border: none !important;
}
</style>
