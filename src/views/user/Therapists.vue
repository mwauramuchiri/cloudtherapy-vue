<template>
  <div>
    <v-app-bar app fixed light color="white" elevate-on-scroll height="86px">
      <a class="ml-5">LOGO</a>
      <v-spacer />
      <div class="mr-5"></div>
    </v-app-bar>

    <transition name="fade" mode="out-in" appear>
      <v-container class="fill-height">
        <!-- div -->
        <div>THERAPISTS</div>
      </v-container>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Therapists"
};
</script>

<style lang="scss"></style>
