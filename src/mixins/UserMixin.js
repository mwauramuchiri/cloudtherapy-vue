import { logout } from "@/utils/auth";

export default {
  name: "UserMixin",
  filters: {
    initials(name = "") {
      return name
        .split(" ")
        .map(n => n.slice(0, 1))
        .join("")
        .toUpperCase();
    }
  },
  computed: {
    isNewUser() {
      return this.$store.state.userStore.user.isNew;
    }
  },
  methods: {
    waitForUser() {
      let currUser = this.$store.state.userStore.user;

      // The user already exists ~ call the appropriate function
      if (Object.keys(currUser).length !== 0) {
        return Promise.resolve(currUser);
      }

      return new Promise((resolve) => {
        this.$store.watch(
          state => state.userStore.user,
          () => {
            let user = this.$store.state.userStore.user;

            if (Object.keys(user).length === 0) {
              this.$store.commit('authStore/updateProp', {
                name: 'isLoggedIn',
                value: true
              });

              // return this.logoutUser();
              // reject("User not found");

              return;
              // ? what to do?
            }

            //* Getting here means user was found
            resolve(user);
          }
        );
      });
    },
    async logoutUser() {
      logout("/")
    }
  }
};
