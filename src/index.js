/**
 * @Author: Caven
 * @Date: 2020-02-02 15:55:53
 */

const install = function(DC) {
  if (!echarts) {
    throw new Error('Chart: missing charts lib')
  }

  if (!DC || !DC.init) {
    throw new Error('Chart: Missing DC Base')
  }

  if (!DC.ready) {
    throw new Error('Chart: Missing DC Core')
  }

  DC.init(() => {
    require('./Chart.Loader')
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.DC) {
  install(window.DC)
}

export default {
  version: __VERSION__,
  compile_time: __TIME__,
  install
}
