<template>
  <div>
    <v-app-bar app fixed light color="white" elevate-on-scroll height="86px" />

    <transition name="fade" mode="out-in" appear>
      <v-container class="fill-height">
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
