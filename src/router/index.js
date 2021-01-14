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
    path: '/live',
    name: 'Live',
    component: () => import("../views/Live.vue"),
  },
  {
    path: '/elec',
    name: 'Elec',
    component: () => import("../views/Elec.vue"),
  },
  {
    path: '/sbg',
    name: 'SBG',
    component: () => import("../views/SBG.vue"),
  },
  {
    path: "*",
    name:"page404",
    component: () => import("../views/Page404.vue"),
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
