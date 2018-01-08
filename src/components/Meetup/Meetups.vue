<template>
  <v-container class="mt-1">
    <v-layout row wrap v-for="meetup in meetups" :key="meetup.id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2> <!-- pour gérer où est la carte -->
        <v-card class="info" >
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media
                     :src="meetup.imageUrl"
                     height="130px"
                   ></v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h5 class="white--text mb-0">{{ meetup.title }}</h5>  <!-- si pas de -text, change background de texte -->
                    <div>{{ meetup.date | date }}</div> <!-- date = expression dans main.js -->
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn round color="white" :to="'/meetups/' + meetup.id">  <!-- envoie sur la page d'un meetup (v-bind to == :to)-->
                    <v-icon left color="primary">arrow_forward</v-icon>  <!-- commande pour la flêche-->
                    view Meetups
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      meetups () {
        return this.$store.getters.loadedMeetups
      }
    }
  }
</script>
