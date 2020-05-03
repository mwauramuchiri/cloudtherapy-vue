<template>
  <h6 class="d-inline-flex green--text text--accent-3 align-center">
    <span class="dot green accent-3 mr-1"></span>
    online
  </h6>
</template>

<script>
export default {
  name: "OnlineNotify",
  props: {
    online: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style>
.dot {
  width: 6px;
  height: 6px;
  border-radius: 6px;
}
</style>
