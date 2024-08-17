<template>
  <v-app class="fill-height">
    <v-app-bar app fixed light color="white" elevate-on-scroll height="64px">
      <a class="ml-5"><AppLogo /></a>
      <v-spacer />
      <div class="mr-5">
        <v-btn color="primary" @click="logoutUser()">
          Log out
        </v-btn>
      </div>
    </v-app-bar>
    <v-content>
      <transition name="fade" mode="out-in" appear>
        <Loading v-if="isLoading" />
    
        <v-container v-else id="bgTopics">
          <div v-if="!mentalConditions.length">
            <p>No topics found :( please check back again later</p>
          </div>
    
          <div class="text-center" v-else>
            <!-- Details dialog -->
            <v-dialog v-model="detailDialogIsOpen" max-width="290" v-if="selectedMentalCondition">
              <v-card>
                <v-card-title>{{selectedMentalCondition.name}}</v-card-title>
                <v-card-text>{{selectedMentalCondition.description || 'A mental health condition'}}</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="detailDialogIsOpen = false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
    
            <h2>Mental health topics</h2>
            <p class="font-weight-light">Tap on any topic to learn more about it</p>
            
            <v-item-group>
              <v-row >
                <v-col
                  v-for="(mentalCondition,i) in mentalConditions"
                  :key="i"
                  cols="6"
                  md="4"
                  lg="3"
                >
                <v-item v-slot:default="{ active, toggle }" >
                  
                  <v-card
                  :color="active ? 'primary' : ''"
                    class="o-90 d-flex align-center text-center"
                    dark
                    height="90"
                    @click="toggle(); setSelectedMentalCondition(mentalCondition); openConditionDetails()"
                  >
                    <v-card-text>{{mentalCondition.name}}</v-card-text>
                  </v-card>
                </v-item>
                </v-col>
              </v-row>
            </v-item-group>
          </div>
        </v-container>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
// Components
import Loading from "@/components/Loading";
import AppLogo from "@/components/AppLogo.vue";

// Mixins
import UserMixin from "@/mixins/UserMixin";

// Services
import UserService from "@/services/UserService";

  export default {
    name: 'MentalConditions',
    components: {
      Loading,
      AppLogo,
    },
    mixins: [UserMixin],
    data(){
      return {
        mentalConditions: [],
        isLoading: false,
        detailDialogIsOpen: false,
        selectedMentalCondition: null,
      }
    },
    methods: {
      setLoading(){
        this.isLoading = true;
      },
      removeLoading(){
        this.isLoading = false;
      },
      setSelectedMentalCondition(mentalCondition){
        this.selectedMentalCondition = mentalCondition;
      },
      openConditionDetails(){
        this.detailDialogIsOpen = true;
      }
    },
    created(){
      UserService.getMentalConditions(this.setLoading,(mentalConditionsFound)=>{
        this.mentalConditions = mentalConditionsFound;
        this.removeLoading();
      })
    }
  }
</script>

<style lang="scss">
  

  #bgTopics::before{
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url("../../../public/img/illustrations/processing_thoughts.svg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.45;
  }
</style>