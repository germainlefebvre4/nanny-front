<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" md="12" lg="9" >
        <v-card class="ma-3 pa-3">
          <v-card-title primary-title>
            <div class="headline primary--text">Modifier le calendrier</div>
          </v-card-title>
          <v-card-text>
            <h3 ref="selectedMonth">{{ selectedMonthString }} {{ selectedYear }}</h3>
            <v-layout wrap>
              <v-flex xs12>
                <v-sheet height="600">
                  <v-calendar
                    ref="calendar"
                    v-model="calendar"
                    color="primary"
                    :value="selectedDate"
                    :event-color="getEventColor"
                    :type="type"
                    :weekdays="weekdays"
                    :show-week='true'
                    :events="events"
                    @change="updateRange"
                    @click:event="showEvent"
                    @click:day="addEvent"
                    @click:date="addEvent"
                  >
                  </v-calendar>
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
                        <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                          <v-icon>mdi-pen</v-icon>
                        </v-btn>
                        <v-btn icon>
                          <v-icon>mdi-delete</v-icon>
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
                          Fermer
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-menu>

                  <v-dialog
                    v-model="newOpen"
                    :close-on-content-click="false"
                    :activator="newElement"
                    offset-x
                    min-width="200"
                    max-width="700"
                  >
                    <v-card
                      color="grey lighten-4"
                      flat
                    >
                      <v-toolbar
                        dark
                      >
                        <v-toolbar-title>Ajouter une journée</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn
                          icon
                          @click="addEventClose"
                        >
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </v-toolbar>
                      <v-card-text>
                        <p></p>
                        <div class="text--primary">
                          <v-row align="center">
                            <v-col cols="6">
                              <v-subheader>
                                Date
                              </v-subheader>
                            </v-col>

                            <v-col cols="6">
                              {{ newEvent.date }}
                            </v-col>
                          </v-row>
                          <v-row align="center">
                            <v-col cols="6">
                              <v-subheader>
                                Type de la journée
                              </v-subheader>
                            </v-col>

                            <v-col cols="6">
                              <v-select
                                v-model="newEvent.dayType"
                                :items="dayTypes"
                                item-text="name"
                                item-value="name"
                                label="Type"
                                persistent-hint
                                return-object
                                single-line
                              ></v-select>
                            </v-col>
                          </v-row>
                          <v-row align="center">
                            <v-col cols="6">
                              <v-subheader>
                                Heure de début
                              </v-subheader>
                            </v-col>

                            <v-col cols="2">
                              <v-select
                                v-model="newEvent.hours.start.hour"
                                :items="hoursList"
                                label="Heure"
                                persistent-hint
                                return-object
                                single-line
                              ></v-select>
                            </v-col>
                            <v-col cols="2">
                              <v-select
                                v-model="newEvent.hours.start.minutes"
                                :items="minutesList"
                                label="Minute"
                                persistent-hint
                                return-object
                                single-line
                              ></v-select>
                            </v-col>
                          </v-row>
                          <v-row align="center">
                            <v-col cols="6">
                              <v-subheader>
                                Heure de fin
                              </v-subheader>
                            </v-col>

                            <v-col cols="2">
                              <v-select
                                v-model="newEvent.hours.end.hour"
                                :items="hoursList"
                                label="Heure"
                                persistent-hint
                                return-object
                                single-line
                              ></v-select>
                            </v-col>
                            <v-col cols="2">
                              <v-select
                                v-model="newEvent.hours.end.minutes"
                                :items="minutesList"
                                label="Minute"
                                persistent-hint
                                return-object
                                single-line
                              ></v-select>
                            </v-col>
                          </v-row>
                        </div>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn
                          text
                          color="secondary"
                          @click="addCalendarEvent"
                        >
                          Ajouter
                        </v-btn>
                        <v-btn
                          text
                          color="secondary"
                          @click="addEventClose"
                        >
                          Fermer
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-sheet>
              </v-flex>

              <v-flex sm4 xs12 class="text-sm-left text-xs-center">
                <v-btn @click="$refs.calendar.prev()">
                  <v-icon
                    dark
                    left
                  >
                    mdi-arrow-left
                  </v-icon>
                  Précédent
                </v-btn>
              </v-flex>
              <v-flex sm4 xs12 class="text-xs-center">
                <v-select v-model="type" :items="typeOptions" label="Type"></v-select>
              </v-flex>
              <v-flex
                sm4
                xs12
                class="text-sm-right text-xs-center"
              >
                <v-btn @click="$refs.calendar.next()">
                  Suivant
                  <v-icon
                    right
                    dark
                  >
                    mdi-arrow-right
                  </v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <MonthSummary :summary="summary"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Store } from 'vuex';
import { IDayType, IUserContractUpdate, IWorkingDays } from '@/interfaces';
import {
  readUserProfile,
  readContract,
  readWorkingDays,
  readDayTypes,
  readContractSummary,
} from '@/store/main/getters';
import {
  dispatchGetContract,
  dispatchUpdateUserContract,
  dispatchGetContracts,
  dispatchGetWorkingDays,
  dispatchGetContractSummary,
  dispatchGetDayTypes,
  dispatchAddWorkingDay,
} from '@/store/main/actions';
import MonthSummary from '@/components/MonthSummary.vue';
import moment from 'moment';

