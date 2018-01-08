<template>
  <v-app>
    <v-navigation-drawer temporary v-model="sideNav"> <!-- MENU si sideNav= true, le menu s'ouvre -->
        <v-list>
          <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          router
          :to="item.link">
            <v-list-tile-action>
              <v-icon> {{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content> {{ item.title }} </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
          v-if="userIsAuthenticated"
          @click="onLogout">      <!-- v-if pour pas que le bouton soit visible si pas connecté-->
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>Logout</v-list-tile-content>
          </v-list-tile>
        </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary" >
      <v-toolbar-side-icon
      @click="sideNav = !sideNav"
      class="hidden-sm-and-up"></v-toolbar-side-icon> <!-- VIDEO 4 si problème , remplacer par @click.native.stop , class... permet de gérer les différentes tailles d'écrans-->
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">DevMeetup</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
          <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          router
          :to="item.link">
            <v-icon left>{{ item.icon }}</v-icon>  <!-- Aller chercher ici (https://material.io/icons/#ic_visibility) pour le logo VIDEO 4 -->
              {{ item.title }}
          </v-btn>
          <v-btn
          v-if="userIsAuthenticated"
          flat
          @click="onLogout">
            <v-icon left>exit_to_app</v-icon>
              Logout
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>

    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>

  </v-app>
</template>

<script>
import Signin from './components/User/Signin'

export default {
  components: [
    Signin
  ],
  data () {
    return {
      sideNav: false
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        { icon: 'face', title: 'Sign up', link: '/signup' },
        { icon: 'lock_open', title: 'Sign in', link: '/signin' }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'supervisor_account', title: 'View Meetups', link: '/meetups' },
          { icon: 'room', title: 'Organize Meetup', link: '/meetup/new' },
          { icon: 'person', title: 'Profile', link: '/profile' }
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    }
  }
}

</script>
<style lang="stylus">
  @import './stylus/main'
</style>
