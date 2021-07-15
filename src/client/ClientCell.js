import PositionedObject from '../common/PositionedObject';
import ClientGameObject from './ClientGameObject';

/**
 * @class ClientCell
 * @extends PositionedObject
 */
class ClientCell extends PositionedObject {
  /**
   * @constructor
   * @param {Object} config
   * @param {ClientWorld} config.world
   * @param {number} config.cellCol
   * @param {number} config.cellRow
   * @param {Array.<string[]>} config.cellConfig
   */
  constructor(config) {
    super();
    const { cellWidth, cellHeight } = config.world;

    Object.assign(
      this,
      {
        config,
        objects: [],
        x: cellWidth * config.cellCol,
        y: cellWidth * config.cellRow,
        width: cellWidth,
        height: cellHeight,
      },
      config,
    );

    this.initGameObjects();
  }

  initGameObjects() {
    const { cellConfig } = this;

    this.objects = cellConfig[0].map((objCfg) => new ClientGameObject({ cell: this, objCfg }));
  }

  render(time) {
    const { objects } = this;

    objects.map((obj) => obj.render(time));
  }

  addGameObject(objToAdd) {
    this.objects.push(objToAdd);
  }

  removeGameObject(objToRemove) {
    this.objects = this.objects.filter((obj) => obj !== objToRemove);
  }

  findObjectsByType(type) {
    return this.objects.filter((obj) => obj.type === type);
  }
}

export default ClientCell;
