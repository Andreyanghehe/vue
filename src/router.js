import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/home.vue')
    },
    {
      path: '/character',
      name: 'character',
      component: () => import('./views/character.vue')
    },
    {
      path: '/words',
      name: 'words',
      component: () => import('./views/words.vue')
    },
    {
      path: '/idiom',
      name: 'idiom',
      component: () => import('./views/idiom.vue')
    },
    {
      path: '/allegorical',
      name: 'allegorical',
      component: () => import('./views/allegorical.vue')
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('./views/history.vue')
    },
    {
      path: '/mark',
      name: 'mark',
      component: () => import('./views/mark.vue')
    }
  ]
})
