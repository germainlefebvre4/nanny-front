        //<CalendarExceptionsList :events="this.events.data" />
<template>
    <div>
        CalendarExceptions
        <CalendarExceptionsList :events="this.events" />
    </div>
</template>

<script>
import CalendarExceptionsList from '../components/Calendar_exceptions_list.vue'
//import CalendarExceptionsService from '../services/calendar_exceptions_list.js'

export default {
  name: 'calendarExceptions',
  components: {
    CalendarExceptionsList
  },
  /*async mounted() {
    this.events = await CalendarExceptionsService.getCalendarExceptions()
  },*/
  data: () => ({
    events: [
      {
        name: 'Vacation',
        start: '2018-12-30',
        end: '2019-01-02',
      },
      {
        name: 'Meeting',
        start: '2019-01-07',
      },
      {
        name: '30th Birthday',
        start: '2019-01-03',
      },
      {
        name: 'New Year',
        start: '2019-01-01',
      },
      {
        name: 'Conference',
        start: '2019-01-21',
      },
      {
        name: 'Hackathon',
        start: '2019-01-30',
        end: '2019-02-01',
      },
    ],
  }),

}
</script>

<style>
</style>