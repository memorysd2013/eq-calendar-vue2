<template lang="pug">
  .WeekSchedule
    WeekScheduleHeader(
      :date="date"
    )
    WeekScheduleBody(
      :calendar="template"
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
  },
  data: () => ({}),

}
</script>

<style lang="stylus" scoped>
@import '../../style/week/weekSchedule.styl'
</style>
