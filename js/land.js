let imgLand = new Image();
imgLand.src = './img/land.png';
class Land {
  constructor(ctx) {
    this.ctx = ctx;
    this.img = imgLand;
    this.imgX = 0;
    this.imgY = 0;
    this.imgWidth = 336;
    this.imgHeight = 112;
    this.canvasX = 0;
    this.canvasY = 288;
    this.canvasWidth = 600;
    this.canvasHeight = 112;
  }
  show() {
    this.ctx.drawImage(this.img, this.imgX, this.imgY, this.imgWidth, this.imgHeight, this.canvasX, this.canvasY, this.canvasWidth, this.canvasHeight);
  }
}