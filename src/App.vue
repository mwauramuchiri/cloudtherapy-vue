<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  })
};
</script>

<style lang="scss">
// Global CSS
@import "./assets/css/cloudtherapy.scss";

.bg-img {
  width: 100%;
  background-size: cover;
  background-repeat: none;
}
.bg-img-center {
  background-position: center;
}

.bg-overlay {
  padding: 0;
  height: inherit;
  min-height: initial;
  width: 100%;
  position: relative;
  right: 0;
  left: 0;
}
</style>
