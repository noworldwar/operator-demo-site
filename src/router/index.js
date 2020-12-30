import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Wallet from '../views/Wallet.vue'
import Login from '../views/Login.vue'
import store from '../store'
import VueCookies from 'vue-cookies'

Vue.use(VueRouter)
Vue.use(VueCookies)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: Wallet,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {

  console.log(store.state.status.loggedIn)
  console.log(Vue.$cookies.get('username'))
  if (!store.state.status.loggedIn && to.path !== '/login' && Vue.$cookies.get('username') == null) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else if (store.state.status.loggedIn && to.path == '/login' && Vue.$cookies.get('username') !== null) {
    next({
      path: '/',
      query: { redirect: to.fullPath }
    })
  } else {
    next();
  }
})

export default router
