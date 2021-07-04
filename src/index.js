import './index.scss';
import SenseiWalk from './assets/heroes/Male-3-Walk.png';

const CANVAS_ID = 'game';
const KEYBOARD_ACTIONS = {
  UP: {
    KEY: 'ArrowUp',
    IS_PRESSED: false,
    HERO_SPRITES_POSITION: 144,
  },
  DOWN: {
    KEY: 'ArrowDown',
    IS_PRESSED: false,
    HERO_SPRITES_POSITION: 0,
  },
  LEFT: {
    KEY: 'ArrowLeft',
    IS_PRESSED: false,
    HERO_SPRITES_POSITION: 48,
  },
  RIGHT: {
    KEY: 'ArrowRight',
    IS_PRESSED: false,
    HERO_SPRITES_POSITION: 96,
  },
};

console.log('####: INIT :####');
const canvas = document.getElementById(CANVAS_ID);
const ctx = canvas.getContext('2d');

const GAME_STATIC_PROPS = {
  spriteW: 48,
  spriteH: 48,
  shots: 3,
};

let cycle = 0;
let direction = 0;
let pY = 270;
let pX = 270;

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

img.addEventListener('load', () => {
  const { UP, DOWN, LEFT, RIGHT } = KEYBOARD_ACTIONS;
  const { spriteW, spriteH, shots } = GAME_STATIC_PROPS;

  setInterval(() => {
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

    ctx.clearRect(0, 0, 600, 600);
    ctx.drawImage(img, cycle * spriteW, direction, spriteW, spriteH, pX, pY, 48, 48);
  }, 120);
});
