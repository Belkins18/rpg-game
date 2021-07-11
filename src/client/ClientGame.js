import ClienEngine from './ClienEngine';
import ClientWorld from './ClientWorld';
import sprites from '../configs/sprites';
import levelConfig from '../configs/world.json';

export default class ClientGame {
  /**
   * @param config Configuration ClientGame.
   * @param config.tagId id for canvas.
   */
  constructor(config) {
    this.config = config;
    this.engine = this.createEngine();
    console.log('#### this.engine: ', this.engine);
    this.world = this.createWorld();
    this.initEngine();
  }

  static init(config) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(config);
      console.log('#### Game Init ####');
    }
  }

  createEngine() {
    return new ClienEngine(document.getElementById(this.config.tagId));
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      // eslint-disable-next-line no-unused-vars
      this.engine.on('render', (_, time) => {
        console.log('#### sprites', sprites);
        this.world.init();
      });
      this.engine.start();
    });
  }

  createWorld() {
    return new ClientWorld({ game: this, engine: this.engine, levelConfig });
  }
}
