<template>
  <div>
    <Home />
  </div>
</template>

<script>
import Home from "./views/Home";

export default {
  name: "App",
  components: {
    Home
  },
  data: () => ({
    //
  })
};
</script>

<style lang="scss">
// Global CSS
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
