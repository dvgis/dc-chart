/*
 * @Author: Caven
 * @Date: 2020-02-03 16:35:41
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-07 12:45:03
 */
export default echarts.extendComponentModel({
  type: 'GLMap',
  getViewer: function() {
    return echarts.viewer
  },
  defaultOption: {
    roam: false
  }
})
