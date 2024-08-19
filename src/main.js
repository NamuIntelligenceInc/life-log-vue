import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import plugins from './plugins'
import VueCookies from 'vue-cookies'
import VueToasted from 'vue-toasted'
import { globalMixin } from './mixins'

Vue.config.productionTip = false
Vue.use(VueCookies)
Vue.use(plugins)
Vue.mixin(globalMixin)
Vue.use(VueToasted, {
  position: 'bottom-center',
  duration: 2500,
  iconPack: 'mdi',
  singleton: true
})
new Vue({  
  router,
  store,
  render: h => h(App)
}).$mount('#app')
