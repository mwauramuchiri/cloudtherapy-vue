import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#009688",
        secondary: "#795548",
        accent: "#e91e63",
        error: "#f44336",
        warning: "#ff5722",
        info: "#ffc107",
        success: "#4caf59"
      }
    }
  }
});
