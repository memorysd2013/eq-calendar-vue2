<template lang="pug">
  .WeekScheduleBody
    .schedule__body__row.flex(v-for="item in template")
      .schedule__body__row__grid.flex.column.v-center(v-for="wd in 7")
    
</template>

<script>
export default {
  name: 'WeekScheduleBody',
  props: {
    template: Array,
  }
}

</script>

<style lang="stylus" scoped>

</style>