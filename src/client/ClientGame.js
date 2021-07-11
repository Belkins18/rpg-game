import ClienEngine from './ClienEngine';
import sprites from '../configs/sprites';

export default class ClientGame {
  /**
   * @param config Configuration ClientGame.
   * @param config.tagId id for canvas.
   */
  constructor(config) {
    this.config = config;
    this.engine = this.createEngine();
    console.log('#### this.engine: ', this.engine);
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
      this.engine.on('render', (_, time) => {
        console.log('#### render', time);
      });
      this.engine.start();
    });
  }
}
