<template lang="pug">
  .DayScheduleHeader.flex(:style="headerStlye")
    .dateInfo.flex.center-center
      DateCube(
        :date="date"
        :todayColor="todayColor"
        :weekdayFormatter="weekdayFormatter"
        :headerDateFormat="headerDateFormat"
      )
    .headerSlot
      slot(name="fixedHeader")

</template>

<script>
import { getWeekday } from 'eq-calendar-support'
import DateCube from '@/components/calendar/src/common/DateCube'

export default {
  name: 'DayScheduleHeader',
  components: {
    DateCube,
  },
  props: {
    date: [Date, Number, String],
    todayColor: String,
    weekdayFormatter: Array,
    headerDateFormat: String,
    height: {
      type: [Number, String],
      default: 96
    },
    top: {
      type: [Number, String],
      default: 0
    },
  },
  computed: {
    weekday() {
      return getWeekday(this.date)
    },
    headerStlye() {
      return {
        height: `${this.height}px`,
        top: `${this.top}px`
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../style/day/dayScheduleHeader.styl'

</style>