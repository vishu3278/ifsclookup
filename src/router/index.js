import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Branch from '../views/Branch.vue'
import Ifsc from '../views/Ifsc.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  { path: '/:state/:city/:ifsc', name:'ifsc', component: Ifsc },
  { path: '/bank/:bankid', name: 'Bank', component: Branch },

  /*{
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/About.vue')
  }*/
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
