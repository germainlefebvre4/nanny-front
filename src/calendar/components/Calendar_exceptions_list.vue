<template>
    <div v-if='events'>
      CalendarExceptionsList<br >

<!--
      <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
        return-value="getMonth"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="computedDateFormatted"
            label="Choisissez le mois"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="datepicker.picker"
          locale="fr-fr"
          first-day-of-week="1"
          :title-date-format="getMonth"
          :landscape="datepicker.landscape"
          :reactive="datepicker.reactive"
          :full-width="datepicker.fullWidth"
          :show-current="datepicker.showCurrent"
          :type="datepicker.month"
          :multiple="datepicker.multiple"
          :readonly="datepicker.readonly"
          :disabled="datepicker.disabled"
          :events="datepicker.enableEvents ? functionEvents : null"
        ></v-date-picker>
      </v-menu>
-->


      <v-row justify="center">
        <v-date-picker
          v-model="picker"
          locale="fr-fr"
          first-day-of-week="1"
          :title-date-format="getMonth"
          :landscape="landscape"
          :reactive="reactive"
          :full-width="fullWidth"
          :show-current="showCurrent"
          :type="month"
          :multiple="multiple"
          :readonly="readonly"
          :disabled="disabled"
          :events="enableEvents ? functionEvents : null"
        ></v-date-picker>
      </v-row>
      {{ picker }}

      <v-sheet height="500">
        <v-calendar
          type="month"
          :now="setToday"
          :value="currentMonth"
          locale="fr-fr"
          :events="events"
          :weekdays="calendar.weekdays"
        ></v-calendar>
      </v-sheet>

    </div>
</template>

<script>
const monthOfYear = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

export default {
  name: 'calendarExceptionsList',
  props: [
    'events'
  ],
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    // dateFormatted: formatDate(new Date().toISOString().substr(0, 10)),
    currentMonth: "2018-01-01",

    calendar: {
      weekdays: [1, 2, 3, 4, 5, 6, 0]
    },

    picker: new Date().toISOString().substr(0, 10),
    landscape: false,
    reactive: false,
    fullWidth: false,
    showCurrent: true,
    month: "month",
    multiple: false,
    readonly: false,
    disabled: false,
    enableEvents: false,

    datepickerMenu: {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      menu2: false,
    }
  }),
  computed: {
    functionEvents () {
      return this.monthFunctionEvents
    },
    computedDateFormatted () {
      return this.formatDate(this.date)
    },

  },
  methods: {
    formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    getMonth(date) {
      let i = new Date(date).getMonth(date)
      return monthOfYear[i]
    },
    setToday () {
      this.focus = this.today
    },
    monthFunctionEvents (date) {
      const month = parseInt(date.split('-')[1], 10)
      if ([1, 3, 7].includes(month)) return true
      if ([2, 5, 12].includes(month)) return ['error', 'purple', 'rgba(0, 128, 0, 0.5)']
      return false
    },
  },
  watch: {
    picker () {
      this.currentMonth = this.picker+"-01"
    },
  },
}
</script>

<style>
</style>