/*
 * @Author: Caven
 * @Date: 2020-02-03 16:35:41
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-03 16:36:07
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
