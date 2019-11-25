<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from './views/Header.vue'
import Footer from './views/Footer.vue'

export default {
  name: 'App',

  components: {
    Header,
    Footer
  },

  data: () => ({
  }),
};
</script>
