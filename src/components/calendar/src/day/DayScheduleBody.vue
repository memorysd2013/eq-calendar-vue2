<template lang="pug">
  .DayScheduleBody.flex(:style="bodyStlye")
    TimelineColumn(:gap="rowHeight" :template="template")
    .content
      template(v-for="clock in template")
        .hourContent(:style="{ height: `${rowHeight}px` }")
          slot(name="content" :hourObj="clock.hourContent")

</template>

<script>
import TimelineColumn from '@/components/calendar/src/common/TimelineColumn.vue'

export default {
  name: 'DayScheduleBody',
  components: {
    TimelineColumn,
  },
  props: {
    template: Array,
    height: {
      type: [Number, String],
      default: 96
    },
  },
  data: () => ({
    rowHeight: 72
  }),
  computed: {
    bodyStlye() {
      return {

      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../style/day/daySchedule.styl'

</style>