import ClientEngine from './ClientEngine';
import ClientWorld from './ClientWorld';
import sprites from '../configs/sprites';
// eslint-disable-next-line import/extensions
import levelConfig from '../configs/world';
import gameObjects from '../configs/gameObjects';

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
    this.gameObjects = gameObjects;
    this.player = null;
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
   * @return {void | Error}
   */
  initEngine() {
    if (this.engine instanceof ClientEngine) {
      this.engine.loadSprites(sprites).then(() => {
        // eslint-disable-next-line no-unused-vars
        this.world.init();
        this.engine.on('render', (_, time) => {
          this.world.render(time);
        });
        this.engine.start();
      });
    } else {
      throw new Error(this.engine);
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

  /**
   * setPlater
   * @return {HTMLCanvasElement}
   */
  setPlayer(player) {
    this.player = player;
  }
}
