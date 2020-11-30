/**
 * @Author: Caven
 * @Date: 2020-02-02 15:59:37
 */

const { State, DomUtil, Layer } = DC

class ChartLayer extends Layer {
  constructor(id, option) {
    super(id)
    this._option = option
    this._wrapper = DomUtil.create('div', 'dc-chart')
    this._setWrapperStyle()
    this._chart = undefined
    this.type = Layer.getLayerType('chart')
    this._state = State.INITIALIZED
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

  /**
   *
   * @private
   */
  _setWrapperStyle() {
    this._wrapper.style.position = 'absolute'
    this._wrapper.style.top = '0px'
    this._wrapper.style.left = '0px'
    this._wrapper.style.pointerEvents = 'none'
    this._wrapper.setAttribute('id', this._id)
  }

  /**
   *
   * @param viewer
   */
  _onAdd(viewer) {
    if (!viewer || !echarts) {
      return
    }
    this._viewer = viewer
    this._wrapper.style.width = viewer.canvas.width + 'px'
    this._wrapper.style.height = viewer.canvas.height + 'px'
    viewer.dcContainer.appendChild(this._wrapper)
    echarts.viewer = viewer
    viewer.scene.canvas.setAttribute('tabIndex', 0)
    this._chart = echarts.init(this._wrapper)
    this._option && this._chart.setOption(this._option)
    this._state = State.ADDED
  }

  /**
   *
   * @private
   */
  _onRemove() {
    if (this._wrapper && this._viewer) {
      this._viewer.dcContainer.removeChild(this._wrapper)
      this._chart.dispose()
      this._state = State.REMOVED
    }
  }

  /**
   *
   * @param option
   * @returns {ChartLayer}
   */
  setOption(option) {
    this._option = option
    this._chart && this._chart.setOption(this._option)
    return this
  }
}

Layer.registerType('chart')

export default ChartLayer
