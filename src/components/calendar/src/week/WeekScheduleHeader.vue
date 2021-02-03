<template lang="pug">
  .WeekScheduleHeader.flex
    .schedule__header__grid
      slot(name="fixedHeader")
    .schedule__header__grid.flex.column.center-center(v-for="obj in calendar")
      span.grid__weekday {{ obj.weekday | transfromWeekday(weekStartAt) }}
      span.grid__date {{ obj.monthDay }}  
</template>

<script>
export default {
  name: 'WeekScheduleHeader',

  props: {
    date: [Date, Number, String],
    calendar: Array,
    weekStartAt: String
  },
  computed: {
    // week() {
    //   return this.
    // }
  },

  filters: {
    transfromWeekday(val, weekStartAt) {
      let setting = {
        Sun: ['週日', '週一', '週二', '週三', '週四', '週五', '週六', '週日'],
        Mon: ['週一', '週二', '週三', '週四', '週五', '週六', '週日', '週一']
      }

      return setting[weekStartAt][val]
    },
  }
}
</script>

<style lang="stylus" scoped>
@import '../../style/week/weekScheduleHeader.styl'
</style>