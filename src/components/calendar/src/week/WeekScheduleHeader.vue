<template lang="pug">
  .WeekScheduleHeader.flex
    slot(name="fixedHeader")
    .schedule__header__grid.flex.column.center-center(v-for="obj in calendar" :class="[dateHighlight(obj) && 'highlight']")
      span.grid__weekday {{ obj.weekday | transfromWeekday(weekStartAt) }}
      span.grid__date {{ obj.ms | headerDateFormatter(headerDateFormat) }}
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'WeekScheduleHeader',

  props: {
    date: [Date, Number, String],
    calendar: Array,
    weekStartAt: String,
    highlightDate: Array,
    headerDateFormat: String
  },

  filters: {
    headerDateFormatter(val, format) {
      return dayjs(val).format(format)
    },

    transfromWeekday(val, weekStartAt) {
      let setting = {
        Sun: ['週日', '週一', '週二', '週三', '週四', '週五', '週六', '週日'],
        Mon: ['週一', '週二', '週三', '週四', '週五', '週六', '週日', '週一']
      }

      return setting[weekStartAt][val]
    },
  },

  methods: {
    dateHighlight(obj) {
      let { highlightDate } = this
      return highlightDate
        ? highlightDate.includes(obj.fullDate)
        : false
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../style/week/weekScheduleHeader.styl'
</style>