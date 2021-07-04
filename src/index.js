import './index.scss';
import SenseiWalk from './assets/heroes/Male-3-Walk.png';

const CANVAS_ID = 'game';

console.log('####: INIT :####');
const canvas = document.getElementById(CANVAS_ID);
const ctx = canvas.getContext('2d');

const spriteW = 48;
const spriteH = 48;
const shots = 3;
let cycle = 0;
let heroDirection = 0;
let pY = 0;
let pX = 0;

// eslint-disable-next-line no-unused-vars
let upPresed = false;
let bottomPresed = false;
let leftPresed = false;
let rightPresed = false;

function keyDownHandler(e) {
  if (e.key === 'Up' || e.key === 'ArrowUp') {
    upPresed = true;
  }
  if (e.key === 'Down' || e.key === 'ArrowDown') {
    bottomPresed = true;
  }
  if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPresed = true;
  }
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPresed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Up' || e.key === 'ArrowUp') {
    upPresed = false;
  }
  if (e.key === 'Down' || e.key === 'ArrowDown') {
    bottomPresed = false;
  }
  if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPresed = false;
  }
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPresed = false;
  }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyr', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

// eslint-disable-next-line no-unused-vars
const hero = {
  direction: {
    down: 0,
    left: 48,
    right: 96,
    up: 144,
  },
};

const img = document.createElement('img');
img.src = SenseiWalk;

img.addEventListener('load', () => {
  setInterval(() => {
    if (upPresed && pY > 0) {
      heroDirection = hero.direction.up;
      pY -= 10;
      cycle = (cycle + 1) % shots;
      console.log(
        {
          pX,
          pY,
        },
      );
    }
    if (bottomPresed && pY < 550) {
      heroDirection = hero.direction.down;
      pY += 10;
      cycle = (cycle + 1) % shots;
      console.log(
        {
          pX,
          pY,
        },
      );
    }
    if (leftPresed && pX > 0) {
      heroDirection = hero.direction.left;
      pX -= 10;
      cycle = (cycle + 1) % shots;
      console.log(
        {
          pX,
          pY,
        },
      );
    }
    if (rightPresed && pX < 550) {
      heroDirection = hero.direction.right;
      pX += 10;
      cycle = (cycle + 1) % shots;
      console.log(
        {
          pX,
          pY,
        },
      );
    }

    ctx.clearRect(0, 0, 600, 600);
    ctx.drawImage(img, cycle * spriteW, heroDirection, spriteW, spriteH, pX, pY, 48, 48);
  }, 120);
});
