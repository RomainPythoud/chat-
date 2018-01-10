<template>
  <v-container class="mt-1">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4 class="primary--text">Create a new Meetup</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"
                required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
              <input
              type="file"
              style="display: none"
              ref="fileInput"
              accept="image/*"
              @change="onFilePicked">                <!-- display: none permet de cacher le bouton moche de l'input mais il reste utilisable-->
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="150">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                multi-line
                v-model="description"
                required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row class="primary--text">
            <v-flex xs12 sm6 offset-sm3>
              <h4> Chose a date and time</h4>
            </v-flex>
          </v-layout>
          <v-layout row class="mb-2">
            <v-flex xs12 sm6 offset-sm3>
              <v-date-picker v-model="date"></v-date-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-time-picker v-model="time" format="24hr"></v-time-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                class="primary"
                :disabled="!formIsValid"
                type="submit">Create Meetup</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        location: '',
        imageUrl: '',
        description: '',
        date: new Date(),
        time: new Date(),
        image: null
      }
    },
    computed: {
      formIsValid () {
        return this.title !== '' &&
        this.location !== '' &&
        this.imageUrl !== '' &&
        this.description !== ''
      },
      submittableDateTime () {
        const date = new Date(this.date)
        if (typeof this.time === 'string') {
          const hours = this.time.match(/^(\d+)/)[1]
          const minutes = this.time.match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        } else {
          date.setHours(this.time.getHours())
          date.setMinutes(this.time.getMinutes())
        }
        return date
      }
    },
    methods: {
      onCreateMeetup () {
        if (!this.formIsValid) {
          return
        }
        if (!this.image) {
          return
        }
        const meetupData = {
          title: this.title,
          location: this.location,
          image: this.image,
          description: this.description,
          date: this.submittableDateTime
        }
        this.$store.dispatch('createMeetup', meetupData)
        this.$router.push('/meetups')
      },
      onPickFile () {
        this.$refs.fileInput.click()                                // $refs fait référence à tous les ref dans ce fichier
      },
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name                            // [0] car un seul élément
        if (filename.lastIndexOf('.') <= 0) {                       // ('.') <= 0 indique qu'il n'y a pas de point dans le nom du fichier
          return alert('Please add a valid file!')
        }
        const fileReader = new FileReader()                         // transforme l'image (binaire?) en un string
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result                         // result = en gros à l'image sous forme de texte, enregistré dns imageUrl
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]                                         // store the file in image without any changes
      }
    }
  }
</script>
