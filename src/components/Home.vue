<template>
  <v-container class="mt-2">
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right ">   <!-- v-flex, 1 pour chaque bouton -->
        <v-btn large class="primary" router to="/meetups"> Explore meetups </v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large class="primary" router to="/meetups/new"> Organise meetups </v-btn>
      </v-flex>  <!-- xs12 et sm6 pour gérer l'affichage suivant la taille de l'écran -->
    </v-layout>
    <v-layout>
      <v-flex xs12 class="text-xs-center">            <!-- text-xs-center pour que le loader soit centré-->
        <v-progress-circular
        indeterminate
        color="primary"
        :width="7"
        :size="70"
        v-if="loading"></v-progress-circular>         <!-- loader qui tourne dans carousel (v-if... si loading is true, il affiche le spinner)-->
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2" v-if="!loading">    <!-- v-if... pwermet de ne pas afficher le carousel tant que pas chargé -->
      <v-flex xs12>
        <v-carousel style=" cursor: pointer;">
          <v-carousel-item
           v-for="meetup in meetups"
           v-bind:src="meetup.imageUrl"
           :key="meetup.id"
           @click="onLoadMeetup(meetup.id)"> <!-- permet de cliquer sur image pour emmener à la page, voir methods: plus loin -->
           <div class="title">
             {{ meetup.title }}
           </div>
         </v-carousel-item>
         </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mb-3 " v-if="!loading">
      <v-flex xs12 class="text-xs-center mt-2">
        <p>
          Join our meetups
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      meetups () {
        return this.$store.getters.featuredMeetups
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onLoadMeetup (id) {
        this.$router.push('/meetups/' + id)
      }
    }
  }
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    font-size: 2em;
    padding: 20px;

  }
</style>
