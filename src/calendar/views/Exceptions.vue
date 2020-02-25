<template>
    <div>
        Exceptions
        <ExceptionsList />
    </div>
</template>

<script>
import ExceptionsList from '../components/Exceptions_list.vue'
//import ExceptionsService from '../services/exceptions_list.js'

export default {
  name: 'exceptions',
  components: {
    ExceptionsList
  },
}
</script>

<style>
</style>