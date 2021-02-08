<template lang="pug">
  .TimelineColumn.flex.column
    .timestep(v-for="(item, index) in template" :style="{ height: `${gap}px` }")
      .timestepLabel(:class="{ hide: hideFirstClock && index === 0 }")
        template(v-if="item.clock")
          span {{ item.clock }}
        template(v-else)
          span {{ index | transferClock }}

</template>

<script>
export default {
  name: 'TimelineColumn',
  props: {
    hideFirstClock: {
      type: Boolean,
      default: true
    },
    gap: [Number, String],
    template: Array,
  },
  filters: {
    transferClock(clock) {
      return clock < 10 ? `0${clock}:00` : `${clock}:00`
    },
  },
}
</script>

<style lang="stylus" scoped>
.TimelineColumn
  .timestep
    .timestepLabel
      display inline-block
      transform translateY(-13px)
      text-align center
      padding 0 8px 0 15px
      color #666
      &.hide
        opacity 0

</style>
