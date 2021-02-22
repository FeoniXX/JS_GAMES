;
(function (win, doc) {
	const Game = function (id) {
		this.canvas = $(id || '#canvas');
		this.ctx = this.canvas.getContext('2d');
		this.rows = ROWS;
		this.cols = COLS;
		this.latticeSize = BLOCK_SIZE;
		this.canvas.width = BLOCK_SIZE * this.cols;
		this.canvas.height = BLOCK_SIZE * this.rows;

		// 绑定键盘事件
		this.addEvent();

		// 初始化
		this.init();
	}

	Game.prototype = {
		enemyList: [],
		enemyPos: [
			{ x: 0, y: 0, dir: 2 },
			{ x: COLS / 2 - 1, y: 0, dir: 2 },
			{ x: COLS - 3, y: 0, dir: 2 },
			{ x: 0, y: ROWS / 2 - 1, dir: 1 },
			{ x: COLS - 3, y: ROWS / 2 - 1, dir: 3 },
			{ x: 0, y: ROWS - 3, dir: 0 },
			{ x: COLS / 2 - 1, y: ROWS - 3, dir: 0 },
			{ x: COLS - 3, y: ROWS - 3, dir: 0 }
		],
		bulletList: [],
		init: function () {
			// 所有的块
			this.matrix = generatorMatrix();
			this.timer = null;
			// 玩家坦克
			this.player = new Tank();
			this.score = 0;
			this.level = 1;
			this.isOver = false;
			this.enemyList = [];
			this.bulletList = [];
			this.step = 60;

			$('#score').innerText = this.score;
			$('#level').innerText = this.level;
		},
		addEvent: function () {
			var self = this;

			doc.addEventListener('keydown', function (e) {
				if (self.isOver) {
					return false;
				}

				var speed = 0, dir = 0;

				// left key down
				if (e.keyCode === 37) {
					speed = -1;
					dir = 3;
				}
				// right key down
				if (e.keyCode === 39) {
					speed = 1;
					dir = 1;
				}
				// up key down
				if (e.keyCode === 38) {
					speed = -1;
					dir = 0;
				}
				// down key down
				if (e.keyCode === 40) {
					speed = 1;
					dir = 2;
				}

				if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
					if (self.player.dir === dir) {
						self.player.move(speed, self.mergeMatrix(self.matrix));
					} else {
						self.player.dir = dir;
						self.player.rotate();
					}
				}

				self.draw();
			});

			doc.addEventListener('keyup', function (e) {
				if (self.isOver) {
					return false;
				}
				if (e.keyCode === 32) {
					var bullet = new Bullet(self.player);
					self.bulletList.push(bullet);
				}
			});
		},
		mergeMatrix: function (matrix) {
			var tempMatrix = deepCopyMatrix(matrix);

			// 合并 player 到 matrix
			if (this.player) {
				const x = this.player.x;
				const y = this.player.y;
				const data = this.player.data;
				var child = {
					row: y,
					col: x,
					arr: data
				}
				tempMatrix = mergeMatrix(child, tempMatrix);
			}
			// 合并 enemy 到 matrix
			if (this.enemyList.length > 0) {
				this.enemyList.map(function (item) {
					mergeAllMatrix(item);
				});
			}
			if (this.bulletList.length > 0) {
				this.bulletList.map(function (item) {
					mergeAllMatrix(item);
				});
			}

			function mergeAllMatrix(matrix) {
				const x = matrix.x;
				const y = matrix.y;
				const data = matrix.data;
				var child = {
					row: y,
					col: x,
					arr: data
				}
				tempMatrix = mergeMatrix(child, tempMatrix);
			}

			return tempMatrix;
		},
		// 重绘所有的已经确定的方块
		draw: function () {
			const ctx = this.ctx;
			const canvas = this.canvas;
			const latticeSize = this.latticeSize;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			var tempMatrix = this.mergeMatrix(this.matrix);

			// 绘制已经确定的格子
			for (var y = 0; y < tempMatrix.length; y++) {
				var row = tempMatrix[y];
				for (var x = 0; x < row.length; x++) {
					var col = row[x];
					if (col === 0) {
						ctx.fillStyle = '#eee';
					} else {
						ctx.fillStyle = '#2196f3';
					}
					ctx.fillRect(
						latticeSize * x + 1,
						y * latticeSize + 1,
						latticeSize - 2, latticeSize - 2,
					)
				}
			}
		},
		start: function () {
			this.createEnemy();
			this.draw();
			this.timer = setInterval(this.runtime.bind(this), 50);
		},
		runtime: function () {
			for (var i = 0; i < this.bulletList.length; i++) {
				var tempMatrix = this.mergeMatrix(this.matrix);
				var currentBullet = this.bulletList[i];
				if (currentBullet.Collision(tempMatrix)) {
					var x = currentBullet.x;
					var y = currentBullet.y;
					var dir = currentBullet.dir;
					var tempEnemyList = deepCopyMatrix(this.enemyList);
					tempEnemyList.push(this.player);
					tempEnemyList.push.apply(tempEnemyList, this.bulletList);
					for (var j = 0; j < tempEnemyList.length; j++) {
						var obj = tempEnemyList[j];
						if (obj instanceof Tank) {
							var tank = obj;
							if (currentBullet.owner === tank) {
								continue;
							}
							if (([0, 2].indexOf(dir) > -1 && x >= tank.x && x <= tank.x + 2 && y >= tank.y - 1 && y <= tank.y + 3) || ([1, 3].indexOf(dir) > -1 && y >= tank.y && y <= tank.y + 2 && x >= tank.x - 1 && x <= tank.x + 3)) {
								if (tank === this.player) {
									// game over
									this.player.onDead();
									this.gameOver();
								} else {
									if (currentBullet.owner === this.player) {
										this.enemyList.splice(this.enemyList.indexOf(tank), 1);
										this.score += 100;
										var level = Math.floor(this.score / 500) + 1;
										this.step -= (level - this.level) * 10;
										this.level = level;
										$('#score').innerText = this.score;
										$('#level').innerText = this.level;
									}
								}
								break;
							}
						} else if (obj instanceof Bullet) {
							var bullet = obj;
							if (([0, 2].indexOf(dir) > -1 && x === bullet.x && y >= bullet.y - 1 && y <= bullet.y + 1) || ([1, 3].indexOf(dir) > -1 && y === bullet.y && x >= bullet.x - 1 && x <= bullet.x + 1)) {
								var index = this.bulletList.indexOf(bullet);
								if (index < i) {
									i--;
								}
								this.bulletList.splice(index, 1);
								break;
							}
						}
					}

					this.bulletList.splice(i, 1);
					i--;
				} else {
					currentBullet.move();
				}
			}

			for (var i = 0; i < this.enemyList.length; i++) {
				this.enemyAutoRun(this.enemyList[i]);
			}
			this.draw();
			this.step--;
			if (this.step <= 0) {
				this.step = 0;
				this.createEnemy();
			}
		},
		createEnemy: function () {
			var enemyPos;
			var collision = false;
			var tempMatrix = this.mergeMatrix(this.matrix);
			pos:
			for (var i = 0; i < this.enemyPos.length; i++) {
				collision = false;
				enemyPos = this.enemyPos[i];
				matrix:
				for (var row = enemyPos.y; row < enemyPos.y + 3; row++) {
					for (var col = enemyPos.x; col < enemyPos.x + 3; col++) {
						if (tempMatrix[row][col] === 1) {
							collision = true;
							break matrix;
						}
					}
				}
				if (!collision) {
					var enemy = new Tank();
					enemy.dir = enemyPos.dir;
					enemy.x = enemyPos.x;
					enemy.y = enemyPos.y;
					enemy.rotate();
					this.enemyList.push(enemy);
					this.step = 60 - this.level * 10;
					break pos;
				}
			}
		},
		enemyAutoRun: function (enemy) {
			enemy.frame++;
			if (enemy.frame % 20 === 0) {
				var action = ~~(Math.random() * 4);
				switch (action) {
					case 0:
						break;
					case 1:
						var dir = ~~(Math.random() * 4);
						enemy.dir = dir;
						enemy.rotate();
						break;
					case 2:
						var tempMatrix = this.mergeMatrix(this.matrix);
						if ([0, 3].indexOf(enemy.dir) > -1) {
							enemy.move(-1, tempMatrix);
						} else if ([1, 2].indexOf(enemy.dir) > -1) {
							enemy.move(1, tempMatrix);
						}
						break;
					case 3:
						this.bulletList.push(new Bullet(enemy));
						break;
				}
				enemy.frame = 0;
			}
		},
		gameOver: function () {
			var self = this;
			self.isOver = true;
			setTimeout(function () {
				clearInterval(self.timer);
				$('#state').innerHTML = 'GAME OVER<br>SCORE:<br>' + self.score;
				$('#state').style.color = 'red';
				$('#game-over').style.display = 'block';
			}, 500);
		}
	}

	var game = new Game();
	game.start();

	$('#again').addEventListener('click', function () {
		$('#game-over').style.display = 'none';
		game.init();
		game.start();
	});

	win.Game = Game;
})(window, document);