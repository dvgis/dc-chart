/*
 * @Author: Caven
 * @Date: 2020-02-03 15:59:37
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-07 12:44:44
 */
DC.Chart = class {
  constructor(id, option) {
    this._id = id || DC.Util.uuid()
    this._option = option
    this._wrapper = DC.DomUtil.create('div', 'dc-chart')
    this._setWapperStyle()
    this._chart = undefined
    this._state = 'initialized'
    this._show = false
  }

  get chart() {
    return this._chart
  }

  set show(show) {
    this._show = show
    if (this._wrapper) {
      this._wrapper.style.visibility = show ? 'visible' : 'hidden'
    }
  }

  get show() {
    return this._show
  }

  _setWapperStyle() {
    this._wrapper.style.position = 'absolute'
    this._wrapper.style.top = '0px'
    this._wrapper.style.left = '0px'
    this._wrapper.style.pointerEvents = 'none'
    this._wrapper.setAttribute('id', this._id)
  }

  install(viewer) {
    if (viewer && this._state !== 'installed') {
      viewer.dcContainer.appendChild(this._wrapper)
      this._wrapper.style.width = viewer.canvas.width + 'px'
      this._wrapper.style.height = viewer.canvas.height + 'px'
      if (echarts) {
        echarts.viewer = viewer
        viewer.delegate.scene.canvas.setAttribute('tabIndex', 0)
        this._chart = echarts.init(this._wrapper)
        if (this._option) {
          this._chart.setOption(this._option)
        }
      }
      this._state = 'installed'
    }
  }

  setOption(option) {
    this._option = option
    this._chart && this._chart.setOption(this._option)
    return this
  }
}
