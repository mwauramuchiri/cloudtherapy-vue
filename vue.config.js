module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/assets/css/_mixins.scss";
          @import "@/assets/css/_variables.scss";
        `
      }
    }
  }
};
