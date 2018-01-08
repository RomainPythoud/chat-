import Vue from 'vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/alert.vue'

Vue.use(Vuetify)

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDwBlARFctlr3sb1H-HIy0VEQENRkfLoz8',
      authDomain: 'projet-chat-748fd.firebaseapp.com',
      databaseURL: 'https://projet-chat-748fd.firebaseio.com',
      projectId: 'projet-chat-748fd',
      storageBucket: 'projet-chat-748fd.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
