<template lang="pug">
  section.calendar-wrapper(
    :style="calendarStyle"
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
        template(v-slot:tip="{ dayObj }")
          slot(name="tip" :dayObj="dayObj")
        template(v-slot:content="{ dayObj }")
          slot(name="content" :dayObj="dayObj")
    
    //- Week 週曆
    template(v-else-if="mode === 'Week'")
      WeekSchedule(
        ref="WeekSchedule"
        :date="date"
        :template="calendar"
        :weekStartAt="weekStartAt"
        :customWeekBody="customWeekBody"
        :options="options"
      )
        template(v-slot:fixedHeader)
          slot(name="fixedHeader")
        template(v-slot:customWeekBody)
          slot(name="customWeekBody")

    //- Day 日曆
    template(v-if="mode === 'Day'")
      DaySchedule(
        ref="DaySchedule"
        :date="date"
        :template="calendar"
        :options="options"
      )
        template(v-slot:fixedHeader)
          slot(name="fixedHeader")
        template(v-slot:content="{ hourObj }")
          slot(name="content" :hourObj="hourObj")

</template>

<script>
import MonthSchedule from './month/MonthSchedule'
import WeekSchedule from './week/WeekSchedule'
import DaySchedule from './day/DaySchedule'
import { unitFormat } from '../../../utils/'

export default {
  name: 'eqCalendar',
  components: {
    MonthSchedule,
    WeekSchedule,
    DaySchedule,
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
     * 最大寬度
     */
    maxWidth: {
      type: [String, Number],
      default: ''
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
     * // TODO
     *  - 現在都只有變更 Header 的順序
     *  - Template 的順序沒有變更
     * ----------------------------
     * First day in the week
     * All options:
     *  - Sun (週日), Mon (週一)
     */
    weekStartAt: {
      type: String,
      default: 'Sun'
    },

    /**
     * 是否客製化 [週曆] 內容
     * - 只產生週曆 Header
     */
    customWeekBody: {
      type: Boolean,
      default: false
    },

    /**
     * options 其他參數
     *  - brackets: Boolean
     *    - Header 日期是否需要括號
     * 
     *  - bracketsType: String
     *    - ex: '()', '[]', '{}' ... 任意兩個符號
     * 
     * - scheduleBodyHeight: String
     *    - css height 參數, 設定 Body 高度, 超出則滾動
     * 
     * - headerDateFormat: String
     *    - dayjs format, 僅有 Week 有用
     *    - ex: 'M/DD', 'MM/DD'
     */
    options: {
      type: Object,
      default: () => ({
        brackets: true,
        bracketsType: '()',
        scheduleBodyHeight: 'auto',
        headerDateFormat: 'M/D'
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
    },

    calendarStyle() {
      return {
        height: unitFormat(this.height),
        maxWidth: unitFormat(this.maxWidth)
      }
    },
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

</style>
