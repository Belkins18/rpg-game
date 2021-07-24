import MovableObject from '../common/MovableObject';

class ClientGameObject extends MovableObject {
  /**
   * @constructor
   * @param {ClientCell} config.cell
   * @param {string | {}} config.objCfg
   */
  constructor(config) {
    // console.log('config: ', config);
    super();

    const { x, y, width, height } = config.cell;

    const { world } = config.cell;
    const gameObjs = world.game.gameObjects;
    const objCfg = typeof config.objCfg === 'string' ? { type: config.objCfg } : config.objCfg;

    if (objCfg.player) {
      world.game.setPlayer(this);
    }

    Object.assign(
      this,
      {
        config,
        x,
        y,
        width,
        height,
        spriteCfg: gameObjs[objCfg.type],
        objectConfig: objCfg,
        type: objCfg.type,
        world,
      },
      config,
    );
  }

  moveByCellCoord(dcol, drow, conditionCallback = null) {
    const { cell } = this;
    this.moveToCellCoord(cell.cellCol + dcol, cell.cellRow + drow, conditionCallback);
  }

  moveToCellCoord(dcol, drow, conditionCallback = null) {
    const { world } = this;
    const newCell = world.cellAt(dcol, drow);

    if (!conditionCallback || conditionCallback(newCell)) this.setCell(newCell);
  }

  setCell(newCell) {
    if (newCell) {
      this.detouch();
      this.cell = newCell;
      newCell.addGameObject(this);

      const { x, y, width, height } = newCell;
      Object.assign(this, {
        x,
        y,
        width,
        height,
      });
    }
  }

  render(time) {
    super.render(time);

    const { x, y, width, height, world } = this;
    const { engine } = world;

    const { sprite, frame, states } = this.spriteCfg;

    const spriteFrame = states ? states.main.frames[0] : frame;

    engine.renderSpriteFrame({
      sprite,
      frame: spriteFrame,
      x,
      y,
      w: width,
      h: height,
    });
  }

  detouch() {
    if (this.cell) {
      this.cell.removeGameObject(this);
      this.cell = null;
    }
  }
}

export default ClientGameObject;
