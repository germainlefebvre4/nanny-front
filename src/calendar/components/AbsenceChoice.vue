<template>
  <div>
      <v-form v-model="valid">
        <v-col
          class="add-event-date"
        >
          Date : {{ absenceDate }}
        </v-col>

        <v-col class="add-event-select">
          <v-select
            :items="absenceTypeList"
            :menu-props="{ top: true, offsetY: true }"
            label="Type d'absence"
            item-value="id"
            item-text="name"
            @change="changeAbsenceType"
            class="add-event-select-list"
          ></v-select>
        </v-col>

        <v-col class="add-event-submit">
          <v-btn
            @click="submit"
            :disabled="!valid"
            class="add-event-submit-button"
          >
            Submit
          </v-btn>
        </v-col>
      </v-form>
  </div>
</template>

<script>
import axios from 'axios';
import ExceptionsService from '../services/exceptions_list.js';
import AbsenceTypeService from '../services/absenceType.js';
import AbsenceType from '../components/AbsenceType.vue';

export default {

  name: 'exceptionsList',
  components: {
    AbsenceType
  },
  props: [
    'absenceDate'
  ],

  data () {
    return { 
      valid: false,
      absenceTypeList: null,
      absenceType: null
    }
  },
  mounted () {
    this.fetchAbsenceType()
  },
  methods: {
    submit() {
      ExceptionsService.setExceptions(this.absenceDate, this.absenceType)
      //App.$.CalendarPicker.$refs.calendar.checkChange()
    },
    changeAbsenceType(id) {
      this.absenceType = id
    },
    async fetchAbsenceType() {
      this.absenceTypeList = await AbsenceTypeService.getAbsenceType();
    }
  }

}
</script>

<style>
.add-event-date {
  padding: 0px 0px 5px 0px
}
.add-event-select {
  padding: 5px 0px 0px 0px
}
.add-event-select-list {
  padding: 5px 0px 0px 0px
}
.add-event-submit {
  padding: 0px 0px 0px 0px
}
.add-event-submit-button {
  padding: 0px 0px 0px 0px
}
.add-event-submit {
  padding: 0px 0px 0px 0px
}
.add-event-submit {
  padding: 0px 0px 0px 0px
}
</style>