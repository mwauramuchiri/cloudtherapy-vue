<template>
  <!-- <v-textarea></v-textarea> -->
  <v-sheet
    outline
    color="transparent"
    class="d-inline-flex px-2 align-end chat-input"
  >
    <EmojiBar
      @focus-input-field="focusInputField()"
      @add-emoji="addEmoji"
      @emoji-bar-open="emojiBarOpen()"
    ></EmojiBar>

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
import EmojiBar from "@/components/EmojiBar";
import _debounce from "lodash/debounce";

// Mixins
import ChatMixin from "@/mixins/ChatMixin";

// Services
import ChatService from "@/services/ChatService";

// Utils
import { getCurrentUser, getOtherUser } from "@/utils/chat";

export default {
  name: "ChatInput",
  components: {
    EmojiBar
  },
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
      return /\w/g.test(this.text) ? false : true;
    }
  },
  methods: {
    emojiBarOpen() {
      const input = this.$refs["chat-input"].$el.querySelector("textarea");
      this.inputCursorPos = [input.selectionStart, input.selectionEnd];

      this.$nextTick(input.focus());
    },
    addEmoji: async function(emoji) {
      const input = this.$refs["chat-input"].$el.querySelector("textarea");
      let currentCursorPos = [this.inputCursorPos[0], this.inputCursorPos[1]];
      let newText = `${this.text.substring(0, currentCursorPos[0])}${
        emoji.native
      }${this.text.substring(currentCursorPos[1], this.text.length)}`;
      this.text = newText;
      await this.$nextTick();

      input.focus();
      await this.$nextTick();

      this.inputCursorPos = [
        currentCursorPos[0] + emoji.native.length,
        currentCursorPos[1] + emoji.native.length
      ];
      await this.$nextTick();

      input.setSelectionRange(this.inputCursorPos[0], this.inputCursorPos[1]);
    },
    focusInputField() {
      this.$nextTick(this.$refs["chat-input"].focus());
    },
    sendText() {
      if (this.textIsEmpty || !this.currentChatIsLoaded) return;

      const { uid: fromUserId } = getCurrentUser(this.currentChat);
      const { uid: toUserId } = getOtherUser(this.currentChat);

      const messageData = {
        from: fromUserId,
        to: toUserId,
        text: this.text
      };

      return ChatService.sendMessage(
        this.currentChatThreadId,
        messageData
      ).then(response => {
        // Empty the text
        this.text = "";
        console.log("Send message respone: ", response);
        //TODO: Toast success or failure
      });
    }
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
  line-height: $h2-size !important;
  max-height: 240px !important;
}

.chat-input__textarea,
.chat-input__textarea *,
.chat-input__textarea *::before,
.chat-input__textarea *::after {
  border: none !important;
}
</style>
