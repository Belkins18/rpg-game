import './index.scss';
import SenseiWalk from './assets/heroes/Male-3-Walk.png';
import TerrainAtlas from './assets/terrain.png';
import worldConfig from './configs/world.json';
import sprites from './configs/sprites';

const CANVAS_ID = 'game';
const GAME_STATIC_PROPS = {
  canvasW: 600,
  canvasH: 600,
  spriteW: 48,
  spriteH: 48,
  shots: 3,
};

const KEYBOARD_ACTIONS = {
  UP: {
    KEY: 'ArrowUp',
    IS_PRESSED: false,
    HERO_SPRITES_POSITION: GAME_STATIC_PROPS.spriteH * 3,
  },
  DOWN: {
    KEY: 'ArrowDown',
    IS_PRESSED: false,
    HERO_SPRITES_POSITION: 0,
  },
  LEFT: {
    KEY: 'ArrowLeft',
    IS_PRESSED: false,
    HERO_SPRITES_POSITION: GAME_STATIC_PROPS.spriteW * 1,
  },
  RIGHT: {
    KEY: 'ArrowRight',
    IS_PRESSED: false,
    HERO_SPRITES_POSITION: GAME_STATIC_PROPS.spriteW * 2,
  },
};

const canvas = document.getElementById(CANVAS_ID);
const ctx = canvas.getContext('2d');

let cycle = 0;
let direction = 0;
let pY = (GAME_STATIC_PROPS.canvasH - GAME_STATIC_PROPS.spriteH) / 2;
let pX = (GAME_STATIC_PROPS.canvasW - GAME_STATIC_PROPS.spriteW) / 2;

function keyDownHandler(e) {
  const { UP, DOWN, LEFT, RIGHT } = KEYBOARD_ACTIONS;

  if (!e.repeat) {
    switch (e.key) {
      case UP.KEY:
        UP.IS_PRESSED = true;
        break;
      case DOWN.KEY:
        DOWN.IS_PRESSED = true;
        break;
      case LEFT.KEY:
        LEFT.IS_PRESSED = true;
        break;
      case RIGHT.KEY:
        RIGHT.IS_PRESSED = true;
        break;
      default:
        console.log(`Key "${e.key}" pressed  [event: keydown]`);
        break;
    }
  } else {
    console.log(`Key "${e.key}" repeating  [event: keydown]`);
  }
}

function keyUpHandler(e) {
  const { UP, DOWN, LEFT, RIGHT } = KEYBOARD_ACTIONS;
  switch (e.key) {
    case UP.KEY:
      UP.IS_PRESSED = false;
      break;
    case DOWN.KEY:
      DOWN.IS_PRESSED = false;
      break;
    case LEFT.KEY:
      LEFT.IS_PRESSED = false;
      break;
    case RIGHT.KEY:
      RIGHT.IS_PRESSED = false;
      break;
    default:
      break;
  }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

const img = document.createElement('img');
img.src = SenseiWalk;

// eslint-disable-next-line no-unused-vars
function walk(timestamp) {
  const { UP, DOWN, LEFT, RIGHT } = KEYBOARD_ACTIONS;
  const { canvasW, canvasH, spriteW, spriteH, shots } = GAME_STATIC_PROPS;

  if (UP.IS_PRESSED && pY > 0) {
    direction = UP.HERO_SPRITES_POSITION;
    pY -= 10;
    cycle = (cycle + 1) % shots;
  }
  if (DOWN.IS_PRESSED && pY < 550) {
    direction = DOWN.HERO_SPRITES_POSITION;
    pY += 10;
    cycle = (cycle + 1) % shots;
  }
  if (LEFT.IS_PRESSED && pX > 0) {
    direction = LEFT.HERO_SPRITES_POSITION;
    pX -= 10;
    cycle = (cycle + 1) % shots;
  }
  if (RIGHT.IS_PRESSED && pX < 550) {
    direction = RIGHT.HERO_SPRITES_POSITION;
    pX += 10;
    cycle = (cycle + 1) % shots;
  }

  ctx.clearRect(0, 0, canvasW, canvasH);
  ctx.drawImage(img, cycle * spriteW, direction, spriteW, spriteH, pX, pY, spriteW, spriteH);

  requestAnimationFrame(walk);
}

img.addEventListener('load', () => {
  // requestAnimationFrame(walk);
});

const terrain = document.createElement('img');
terrain.src = TerrainAtlas;

terrain.addEventListener('load', () => {
  const { map } = worldConfig;
  const { spriteW, spriteH } = GAME_STATIC_PROPS;

  map.forEach((cfgRow, y) => {
    cfgRow.forEach((cfgCell, x) => {
      const [sX, sY, sW, sH] = sprites.terrain[cfgCell[0]].frames[0];

      ctx.drawImage(terrain, sX, sY, sW, sH, x * spriteW, y * spriteH, spriteW, spriteH);
    });
  });
});
