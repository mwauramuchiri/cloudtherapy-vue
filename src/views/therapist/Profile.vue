<template>
  <div class="ct-h-100">
    <v-app-bar app fixed light color="white" elevate-on-scroll height="64px" />

    <transition name="fade" mode="out-in" appear>
      <Loading v-if="loadingPage" />

      <v-container class="fill-height" v-else>
        <!-- div -->
        <div>THERAPIST PROFILE</div>
      </v-container>
    </transition>
  </div>
</template>

<script>
export default {
  name: "TherapistProfile",
  created() {
    window.title = "Profile - Cloud Therapy";
  },
};
</script>

<style lang="scss"></style>
