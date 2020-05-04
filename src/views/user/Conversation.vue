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
        <LoadingSpinner size="24" center />
      </v-container>

      <template v-else>
        <v-app-bar
          class="ct-shadow"
          key="ct-chat-top-bar"
          app
          fixed
          color="white"
          height="86px"
        >
          <a class="ml-5">LOGO</a>
          <v-spacer />
          <div class="mr-5">
            <v-btn large class="px-5 text-white" color="primary"
              >FIND PEERS</v-btn
            >
          </div>
        </v-app-bar>

        <v-content class="ct-h-100" key="ct-chat-content">
          <!-- LOADING CHATS -->
          <v-container class="fill-height" v-if="loadingChats">
            <LoadingSpinner size="24" center />
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
          color="transparent"
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
import ChatInput from "@/components/ChatInput.vue";

export default {
  name: "Conversation",
  components: {
    ChatInput
  },
  data() {
    return {
      loadingChats: true
    };
  },
  async created() {
    // load other user
    // load chat
    await Promise;
    this.loadingPage = false;
  }
};
</script>

<style lang="scss"></style>
