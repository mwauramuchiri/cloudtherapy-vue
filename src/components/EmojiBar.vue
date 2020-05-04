<template>
  <v-menu
    top
    nudge-top="60"
    z-index="77"
    max-height="41.5vh"
    attach
    transition="slide-y-reverse-transition"
    class="elevation-0 emojibar"
    :allow-overflow="false"
    :close-on-content-click="false"
    :nudge-width="200"
    @input="toggleEmojiBar"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn depressed icon v-on="on" v-bind="attrs" ref="chat-emoji-open-btn">
        <v-icon class="blue--text">mdi-emoticon-happy-outline</v-icon>
      </v-btn>
    </template>

    <v-card class="emojibar elevation-0">
      <div class="d-block">
        <Picker
          class="emojibar--picker"
          emoji-tooltip
          :default-skin="2"
          @select="addEmoji"
        />
      </div>
      <v-list>
        <v-list-item> </v-list-item>
      </v-list>
      <BubbleCaret direction="down" position-x="2px" />
    </v-card>
  </v-menu>
</template>

<script>
import { Picker } from "emoji-mart-vue";
import BubbleCaret from "@/components/BubbleCaret.vue";
import _debounce from "lodash/debounce";

export default {
  name: "EmojiBar",
  components: {
    Picker,
    BubbleCaret
  },
  data: function() {
    return {};
  },
  methods: {
    toggleEmojiBar: _debounce(function(isOpen) {
      switch (isOpen) {
        case true:
          this.$emit("emoji-bar-open");
          break;
        default:
          this.$emit("focus-input-field");
          break;
      }
    }, 150),
    addEmoji(emoji) {
      // console.log(emoji);
      this.$emit("add-emoji", emoji);
    }
  }
};
</script>

<style lang="scss">
.emojibar {
  overflow: hidden;
  max-width: 360px !important;

  > [class*="v-menu"] {
    overflow: hidden;
  }
}

@media screen and (max-width: 440px) {
  .emojibar {
    max-width: 84vw !important;
  }
}

.emojibar--picker {
  position: relative;
  width: 100% !important;
  border: none !important;

  * {
    @include nice-scrollbar(
      true,
      rgba($color: #000, $alpha: 0.78),
      rgba($color: #000, $alpha: 0.18)
    );
  }
}
</style>
