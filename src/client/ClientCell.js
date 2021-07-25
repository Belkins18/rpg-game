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

    // eslint-disable-next-line max-len
    this.objects = cellConfig.map((layer, layerId) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      layer.map((objCfg) => new ClientGameObject({ cell: this, objCfg, layerId })),
    // eslint-disable-next-line function-paren-newline
    );
  }

  render(time, layerId) {
    const { objects } = this;

    if (objects[layerId]) {
      objects[layerId].forEach((obj) => obj.render(time));
    }
  }

  addGameObject(objToAdd) {
    const { objects } = this;

    if (objToAdd.layerId === undefined) {
      // eslint-disable-next-line no-param-reassign
      objToAdd.layerId = objects.length;
    }

    if (!objects[objToAdd.layerId]) {
      objects[objToAdd.layerId] = [];
    }
    objects[objToAdd.layerId].push(objToAdd);
  }

  removeGameObject(objToRemove) {
    const { objects } = this;

    objects.forEach((layer, layerId) => {
      objects[layerId] = layer.filter((obj) => obj !== objToRemove);
    });
  }

  findObjectsByType(type) {
    let foundObjects = [];

    this.objects.forEach((layer) => {
      foundObjects = [...foundObjects, ...layer].filter((obj) => obj.type === type);
    });
    return foundObjects;
  }
}

export default ClientCell;
