;
(function (win) {
	// 方块对象
	const Block = function (roates) {
		this.x = COLS / 2;
		this.y = 0;
		this.roates = roates || blockL;
		this.dir = 0;
		this.data = this.roates[this.dir];
	}

	Block.prototype = {
		// 旋转
		rotate: function (matrix) {
			var tempDir = this.dir;
			tempDir++;
			tempDir = tempDir % 4;
			var child = {
				row: this.y,
				col: this.x - 2,
				arr: this.roates[tempDir],
			};
			var newMatrix = mergeMatrix(child, deepCopyMatrix(matrix), true);
			// 不能出界
			for (var i in newMatrix) {
				if (newMatrix[i].length > COLS || newMatrix[i][-1] !== undefined) {
					return;
				}
			}
			this.dir++;
			this.dir = this.dir % 4;
			this.data = this.roates[this.dir];
		},
		// 是否两侧越界
		isContactBorder: function (matrix, dir) {
			for (var row = 0; row < matrix.length; row++) {
				if (dir === 'left') {
					if (matrix[row][0] === 1) {
						return true;
					}
				} else if (dir === 'right') {
					if (matrix[row][COLS - 1] === 1) {
						return true;
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
		Collision: function (matrix, child, dir) {
			const row = child.row;
			const col = child.col;
			const arr = child.arr;
			// 左右 | 旋转
			for (var x = 0; x < arr.length; x++) {
				for (var y = 0; y < arr[x].length; y++) {
					if (arr[x][y] === 1) {
						var pos = {
							x: x + row,
							y: y + col
						};
						if (dir === 'right' || dir === 'left') {
							pos.y = y + col + (dir === 'right' ? 1 : -1);
						}
						if (this.checkMatrix(matrix, pos)) {
							return true;
						}
					}
				}
			}
			return false
		},
		// 左右移动
		move: function (num, matrix) {
			var child = {
				row: this.y,
				col: this.x - 2,
				arr: this.data,
			};
			// 不能出界
			var newMatrix = mergeMatrix(child, generatorMatrix())
			if (this.isContactBorder(newMatrix, num > 0 ? 'right' : 'left')) {
				return;
			}
			// 碰撞检查
			child.col + num
			if (this.Collision(matrix, child, num > 0 ? 'right' : 'left')) {
				return;
			}
			this.x += num;
		},
		down: function () {
			this.y++;
		}
	}

	// 方块工厂对象，创建方块
	const BlockFactory = {
		blockTypes: ['L', 'J', 'I', 'O', 'Z', 'S', 'T'],
		create: function (type) {
			switch (type) {
				case 'L':
					return new Block(blockL);
				case 'J':
					return new Block(blockJ);
				case 'I':
					return new Block(blockI);
				case 'O':
					return new Block(blockO);
				case 'Z':
					return new Block(blockZ);
				case 'S':
					return new Block(blockS);
				case 'T':
					return new Block(blockT);
				default:
					return new Block(blockL);
			}
		},
		rand: function () {
			return this.create(
				this.blockTypes[~~(Math.random() * this.blockTypes.length)]
			);
		}
	};

	win.Block = Block;
	win.BlockFactory = BlockFactory;
})(window);