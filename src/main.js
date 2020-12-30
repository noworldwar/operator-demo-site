import Vue from 'vue'
import App from './views/App.vue'
import router from './router'
import ElementUI from 'element-ui';
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import VueCookies from 'vue-cookies'
import store from './store'
import vmodal from 'vue-js-modal'


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueCookies)
Vue.use(vmodal, { componentName: 'Signup' })

new Vue({
  router,
  store,
  vmodal,
  render: h => h(App)
}).$mount('#app')
