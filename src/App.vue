<template lang="pug">
  section.main
    h2 
    eqCalendar(
      :mode="mode"
      height="90vh"
      :calendar="template"
      :customWeekBody="true"
      :positionList="calendarPosList"
      weekStartAt="Sun"
    )
      template(v-slot:fixedHeader)
        h2 外部傳進來的
      template(v-slot:customWeekBody)
        h3 外部傳進來的

</template>

<script>
import { getEmptyTemplate } from 'eq-calendar-support'
import eqCalendar from '@/components/calendar/src/eqCalendar'

export default {
  name: 'App',
  components: {
    eqCalendar
  },

  data: () => ({
    mode: 'Week',
    template: [],
    calendarPosList: {},

    //
    resizeDebounce: null,
    resizeDebounceTimer: null
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
      let result
      switch (this.mode) {
        case 'Month':
          result = this.isMobile()
            ? [
              getEmptyTemplate('Month', { year: 2020, month: 12 }),
              getEmptyTemplate('Month', { year: 2021, month: 1 }),
              getEmptyTemplate('Month', { year: 2021, month: 2 }),
              getEmptyTemplate('Month', { year: 2021, month: 3 }),
              getEmptyTemplate('Month', { year: 2021, month: 4 }),
              getEmptyTemplate('Month', { year: 2021, month: 5 })
            ]
            : getEmptyTemplate('Month', { year: 2021, month: 2 })
          break
        case 'Week':
          result = getEmptyTemplate('Week', { year: 2021, month: 2, day: 11 }, { weekStartAt: 0 })
          console.log('result', result)
          break
      }

      this.template = result
    }
  }
}
</script>

<style lang="stylus" scoped>
  .main
    max-width 1366px
    margin auto
</style>