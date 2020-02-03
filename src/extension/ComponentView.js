/*
 * @Author: Caven
 * @Date: 2020-02-03 16:34:40
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-03 16:38:06
 */
export default echarts.extendComponentView({
  type: 'GLMap',
  init: function(ecModel, api) {
    this.api = api
    echarts.viewer.scene.postRender.addEventListener(this.moveHandler, this)
  },
  moveHandler: function(t, e) {
    this.api.dispatchAction({
      type: 'GLMapRoam'
    })
  },
  render: function(t, e, i) {},
  dispose: function(t) {
    echarts.viewer.scene.postRender.removeEventListener(this.moveHandler, this)
  }
})
