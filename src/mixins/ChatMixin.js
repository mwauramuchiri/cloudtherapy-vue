export default {
  data() {
    return {
      currentChatThreadId: undefined
    };
  },
  computed: {
    currentChat() {
      return this.$store.state.chatStore.currentChat;
    },
    currentChatIsLoaded() {
      return Object.keys(this.currentChat).length > 0;
    }
  },
  created() {
    this.currentChatThreadId = this.$route.params.chatThreadId;
  }
};
