let imgBird = new Image();
imgBird.src = './img/bird.png';
class Bird {
  constructor(ctx) {
    this.ctx = ctx;
    this.img = imgBird;
    this.imgX = 0;
    this.imgY = 0;
    this.imgWidth = 52;
    this.imgHeight = 45;
    this.canvasX = 100;
    this.canvasY = 100;
    this.canvasWidth = 52;
    this.canvasHeight = 45;
    this.flyIndex = 0;
    this.speed = 0;
    this.av = 0.1;
    this.changeSp = 20;
    this.flyTimer = null;
    this.dropTimer = null;
  }
  // 在画布上显示小鸟的图片
  show() {
    // this.ctx.clearRect(0, 0, 600, 400);
    this.ctx.drawImage(this.img, this.imgX, this.imgY, this.imgWidth, this.imgHeight, this.canvasX, this.canvasY, this.canvasWidth, this.canvasHeight);
  }
  // 鸟飞起来且当落地时清除定时器
  fly() {
    let flyTimer = setInterval(() => {
      this.flyIndex++;
      this.flyIndex = this.flyIndex % 3;
      this.imgX = this.flyIndex * this.imgWidth;
      if (this.canvasY > 250) {
        clearInterval(flyTimer);
        this.canvasY = 260;
      }
    }, 50);
  }
  // 鸟掉下去
  drop() {
    this.dropTimer = setInterval(() => {
      this.speed += this.av;
      this.canvasY += this.speed;
      if (this.canvasY > 250) {
        this.canvasY = 260;
        clearInterval(this.dropTimer);
      }
    }, 50);
  }
  // 改变鸟的运到方式

  change(keyCode) {
    if (this.canvasY < 230) {
      if (keyCode == 37 && this.canvasX > 1) {
        this.canvasX -= this.changeSp;
      } else if (keyCode == 38 && this.canvasY > 1) {
        this.canvasY -= this.changeSp;
      }
      else if (keyCode == 39 && this.canvasX < 560) {
        this.canvasX += this.changeSp;
      }
      else if (keyCode == 40) {
        this.canvasY += this.changeSp;
      }
    }
  }
  stopFly() {
    clearInterval(this.flyTimer);
  }
  stopdrop() {
    clearInterval(this.dropTimer);
  }
}