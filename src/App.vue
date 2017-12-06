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
      sideNav: false,
      menuItems: [
        { icon: 'supervisor_account', title: 'View Meetups', link: '/meetups' },
        { icon: 'person', title: 'Profile', link: '/profile' },
        { icon: 'face', title: 'Sign up', link: '/signup' },
        { icon: 'lock_open', title: 'Sign in', link: '/signin' }
      ]
    }
  }
}

</script>
<style lang="stylus">
  @import './stylus/main'
</style>
