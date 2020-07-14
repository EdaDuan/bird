let imgSKy = new Image();
imgSKy.src = './img/sky.png';
class Sky {
  constructor(ctx) {
    this.ctx = ctx;
    this.img = imgSKy;
    this.imgX = 0;
    this.imgY = 0;
    this.imgWidth = 600;
    this.imgHeight = 500;
    this.canvasX = 0;
    this.canvasY = 0;
    this.canvasWidth = 600;
    this.canvasHeight = 288;
  }

  show() {
    this.ctx.drawImage(this.img, this.imgX, this.imgY, this.imgWidth, this.imgHeight, this.canvasX, this.canvasY, this.canvasWidth, this.canvasHeight);
    this.ctx.drawImage(this.img, this.imgX, this.imgY, this.imgWidth, this.imgHeight, this.canvasX + this.canvasWidth, this.canvasY, this.canvasWidth, this.canvasHeight);
  }

  // 移动天空
  move(birdY) {
    console.log(birdY);
    this.canvasX -= 5;
    if (this.canvasX <= -600) {
      this.canvasX = 0;
    }
  }
  // 停止天空
  stopSky() {
    this.canvasX = this.canvasX;
  }
}