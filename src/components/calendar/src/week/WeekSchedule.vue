<template lang="pug">
  .WeekSchedule
    WeekScheduleHeader(
      :date="date"
      :calendar="template"
      :weekStartAt="weekStartAt"
    )
      template(v-slot:fixedHeader)
        slot(name="fixedHeader")
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
    weekStartAt: String
  },
  data: () => ({}),

}
</script>

<style lang="stylus" scoped>
@import '../../style/week/weekSchedule.styl'
</style>
