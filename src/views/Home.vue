<template>
  <v-app>
    <v-container
      align="center"
      class="home bg-image fill-height"
      fluid
      id="home"
    >
      <v-row :justify="'center'" :align="'center'">
        <v-col cols="10" offset="1" class="text-center">
          <h1>It's okay not to be okay</h1>
          <h4>
            Share your issues with peers going through the same thing
            anonymously
          </h4>
          <v-btn to="/auth" class="ct-shadow mt-5" color="primary" x-large>
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
