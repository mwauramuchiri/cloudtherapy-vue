<template>
  <v-app>
    <v-container
      align="center"
      class="home bg-image fill-height"
      fluid
      id="home"
    >
      <v-row :justify="'center'" :align="'center'">
        <v-col cols="12" class="text-center mx-auto d-flex flex-column justify-content-center">
          <img src="/img/illustrations/conversation.svg" alt="Cloud therapy home background" id="bgHome"/>
          <h1>It's okay not to be okay</h1>
          <h4>
            Share your issues with peers going through the same thing
            anonymously
          </h4>
          <v-btn to="/auth" class="ct-shadow mt-5 btn-cta" color="primary" x-large>
            Get Started
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style scoped lang="scss">
  #bgHome {
    // min-width: 20rem;
    // max
    height: auto;
    min-width:18rem;
    max-width: 45rem;
  }

  .btn-cta{
    width: 100%;
    margin: auto;
    max-width:32rem;
  }
</style>