/*
 * @Author: Caven
 * @Date: 2020-02-03 15:59:37
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-03 18:23:25
 */
DC.Chart = class {
  constructor(id, option) {
    this._id = id || DC.Util.uuid()
    this._option = option
    this._wapper = DC.DomUtil.create('div', 'dc-chart')
    this._setWapperStyle()
    this._chart = undefined
    this._state = 'initialized'
  }

  get chart() {
    return this._chart
  }

  set show(show) {
    if (this._wapper) {
      this._wapper.style.visibility = show ? 'visible' : 'hidden'
    }
  }

  _setWapperStyle() {
    this._wapper.style.position = 'absolute'
    this._wapper.style.top = '0px'
    this._wapper.style.left = '0px'
    this._wapper.style.pointerEvents = 'none'
    this._wapper.setAttribute('id', this._id)
  }

  install(viewer) {
    if (viewer && this._state !== 'installed') {
      viewer.dcContainer.appendChild(this._wapper)
      this._wapper.style.width = viewer.canvas.width + 'px'
      this._wapper.style.height = viewer.canvas.height + 'px'
      if (echarts) {
        echarts.viewer = viewer
        this._chart = echarts.init(this._wapper)
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
