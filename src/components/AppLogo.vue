<template>
  <img :height="height" src="/img/logo.svg" alt="Cloud Therapy" />
</template>

<script>
export default {
  name: "AppLogo",
  props: {
    height: {
      type: [String, Number],
      default: "40px"
    }
  }
};
</script>

<style></style>
