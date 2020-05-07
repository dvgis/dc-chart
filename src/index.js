/*
 * @Author: Caven
 * @Date: 2020-02-03 15:55:53
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-07 12:47:58
 */

const install = function(DC) {
  if (!DC && !echarts && !DC.ready) {
    throw new Error('missing dc sdk or echarts lib')
  }
  DC.init(() => {
    require('./extension/index')
    require('./DC.Chart')
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.DC) {
  install(window.DC)
}

module.exports = {
  install
}
