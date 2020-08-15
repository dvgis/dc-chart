/**
 * @Author: Caven
 * @Date: 2020-02-02 16:20:10
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
