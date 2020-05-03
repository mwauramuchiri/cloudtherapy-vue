<template>
  <div class="ct-h-100">
    <v-app-bar app fixed light color="white" elevate-on-scroll height="86px" />

    <transition name="fade" mode="out-in" appear>
      <!-- LOADING PAGE -->
      <v-container
        align="center"
        justify="center"
        class="fill-height"
        v-if="loadingPage"
      >
        <LoadingSpinner center />
      </v-container>

      <v-container class="fill-height" v-else>
        <!-- div -->
        <div>PROFILE</div>
      </v-container>
    </transition>
  </div>
</template>

<script>
export default {
  name: "PeerProfile"
};
</script>

<style lang="scss"></style>
