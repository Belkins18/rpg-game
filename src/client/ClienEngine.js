export default class ClienEngine {
  constructor(canvas) {
    console.log(canvas);

    Object.assign(this, {
      canvas,
      ctx: null,
    });

    this.ctx = canvas.getContext('2d');
    this.loop = this.loop.bind(this);
  }

  start() {
    this.loop();
  }

  // eslint-disable-next-line no-unused-vars
  loop(timestamp) {
    const { ctx, canvas } = this;
    ctx.fillStyle = 'black';
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.initNextFrame();
  }

  initNextFrame() {
    requestAnimationFrame(this.loop);
  }
}
