import ClientEngine from './ClientEngine';
import ClientWorld from './ClientWorld';
import sprites from '../configs/sprites';
// eslint-disable-next-line import/extensions
import levelConfig from '../configs/world.js';

/**
 * @class
 */
export default class ClientGame {
  /**
   * @constructor
   * @param {string} config.tagId - id for canvas
   */
  constructor(config) {
    this.config = config;
    this.engine = this.createEngine();
    this.world = this.createWorld();
    this.initEngine();
  }

  /**
   * Init Game
   * @param {string} config.tagId id for canvas.
   * @return {void}
   */
  static init(config) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(config);
      console.log('#### Game Init ####');
    }
  }

  /**
   * createEngine
   * @return {ClientEngine | Error}
   */
  createEngine() {
    const $canvas = ClientGame.getCanvasElement(this.config.tagId);

    return !$canvas ? new Error('canvas element is not defined!') : new ClientEngine($canvas);
  }

  /**
   * initEngine
   * @return {void}
   */
  initEngine() {
    if (this.engine instanceof ClientEngine) {
      this.engine.loadSprites(sprites).then(() => {
        // eslint-disable-next-line no-unused-vars
        this.engine.on('render', (_, time) => {
          // console.log('#### sprites', sprites);
          this.world.init();
        });
        this.engine.start();
      });
    }
  }

  /**
   * createWorld
   * @return {ClientWorld}
   */
  createWorld() {
    return new ClientWorld({
      game: this,
      engine: this.engine,
      levelConfig,
    });
  }

  /**
   * get canvas element
   * @return {HTMLCanvasElement}
   */
  static getCanvasElement(tagId) {
    return document.getElementById(tagId);
  }
}
