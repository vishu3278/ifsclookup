import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
/*import Branch from '../views/Branch.vue'*/
/*import Bank from '../views/Bank.vue'*/
import Ifsc from '../views/Ifsc.vue'

Vue.use(VueRouter)
Vue.use(VueMeta)

const routes = [
  { path: '/', name: 'Home', component: Home },
  // { path: '/:bank', name: 'Bankname', component: Bank },
  { path: '/:state/:city/:ifsc', name: 'ifsc', component: Ifsc },
  { path: '/bank/:bankid', name: 'Bank', component: () => import('@/views/Branch.vue') },
  { path: '/about', name: 'About', component: About },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router