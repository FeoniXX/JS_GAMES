;
(function (win) {
	const Tank = function (roates) {
		this.x = COLS / 2 - 1;
		this.y = ROWS - 3;
		this.roates = roates || blockAlive;
		this.dir = 0;
		this.data = this.roates[this.dir];
	}

	Tank.prototype = {
		frame: 0,
		// 旋转
		rotate: function () {
			this.data = this.roates[this.dir];
		},
		// 是否四周越界
		isContactBorder: function (matrix) {
			var dir = this.dir;
			if ([1, 3].indexOf(dir) > -1) {
				for (var row = 0; row < matrix.length; row++) {
					if (dir === 3) {
						if (matrix[row][0] === 1) {
							return true;
						}
					} else if (dir === 1) {
						if (matrix[row][COLS - 1] === 1) {
							return true;
						}
					}
				}
			}
			if ([0, 2].indexOf(dir) > -1) {
				for (var col = 0; col < matrix[0].length; col++) {
					if (dir === 0) {
						if (matrix[0][col] === 1) {
							return true;
						}
					} else if (dir === 2) {
						if (matrix[ROWS - 1][col] === 1) {
							return true;
						}
					}
				}
			}
			return false;
		},
		// 方块是否与矩阵重叠
		checkMatrix: function (matrix, { x, y }) {
			return matrix[x][y] === 1;
		},
		// 碰撞检查
		Collision: function (matrix, child) {
			const row = child.row;
			const col = child.col;
			const arr = child.arr;
			var dir = this.dir;

			var pos = {
				x: row,
				y: col
			};

			if (dir === 1 || dir === 3) {
				pos.y = col + (dir === 1 ? 3 : -1);
				for (var i = 0; i < arr.length; i++) {
					pos.x = row + i;
					if (this.checkMatrix(matrix, pos)) {
						return true;
					}
				}
			}
			if (dir === 0 || dir === 2) {
				pos.x = row + (dir === 0 ? -1 : 3);
				for (var i = 0; i < arr.length; i++) {
					pos.y = col + i;
					if (this.checkMatrix(matrix, pos)) {
						return true;
					}
				}
			}
			return false
		},
		// 移动
		move: function (num, matrix) {
			var child = {
				row: this.y,
				col: this.x,
				arr: this.data
			};
			// 不能出界
			var newMatrix = mergeMatrix(child, generatorMatrix());
			if (this.isContactBorder(newMatrix)) {
				return;
			}
			// 碰撞检查
			if (this.Collision(matrix, child)) {
				return;
			}
			if ([0, 2].indexOf(this.dir) > -1) { // 上下
				this.y += num;
			}
			if ([1, 3].indexOf(this.dir) > -1) { // 左右
				this.x += num;
			}
		},
		onDead: function () {
			this.roates = blockDead;
			this.data = this.roates[0];
		}
	}

	win.Tank = Tank;
})(window);