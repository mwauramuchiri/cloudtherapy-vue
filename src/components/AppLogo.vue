<template>
  <a href="/"><img :height="height" src="/img/logo.svg" alt="Cloud Therapy" /></a>
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

<style>
  a:hover,a:focus{
    text-decoration: none;
  }
</style>
