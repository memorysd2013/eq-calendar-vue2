let scrollTo = require('./scrollTo')

function scrollToSpecificPos({ scrollingEl, top, duration = 300 }) {
  scrollTo(top, duration, scrollingEl)
}

/**
 * 格式化單位
 */
function unitFormat(val, unit = 'px') {
  switch (typeof val) {
    case 'number':
      return `${val}${unit}`
    case 'string':
      return Number(val)
        ? `${val}${unit}`
        : val
    default:
      return val
  }
}

export {
  scrollToSpecificPos,
  unitFormat,
}