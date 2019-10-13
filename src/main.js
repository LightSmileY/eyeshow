import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './plugins/element.js'

Vue.config.productionTip = false

Vue.prototype.$store = store;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')