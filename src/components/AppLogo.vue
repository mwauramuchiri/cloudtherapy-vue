<template>
  <img :height="56" src="/img/logo.png" alt="Cloud Therapy" />
</template>

<script>
export default {
  name: "AppLogo",
  props: {
    height: {
      type: [String, Number],
      default: "56px"
    }
  }
};
</script>

<style></style>
