/*
 * @Author: Caven
 * @Date: 2020-02-03 16:20:10
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-03 16:38:12
 */

import './ComponentModel'
import './ComponentView'
import CoordinateSystem from './CoordinateSystem'
echarts.registerCoordinateSystem('GLMap', CoordinateSystem)
echarts.registerAction(
  {
    type: 'GLMapRoam',
    event: 'GLMapRoam',
    update: 'updateLayout'
  },
  function(payload, ecModel) {}
)
