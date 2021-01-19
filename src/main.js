import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

// or with options
const loadimage = require('./assets/img/artist.jpg')

Vue.use(VueLazyload, {
  preLoad: 1,
  loading: loadimage,
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
