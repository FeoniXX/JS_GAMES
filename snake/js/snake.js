;
(function (win) {
	function Snake(width, height, dir) {
		// 蛇身属性
		this.width = width || 20;
		this.height = height || 20;
		this.dir = dir || 'right';

		// 蛇身体前三节
		this.body = [
			{ x: 3, y: 2, color: 'red' },
			{ x: 2, y: 2, color: 'blue' },
			{ x: 1, y: 2, color: 'blue' }
		];
	}

	Snake.prototype = {
		// 蛇移动方法
		move: function (food, map) {
			// 控制蛇的移动（当前节点移动到上一节点）
			for (var i = this.body.length - 1; i > 0; i--) {
				this.body[i].x = this.body[i - 1].x;
				this.body[i].y = this.body[i - 1].y;
			}

			// 蛇头节点
			var head = this.body[0];

			// 蛇头的行进方向
			switch (this.dir) {
				case 'right':
					head.x += 1;
					break;
				case 'left':
					head.x -= 1;
					break;
				case 'top':
					head.y -= 1;
					break;
				case 'bottom':
					head.y += 1;
					break;
			}
			// 蛇吃食物
			// 判断蛇头位置是否与食物位置重合（碰撞检测）
			var headX = head.x * this.width;
			var headY = head.y * this.height;
			if (headX === food.x && headY === food.y) {
				var last = this.body[this.body.length - 1];
				this.body.push({
					x: last.x,
					y: last.y,
					color: last.color
				});

				// 重新生成一个食物
				food.generFood(map, this.body);
			}
		},
		draw: function (ctx) {
			for (var i = this.body.length - 1; i >= 0; i--) {
				var item = this.body[i];
				fillRoundRect(ctx, item.x * this.width, item.y * this.height, this.width, this.height, 5, item.color);
			}
		}
	}

	win.Snake = Snake;
})(window);