import MovableObject from '../common/MovableObject';
import { animateEx } from '../common/util';

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
        state: 'main',
        anitionStartTime: 0,
      },
      config,
    );
  }

  moveByCellCoord(dcol, drow, conditionCallback = null) {
    const { cell } = this;
    return this.moveToCellCoord(cell.cellCol + dcol, cell.cellRow + drow, conditionCallback);
  }

  moveToCellCoord(dcol, drow, conditionCallback = null) {
    const { world } = this;
    const newCell = world.cellAt(dcol, drow);
    const canMovie = !conditionCallback || conditionCallback(newCell);
    if (canMovie) {
      this.setCell(newCell);
    }
    return canMovie;
  }

  setCell(newCell) {
    if (newCell) {
      this.detouch();
      this.cell = newCell;
      newCell.addGameObject(this);

      this.moveTo(newCell.x, newCell.y, true, 200);

      // const {
      //   x, y, width, height,
      // } = newCell;
      // Object.assign(this, {
      //   x,
      //   y,
      //   width,
      //   height,
      // });
    }
  }

  setState(state) {
    this.state = state;

    if (this.world) {
      this.anitionStartTime = this.world.engine.lastRenderTime;
    }
  }

  getCurrentFrame(time) {
    const state = this.spriteCfg.states[this.state];
    const lengthFrames = state.frames.length;
    const animate = animateEx(lengthFrames, this.anitionStartTime, time, state.duration, true);
    const frame = Math.floor(lengthFrames + animate.offset) % lengthFrames;

    return state.frames[frame];
  }

  render(time) {
    super.render(time);

    const { x, y, width, height, world } = this;
    const { engine } = world;

    // eslint-disable-next-line no-unused-vars
    const { sprite, frame, states, type } = this.spriteCfg;
    const spriteFrame = type === 'static' ? frame : this.getCurrentFrame(time);

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
