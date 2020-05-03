<template>
  <div class="ct-h-100">
    <v-app-bar app fixed light color="white" elevate-on-scroll height="86px">
      <a class="ml-5">LOGO</a>
      <v-spacer />
      <div class="mr-5">
        <v-btn large class="px-5 text-white" color="primary">FIND PEERS</v-btn>
      </div>
    </v-app-bar>

    <transition name="fade-delay" mode="out-in" appear>
      <!-- LOADING PAGE -->
      <v-container class="fill-height" v-if="loadingPage">
        <LoadingSpinner center />
      </v-container>

      <v-container v-else>
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
                <v-list-item-title v-html="chat.name" />
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
  </div>
</template>

<script>
export default {
  name: "ChatThreads",
  data() {
    return {
      chats: [
        {
          id: 232,
          avatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
          name: "User Mike",
          message:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium",
          time: "16:24"
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
      ]
    };
  },
  created() {
    setTimeout(() => {
      this.loadingPage = false;
    }, 1000);
  }
};
</script>

<style lang="scss"></style>
