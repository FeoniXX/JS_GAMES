;
(function (win, doc) {
	// 更新页面用requestAnimationFrame替代setTimeout
	win.requestAnimationFrame = win.requestAnimationFrame
		|| win.mozRequestAnimationFrame
		|| win.webkitRequestAnimationFrame
		|| win.msRequestAnimationFrame;

	// 寄生组合式继承
	function inherit(subType, superType) {
		var TempFn = function () {
			this.constructor = subType;
		}
		TempFn.prototype = superType.prototype;
		subType.prototype = new TempFn();
	}

	// 粒子基类
	function Particle(x, y) {
		this.x = x; // x坐标
		this.y = y; // y坐标
		this.radius = Math.random() * 10; // 圆半径
		this.mvX = Math.random(); // 横向移动距离
		this.mvY = Math.random(); // 纵向移动距离
	}

	Particle.prototype = {
		// 画圆
		drawCircle: function (ctx) {
			ctx.beginPath();
			// 以(this.x, this.y)为圆心，以this.radius为半径画圆
			ctx.arc(this.x, this.y, this.radius, 0, 360);
			ctx.closePath();
			ctx.fillStyle = 'rgba(204, 204, 204, 0.3)';
			// 填充圆
			ctx.fill();
		},
		// 画两个圆之间的连线
		drawLine: function (ctx, circle) {
			var width = this.x - circle.x;
			var height = this.y - circle.y;
			// 勾股定理计算斜边，也就是两个圆连线的长度
			var hypotenuse = Math.sqrt(width * width + height * height);
			// 为了避免连线过多，设置两个圆之间的连线长度必须小于150才能画连线
			if (hypotenuse < 150) {
				ctx.beginPath();
				// 开始一条路径，移动到位置(this.x, this.y)。创建到达位置(circle.x,circle.y)的一条线：
				ctx.moveTo(this.x, this.y); // 起始点
				ctx.lineTo(circle.x, circle.y); // 终点
				ctx.closePath();
				ctx.strokeStyle = 'rgba(204, 204, 204, 0.3)';
				ctx.stroke();
			}
		},
		// 圆的移动（移动范围必须在屏幕内）
		move: function (width, height) {
			this.mvX = (this.x < width && this.x > 0) ? this.mvX : (-this.mvX);
			this.mvY = (this.y < height && this.y > 0) ? this.mvY : (-this.mvY);
			this.x += this.mvX / 2;
			this.y += this.mvY / 2;
		}
	}

	// 跟随鼠标所在位置的粒子类
	function CurrentParticle(x, y) {
		Particle.call(this, x, y);
	}

	// 继承粒子基类
	inherit(CurrentParticle, Particle);

	// @Override
	CurrentParticle.prototype.drawCircle = function (ctx) {
		ctx.beginPath();
		this.radius = 8;
		ctx.arc(this.x, this.y, this.radius, 0, 360);
		ctx.closePath();
		ctx.fillStyle = 'rgba(255, 77, 54, 0.6)';
		ctx.fill();
	}

	// 粒子动态效果
	function ParticleAnimation(id) {
		var canvas = doc.getElementById(id || 'canvas');
		this.ctx = canvas.getContext('2d');
		this.width = canvas.width = canvas.offsetWidth;
		this.height = canvas.height = canvas.offsetHeight;
		this.particles = [];
		this.currentParticle = new CurrentParticle(0, 0);
	}

	ParticleAnimation.prototype = {
		init: function (num) {
			for (var i = 0; i < num; i++) {
				this.particles.push(new Particle(
					Math.random() * this.width,
					Math.random() * this.height
				));
			}
			this.draw();
		},
		draw: function () {
			var ctx = this.ctx;
			var particles = this.particles;
			var currentParticle = this.currentParticle;
			ctx.clearRect(0, 0, this.width, this.height);
			for (var i = 0; i < particles.length; i++) {
				particles[i].move(this.width, this.height);
				particles[i].drawCircle(ctx);
				for (j = i + 1; j < particles.length; j++) {
					particles[i].drawLine(ctx, particles[j]);
				}
			}
			if (currentParticle.x) {
				currentParticle.drawCircle(ctx);
				for (var i = 1; i < particles.length; i++) {
					currentParticle.drawLine(ctx, particles[i]);
				}
			}
			requestAnimationFrame(this.draw.bind(this));
		}
	}

	win.addEventListener('load', function () {
		var pa = new ParticleAnimation();
		pa.init(100);

		win.addEventListener('mousemove', function (e) {
			e = e || window.event;
			pa.currentParticle.x = e.clientX;
			pa.currentParticle.y = e.clientY;
		});

		win.addEventListener('mouseout', function () {
			pa.currentParticle.x = null;
			pa.currentParticle.y = null;
		});
	});
})(window, document);