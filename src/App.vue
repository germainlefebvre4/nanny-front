<template>
  <div id="app">
    <v-app id="inspire">
    <v-row>
      <MyHeader />
    </v-row>
    <v-row>
      <MyMenu />
      <router-view></router-view>
    </v-row>
    <v-row>
      <MyFooter />
    </v-row>
    </v-app>
  </div>
</template>

<script>
import MyHeader from './views/MyHeader.vue'
import MyFooter from './views/MyFooter.vue'
import MyMenu from './views/MyMenu.vue'

export default {
  name: 'App',

  components: {
    MyHeader,
    MyMenu,
    MyFooter
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
