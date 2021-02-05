<template lang="pug">
  .TimelineColumn.flex.column
    .timestep(v-for="clock in 24" :style="{ height: `${gap}px` }")
      span.timestepLabel(:class="{ hide: hideFirstClock && clock === 1 }") {{ clock | transferClock }}

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
  },
  filters: {
    transferClock(clock) {
      return clock <= 10 ? `0${clock - 1}:00` : `${clock - 1}:00`
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
      &.hide
        opacity 0

</style>
