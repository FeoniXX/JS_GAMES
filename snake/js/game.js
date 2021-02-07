;
(function (win, doc) {
	function Game(id) {
		this.map = $(id || '#canvas');
		this.ctx = this.map.getContext('2d');
		this.init();
	}

	Game.prototype = {
		init: function () {
			// 定时器
			this.timerId = null;
			// 得分
			this.score = 0;
			this.isOver = false;
			this.isPaused = false;
			// 创建食物和蛇的实例
			this.food = new Food();
			this.snake = new Snake();
			// 生成一个新食物
			this.food.generFood(this.map, this.snake.body);
			// 绘制所有内容
			this.draw();
		},
		// 游戏开始
		start: function () {
			var self = this;

			// 执行游戏循环
			this.timerId = setInterval(function () {
				// 蛇移动
				self.snake.move(self.food, self.map);
				// 边界检测，蛇碰到边界结束游戏
				var maxX = self.map.width / self.snake.width;
				var maxY = self.map.height / self.snake.height;
				var headX = self.snake.body[0].x;
				var headY = self.snake.body[0].y;
				if (headX < 0 || headX >= maxX || headY < 0 || headY >= maxY) {
					self.gameOver();
					return;
				}
				// 绘制所有内容
				self.draw();
				// 更新分数显示
				self.updateScore();
			}, 150);
		},
		draw: function () {
			// 清空画布
			this.ctx.clearRect(0, 0, this.map.width, this.map.height);
			// 根据body数据重新渲染蛇
			this.snake.draw(this.ctx);
			// 重新渲染食物
			this.food.draw(this.ctx);
		},
		// 游戏暂停
		togglePause: function () {
			this.isPaused = !this.isPaused;
			if (this.isPaused) {
				clearInterval(this.timerId);
				$('#game-pause').style.display = 'block';
			} else {
				$('#game-pause').style.display = 'none';
				this.start();
			}
		},
		// 按键事件处理
		keypress: function (e) {
			if (this.isOver) {
				return false;
			}
			switch (e.keyCode) {
				case 37:
					// 按下←键，如果当前蛇的方向是→，方向保持不变，否则方向变为←
					this.snake.dir = this.snake.dir == 'right' ? 'right' : 'left';
					break;
				case 38:
					// 按下↑键，如果当前蛇的方向是↓，方向保持不变，否则方向变为↑
					this.snake.dir = this.snake.dir == 'bottom' ? 'bottom' : 'top';
					break;
				case 39:
					// 按下→键，如果当前蛇的方向是←，方向保持不变，否则方向变为→
					this.snake.dir = this.snake.dir == 'left' ? 'left' : 'right';
					break;
				case 40:
					// 按下↓键，如果当前蛇的方向是↑，方向保持不变，否则方向变为↓
					this.snake.dir = this.snake.dir == 'top' ? 'top' : 'bottom';
					break;
				case 32:
					// 按下space键，切换暂停
					this.togglePause();
					break;
			}
		},
		// 更新分数显示
		updateScore: function () {
			this.score = (this.snake.body.length - 3) * 10;
			$('#score').innerText = this.score;
		},
		// 显示游戏结束
		gameOver: function () {
			this.isOver = true;
			clearInterval(this.timerId);
			$('#state').innerHTML = 'GAME OVER<br>SCORE:<br>' + this.score;
			$('#state').style.color = 'red';
			$('#game-over').style.display = 'block';
		}
	}

	win.onload = function () {
		var game = new Game('#canvas');
		game.start();

		$('#again').onclick = function () {
			$('#game-over').style.display = 'none';
			game.init();
			game.start();
		}

		$('#continue').onclick = function () {
			game.togglePause();
		}

		// 绑定按键点击事件
		doc.addEventListener('keydown', function (e) {
			game.keypress(e);
		});
	}

	win.Game = Game;

})(window, document);
