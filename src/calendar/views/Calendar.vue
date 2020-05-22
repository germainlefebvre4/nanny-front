<template>
    <div>
        <CalendarPicker />
    </div>
</template>

<script>
import AbsenceChoice from '../components/AbsenceChoice.vue'
import CalendarPicker from '../components/CalendarPicker.vue'

export default {
  name: 'calendar',
  components: {
    CalendarPicker,
    AbsenceChoice
  },
}
</script>

<style>
</style>