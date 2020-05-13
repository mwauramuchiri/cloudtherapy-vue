<template>
  <div class="ct-h-100">
    <v-app-bar app fixed light color="white" elevate-on-scroll height="86px" />

    <transition name="fade" mode="out-in" appear>
      <Loading v-if="loadingPage" />

      <v-container class="fill-height --container" v-else>
        <!-- div -->
        <div>THERAPIST PROFILE</div>
      </v-container>
    </transition>
  </div>
</template>

<script>
export default {
  name: "TherapistProfile"
};
</script>

<style lang="scss"></style>
