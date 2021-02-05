<template lang="pug">
  .DayScheduleHeader.flex
    .dateInfo.flex.center-center
      DateCube(:date="date")
    .headerSlot
      slot(name="fixedHeader")

</template>

<script>
import dayjs from 'dayjs'
import { getWeekday } from 'eq-calendar-support'
import DateCube from '@/components/calendar/src/common/DateCube'

export default {
  name: 'DayScheduleHeader',
  components: {
    DateCube,
  },
  props: {
    date: [Date, Number, String],
    weekdayFormatter: Array
  },
  computed: {
    mainDate() {
      return dayjs(this.date).format('M/D')
    },
    weekday() {
      return getWeekday(this.date)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../style/day/daySchedule.styl'

</style>