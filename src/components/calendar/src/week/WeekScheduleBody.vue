<template lang="pug">
  // TODO
  // 完成週曆
  .WeekScheduleBody
    //- .schedule__body__row.flex(v-for="item in template")
    //-   .schedule__body__row__grid.flex.column.v-center(v-for="wd in calendar")
    //-     h2 1
    
</template>

<script>
export default {
  name: 'WeekScheduleBody',
  props: {
    calendar: Array,
    weekStartAt: String
  }
}

</script>

<style lang="stylus" scoped>
@import '../../style/week/weekScheduleBody.styl'
</style>