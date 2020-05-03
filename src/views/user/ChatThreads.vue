<template>
  <div>
    <v-app-bar app fixed light color="white" elevate-on-scroll height="86px">
      <a class="ml-5">LOGO</a>
      <v-spacer />
      <div class="mr-5">
        <v-btn large class="px-5 text-white" color="primary">FIND PEERS</v-btn>
      </div>
    </v-app-bar>

    <transition name="fade" mode="out-in" appear>
      <v-container class="fill-height">
        <!-- div -->
        <div>THREAD</div>
      </v-container>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ChatThreads"
};
</script>

<style lang="scss"></style>
