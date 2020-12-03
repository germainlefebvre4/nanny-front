<template>
  <v-container fluid>
    <v-card class="ma-3 pa-3">
      <v-card-title primary-title>
        <div class="headline primary--text">Modifier le calendrier</div>
      </v-card-title>
      <v-card-text>
        <h3 ref="selectedMonth">{{ selectedMonthString }} {{ selectedYear }}</h3>
        <div>{{ workingDays }}</div>
        <v-layout wrap>
        <v-flex
              xs12
            >
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="calendar"
            color="primary"
            :value="selectedDate"
            :event-color="getEventColor"
            :type="type"
            :weekdays=weekdays
            :show-week='true'
            :events="eventsMap"
            @click:day="addEvent"
            @click:event="showEvent"
            @change="updateRange"
          >
<!---
          <template v-slot:day="day">
            <v-sheet
              v-if="day.day % 3 === 0"
              color="primary"
              class="white--text pa-1"
            >
              day slot {{ day.date }}
            </v-sheet>
          </template>
--->
          <template v-slot:day="{ date }">
            <template v-for="event in workingDaysMap[date]">
              <v-menu
                :key="event.day"
                v-model="event.open"
                full-width
                offset-x
              >
                <template v-slot>
                  <div
                    v-ripple
                    class="my-event"
                    v-html="event.day"
                  ></div>
                </template>
                <v-card
                  color="grey lighten-4"
                  min-width="350px"
                  flat
                >
                  <v-toolbar
                    color="primary"
                    dark
                  >
                    <v-btn icon>
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-toolbar-title v-html="event.day"></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>favorite</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>more_vert</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-title primary-title>
                    <span v-html="event.day"></span>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn
                      flat
                      color="secondary"
                    >
                      Cancel
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </template>
          </template>

          </v-calendar>
        </v-sheet>
        </v-flex>

        <v-flex
          sm4
          xs12
          class="text-sm-left text-xs-center"
        >
          <v-btn @click="$refs.calendar.prev()">
            <v-icon
              dark
              left
            >
              keyboard_arrow_left
            </v-icon>
            Prev
          </v-btn>
        </v-flex>
        <v-flex
          sm4
          xs12
          class="text-xs-center"
        >
          <v-select
            v-model="type"
            :items="typeOptions"
            label="Type"
          ></v-select>
        </v-flex>
        <v-flex
          sm4
          xs12
          class="text-sm-right text-xs-center"
        >
          <v-btn @click="$refs.calendar.next()">
            Next
            <v-icon
              right
              dark
            >
              keyboard_arrow_right
            </v-icon>
          </v-btn>
        </v-flex>
        </v-layout>

      </v-card-text>
    </v-card>

    <v-menu
      v-model="selectedOpen"
      :close-on-content-click="false"
      :activator="selectedElement"
      offset-x
    >
      <v-card
        color="primary"
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
            color="primary"
            @click="selectedOpen = false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>


    <v-menu
      v-model="eventMenuOpen"
      :close-on-content-click="false"
      :activator="newElement"
      :position-x="newEvent.x"
      :position-y="newEvent.y"
      absolute
      offset-y
    >
      <v-card
        color="light"
        min-width="350px"
        flat
      >
        <v-toolbar
          color="primary"
        >
          <v-toolbar-title>Ajouter une journée</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon
              @click="eventMenuOpen = false"
            >close</v-icon>
          </v-btn>
        </v-toolbar>
        
        <v-card-text>
          <span v-html="newEvent.details"></span>
            <v-form v-model="valid">
                Date : {{ this.selectedDate }}

                <v-select
                  :items="absenceTypeList"
                  :menu-props="{ top: true, offsetY: true }"
                  label="Type d'absence"
                  item-value="id"
                  item-text="name"
                  @change="changeAbsenceType"
                ></v-select>

                <v-btn
                  @click="submit"
                  :disabled="!valid"
                >
                  Submit
                </v-btn>
            </v-form>
        </v-card-text>
      </v-card>
    </v-menu>


  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Store } from 'vuex';
import { IUserContractUpdate, IWorkingDays } from '@/interfaces';
import { readUserProfile, readContract, readWorkingDays } from '@/store/main/getters';
import { dispatchGetContract, dispatchUpdateUserContract, dispatchGetContracts, dispatchGetWorkingDays } from '@/store/main/actions';

