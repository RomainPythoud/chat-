<template>
  <v-container>
    <v-layer row wrap>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2> <!-- pour gérer où est la carte -->
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media
                     src="https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg "
                     height="130px"
                   ></v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h5 class="white--text mb-0">Meetup in New York</h5>  <!-- si pas de -text, change background de texte -->
                    <div>17th july 2052</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn round color="white" >
                    <v-icon left color="primary">arrow_forward</v-icon>  <!-- commande pour la flêche-->
                    view Meetups
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layer>
  </v-container>
</template>
