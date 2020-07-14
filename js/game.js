class Game {
  constructor({ sky, land, pipe, bird }) {
    this.sky = sky;
    this.land = land;
    this.bird = bird;
    this.pipe = pipe;
    this.startTimer = null;
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
  // 开始游戏
  start(key) {
    // 当key为13时 开始游戏
    //key为32是暂停和开始游戏键
    if ((key == 32 && this.isStop == true) || (key == 13 && this.flag == false)) {
      this.isStop = false;
      this.flag = true;
      if (this.startTimer) {
        return;
      }
      else {
        this.startTimer = setInterval(() => {
          this.sky.show();
          this.land.show();
          this.pipe.show();
          this.bird.show();
          this.gameOver(key);
        }, 50)
        this.bird.fly();
        this.bird.drop();
        this.pipe.pipeMove();
      }

    } else {
      if (key == 32 && this.isStop == false) {
        console.log('else');
        this.stop();
        this.isStop = true;
      }
    }
    this.bird.change(key);
  }
  stop() {
    clearInterval(this.startTimer);
    this.startTimer = null;
    this.sky.stopSky();
    this.bird.stopFly();
    this.bird.stopdrop();
    this.pipe.stopPipeMove();
  }
  // 结束游戏
  gameOver(key) {
    this.pipe.point.forEach((item, score) => {
      // console.log(score);
      // 获取鸟儿四周的位置
      let birdTop = this.bird.canvasY;
      let birdRight = this.bird.canvasX + this.bird.canvasWidth;
      let birdBottom = this.bird.canvasY + this.bird.canvasHeight;
      let birdLeft = this.bird.canvasX;
      console.log(birdTop, birdRight, birdBottom, birdLeft)

      // 获取水管四周的位置
      let pipeTop = item.canvasUpH;
      let pipeRight = item.canvasx + 52;
      let pipeBottom = item.canvasUpH + this.pipe.gap;
      let pipeLeft = item.canvasx;
      console.log(pipeTop, pipeRight, pipeBottom, pipeLeft)

      let top = (birdTop + 10) <= pipeTop &&
        (birdRight - 20) >= pipeLeft &&
        (birdLeft < pipeRight);
        console.log("top", top)

      let bottom = (birdBottom - 10) >= pipeBottom &&
        (birdRight - 20) >= pipeLeft &&
        (birdLeft < pipeRight);
        console.log("bottom", bottom)
      if (top || bottom) {
        console.log("if")
        let oldScore = window.localStorage.getItem("score") || 0;
        if (score > oldScore) { //破历史记录
          //更新记录
          window.localStorage.setItem("score", score);
        }
        alert('游戏结束' + score);
        this.stop();
      }
    })
  }
}