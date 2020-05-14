<template>
  <v-sheet
    color="transparent"
    :class="['loading', { 'loading--size-full': fullScreen }]"
  >
    <v-progress-circular indeterminate :size="64" :width="3" color="primary" />
    <h5 style="margin-top: 12px;"><slot>Just a sec...</slot></h5>
  </v-sheet>
</template>

<script>
export default {
  name: "Loading",
  props: {
    fullScreen: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
.loading {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: center;

  &.loading--size-full {
    height: 100vh;
  }

  &* {
    font-weight: 300;
  }
}
</style>
