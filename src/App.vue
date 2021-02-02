<template lang="pug">
  section.main
    qCalendar(
      mode="month"
      height="90vh"
      :calendar="template"
      :positionList="calendarPosList"
      weekStartAt="Sun"
    )

</template>

<script>
import { getTemplate } from 'q-calendar-support'
import qCalendar from '@/components/calendar/src/qCalendar'

export default {
  name: 'App',
  components: {
    qCalendar
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