import Vue from 'vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify';

import App from './App.vue'
import Report from './reports/views/Report.vue'
import CalendarExceptions from './calendar/views/CalendarExceptions.vue'
import Exceptions from './calendar/views/Exceptions.vue'

// import moment from 'moment'
// import 'moment/locale/fr';


// Vue.config.productionTip = false

Vue.use(VueRouter)


const routes = [
  { name: 'reports', path: '/', component: Report },
  { name: 'calendarExceptions', path: '/calendar/exceptions', component: CalendarExceptions },
  { name: 'exceptions', path: '/exceptions', component: Exceptions },
]

const router = new VueRouter({
  routes: routes
})


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
