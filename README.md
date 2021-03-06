## Install
```shell
yarn add eq-calendar-vue2
npm i eq-calendar-vue2
```

## Quick Start
``` javascript
import Vue from 'vue'
import eqCalendar from 'eq-calendar-vue2'
import 'eq-calendar-vue2/dist/eq-calendar-vue2.css'

Vue.use(eqCalendar)
```

## All Parameters
```javascript
q-calendar(
  mode="month",
  height="calc(100vh - 72px - 50px - 60px)"
  :date="pickedDate"
  :calendar="template"
  :positionList.sync="calendarPosList"
  weekStartAt="Sun"
  :options="{ brackets: true, bracketsType: '()' }"
  @clickGrid="clickGrid"
  @onScroll="onCalendarScroll"
)
```
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
```
```

## Browser Support
Modern browsers and Internet Explorer 10+.

## LICENSE
[MIT](LICENSE)