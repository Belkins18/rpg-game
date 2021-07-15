/* eslint-disable no-plusplus */
import PositionedObject from '../common/PositionedObject';
import ClientCell from './ClientCell';

/**
 * @class ClientWorld
 * @extends PositionedObject
 */
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

  /**
   * Init World
   * @return {void}
   */
  init() {
    const { levelConfig, map, worldHeight, worldWidth } = this;

    for (let row = 0; row < worldHeight; row++) {
      for (let col = 0; col < worldWidth; col++) {
        if (!map[row]) {
          map[row] = [];
        }
        console.log('levelConfig.map[row][col]: ', levelConfig.map[row][col]);
        map[row][col] = new ClientCell({
          world: this,
          cellCol: col,
          cellRow: row,
          cellConfig: levelConfig.map[row][col],
        });
      }
    }
  }

  render(time) {
    const { map, worldHeight, worldWidth } = this;

    for (let row = 0; row < worldHeight; row++) {
      for (let col = 0; col < worldWidth; col++) {
        map[row][col].render(time);
      }
    }
  }

  /**
   * cellAt
   * @param {number} col
   * @param {number} row
   * @return {Array}
   */
  cellAt(col, row) {
    return this.map[row] && this.map[row][col];
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
