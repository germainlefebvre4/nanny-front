<template>
    <div>
        Calendar
        <ExceptionsList />
        <CalendarList />
    </div>
</template>

<script>
import ExceptionsList from '../components/Exceptions_list.vue'
import CalendarList from '../components/Calendar_list.vue'

export default {
  name: 'calendar',
  components: {
    CalendarList,
    ExceptionsList
  },
}
</script>

<style>
</style>