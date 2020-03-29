<template>
  <div class="empty-box d-flex flex-column justify-center align-center">
    <slot>Nothing here!</slot>
  </div>
</template>

<script>
export default {
  name: "EmptyBox"
};
</script>

<style lang="scss" scoped>
.empty-box {
  text-align: center;
  min-height: calc(100vh - 56px);
  padding-left: 16px;
  padding-right: 16px;

  [class*="mdi-"] {
    opacity: 0.38;
  }

  * {
    font-weight: 500;
    text-align: inherit;
    opacity: 0.84;
  }
}
</style>
