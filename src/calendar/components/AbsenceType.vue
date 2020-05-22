<template>
  <div>
    <v-select
      :items="items"
      :menu-props="{ top: true, offsetY: true }"
      label="Type d'absence"
      item-value="id"
      item-text="name"
    ></v-select>
  </div>
</template>

<script>
// import AbsenceService from '../services/absenceType.js'
import axios from 'axios';

export default {
    name: 'absenceList',
    props: [
      'events'
    ],

    data () {
      return {
        items: null
      }
    },
    mounted () {
      axios
        .get('http://localhost:8080/absence')
        .then(response => (this.items = response.data))
    }

}
</script>

<style>
</style>