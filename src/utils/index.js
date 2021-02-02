let scrollTo = require('./scrollTo')

function scrollToSpecificPos({ scrollingEl, top, duration = 300 }) {
  scrollTo(top, duration, scrollingEl)
}

export {
  scrollToSpecificPos
}