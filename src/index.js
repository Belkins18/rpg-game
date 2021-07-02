import './index.scss';

const CANVAS_ID = 'game';

console.log('####: INIT :####');
const canvas = document.getElementById(CANVAS_ID);
const ctx = canvas.getContext('2d');

// // first
// ctx.strokeStyle = 'red';
// ctx.lineWidth = 5;
// ctx.strokeRect(20, 20, 200, 100);
//
// // second
// ctx.fillStyle = '#e4e4e4';
// ctx.fillRect(200, 200, 300, 150);
//
// ctx.fillStyle = 'rgb(145, 121, 100)';
// ctx.fillRect(100, 400, 200, 150);
//
// ctx.clearRect(0, 0, 300, 300)

let xy = 0;
setInterval(() => {
    ctx.clearRect(0, 0, 600, 600)
    xy += 10;
    ctx.fillStyle = '#e4e4e4';
    ctx.fillRect(xy, xy, 100, 50);
}, 120)
