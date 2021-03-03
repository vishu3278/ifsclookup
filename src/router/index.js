import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Branch from '../views/Branch.vue'
import Ifsc from '../views/Ifsc.vue'

Vue.use(VueRouter)
Vue.use(VueMeta)


const routes = [
  { path: '/', name: 'Home', component: Home },
  // { path: '/branch/:bankid', name: 'Branch', component: Branch },
  { path: '/:state/:city/:ifsc', name: 'ifsc', component: Ifsc },
  { path: '/bank/:bankid', name: 'Bank', component: Branch },
  { path: '/about', name: 'About', component: About },

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