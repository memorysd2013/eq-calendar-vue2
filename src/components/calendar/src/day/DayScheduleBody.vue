<template lang="pug">
  .DayScheduleBody.flex
    TimelineColumn(:gap="rowHeight")
    .content
      template(v-for="clock in 24")
        .hourRow(:style="{ height: `${rowHeight}px` }")
          

</template>

<script>
import TimelineColumn from '@/components/calendar/src/common/TimelineColumn.vue'

export default {
  name: 'DayScheduleBody',
  components: {
    TimelineColumn,
  },
  data: () => ({
    rowHeight: 72
  })
}
</script>

<style lang="stylus" scoped>
@import '../../style/day/daySchedule.styl'

</style>