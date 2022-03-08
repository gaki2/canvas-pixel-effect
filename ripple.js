import { distance } from "./utils.js";

const PI2 = Math.PI * 2;

class Ripple {
  constructor() {
    this.speed = 10;
  }

  getMaxRadius(stageWidth, stageHeight) {
    const d1 = distance(0, 0, this.x, this.y);
    const d2 = distance(stageWidth, 0, this.x, this.y);
    const d3 = distance(this.x, this.y, 0, stageHeight);
    const d4 = distance(this.x, this.y, stageWidth, stageHeight);
    const maxRadius = Math.max(d1, d2, d3, d4);
    return maxRadius;
  }
  start(x, y, stageWidth, stageHeight) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.maxRadius = this.getMaxRadius(stageWidth, stageHeight);
  }
  animate(ctx) {
    if (this.radius < this.maxRadius + 20) {
      ctx.fillStyle = "#81c784";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, PI2, false);
      ctx.fill();
      ctx.closePath();
      this.radius += this.speed;
    }
  }
}

export default Ripple;
