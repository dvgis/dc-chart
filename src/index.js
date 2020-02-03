/*
 * @Author: Caven
 * @Date: 2020-02-03 15:55:53
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-03 16:38:46
 */
;(function() {
  if (!DC && !echarts) {
    throw new Error('missing dc sdk or echarts lib')
  }
  require('./extension/index')
  require('./DC.Chart')
})()
