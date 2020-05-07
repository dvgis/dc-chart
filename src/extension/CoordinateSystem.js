/*
 * @Author: Caven
 * @Date: 2020-02-03 16:21:35
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-07 12:45:07
 */
class CoordinateSystem {
  constructor(viewer, api) {
    this._viewer = viewer
    this.dimensions = ['lng', 'lat']
    this._mapOffset = [0, 0]
    this._api = api
  }

  setMapOffset(mapOffset) {
    this._mapOffset = mapOffset
    return this
  }

  getViewer() {
    return this._viewer
  }

  dataToPoint(data) {
    let scene = this._viewer.scene
    let result = [0, 0]
    let cartesian3 = DC.Cartesian3.fromDegrees(data[0], data[1])
    if (!cartesian3) {
      return result
    }
    if (scene.mode === DC.SceneMode.SCENE3D && DC.Cartesian3.angleBetween(scene.camera.position, cartesian3) > DC.Math.toRadians(80)) {
      return false
    }
    var coords = scene.cartesianToCanvasCoordinates(cartesian3)
    if (!coords) {
      return result
    }
    return [coords.x - this._mapOffset[0], coords.y - this._mapOffset[1]]
  }

  pointToData(point) {
    var ellipsoid = this._viewer.scene.globe.ellipsoid
    var cartesian3 = new DC.Cartesian3(point[0] + this._mapOffset[0], point[1] + this._mapOffset[1], 0)
    var cartographic = ellipsoid.cartesianToCartographic(cartesian3)
    return [DC.Math.toDegrees(cartographic.longitude), DC.Math.toDegrees(cartographic.latitude)]
  }

  getViewRect() {
    let api = this._api
    return new echarts.graphic.BoundingRect(0, 0, api.getWidth(), api.getHeight())
  }

  getRoamTransform() {
    return echarts.matrix.create()
  }

  static get dimensions() {
    return ['lng', 'lat']
  }

  static create(ecModel, api) {
    let coordinateSys = undefined
    ecModel.eachComponent('GLMap', function(model) {
      coordinateSys = new CoordinateSystem(echarts.viewer.delegate, api)
      coordinateSys.setMapOffset(model.__mapOffset || [0, 0])
      model.coordinateSystem = coordinateSys
    })
    ecModel.eachSeries(function(model) {
      'GLMap' === model.get('coordinateSystem') && (model.coordinateSystem = coordinateSys)
    })
  }
}

export default CoordinateSystem
