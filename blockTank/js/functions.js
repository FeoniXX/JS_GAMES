// 深拷贝 矩阵
function deepCopyMatrix(matrix) {
	var arr = [];
	matrix.map(function (i) {
		if (i instanceof Array) {
			arr.push(deepCopyMatrix(i));
		} else {
			arr.push(i);
		}
	});
	return arr;
}

// 矩阵与方块合并
function mergeMatrix(child, parent, isColOut) {
	const row = child.row;
	const col = child.col;
	const arr = child.arr;
	isColOut = isColOut || false;
	var newParent = deepCopyMatrix(parent);
	for (var i = 0; i < arr.length; i++) {
		if (newParent[row + i] && newParent[row + i] instanceof Array) {
			for (var j = 0; j < 4; j++) {
				var num = newParent[row + i][col + j];
				var newNum = arr[i][j];
				if (isColOut || (col + j >= 0 && newNum)) {
					newParent[row + i][col + j] = num === 1 ? 1 : newNum;
				}
			}
		}
	}
	return newParent;
}

// 生成空矩阵
function generatorMatrix() {
	var matrix = [];
	for (var row = 0; row < ROWS; row++) {
		var newLine = [];
		for (var col = 0; col < COLS; col++) {
			newLine.push(0);
		}
		matrix.push(newLine);
	}
	return matrix;
}

// dom选择器
function $(el) {
	return /^#\S+/.test(el) ? document.querySelector(el) : document.querySelectorAll(el);
}