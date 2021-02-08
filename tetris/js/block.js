;
(function (win) {
	// 方块对象
	const Block = function (roates) {
		this.x = COLS / 2;
		this.y = 0;
		this.roates = roates || blockL1;
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
		isContactBorder: function (matrix, direction) {
			for (var row = 0; row < matrix.length; row++) {
				if (direction === 'left') {
					if (matrix[row][0] === 1) {
						return true;
					}
				} else if (direction === 'right') {
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
		Collision: function (matrix, child, direction) {
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
						if (direction === 'right' || direction === 'left') {
							pos.y = y + col + (direction === 'right' ? 1 : -1);
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
		blockTypes: ['L1', 'L2', '__', 'Square', 'Z1', 'Z2', 'T'],
		create: function (type) {
			switch (type) {
				case 'L1':
					return new Block(blockL1);
				case 'L2':
					return new Block(blockL2);
				case '__':
					return new Block(block__);
				case 'Square':
					return new Block(blockSquare);
				case 'Z1':
					return new Block(blockZ1);
				case 'Z2':
					return new Block(blockZ2);
				case 'T':
					return new Block(blockT);
				default:
					return new Block(blockL1);
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