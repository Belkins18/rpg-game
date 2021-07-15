/**
 * @class ClientWorld
 */
import PositionedObject from '../common/PositionedObject';

export default class ClientWorld extends PositionedObject {
  /**
   * @constructor
   * @param {Object} payload
   * @param {ClientGame} payload.game
   * @param {ClientEngine} payload.engine
   * @param {...levelConfig} payload.levelConfig
   */
  constructor({ game, engine, levelConfig }) {
    super();

    const worldHeight = levelConfig.map.length;
    const worldWidth = levelConfig.map[0].length;
    const cellSize = engine.canvas.height / levelConfig.camera.height;

    Object.assign(this, {
      game,
      engine,
      levelConfig,
      height: worldHeight * cellSize,
      width: worldWidth * cellSize,
      worldHeight,
      worldWidth,
      cellHeight: cellSize,
      cellWidth: cellSize,
      map: [],
    });
  }

  init() {
    const { map } = this.levelConfig;

    map.forEach((item, indexY) => {
      item.forEach((i, indexX) => {
        this.engine.renderSpriteFrame({
          sprite: ['terrain', i[0][0]],
          frame: 0,
          x: (indexX * this.engine.canvas.width) / this.levelConfig.camera.width,
          y: (indexY * this.engine.canvas.height) / this.levelConfig.camera.width,
          w: this.engine.canvas.width / this.levelConfig.camera.width,
          h: this.engine.canvas.height / this.levelConfig.camera.height,
        });
      });
    });
  }
}

/**
 * @typedef {Object} levelConfig
 * @property {Array} layers
 * @property {levelConfig~camera} camera
 * @property {Array} map
 */

/**
 * @typedef {Object} levelConfig~camera
 * @property {number} width
 * @property {number} height
 * @property {number} x
 * @property {number} y
 */
