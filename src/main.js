import Vue from 'vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify';

import App from './App.vue'
import Report from './reports/views/Report.vue'
import Calendar from './calendar/views/Calendar.vue'


Vue.use(VueRouter)


const routes = [
  { name: 'reports', path: '/', component: Report },
  { name: 'calendar', path: '/calendar', component: Calendar },
]

const router = new VueRouter({
  routes: routes
})


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
