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
    <v-layout row wrap class="mt-2">
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item
           v-for="meetup in meetups"
           v-bind:src="meetup.imageUrl"
           :key="meetup.id">
           <div class="title">
             {{ meetup.title }}
           </div>
         </v-carousel-item>
         </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mb-3 ">
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
    data () {
      return {
        meetups: [
          { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg', id: 'adsfg', title: 'Meetup in New York' },
          { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Pont_des_Arts%2C_Paris.jpg', id: 'adsfgadf', title: 'Meetup in Paris' }
        ]
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