interface Event {
  name: string;
  start: Date | string;
  end: Date | string;
  color: string;
  timed: boolean;
  contractId: number;
  details: string;
  id?: number;
}

@Component({
  components: {
    MonthSummary,
  },
})
export default class UserContractCalendar extends Vue {
  public valid = true;
  public userId: number = 0;
  public contractId: number | null = null;
  public calendar: string = '';
  public type: string = 'month';

  public weekdays: number[] = [1, 2, 3, 4, 5, 6, 0];
  public absenceTypeList: string[] = ['Mock', 'Présence enfant'];
  public absenceType: string = '';

  public hoursList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  public minutesList = ['0', '5', '10', '15', '20',
    '25', '30', '35', '40', '45', '50', '55', '60'];

  public monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
  ];
  public selectedMonthId: number = 0;
  public selectedYear: number = 0;
  public selectedMonthString: string = '';

  public typeOptions = [
    { text: 'Semaine', value: 'week' },
    { text: 'Mois', value: 'month' },
  ];

  public events: Event[] = [];
  public eventColor = [
    'black',
    'green',
    'orange',
    'yellow',
    'red',
    'blue',
    'purple',
    'grey',
  ];

  public selectedOpen: boolean = false;
  public selectedDate = '';
  public selectedEvent = {};
  public selectedElement = null;

  public newOpen: boolean = false;
  public newDate = '';
  public dayType: IDayType = {
    id: null,
    name: null,
  };
  public newEvent = {
    dayType: this.dayType,
    date: null,
    year: null,
    month: null,
    day: null,
    hours: {
      start: {
        hour: null,
        minutes: null,
      },
      end: {
        hour: null,
        minutes: null,
      },
    },
  };
  public newElement = null;

  public addEvent({date, year, month, day}) {
    this.newEvent = {...this.newEvent, date, year, month, day};
    this.newOpen = true;
  }

  public addEventClose() {
    this.newOpen = false;
    this.newDate = '';
  }

  public showEvent({ nativeEvent, event }) {
    const open = () => {
      this.selectedEvent = event;
      this.selectedElement = nativeEvent.target;
      setTimeout(() => {
        this.selectedOpen = true;
      }, 10);
    };

    if (this.selectedOpen) {
      this.selectedOpen = false;
      setTimeout(open, 10);
    } else {
      open();
    }

    nativeEvent.stopPropagation();
  }

  public delEvent() {
    console.log('delEvent');
  }

  public async updateRange({ start, end }) {
    this.events = [];
    this.selectedYear = start.year;
    this.selectedMonthId = start.month;
    this.selectedMonthString = this.monthNames[start.month - 1];
    const payload = {
      contractId: this.contractId,
      year: this.selectedYear,
      month: this.selectedMonthId,
    };
    if (this.contractId !== null) {
      await dispatchGetWorkingDays(this.$store, payload);
      await dispatchGetContractSummary(this.$store, payload);
    }

    this.events = this.workingDaysMap();
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
    this.selectedMonthId = new Date().getMonth() + 1;
    this.selectedMonthString = this.monthNames[new Date().getMonth()];
    await dispatchGetContract(this.$store, this.contractId);
    await dispatchGetDayTypes(this.$store);
    const payload = {
      contractId: this.contractId,
      year: this.selectedYear,
      month: this.selectedMonthId,
    };
    this.reset();

    this.updateRange({start: {year: this.selectedYear, month: this.selectedMonthId}, end: {}});
  }

  public get workingDays() {
    return readWorkingDays(this.$store);
  }
  public get dayTypes() {
    return readDayTypes(this.$store);
  }

  public get summary() {
    return readContractSummary(this.$store);
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
    // Start -- Quick fix eventCOlor
    this.eventColor[50] = 'grey';
    this.eventColor[51] = 'black';
    // End
    const map = {};
    const rawEvents = [...this.workingDays];
    let mappedEvents: Event[] = [];
    for (const event of rawEvents) {
      const mappedEvent: Event = {
        name: event.day_type.name || '',
        start: `${event.day} ${event.start}`,
        end: `${event.day} ${event.end}`,
        id: event.id,
        color: this.eventColor[event.day_type.id || 50],
        timed: true,
        contractId: event.contract_id,
        details: event.day_type.name || '',
      };

      mappedEvents = [...mappedEvents, mappedEvent];
    }

    return mappedEvents;
  }

  public open(event) {
    alert(event.day);
  }

  public async addCalendarEvent() {
    const newWorkingDay = {
      contractId: this.contractId,
      dayType: this.newEvent.dayType.id,
      data: {
        day: this.newEvent.date,
        start: `${this.newEvent.hours.start.hour}:${this.newEvent.hours.start.minutes}:00`,
        end: `${this.newEvent.hours.end.hour}:${this.newEvent.hours.end.minutes}:00`,
      },
    };
    await dispatchAddWorkingDay(this.$store, newWorkingDay);
    this.newOpen = false;
    // TODO: add directly the new event in workingDays inside store instead of call API
    this.updateRange({start: {year: this.selectedYear, month: this.selectedMonthId}, end: {}});
  }

}
</script>