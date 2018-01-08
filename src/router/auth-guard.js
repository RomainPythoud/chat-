import { store } from '../store'

export default (to, from, next) => {
  if (store.getters.user) {             // "if you have a user, ... "
    next()
  } else {
    next('/signin')                     // re dirige sur signin si pas de user connecté
  }
}
