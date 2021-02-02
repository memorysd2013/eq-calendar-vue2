import eqCalendar from './src/eqCalendar.vue'
eqCalendar.install = function (Vue) {
  Vue.component('q-calendar', eqCalendar)
}

export default eqCalendar