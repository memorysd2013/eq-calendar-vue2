<template lang="pug">
  .MonthScheduleBody.flex(
    :class="[isCurrentMonth && 'currentMonth', firstDayIs1 && 'donotAddMgt']"
    :data-month="`${templateDateInfo.year}-${templateDateInfo.month}`" 
    :data-index="templateIndex"
  )
    .schedule__body__grid.flex(
      v-for="(dayObj, j) in template" 
      :class="[dayObj.day && 'actualDday', multiple && 'multiple', dayObj.dayCustomClass]"
      :style="dayObj.dayStyle"
      @click.self="clickGrid($event, dayObj)"
    )
      slot(name="tip" :dayObj="dayObj")
      .grid__date(:class="{ today: dayObj.today }" @click.self="clickGrid($event, dayObj)")
        span {{ dayObj.day }}
      .grid__content.flex.column.v-center(@click.self="clickGrid($event, dayObj)")
        slot(name="content" :dayObj="dayObj")
</template>

<script>
import { isTheSameMonth } from 'eq-calendar-support'

export default {
  name: "eqMonthBody",
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
    templateLength: Number,
    options: Object
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
    }
  },

  methods: {
    clickGrid(event, dayObj) {
      this.$emit('clickGrid', { event, dayObj })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../style/month/monthScheduleBody.styl'
@import '../../style/month/monthScheduleBodyM.styl'
</style>