<template>
  <v-app>
    <v-container
      align="center"
      class="home bg-image fill-height  d-flex flex-column justify-content-center"
      fluid
      id="home"
    >
      <v-row :justify="'center'" :align="'center'">
        <v-col cols="12" class="text-center">
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
  name: "Home",
  created() {
    document.title = "Cloudtherapy - It's okay not to be okay";
  }
};
</script>

<style scoped lang="scss">
  h1{
    line-height: 120%;
    margin-bottom: 1rem;
  }
  #bgHome {
    width: 120%;
    min-width:18rem;
    max-width: 45rem;
    max-height: 50vh;
  }

  .btn-cta{
    width: 100%;
    margin: auto;
    max-width:32rem;
  }
</style>