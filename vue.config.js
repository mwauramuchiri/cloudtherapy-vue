const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/assets/css/_mixins.scss";
          @import "@/assets/css/_variables.scss";
        `
      }
    }
  }
})
