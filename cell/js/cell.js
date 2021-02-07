;
(function (win) {
	win.Cell = function (ctx, size) {
		this.alive = [];
		this.ctx = ctx;
		this.size = size;
		this.init();
	}
	Cell.prototype = {
		// 初始化所有细胞为死亡状态
		init: function () {
			for (var i = 0; i < this.size; i++) {
				this.alive[i] = [];
				for (var j = 0; j < this.size; j++) {
					this.alive[i][j] = 0;
				}
			}
		},
		// 画细胞
		draw: function () {
			for (var i = 0; i < this.size; i++) {
				for (var j = 0; j < this.size; j++) {
					if (this.alive[j][i] === 1) {
						this.ctx.fillStyle = 'red';
					} else {
						this.ctx.fillStyle = 'white';
					}
					this.ctx.fillRect(i * 10 + 1, j * 10 + 1, 8, 8);
				}
			}
		},
		// 演化细胞
		transform: function () {
			var sum = 0;
			var alive = this.deepCopyAlive(this.alive);
			// 循环计算所有细胞周围活细胞个数
			for (var i = 0; i < this.size; i++) {
				for (var j = 0; j < this.size; j++) {
					if (i === 0 && j === 0) { // 左上角
						sum = this.alive[i][j + 1] + this.alive[i + 1][j + 1] + this.alive[i + 1][j];
					}
					if (i === 0 && j === this.size - 1) { // 右上角
						sum = this.alive[i][j - 1] + this.alive[i + 1][j - 1] + this.alive[i + 1][j];
					}
					if (i === this.size - 1 && j === 0) { // 左下角
						sum = this.alive[i - 1][j] + this.alive[i - 1][j + 1] + this.alive[i][j + 1];
					}
					if (i === this.size - 1 && j === this.size - 1) { // 右下角
						sum = this.alive[i - 1][j] + this.alive[i - 1][j - 1] + this.alive[i][j - 1];
					}
					if (i === 0 && j > 0 && j < this.size - 1) { // 上棱
						sum = this.alive[i][j - 1] + this.alive[i + 1][j - 1] + this.alive[i + 1][j] + this.alive[i + 1][j + 1] + this.alive[i][j + 1];
					}
					if (i === this.size - 1 && j > 0 && j < this.size - 1) { // 下棱
						sum = this.alive[i][j - 1] + this.alive[i - 1][j - 1] + this.alive[i - 1][j] + this.alive[i - 1][j + 1] + this.alive[i][j + 1];
					}
					if (i > 0 && i < this.size - 1 && j === 0) { // 左棱
						sum = this.alive[i - 1][j] + this.alive[i - 1][j + 1] + this.alive[i][j + 1] + this.alive[i + 1][j + 1] + this.alive[i + 1][j];
					}
					if (i > 0 && i < this.size - 1 && j === this.size - 1) { // 右棱
						sum = this.alive[i - 1][j] + this.alive[i - 1][j - 1] + this.alive[i][j - 1] + this.alive[i + 1][j - 1] + this.alive[i + 1][j];
					}
					if (i > 0 && i < this.size - 1 && j > 0 && j < this.size - 1) { // 内部所有细胞
						sum = this.alive[i - 1][j - 1] + this.alive[i - 1][j] + this.alive[i - 1][j + 1] + this.alive[i][j + 1] + this.alive[i + 1][j + 1] + this.alive[i + 1][j] + this.alive[i + 1][j - 1] + this.alive[i][j - 1];
					}

					// 如果当前细胞为活，周围共有2或3个细胞，则当前细胞存活，低于2或高于3，则死亡
					// 如果当前细胞为死，周围共有3个活细胞，则当前细胞复活，否则死亡
					alive[i][j] = (sum === 3) | (sum === 2 & this.alive[i][j]);
				}
			}
			this.alive = this.deepCopyAlive(alive);
		},
		// 深拷贝alive数组
		deepCopyAlive: function (alive) {
			return alive.map(function (item) {
				return item.map(function (subItem) {
					return subItem;
				});
			});
		}
	}
})(window);