<template lang="pug">
  .MonthSchedule
    //- Header
    .schedule__header.flex
      .schedule__header__col(
        v-for="col in monthScheduleCol"
        :class="[options.brackets && 'brackets']"
        :data-brackettype-prefix="options.bracketsType[0]"
        :data-brackettype-suffix="options.bracketsType[1]"
      )
        span {{ col }}
    
    //- Body
    .schedule__body(
      ref="scheduleBody"
    )
      template(v-if="isMultipleArray")
        MonthScheduleBody(
          multiple
          ref="MonthScheduleBody"
          v-for="(term, termI) of template"
          :key="'MonthScheduleBody_' + termI"
          :date="date"
          :template="term"
          :templateIndex="termI"
          :templateLength="template.length"
          @clickGrid="clickGrid"
        )
          template(v-slot:tip="{ dayObj }")
            slot(name="tip" :dayObj="dayObj")
          template(v-slot:content="{ dayObj }")
            slot(name="content" :dayObj="dayObj")
      
      template(v-else)
        //- [單一] 月曆
        MonthScheduleBody(
          :date="date"
          :template="template"
          @clickGrid="clickGrid"
        )
          template(v-slot:tip="{ dayObj }")
            slot(name="tip" :dayObj="dayObj")
          template(v-slot:content="{ dayObj }")
            slot(name="content" :dayObj="dayObj")
    
</template>

<script>
import { scrollToSpecificPos } from '../../../../utils/'
import MonthScheduleBody from './MonthScheduleBody'

export default {
  name: "eqMonth",
  components: {
    MonthScheduleBody
  },
  props: {
    date: [Date, Number, String],
    template: Array,
    weekStartAt: String,
    positionList: Object
  },
  data: () => ({
    currentMonth: '',
    currentMonthIndex: 0,

    scrolling: null,
    scrollingTimer: null,
    isGettingMore: false,
  }),
  computed: {
    calendarPosList: {
      get() {
        return this.positionList
      },
      set(v) {
        this.$emit('update:positionList', v)
      }
    },

    bracketsType() {
      return this.options.bracketsType.split('')
    },

    monthScheduleCol() {
      let weeks = {
        Sun: ['日', '一', '二', '三', '四', '五', '六'],
        Mon: ['一', '二', '三', '四', '五', '六', '日']
      }
      return weeks[this.weekStartAt]
    },
    isMultipleArray() {
      return Array.isArray(this.template[0])
    }
  },

  watch: {
    template: {
      immediate: true,
      handler() {
        this.requestAnimationFrame(this.calcPos)
      }
    }
  },

  destroyed() {
    window.removeEventListener('scroll', this.scrollEvent, true)
  },
  mounted() {
    window.addEventListener('scroll', this.scrollEvent, true)
    this.requestAnimationFrame(this.scrollToCurrentMonth.bind(this, { animate: false, offsetTop: 0 }))
  },
  methods: {
    requestAnimationFrame(callback) {
      window.requestAnimationFrame
        ? window.requestAnimationFrame(callback)
        : setTimeout(() => callback())
    },

    /**
     * 計算元素高度與位置
     */
    calcPos() {
      let schedules = this.$refs['MonthScheduleBody']
      if (!schedules) return
      schedules.forEach((s, si, arr) => {
        let el = s.$el
          , prevEl = null
        if (si !== 0)
          prevEl = arr[si - 1].$el

        let key = `${s.templateDateInfo.year}_${s.templateDateInfo.month}`
        this.calendarPosList[key] = {
          offsetTop: el.offsetTop,
          prevOffsetTop: prevEl?.offsetTop,
          offsetHeight: el.offsetHeight
        }
      })
    },

    async scrollEvent(e) {
      clearTimeout(this.scrollingTimer)
      this.scrolling = true
      this.scrollingTimer = setTimeout(() => this.scrolling = false, 300)

      this.setCurrentMonth({
        scrollTop: e.target.scrollTop
      })

      this.$emit('scroll', {
        event: e,
        scrollTop: e.target.scrollTop,
        currentMonth: this.currentMonth,
        currentMonthIndex: this.currentMonthIndex,
      })
    },

    /**
     * 取得現在滑動到哪個月份
     */
    setCurrentMonth({ scrollTop }) {
      let posList = this.sort(Object.values(this.calendarPosList), 'offsetTop')
        , targetIndex = this.findIndex(posList, scrollTop)
      if (targetIndex < 0) return

      this.currentMonth = this.sort(Object.keys(this.calendarPosList))[targetIndex]
      this.currentMonthIndex = targetIndex
    },

    sort(arr, prop) {
      return arr.sort((a, b) => {
        let sortA = prop ? a[prop] : a
          , sortB = prop ? b[prop] : b
        if (sortA > sortB) return 1
        if (sortB > sortA) return -1
        return 0
      })
    },

    /**
     * Find target index if scrollTop is between a and b's offsetTop
     * - n: 任意數字, 增加/減少切換月份的滾動距離
     */
    findIndex(arr, scrollTop) {
      let n = 150
      return arr.findIndex((f, i) => {
        return i === 0
          ? scrollTop > 0 && scrollTop <= f.offsetTop + n
          : scrollTop > (f.prevOffsetTop || 0) + n && scrollTop <= f.offsetTop + n
      })
    },

    /**
     * 滑動到 [當月]
     * - 滑動完才綁定滑動事件
     */
    scrollToCurrentMonth({ animate, offset = 0 }) {
      let scrollingEl = this.$el.parentElement
        , el = document.querySelector('.currentMonth')
        , top = el?.offsetTop

      if (!el || !top)
        return this.requestAnimationFrame(this.scrollToCurrentMonth)

      animate
        ? scrollToSpecificPos({ scrollingEl, top: top + offset })
        : scrollingEl.scrollTop = top + offset
    },

    clickGrid({ event, dayObj }) {
      this.$emit('clickGrid', { event, dayObj })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../style/month/monthSchedule.styl'
@import '../../style/month/monthScheduleM.styl'

.MonthScheduleBody
  & + .MonthScheduleBody:not(.donotAddMgt)
    margin-top -125px
</style>