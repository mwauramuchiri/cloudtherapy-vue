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
        <LoadingSpinner size="64" center />
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
          <v-avatar class="ml-5" size="36">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
          <!-- {{ }} -->
          <h5 class="ml-3">Random User</h5>
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
          <v-container class="fill-height" v-if="loadingChats">
            <LoadingSpinner size="40" center />
          </v-container>

          <template v-else class="--container ct-h-100">
            <!-- MESSAGES -->
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
          <ChatInput @send-text="sendText" />
        </v-footer>
      </template>
    </transition-group>
  </v-app>
</template>

<script>
import ChatInput from "@/components/ChatInput.vue";

export default {
  name: "Conversation",
  components: {
    ChatInput
  },
  props: ["therapist", "therapistId"],
  data() {
    return {
      loadingChats: true
    };
  },
  methods: {
    sendText(text) {
      console.log("Sending...", text);
    },
    unmatch() {
      //
    }
  },
  async created() {
    // load other user
    // load chat
    await Promise;
    this.loadingPage = false;
  }
};
</script>

<style lang="scss">
@media screen and (min-width: $lg-width) {
  .v-content {
    // [FooteHight]px + [ExtraPadding]px
    padding-bottom: 140px !important;
  }
}
</style>
