<template lang="pug">
  .DaySchedule
    //- Header
    DayScheduleHeader(
      :date="date"
      :height="options.headerHeight"
      :todayColor="options.todayColor"
      :weekdayFormatter="options.weekdayFormatter"
    )
      template(v-slot:fixedHeader)
        slot(name="fixedHeader")
    
    //- Body
    // 資料的方式 內部的資料結構
    DayScheduleBody(
      :template="template"
      :height="options.headerHeight"
    )
      template(v-slot:content="{ hourObj }")
        slot(name="content" :hourObj="hourObj")

</template>

<script>
import DayScheduleHeader from './DayScheduleHeader'
import DayScheduleBody from './DayScheduleBody'

export default {
  name: 'eqDay',
  components: {
    DayScheduleHeader,
    DayScheduleBody,
  },
  props: {
    date: [Date, Number, String],
    template: Array,
    options: Object
  },
  computed: {

  },
}
</script>

<style lang="stylus" scoped>
@import '../../style/day/daySchedule.styl'

</style>