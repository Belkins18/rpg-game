import ClienEngine from './ClienEngine';

export default class ClientGame {
  /**
   * @param config Configuration ClientGame.
   * @param config.tagId id for canvas.
   */
  constructor(config) {
    this.config = config;
    this.engine = this.createEngine();
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
    this.engine.start();
  }
}
