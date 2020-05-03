<template>
  <div>
    <div>
      <transition :name="transitionName" appear mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <!-- BOTTOM NAV -->
  </div>
</template>

<script>
export default {
  name: "UserView"
};
</script>

<style></style>
