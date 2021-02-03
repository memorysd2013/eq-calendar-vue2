<template lang="pug">
  section.calendar-wrapper(
    :style="{ height: height }"
  )
    //- Year 年曆
    // .........
    //- Month 月曆
    template(v-if="mode === 'Month'")
      MonthSchedule(
        ref="MonthSchedule"
        :date="date"
        :template="calendar"
        :weekStartAt="weekStartAt"
        :options="options"
        :positionList.sync="calendarPosList"
        @clickGrid="clickGrid"
        @scroll="onScroll"
      )
        template(v-slot:content="{ dayObj }")
          slot(name="content" :dayObj="dayObj")
    
    //- Week 週曆
    template(v-else-if="mode === 'Week'")
      WeekSchedule(
        ref="WeekSchedule"
        :date="date"
        :template="calendar" 
      )
</template>

<script>
import MonthSchedule from './month/MonthSchedule'
import WeekSchedule from './week/WeekSchedule'

export default {
  name: 'eqCalendar',
  components: {
    MonthSchedule,
    WeekSchedule
  },
  props: {
    /**
     * What types of view of calendar 日曆呈現樣式
     * All options:
     *  - Year (年曆), Month (月曆), Week (週曆), Day (日曆)
     */
    mode: {
      type: String,
      default: 'Month'
    },

    /**
     * 高度
     */
    height: {
      type: [String, Number],
      default: 'auto'
    },

    /**
     * 
     */
    date: {
      type: [Date, Number, String],
      default: () => new Date()
    },

    /**
     * accept array or nested array
     * - [] or [[], [], [], []]
     */
    calendar: {
      type: Array,
      default: () => []
    },

    /**
     * 日曆位置清單
     */
    positionList: {
      type: Object,
      default: () => ({})
    },

    /**
     * First day in the week
     * All options:
     *  - Sun (週日), Mon (週一)
     */
    weekStartAt: {
      type: String,
      default: 'Sun'
    },

    /**
     * options 其他參數
     *  - brackets: Boolean
     *    - Header 日期是否需要括號
     *  - bracketsType: String
     *    - ex: '()', '[]', '{}' ... 任意兩個符號
     */
    options: {
      type: Object,
      default: () => ({
        brackets: true,
        bracketsType: '()',
        scheduleBodyHeight: 'auto'
      })
    }
  },
  computed: {
    calendarPosList: {
      get() {
        return this.positionList
      },
      set(v) {
        this.$emit('update:positionList', v)
      }
    }
  },

  methods: {
    clickGrid({ event, dayObj }) {
      this.$emit('clickGrid', { event, dayObj })
    },

    onScroll(event) {
      this.$emit('onScroll', event)
    },

    scrollToCurrentMonth({ animate, offset }) {
      this.$refs['MonthSchedule'].scrollToCurrentMonth({ animate, offset })
    }
  }
}
</script>

<style lang="stylus" scoped>

  .calendar-wrapper
    overflow auto

</style>
