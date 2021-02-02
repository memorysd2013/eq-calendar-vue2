<template lang="pug">
  section.main
    eqCalendar(
      mode="month"
      height="90vh"
      :calendar="template"
      :positionList="calendarPosList"
      weekStartAt="Sun"
    )

</template>

<script>
import { getTemplate } from 'eq-calendar-support'
import eqCalendar from '@/components/calendar/src/eqCalendar'

export default {
  name: 'App',
  components: {
    eqCalendar
  },

  data: () => ({
    template: [],
    calendarPosList: {}
  }),

  mounted() {
    this.template = [
      getTemplate({ year: 2020, month: 12 }),
      getTemplate({ year: 2021, month: 1 }),
      getTemplate({ year: 2021, month: 2 }),
      getTemplate({ year: 2021, month: 3 }),
      getTemplate({ year: 2021, month: 4 }),
      getTemplate({ year: 2021, month: 5 })
    ]
  },
  methods: {
    console(slotProps) {
      console.log('App: slotProps', slotProps)
    }
  }
}
</script>