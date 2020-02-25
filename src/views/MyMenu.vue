<template>
    <div>
      <v-navigation-drawer
        class="indigo"
        dark
        permanent
        :value="isVisible"
      >
        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
  
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
  
        <template v-slot:append>
          <div class="pa-2">
            <v-btn block>Logout</v-btn>
          </div>
        </template>
        MyMenu: {{ this.isVisible }}
      </v-navigation-drawer>
<!--
        <v-toolbar app color="teal darken-4" dark>
            <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <v-toolbar-title>{{appTitle}}</v-toolbar-title>
            <v-btn flat class="hidden-sm-and-down">Menu</v-btn>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <v-btn flat class="hidden-sm-and-down">SIGN IN</v-btn>
            <v-btn color="teallighten-3" class="hidden-sm-and-down">JOIN</v-btn>
        </v-toolbar>
-->
    </div>
</template>


<script>
import EventBus from '../event-bus';

export default {
  name: 'mymenu',
    data() {
        return {
            appTitle: 'My-website',
            drawer: false,
            items: [
                { title: 'Dashboard', icon: 'dashboard' },
                { title: 'Account', icon: 'account_box' },
                { title: 'Admin', icon: 'gavel' },
            ],
            isVisible: true,
        };
    },
    mounted () {
      EventBus.$on('EVENT_NAME', function () {
        this.isVisible=!this.isVisible
        console.log(this.isVisible)
      });
    },

}
</script>

<style>
</style>