@Component
export default class UserContractCalendar extends Vue {
  public valid = true;
  public userId: number = 0;
  public contractId: number = 0;
  public calendar: string = 'month';
  public weekdays: number[] = [1, 2, 3, 4, 5, 6, 0];
  public absenceTypeList: string[] = ['Mock', 'Présence enfant'];
  public absenceType: string = '';

  public monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];
  public selectedMonthId: number = 0;
  public selectedYear: number = 0;
  public selectedMonthString: string = '';
  
  // public workingDays: IWorkingDays[] = [];

  public type: string = 'month';
  public typeOptions = [
    { text: 'Week', value: 'week' },
    { text: 'Month', value: 'month' },
  ];

  public events = [
      {
        title: 'Vacation',
        details: 'Going to the beach!',
        date: '2020-12-01',
        open: false
      },
      {
        title: 'Vacation',
        details: 'Going to the beach!',
        date: '2020-12-02',
        open: false
      },
    ];

  public eventOpen: boolean = true;
  public selectedOpen: boolean = false;
  public selectedEvent = {};
  public selectedDate = '';
  public selectedElement = null;
  public eventMenuOpen: boolean = false;
  public newEvent = {
    // name: 'Ajouter un événement',
    x: 100,
    y: 0,
    color: 'green',
  };
  public newElement = null;


  public addEvent(event) {
    console.log('addEvent');
    if (this.eventMenuOpen) {
      this.eventMenuOpen = false;
      setTimeout(() => this.selectedDate = event.date, 100);
      setTimeout(() => this.eventMenuOpen = true, 100);
    } else {
      this.selectedDate = event.date;
      setTimeout(() => this.eventMenuOpen = true, 10);
    }
  }

  public fetchAbsenceType() {
    return ['Présence enfant', 'Maladie enfant'];
  }

  public showEvent() {
    console.log('showEvent');
  }

  public delEvent() {
    console.log('delEvent');
  }

  public updateRange({ start, end }) {
    console.log('updateRange');
    
    this.selectedYear = start.year;
    this.selectedMonthString = this.monthNames[start.month];
    const workingDaysCalendar = []
    for (const [key, value] of Object.entries(this.workingDays)) {
      console.log(key, value);
      
    }
    // this.events = []
  }

  public changeAbsenceType(id) {
    this.absenceType = id;
  }

  public getEventColor(event) {
    return event.color;
  }

  public async mounted() {
    this.contractId = parseInt(this.$router.currentRoute.params.id, 10);
    this.selectedYear = new Date().getFullYear();
    this.selectedMonthId = new Date().getMonth()+1;
    this.selectedMonthString = this.monthNames[new Date().getMonth()];
    await dispatchGetContract(this.$store, this.contractId);
    const payload = {
      contractId: this.contractId,
      year: this.selectedYear,
      month: this.selectedMonthId,
    }
    await dispatchGetWorkingDays(this.$store, payload);
    // this.$refs.calendar.updateRange();
    this.reset();

    // this.eventsMap();
    this.workingDaysMap();
  }

  public get workingDays() {
    return readWorkingDays(this.$store);
  }

  public created() {
    const userProfile = readUserProfile(this.$store);
    if (userProfile) {
      this.userId = userProfile.id;
    }
  }

  public reset() {
    this.$validator.reset();
  }

  public cancel() {
    this.$router.back();
  }

  public async submit() {
    console.log('submit');
  }

  public workingDaysMap() {
    const map = {};
    console.log(this.workingDays);
    for (const [key, value] of Object.entries(this.workingDays)) {
      value['open'] = false;
      map[value.day] = [];
      map[value.day].push(value);
    }
    console.log(map);
    return map;
  }

  public eventsMap() {
    // const map = {};
    // console.log(this.workingDays);
    // // this.workingDays.forEach(e => (map[e.day] = map[e.day] || []).push(e));
    // for (let e in this.workingDays) {
    // }
    // console.log(map);
    // return this.workingDays;
    /*
    Expected return
    [2020-12-01: Array(1), 2020-12-02: Array(1)]
      2020-12-01: Array(1)
        0: {__ob__: Observer}
        length: 1
        __proto__: Array(0)
      2020-12-02: [{…}]
    */
    const map = [];
    this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))

    console.log(map);
    return map;
  }

}
</script>
