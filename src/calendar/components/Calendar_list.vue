<template>
  <div>
    CalendarList<br />
    <v-row class="fill-height">
      <v-col>

        <v-sheet height="64">
          <v-toolbar flat color="white">
            <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
              Today
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small>mdi-chevron-right</v-icon>
            </v-btn>
            <v-toolbar-title>{{ title | capitalize }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-sheet>

        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            @click:day="addEvent"
            @click:event="showEvent"
            @change="updateRange"
          ></v-calendar>

          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card
              color="grey lighten-4"
              min-width="350px"
              flat
            >
              <v-toolbar
                :color="selectedEvent.color"
                dark
              >
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon
                    @click="delEvent"
                  >mdi-delete</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon
                    @click="selectedOpen = false"
                  >mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  text
                  color="secondary"
                  @click="selectedOpen = false"
                >
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>

          <v-menu
            v-model="newOpen"
            :close-on-content-click="false"
            :activator="newElement"
            :position-x="newEvent.x"
            :position-y="newEvent.y"
            absolute
            offset-y
          >
            <v-card
              color="grey lighten-4"
              min-width="350px"
              flat
            >
              <v-toolbar
                :color="newEvent.color"
                dark
              >
                <v-toolbar-title v-html="newEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon
                    @click="newOpen = false"
                  >mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="newEvent.details"></span>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  text
                  color="secondary"
                  @click="newOpen = false"
                >
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>

      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios';
//import CalendarService from '../services/calendar_list.js'

export default {

  name: 'calendarList',

  data: () => ({
    focus: '',
    type: 'month',
    start: null,
    end: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    newEvent: {
      "name": "Ajouter un événement",
      "x": 0,
      "y": 0,
      "color": "green"
    },
    newElement: null,
    newOpen: false,
    events: [],
    colors: {
      "Absence Enfant": "blue",
      "Maladie Enfant": "purple",
      "Absence Nounou": "orange",
      "Maladie Nounou": "red",
    },
  }),

  computed: {
    title () {
      const { start, end } = this
      if (!start || !end) {
        return ''
      }

      const startMonth = this.monthFormatter(start)
      const startYear = start.year

      return `${startMonth} ${startYear}`
    },
    monthFormatter () {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC', month: 'long',
      })
    },
  },

  mounted () {
    this.$refs.calendar.checkChange()
  },

  methods: {
    getEventColor (event) {
      return event.color
    },
    setToday () {
      var currentDate = new Date();
      this.focus = currentDate.toISOString().split('T')[0]
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    addEvent (event) {
      console.log("addEvent")
      console.log(event)
      const open = () => {
        // this.newEvent = event
        // this.newEvent.color = "green"
        // this.newEvent.x = event.clientX
        // this.newEvent.y = event.clientY
        setTimeout(() => this.newOpen = true, 10)
      }

      if (this.newOpen) {
        this.newOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }
    },
    delEvent () {
      const dateYear = this.selectedEvent.start.substr(0,4)
      const dateMonth = this.selectedEvent.start.substr(5,2)
      const dateDay = this.selectedEvent.start.substr(8,2)

      axios.get('http://localhost:8080/daysoff/search/'+dateYear+'/'+dateMonth+'/'+dateDay
      ).then((data) => {
        if(data.status == 200) {
          const daysoffId = String(data.data.id)
          axios.delete('http://localhost:8080/daysoff/'+daysoffId).then().catch()
          this.selectedOpen = false
        }
      })
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => this.selectedOpen = true, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange ({ start, end }) {
      console.log(start, end)
      const dateYear = start.year
      const dateMonth = ('0' + start.month).slice(-2)

      axios.get('http://localhost:8080/daysoff/search/'+dateYear+'/'+dateMonth
      ).then((data) => {
        if(data.status == 200) {
          let events = [];
          const items = data.data

          for(const item in items) {
            events.push({
              name: `${items[item]["kind"]}`,
              start: `${items[item]["day"]}`,
              color: this.colors[`${items[item]["kind"]}`],
            })
            // events = [...events, newEvent];
          }

          this.start = start
          this.end = end
          this.events = events
        } else {
            console.log("An error occured");
        }
      }).catch()
    },
  },

  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }

}
</script>

<style>
</style>