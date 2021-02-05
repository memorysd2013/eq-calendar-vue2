<template lang="pug">
  .DateCube.flex.column.v-center(:class="{ today }" :style="dateCubeStyle")
    span.mainDate {{ mainDate }}
    span.weekday {{ weekday | weekdayFormat(weekdayFormatter) }}

</template>

<script>
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import { getWeekday } from 'eq-calendar-support'

export default {
  name: 'DateCube',
  props: {
    date: [Date, Number, String],
    weekdayFormatter: {
      type: Array,
      default: () => (['週日', '週ㄧ', '週二', '週三', '週四', '週五', '週六'])
    },
    todayColor: {
      type: String,
      default: '#eb8d48'
    }
  },
  computed: {
    mainDate() {
      return dayjs(this.date).format('M/D')
    },
    weekday() {
      return getWeekday(this.date)
    },
    today() {
      let _date = this.date
      dayjs.extend(isToday)
      return dayjs(_date).isToday()
    },
    dateCubeStyle() {
      return this.today
        ? {
          color: this.todayColor
        }
        : {}
    }
  },
  filters: {
    weekdayFormat(w, mapping) {
      return mapping?.[w]
    }
  }
}
</script>

<style lang="stylus" scoped>
cubeMinW = 38px

.DateCube
  min-width cubeMinW
  font-weight 500
  &.today
    font-weight bold

  .mainDate
    font-size 1.375rem

  .weekday
    margin-top 5px
    font-size 1.125rem

</style>
