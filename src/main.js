import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Report from './reports/views/Report.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.use(VueRouter)


const routes = [
  { name: 'reports', path: '/', component: Report }
]

const router = new VueRouter({
  routes: routes
})


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
