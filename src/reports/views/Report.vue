<template>
    <div>
        <ReportList :report="this.report.data" />
    </div>
</template>

<script>
import ReportList from '../components/Report_list.vue'
import ReportService from '../services/report.service.js'

export default {
  name: 'report',
  components: {
    ReportList
  },
  props: {

  },
  async mounted() {
    this.report = await ReportService.getReports()
  },
  data: () => ({
    report: {}
  })
}
</script>

<style>
</style>