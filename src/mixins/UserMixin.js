export default {
  name: "UserMixin",
  computed: {
    isNewUser() {
      return this.$store.state.user.user.isNew;
    }
  },
  methods: {
    waitForUser() {
      let currUser = this.$store.state.user.user;

      // The user already exists ~ call the appropriate function
      if (Object.keys(currUser).length !== 0) {
        return Promise.resolve(currUser);
      }

      return new Promise((resolve, reject) => {
        this.$store.watch(
          state => state.user.user,
          () => {
            let user = this.$store.state.user.user;

            if (Object.keys(user).length === 0) {
              reject("User not found");
            }

            //* Getting here means user was found
            resolve(user);
          }
        );
      });
    }
  }
};
