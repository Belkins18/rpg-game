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
    cycle = (cycle + 1) % shots;
    ctx.clearRect(0, 0, 600, 600);
    ctx.drawImage(img, cycle * spriteW, 0, spriteW, spriteH, 0, 0, 100, 100);
  }, 120);
});
