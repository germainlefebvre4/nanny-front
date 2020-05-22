<template>
  <div id="app">
    <v-app id="inspire">
      <MyHeader />
      <div class="content">
        <router-view></router-view>
      </div>
    </v-app>
  </div>
</template>

<script>
import MyHeader from './views/MyHeader.vue'
// import MyFooter from './views/MyFooter.vue'
// import MyMenu from './views/MyMenu.vue'

export default {
  name: 'App',

  components: {
    MyHeader,
    // MyMenu,
    // MyFooter
  },

  data: () => ({
  }),
};
</script>

<style>
#app {
  padding-top: 64px;
  padding-left: 12px;
}
</style>
