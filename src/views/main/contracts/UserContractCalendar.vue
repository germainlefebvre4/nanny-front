<template>
  <v-container fluid>
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
                    <v-icon>mdi-create</v-icon>
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
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Store } from 'vuex';
import { IUserContractUpdate, IWorkingDays } from '@/interfaces';
import { readUserProfile, readContract, readWorkingDays } from '@/store/main/getters';
import { dispatchGetContract, dispatchUpdateUserContract, dispatchGetContracts, dispatchGetWorkingDays } from '@/store/main/actions';

interface Event {
  name: string;
  start: Date | string;
  end: Date | string;
  color: string;
  timed: boolean;
  contractId: number;
  details: string;
}

@Component
export default class UserContractCalendar extends Vue {
  public valid = true;
  public userId: number = 0;
  public contractId: number = 0;
  public calendar: string = '';
  public type: string = 'month';

  public weekdays: number[] = [1, 2, 3, 4, 5, 6, 0];
  public absenceTypeList: string[] = ['Mock', 'Présence enfant'];
  public absenceType: string = '';

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

  public fetchAbsenceType() {
    return ['Présence enfant', 'Maladie enfant'];
  }

  public delEvent() {
    console.log('delEvent');
  }

  public updateRange({ start, end }) {
    this.selectedYear = start.year;
    this.selectedMonthString = this.monthNames[start.month-1];
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
    const payload = {
      contractId: this.contractId,
      year: this.selectedYear,
      month: this.selectedMonthId,
    };
    await dispatchGetWorkingDays(this.$store, payload);
    // this.$refs.calendar.updateRange();
    this.reset();

    this.updateRange({start: {year: this.selectedYear, month: this.selectedMonthId}, end: {}});
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
    const rawEvents = [...this.workingDays];
    let mappedEvents: Event[] = [];
    for (const event of rawEvents) {
      const mappedEvent = {
        name: event.day_type_id === 50 ? 'Travaillé' : 'Absence',
        start: `${event.day} ${event.start}`,
        end: `${event.day} ${event.end}`,
        id: event.id,
        color: event.day_type_id === 50 ? 'blue' : 'orange',
        timed: true,
        contractId: event.contract_id,
        details: event.day_type_id === 50 ? `Journée travaillée de ${event.start} à ${event.end}` : 'Absence justifiée',
      };

      mappedEvents = [...mappedEvents, mappedEvent];
    }

    return mappedEvents;
  }

  public open(event) {
    alert(event.day);
  }

}
</script>