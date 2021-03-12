<template lang="pug">
  .WeekSchedule
    WeekScheduleHeader(
      :date="date"
      :calendar="template"
      :weekStartAt="weekStartAt"
      :highlightDate="highlightDate"
      :headerDateFormat="options.headerDateFormat"
    )
      template(v-slot:fixedHeader)
        slot(name="fixedHeader")

    template(v-if="customWeekBody")
      slot(name="customWeekBody")

    template(v-else)
      WeekScheduleBody(
        :calendar="template"
        :weekStartAt="weekStartAt"
      )

</template>

<script>
import WeekScheduleBody from './WeekScheduleBody'
import WeekScheduleHeader from './WeekScheduleHeader'

export default {
  name: 'WeekSchedule',
  components: {
    WeekScheduleBody,
    WeekScheduleHeader
  },

  props: {
    date: [Date, Number, String],
    template: Array,
    weekStartAt: String,
    customWeekBody: Boolean,
    highlightDate: Array,
    options: Object
  },
  data: () => ({}),

}
</script>

<style lang="stylus" scoped>
@import '../../style/week/weekSchedule.styl'
</style>
