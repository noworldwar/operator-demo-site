import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'

Vue.use(VueRouter)
Vue.use(VueCookies)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import("../views/Home.vue"),
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: () => import("../views/Wallet.vue"),
  },
  {
    path: "*",
    name:"page404",
    component: () => import("../views/Page404.vue"),
  }
]

const router = new VueRouter({
  routes
})

export default router
