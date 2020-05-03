export default {
  name: "UiMixin",
  data() {
    return {
      loadingPage: true,
      errorPage: undefined
    };
  },
  methods: {
    goTo(to) {
      if (!to) return;
      if (typeof to === "string") {
        this.$router.push({ name: to });
      } else {
        this.$router.push(to);
      }
    }
  }
};
