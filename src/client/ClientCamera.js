import MovableObject from '../common/MovableObject';

/**
 * @class ClientCamera
 */
class ClientCamera extends MovableObject {
  /**
   * @constructor
   * @param {Object} config
   * @param {HTMLCanvasElement} config.canvas
   * @param {ClientEngine} config.engine
   */
  constructor(config) {
    super(config);
    console.log('ClientCameraConfig: ', config);
    Object.assign(
      this,
      {
        config,
        width: config.canvas.width,
        height: config.canvas.height,
      },
      config,
    );
  }

  /**
   * focusAtGameObject
   * @param {PositionedObject} obj
   * @return {void}
   */
  focusAtGameObject(obj) {
    console.log('obj: ', obj);
    const position = obj.worldPosition(50, 50);
    this.moveTo(position.x - this.width / 2, position.y - this.height / 2, false);
  }
}

export default ClientCamera;
