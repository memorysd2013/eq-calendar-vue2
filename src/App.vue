<template lang="pug">
  section.main
    h2 
    eqCalendar(
      :mode="mode"
      height="90vh"
      :calendar="template"
      :positionList="calendarPosList"
      weekStartAt="Sun"
    )

</template>

<script>
import { getEmptyTemplate, getWholeWeekday } from 'eq-calendar-support'
import eqCalendar from '@/components/calendar/src/eqCalendar'

export default {
  name: 'App',
  components: {
    eqCalendar
  },

  data: () => ({
    mode: 'Month',
    template: [],
    calendarPosList: {},

    //
    resizeDebounce: null,
    resizeDebounceTimer: null
  }),

  destroyed() {
    window.removeEventListener('resize', this.resizeListener, true)
    this.$store.commit('DateV2/setPickedDate', new Date().getTime())
    this.$store.commit('Calendar/clearCalendarPosList')
  },

  async mounted() {
    window.addEventListener('resize', this.resizeListener, true)
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
      let arr
      switch (this.mode) {
        case 'Month':
          arr = this.isMobile()
            ? [
              getEmptyTemplate({ year: 2020, month: 12 }),
              getEmptyTemplate({ year: 2021, month: 1 }),
              getEmptyTemplate({ year: 2021, month: 2 }),
              getEmptyTemplate({ year: 2021, month: 3 }),
              getEmptyTemplate({ year: 2021, month: 4 }),
              getEmptyTemplate({ year: 2021, month: 5 })
            ]
            : getEmptyTemplate({ year: 2021, month: 2 })
          break
        case 'Week':
          arr = getWholeWeekday(new Date(), 0)
          break
      }

      this.template = arr
    }
  }
}
</script>

<style lang="stylus" scoped>
  .main
    max-width 1366px
    margin auto
</style>