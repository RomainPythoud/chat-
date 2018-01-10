import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
        id: 'adsfg',
        title: 'Meetup in New York',
        date: new Date(),
        location: 'New York',
        description: 'It\'s New York!'
      },
      { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Pont_des_Arts%2C_Paris.jpg',
        id: 'adsfgadf',
        title: 'Meetup in Paris',
        date: new Date(),
        description: 'It\'s Paris!'}
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedMeetups (state, payload) {                         // important !!!!! remplie loadedMeetups avec ce qui vient de setLoadedMeetups
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadMeetups ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')               // firebase.database() pour rejoindre la data base, ref('meetups') pour aller dans dossier meetups, on (en temps réel), once pour récupérer
        .then((data) => {
          const meetups = []
          const obj = data.val()                                    // .val pour avoir la valeur en elle même de l'objet
          for (let key in obj) {
            meetups.push({                                          // le meetups de cette ligne correspond à celui crée trois lignes au dessus
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', true)
          }
        )
    },
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),       // car firebase ne peut pas enregistrer de date si pas sous forme de string
        creatorId: getters.user.id
      }
      let imageUrl                            // crée une variable imageUrl ret key
      let key
      firebase.database().ref('meetups').push(meetup)         // utiliser set à la place de push si un seul objet et pas une liste, meetups = nom fichier dans database
        .then((data) => {
          key = data.key                              // retourne l'ID
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)     // enregistre dans dossier meetups, le nom: key.ext
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('meetups').push(meetup).child(key).update({imageUrl: imageUrl})
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            imageUrl: imageUrl,
            id: key                                       // ...meetup reprend toutes les données de la const meetup (title, location,...)
          })
        })
        .catch((error) => {
          console.log(error)
        })
      // reach out to firebase and store it
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')                   // pour montrer que ça charge  ( voir fonction setLoading au dessus)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)      // auth pour la partie authentification de firebase
        .then(
          user => {
            commit('setLoading', false)            // pour enlever l'info qui dit que ça charge
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)               // indique qu'il y a une erreur
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)            // pour enlever l'info qui dit que ça charge
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredMeetups: []})
    },
    logout ({commit}) {
      firebase.auth().signOut()                   // "quitte firebase"
      commit('setUser', null)                     // setUser devient null => plus connecté
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
