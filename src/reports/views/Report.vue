<template>
    <div>
        <ReportList :report="this.report.data" />
    </div>
</template>

<script>
import ReportList from '../components/Report_list.vue'
import ReportService from '../services/Report.service.js'

export default {
  name: 'report',
  components: {
    ReportList
  },
  async mounted() {
    this.report = await ReportService.getReports()
  },
  data() {
    return { 
        report: {}
    }
  }
}
</script>

<style>
</style>