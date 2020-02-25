<template>
    <div v-if='report'>
      {{ report }}
      <br />
      Mois : {{ report.month }}
      Salaire : {{ report.salary }}
      Fees: {{ report.fees }}
    </div>
</template>

<script>
export default {
  name: 'ReportList',
  props: [
    'report'
  ]
}
</script>

<style>
</style>