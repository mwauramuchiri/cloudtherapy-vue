<template>
  <v-app>
    <transition-group class="ct-h-100" tag="div" name="fade-delay" mode="out-in" appear>
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
        <v-bottom-navigation key="ct-chat-bottom-bar" app elevation-0>
          <!-- CHAT TEXTAREA -->
        </v-bottom-navigation>
      </template>
    </transition-group>
  </v-app>
</template>

<style lang="scss"></style>

<script>
export default {
  name: "Conversation",
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
