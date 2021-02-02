import qCalendar from './src/qCalendar.vue'
qCalendar.install = function (Vue) {
  Vue.component('q-calendar', qCalendar)
}

export default qCalendar