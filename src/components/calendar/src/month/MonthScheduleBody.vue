<template lang="pug">
  .MonthScheduleBody.flex(
    :class="[isCurrentMonth && 'currentMonth', firstDayIs1 && 'donotAddMgt']"
    :data-month="`${templateDateInfo.year}-${templateDateInfo.month}`" 
    :data-index="templateIndex"
  )
    // TODO
    // 優化點擊事件 showBookingDialog
    //- 點擊格子可以帶入排班
    .schedule__body__grid.flex(
      v-for="(dayObj, j) in template" 
      :class="{ pointer: dayObj.day, multiple }" 
      @click.self="clickGrid($event, dayObj)"
    )
      .grid__date(:class="{ today: isToday(dayObj) }" @click.self="clickGrid($event, dayObj)")
        span {{ dayObj.day }}
      .grid__content.flex.column.v-center(@click.self="clickGrid($event, dayObj)")
        slot(name="content" :dayObj="dayObj")
</template>

<script>
import { isToday, isTheSameMonth } from 'q-calendar-support'

export default {
  name: "qMonthBody",
  props: {
    date: [Date, Number, String],
    /**
     * 若是 Multiple 且沒有 pointer 則加上 z-index -10
     */
    multiple: Boolean,
    template: {
      type: Array,
      default: () => []
    },
    templateIndex: Number,
    templateLength: Number
  },

  computed: {
    firstDayIs1() {
      return this.template[0]?.day === 1
    },
    templateDateInfo() {
      return this.template.find(f => f.dateInfo.year)?.dateInfo || {}
    },
    isCurrentMonth() {
      return isTheSameMonth({
        current: this.date,
        target: this.templateDateInfo.fullDate
      })
    },
  },

  methods: {
    isToday() {
      return isToday()
    },

    clickGrid(event, dayObj) {
      this.$emit('clickGrid', { event, dayObj })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../style/monthScheduleBody.styl'
@import '../../style/monthScheduleBodyM.styl'
</style>