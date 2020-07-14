let upImg = new Image();
upImg.src = "./img/pipeUp.png";

let downImg = new Image();
downImg.src = "./img/pipeDown.png";

class Pipe {
	constructor(ctx) {
		this.ctx = ctx;
		this.upImg = upImg;
		this.downImg = downImg;
		this.gap = 100;
		this.imgx = 0;
		this.imgw = 52;
		this.pipeMoveTimer = null;
		this.level = 3;
		this.index = 0;
    // 水管初始化的位置
		this.point = [{
			canvasx: 600,
			canvasUpH: 100 
		}]
	}

	show() {
		this.point.forEach((item) => {
			this.ctx.drawImage(this.upImg, this.imgx, 420 - item.canvasUpH, this.imgw, item.canvasUpH,
				item.canvasx, 0, 52, item.canvasUpH);
			this.ctx.drawImage(this.downImg, this.imgx, 0, this.imgw, 288 - item.canvasUpH - this.gap,
				item.canvasx, item.canvasUpH + this.gap, 52, 288 - item.canvasUpH - this.gap)
		})
	}
	pipeMove() {
		this.pipeMoveTimer = setInterval(() => {
			this.point.forEach((item) => {
				item.canvasx -= this.level * 3
			})
			this.index++;
			// 如果上一组水管移动了99像素,开始创建下一组新的水管
			if (this.index % Math.floor(100 / this.level) == 0) {
				this.point.push({
					canvasx: 600,
					canvasUpH: 10 + Math.floor(Math.random() * 168) //随机整数
				})
			}
		}, 50)
	}
	stopPipeMove() {
		clearInterval(this.pipeMoveTimer);
	}
		
}
