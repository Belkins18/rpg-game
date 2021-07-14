export default class ClientWorld {
  /**
   * @param payload Configuration ClientWorld.
   * @param payload.game ClientGame
   * @param payload.engine ClientEngine
   * @param payload.levelConfig world.json
   */
  constructor({ game, engine, levelConfig }) {
    Object.assign(this, {
      game,
      engine,
      levelConfig,
      height: levelConfig.map.length,
      width: levelConfig.map[0].length,
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
          y: (indexY * this.engine.canvas.height) / this.levelConfig.camera.height,
          w: this.engine.canvas.width / this.levelConfig.camera.width,
          h: this.engine.canvas.height / this.levelConfig.camera.height,
        });
      });
    });
  }
}
