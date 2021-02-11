;
(function (win, doc) {
	// 更新页面用requestAnimationFrame替代setTimeout
	win.requestAnimationFrame = win.requestAnimationFrame
		|| win.mozRequestAnimationFrame
		|| win.webkitRequestAnimationFrame
		|| win.msRequestAnimationFrame;

	var canvas = doc.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;

	function Globule(x, y) {
		this.x = x;
		this.y = y;
		this.radius = 30; // 半径
		// 随机颜色、透明度
		var r = parseInt(Math.random() * 255),
			g = parseInt(Math.random() * 255),
			b = parseInt(Math.random() * 255),
			opacity = Math.random() * 5 + 0.51;
		this.color = "rgba(" + r + "," + g + "," + b + ", " + opacity + ")";
		// 随机方向
		this.dirX = Math.random() * 12 - 7;
		this.dirY = Math.random() * 12 - 7;
		// 往数组中push自己
		Globule.globuleList.push(this);
	}

	Globule.globuleList = [];

	Globule.prototype = {
		draw: function () {
			ctx.beginPath();
			// 以(this.x, this.y)为圆心，以this.radius为半径画圆
			ctx.arc(this.x, this.y, this.radius, 0, 360);
			ctx.closePath();
			ctx.fillStyle = this.color;
			// 填充圆
			ctx.fill();
		},
		update: function () {
			this.x += this.dirX;
			this.y += this.dirY;
			this.radius--;
			if (this.radius < 0) {
				for (var i = 0; i < Globule.globuleList.length; i++) {
					if (Globule.globuleList[i] === this) {
						Globule.globuleList.splice(i, 1);
					}
				}
				return false;
			}
			return true;
		}
	}

	function run() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		Globule.globuleList.map(function (item) {
			item.update() && item.draw();
		});
		requestAnimationFrame(run);
	}

	canvas.addEventListener('mousemove', function (e) {
		e = e || window.event;
		new Globule(e.clientX, e.clientY);
	});

	run();
})(window, document);