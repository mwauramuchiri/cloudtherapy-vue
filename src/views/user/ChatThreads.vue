<template>
  <v-sheet class="ct-h-100">
    <v-app-bar app fixed light color="white" elevate-on-scroll height="86px">
      <a class="ml-5">LOGO</a>
      <v-spacer />
      <div class="mr-5">
        <v-btn
          large
          class="px-5 text-white"
          color="primary"
          :disabled="findingPeers"
          @click="findPeers()"
        >
          {{ findPeersBtnText }}
        </v-btn>
      </div>
    </v-app-bar>

    <transition name="fade" mode="out-in" appear>
      <!-- LOADING PAGE -->
      <v-container class="fill-height" v-if="loadingPage">
        <LoadingSpinner center />
      </v-container>

      <v-container v-else class="--container">
        <v-list three-line>
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
              <v-list-item-avatar>
                <v-img :src="chat.avatar"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="d-flex align-center pb-2">
                  {{ chat.name }}
                  <v-chip
                    class="ml-3"
                    v-if="chat.therapist"
                    x-small
                    pill
                    color="green white--text lighten-2"
                  >
                    THERAPIST
                  </v-chip>
                </v-list-item-title>
                <v-list-item-subtitle v-html="chat.message" />
                <h6
                  class="grey--text text--darken-1 text-right ma-0"
                  v-html="chat.time"
                ></h6>
              </v-list-item-content>
            </v-list-item>
            <v-divider :key="`div-${index}`" inset />
          </template>
        </v-list>
      </v-container>
    </transition>
  </v-sheet>
</template>

<script>
export default {
  name: "ChatThreads",
  data() {
    return {
      findingPeers: false,
      findPeersBtnText: "Find Peers",
      chats: [
        {
          id: 232,
          avatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
          name: "User Mike",
          message:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium",
          time: "16:24",
          therapist: true
        },
        {
          id: 2324,
          avatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
          name: "User Mike",
          message:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium",
          time: "16:24"
        },
        {
          id: 67765,
          avatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
          name: "User Mike",
          message:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium",
          time: "16:24"
        },
        {
          id: 256757632,
          avatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
          name: "User Mike",
          message:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium",
          time: "16:24"
        }
      ],
      // don't know if we need this as a data prop or computed.
      // Depends on the data for chats
      newChats: []
    };
  },
  methods: {
    findPeers() {
      // trigger an overlay or something
      //    loading state
      this.findingPeers = true;
      this.findPeersBtnText = "working...";

      // ajax
      setTimeout(() => {
        this.findingPeers = false;
        this.findPeersBtnText = "Find Peers";
      }, 2000);
    }
  },
  created() {
    this.loadingPage = false;
    setTimeout(() => {}, 1000);
  }
};
</script>

<style lang="scss"></style>
