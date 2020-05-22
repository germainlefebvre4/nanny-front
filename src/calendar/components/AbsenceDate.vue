<template>
  <div>
    <v-text-field
      label="Absence date"
      v-model="absenceDate"

      :counter="10"
      required
      name="absenceDate"
    ></v-text-field>
  </div>
</template>

<script>
export default {

  name: 'AbsenceDate',

  data () {
    return {
      valid: false,
      absenceDate: '',
      absenceDateRules: [
        (v) => !!v || 'Name is required',
        (v) => v.length <= 10 || 'Name must be less than 10 characters'
      ]
    }
  }

}
</script>

<style>
</style>