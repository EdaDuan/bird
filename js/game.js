class Game {
  constructor({ sky, land, pipe, bird }) {
    this.sky = sky;
    this.land = land;
    this.bird = bird;
    this.pipe = pipe;
    this.startTimer = null;
    this.key = null;
    this.flag = false;
    this.isStop = false;//不是停止的
  }
  // 初始化
  init() {
    this.sky.show();
    this.land.show();
    this.bird.show();
    this.pipe.show();
  }
  // 获取key的值
  getKey(key) {
    console.log(key);
    this.key = key;
  }
  // 让天空和水管等动起来
  move() {
    if (this.startTimer) {
      return;
    } else {
      this.startTimer = setInterval(() => {
        this.sky.show();
        this.land.show();
        this.pipe.show();
        this.bird.show();
        this.gameOver();
      }, 50)
      this.bird.fly();
      this.bird.drop();
      this.pipe.pipeMove();
    }
    this.flag = true;
  }
  // 开始游戏
  start() {
    if (this.key == 13 && this.flag == false) {
      console.log('start');
      this.move();
    }
    this.bird.change(this.key);
  }
  // 暂停游戏
  pause() {
    if (this.key == 32 && this.isStop == true) {
      console.log('pause');
      this.isStop = false;
      this.move();
      this.bird.change(this.key);
    } else if (this.key == 32 && this.isStop == false) {
      console.log('stop');
      this.isStop = true;
      this.stop();
    }
  }
  // 停止游戏
  stop() {
    clearInterval(this.startTimer);
    this.startTimer = null;
    this.sky.stopSky();
    this.bird.stopFly();
    this.bird.stopdrop();
    this.pipe.stopPipeMove();
  }
  // 结束游戏
  gameOver() {
    this.pipe.point.forEach((item, score) => {
      // console.log(score);
      // 获取鸟儿四周的位置
      let birdTop = this.bird.canvasY + 10;
      let birdRight = this.bird.canvasX + this.bird.canvasWidth - 20;
      let birdBottom = this.bird.canvasY + this.bird.canvasHeight - 20;
      let birdLeft = this.bird.canvasX + 10;
      // console.log(birdTop, birdRight, birdBottom, birdLeft)
      // 获取水管四周的位置
      let pipeTop = item.canvasUpH;
      let pipeRight = item.canvasx + 52;
      let pipeBottom = item.canvasUpH + this.pipe.gap;
      let pipeLeft = item.canvasx;
      // console.log(pipeTop, pipeRight, pipeBottom, pipeLeft)
      let top = (birdTop <= pipeTop) &&
        (birdRight >= pipeLeft) &&
        (birdLeft < pipeRight);
      // console.log("top", top)

      let bottom = (birdBottom - 10) >= pipeBottom &&
        (birdRight - 20) >= pipeLeft &&
        (birdLeft < pipeRight);
      // console.log("bottom", bottom)
      if (top || bottom) {
        clearInterval(this.startTimer);
        this.stop();
        let oldScore = window.localStorage.getItem("score") || 0;
        if (score > oldScore) { //破历史记录
          //更新记录
          window.localStorage.setItem("score", score);
        }
        alert('游戏结束' + score);
      }
    })
  }
}