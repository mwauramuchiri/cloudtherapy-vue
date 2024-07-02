<template>
  <div class="d-flex">
    <v-spacer v-if="isSelf"></v-spacer>
    <div
      :class="[
        'text-bubble d-inline-block',
        { 'blue lighten-4 text-bubble__self': isSelf },
        { 'lime lighten-5': !isSelf }
      ]"
    >
      <p class="text-bubble--text">{{ message.text }}</p>
      <div class="time-text">
        <small v-if="message.dateSent">{{
          getTime(message.dateSent.seconds)
        }}</small>
        <small v-else>
          <v-progress-circular
            indeterminate
            color="black"
            :size="12"
            :width="1.5"
          ></v-progress-circular>
        </small>
      </div>
      <BubbleCaret
        :direction="direction"
        :class="[{ 'blue lighten-4': isSelf }, { 'lime lighten-5': !isSelf }]"
        :offset-y.camel="'0px'"
        :offset-x.camel="'0px'"
      />
    </div>
  </div>
</template>

<script>
// Components
import BubbleCaret from "@/components/BubbleCaret";

// Mixins
import UserMixin from "@/mixins/UserMixin";

// Utils
import { getTime } from "@/utils/date";

export default {
  name: "ChatBubble",
  components: {
    BubbleCaret
  },
  mixins: [UserMixin],
  props: {
    message: {
      type: Object,
      required: true
    },
    isSelf: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    direction() {
      return this.isSelf ? "right-top" : "left-top";
    }
  },
  methods: {
    getTime
  },
  watch: {
    $route() {
      this.waitForUser().then();
    }
  }
};
</script>

<style lang="scss" scoped>
$black: #1a1a1a;

.text-bubble {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  filter: drop-shadow(0px 5px 4px #cdcdcd);
  padding: 8px 11px;
  margin: 8px 20px;
  position: relative;
  max-width: 32rem;

  &:not(.text-bubble__self) {
    border-top-left-radius: 0px;
    border-top-right-radius: 8px;
  }

  &.text-bubble__self {
    border-top-left-radius: 8px;
    border-top-right-radius: 0px;
  }
}

.text-bubble--text {
  margin: 0 !important;
  padding: 0 !important;
  font-size: 15px !important;
  font-weight: normal !important;
  line-height: 18px !important;
  color: $black;
  opacity: 0.85;
  font-family: Arial, Roboto, sans-serif;
  white-space: pre-wrap;
}

.time-text {
  opacity: 0.8;
  text-align: right;
}
</style>
