<template lang="pug">
  .WeekScheduleHeader.flex
    //- .schedule__header__grid.flex.column.center-center(v-for="obj in pickedWeek")
    //-   span.grid__weekday {{ obj.weekday | transfromWeekday }}
    //-   span.grid__date {{ obj.monthDay }}  
</template>

<script>
export default {
  name: 'WeekScheduleHeader',
  
  props: {
    date: [Date, Number, String],
  },
  computed: {
    // week() {
    //   return this.
    // }
  }
}
</script>

<style lang="stylus" scoped>

</style>