<template lang="pug">
  section.main
    .info.flex.v-center
      h4 eq-calendar component demo
      span 時間
      input(type="date" v-model="selectDate" @change="setTemplate")
      span 類型
      select(v-model="mode" @change="setTemplate")
        template(v-for="opt in options")
          option(:value="opt.value") {{ opt.label }}

    .wrapper
      eqCalendar(
        :mode="mode"
        :date="selectDate"
        height="90vh"
        :calendar="template"
        :customWeekBody="true"
        :positionList="calendarPosList"
        weekStartAt="Sun"
      )
        template(v-slot:fixedHeader)
          .fixedHeader
            //- h4 外部傳進來的
        template(v-slot:customWeekBody)
          .flex(v-for="idx in 5")
            .weekBodyBox.flex.center-center
              span 第{{ idx + 1 }}位
            .weekBodyBox.flex.center-center(v-for="header in template" )
              //- span 

        template(v-slot:tip)

        //- slot for DaySchedule
        template(v-slot:content="{ hourObj }")

</template>

<script>
import { getEmptyTemplate } from 'eq-calendar-support'
import eqCalendar from '@/components/calendar/src/eqCalendar'
import dayjs from 'dayjs'

export default {
  name: 'App',
  components: {
    eqCalendar
  },

  data: () => ({
    mode: 'Month',
    template: [],
    calendarPosList: {},

    selectDate: dayjs().format('YYYY-MM-DD'),

    //
    resizeDebounce: null,
    resizeDebounceTimer: null,

    creating: false,

    options: [
      { label: '月曆', value: 'Month' },
      { label: '週曆', value: 'Week' },
      { label: '日曆', value: 'Day' },
    ]
  }),

  async mounted() {
    this.setTemplate()
  },
  methods: {
    console(slotProps) {
      console.log('App: slotProps', slotProps)
    },

    isMobile() {
      return window.innerWidth < 768
    },

    /**
     * Resize 時 reload leave page (透過更新 router 切換)
     */
    resizeListener() {
      if (this.isMobile()) {
        this.loading = true
        if (this.resizeDebounce)
          clearTimeout(this.resizeDebounceTimer)

        this.resizeDebounce = true
        this.resizeDebounceTimer = setTimeout(() => {
          this.setTemplate()
          this.loading = false
        }, 100)
      }
    },

    setTemplate() {
      if (!this.selectDate) {
        this.selectDate = dayjs().format('YYYY-MM-DD')
      }

      const getYearMonth = (date, i) => ({ year: Number(dayjs(date).add(i, 'M').format('YYYY')), month: Number(dayjs(date).add(i, 'M').format('MM')) })
      let [year, month, day] = this.selectDate.split('-').map(d => Number(d))

      let result
      switch (this.mode) {
        case 'Month':
          result = this.isMobile()
            ? [
              getEmptyTemplate('Month', getYearMonth(this.selectDate, 0)),
              getEmptyTemplate('Month', getYearMonth(this.selectDate, 1)),
              getEmptyTemplate('Month', getYearMonth(this.selectDate, 2)),
              getEmptyTemplate('Month', getYearMonth(this.selectDate, 3)),
              getEmptyTemplate('Month', getYearMonth(this.selectDate, 4)),
              getEmptyTemplate('Month', getYearMonth(this.selectDate, 5))
            ]
            : getEmptyTemplate('Month', getYearMonth(this.selectDate, 0))
          break
        case 'Week':
          result = getEmptyTemplate('Week', { year, month, day }, { weekStartAt: 0 })
          break
        case 'Day':
          result = getEmptyTemplate('Day', { startHour: 0, endHour: 23 }, {})
          break
      }

      console.log(`${this.mode} template`, result)

      // testing
      // console.log({ result })
      // result.forEach(r => {
      //   if (r.dayStyle) {
      //     r.dayStyle.backgroundColor = '#ffaaaa'
      //     r.dayCustomClass = 'testing'
      //     r.dayStyle.cursor = 'default'
      //   }
      // })

      this.template = result
    },

    /**
     * 
     */
    infiniteScroll(e) {
      console.log({ ...e })
      if (this.mode === 'Month' && e.currentMonth && !this.creating) {
        this.creating = true

        if (e.currentMonthIndex >= this.template.length - 1) {
          let [currentYear, currentMonth] = e.currentMonth.split('_')
            , { year, month } = this.getNextOrPrevYearMonth(currentYear, currentMonth, 'next')

          this.template = [...this.template.slice(1, 6), getEmptyTemplate('Month', { year, month }),]

          console.log(year, month, this.template)
        }

        this.creating = false
      }
    },

    getNextOrPrevYearMonth(year, month, type) {
      let _y = Number(year)
        , _m = Number(month)
      type === 'next' ? _m++ : _m--
      if (_m <= 0)
        return { year: _y - 1, month: 12, key: `${_y - 1}_12` }
      else if (_m > 12)
        return { year: _y + 1, month: 1, key: `${_y + 1}_1` }
      else
        return { year: _y, month: _m, key: `${_y}_${_m}` }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .main
    margin auto
    padding 2rem
    height 100vh

  .wrapper
    height calc(100% - 60px)
    overflow scroll

  .info
    height 60px
    > * 
      margin-right .5rem

  .fixedHeader
    width 100%
    text-align center
    margin auto

  .weekBodyBox
    width 100%
    border-bottom 1px solid #ddd
    & + .weekBodyBox
      border-left 1px solid #ddd
      min-height 90px
</style>