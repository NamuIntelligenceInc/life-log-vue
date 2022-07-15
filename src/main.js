import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import plugins from './plugins'

import { globalMixin } from './mixins'

Vue.config.productionTip = false
Vue.use(plugins)
Vue.mixin(globalMixin)

new Vue({  
  router,
  store,
  render: h => h(App)
}).$mount('#app')
