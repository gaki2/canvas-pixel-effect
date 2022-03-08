const PI2 = Math.PI * 2;

export class Pixel {
  constructor(x, y, width, height, radius) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.pixelNums = this.width * this.height;
    this.radius = radius;
  }

  getAvgColor(ctx) {
    const colors = ctx.getImageData(
      this.x,
      this.y,
      this.width,
      this.height
    ).data;

    const avgRgba = {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
    };

    for (let i = 0; i < this.pixelNums; i++) {
      const nowRgba = colors.slice(i * 4, (i + 1) * 4);
      avgRgba.r += nowRgba[0] / this.pixelNums;
      avgRgba.g += nowRgba[1] / this.pixelNums;
      avgRgba.b += nowRgba[2] / this.pixelNums;
      avgRgba.a += nowRgba[3] / this.pixelNums / 255;
    }
    this.avgColor = avgRgba;
  }

  drawPixel(ctx) {
    this.getAvgColor(ctx);
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = `rgba(${this.avgColor.r}, ${this.avgColor.g}, ${this.avgColor.b}, ${this.avgColor.a})`;
    ctx.beginPath();
    ctx.arc(
      this.x + this.width / 2,
      this.y + this.height / 2,
      this.radius,
      0,
      PI2,
      true
    );
    ctx.fill();
    ctx.closePath();
  }
}
