import EventSourceMixin from '../common/EventSourceMixin';

class ClienEngine {
  constructor(canvas) {
    console.log(canvas);

    Object.assign(this, {
      canvas,
      ctx: null,
      imageLoaders: [],
      sprites: {},
      images: {},
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

    this.trigger('render', timestamp);
    this.initNextFrame();
  }

  initNextFrame() {
    requestAnimationFrame(this.loop);
  }

  loadSprites(spritesGroup) {
    this.imageLoaders = [];

    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const groupName in spritesGroup) {
      // console.log('#### groupName', groupName);
      const group = spritesGroup[groupName];
      // console.log('#### group', group);
      this.sprites[groupName] = group;

      // eslint-disable-next-line guard-for-in,no-restricted-syntax
      for (const spriteName in group) {
        // console.log(`#### spriteName: ${spriteName}`, group[spriteName]);
        const { img } = group[spriteName];
        if (!this.images[img]) {
          this.imageLoaders.push(this.loadImage(img));
        }
      }
    }

    return Promise.all(this.imageLoaders);
  }

  loadImage(url) {
    return new Promise((resolve) => {
      const i = new Image();
      this.images[url] = i;

      i.onload = () => resolve(i);
      i.src = url;
    });
  }

  renderSpriteFrame({ sprite, frame, x, y, w, h }) {
    const spriteCfg = this.sprites[sprite[0]][sprite[1]];
    const [fx, fy, fw, fh] = spriteCfg.frames[frame];
    const img = this.images[spriteCfg.img];

    this.ctx.drawImage(img, fx, fy, fw, fh, x, y, w, h);
  }
}

Object.assign(ClienEngine.prototype, EventSourceMixin);

export default ClienEngine;
