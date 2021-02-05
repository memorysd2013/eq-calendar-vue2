<template lang="pug">
  .DaySchedule
    span DaySchedule
    span {{ date }}
    //- span {{ template }}
    //- span {{ options }}
    //- Header
    DayScheduleHeader(
      :date="date"
    )
      template(v-slot:fixedHeader)
        slot(name="fixedHeader")
    
    //- Body
    DayScheduleBody
    // 資料的方式 內部的資料結構

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