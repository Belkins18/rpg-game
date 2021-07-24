import ClientEngine from './ClientEngine';
import ClientWorld from './ClientWorld';
import sprites from '../configs/sprites';
// eslint-disable-next-line import/extensions
import levelConfig from '../configs/world';
import gameObjects from '../configs/gameObjects';

/**
 * @class ClientGame
 * @param {Object} this
 */
class ClientGame {
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

    return !$canvas ? new Error('canvas element is not defined!') : new ClientEngine($canvas, this);
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
   * getWorld
   * @return {ClientWorld}
   */
  getWorld() {
    return this.world;
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
          this.engine.camera.focusAtGameObject(this.player);
          this.world.render(time);
        });
        this.engine.start();
        this.initKeys();
      });
    } else {
      throw new Error(this.engine);
    }
  }

  initKeys() {
    /**
     * movePlayerToDir
     * @param {string} direction
     * @return {void}
     */
    const movePlayerToDir = (direction) => {
      const keyHandlers = {
        up: { dcol: 0, drow: -1 },
        down: { dcol: 0, drow: 1 },
        left: { dcol: -1, drow: 0 },
        right: { dcol: 1, drow: 0 },
      };

      const { player } = this;

      if (player) {
        player.moveByCellCoord(
          keyHandlers[direction].dcol,
          keyHandlers[direction].drow,
          (cell) => cell.findObjectsByType('grass').length,
        );
      }
    };

    this.engine.input.onKey({
      ArrowUp: (keydown) => keydown && movePlayerToDir('up'),
      ArrowDown: (keydown) => keydown && movePlayerToDir('down'),
      ArrowLeft: (keydown) => keydown && movePlayerToDir('left'),
      ArrowRight: (keydown) => keydown && movePlayerToDir('right'),
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

export default ClientGame;
