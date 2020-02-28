<template>
  <div>
    ExceptionsList<br />
    <div>
    
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                label="Absence date"
                v-model="absenceDate"

                :counter="10"
                required
                name="absenceDate"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                label="Absence type"
                v-model="absenceType"

                :counter="1"
                required
                name="absenceType"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-btn
                @click="submit"
                :disabled="!valid"
                >
                submit
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>

    </div>
  </div>
</template>

<script>
//import axios from 'axios';
import ExceptionsService from '../services/exceptions_list.js'

export default {
  

  name: 'exceptionsList',
  props: [
    'events'
  ],

  data () {
    return { 
        valid: false,
        absenceDate: '',
        absenceDateRules: [
          (v) => !!v || 'Name is required',
          (v) => v.length <= 10 || 'Name must be less than 10 characters'
        ],
        absenceType: '',
        absenceTypeRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^.*$/.test(v) || 'E-mail must be valid'
        ]
      }
    },
    methods: {
      submit() {
        //return axios
        //  .post('http://localhost:8080/calendar/exceptions')
        ExceptionsService.setExceptions(this.absenceDate, this.absenceType)
      }
    }

}
</script>

<style>
</style>