<template>
  <div class="mb-2">
    <h3>Just incase you're blank</h3>
    <p class="font-weight-light">Here's a few conversation starter ideas <br>Tap on any of them to use it</p>
    <v-item-group>
      <v-row >
        <v-col
          v-for="(conversationStarter,i) in conversationStarterList"
          :key="i"
          cols="12"
        >
        <v-item v-slot:default="{ active, toggle }" >
          <v-card
          :color="active ? 'primary' : ''"
            class="o-90 d-flex align-center"
            dark
            height="75"
            @click="toggle(); setSelectedConversationStarter(conversationStarter);"
          >
            <v-card-text >{{conversationStarter.text}}</v-card-text>
          </v-card>
        </v-item>
        </v-col>
      </v-row>
    </v-item-group>
  </div>
</template>

<script>
  import EventBus from "@/bus";

  // Data
  import fullConversationStarterList from "@/data/conversation_starters";

  // Utils
  import { getRandomArrayValues } from "@/utils/random";
  
  //* Local constants
  const NO_CONVERSATION_STARTERS = 3;

  export default {
    name: "ConversationStarters",
    data(){
      return {
        conversationStarterSelected: null,
      }
    },
    computed: {
      conversationStarterList(){
        return getRandomArrayValues(fullConversationStarterList,NO_CONVERSATION_STARTERS);
      }
    },
    methods: {
      setSelectedConversationStarter(conversationStarter){
        this.conversationStarterSelected = conversationStarter;
        EventBus.$emit('conversationStarterSelected',conversationStarter.text);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>