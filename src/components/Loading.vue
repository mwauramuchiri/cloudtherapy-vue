<template>
  <v-sheet class="size-full">
    <v-progress-circular
      indeterminate
      :size="64"
      :width="3"
      color="primary"
    />
    <h5 style="margin-top: 12px;"><slot>Just a sec...</slot></h5>
  </v-sheet>
</template>

<script>
  export default {
    name: "Loading"
  };
</script>

<style scoped lang="scss">
 .size-full {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  &*{
    font-weight: 300;
  }
}
</style>