;
(function (win) {
	const Bullet = function (owner) {
		this.owner = owner;
		this.dir = owner.dir;
		this.roates = blockBullet;
		this.data = this.roates[0];

		this.init();
	}

	Bullet.prototype = {
		init: function () {
			var dir = this.dir;
			if (dir === 0) {
				this.x = this.owner.x + 1;
				this.y = this.owner.y;
			} else if (dir === 1) {
				this.x = this.owner.x + 2;
				this.y = this.owner.y + 1;
			} else if (dir === 2) {
				this.x = this.owner.x + 1;
				this.y = this.owner.y + 2;
			} else if (dir === 3) {
				this.x = this.owner.x;
				this.y = this.owner.y + 1;
			}
		},
		isContactBorder: function () {
			var dir = this.dir;
			if (dir === 0 && this.y === 0) {
				return true;
			} else if (dir === 1 && this.x === COLS - 1) {
				return true;
			} else if (dir === 2 && this.y === ROWS - 1) {
				return true;
			} else if (dir === 3 && this.x === 0) {
				return true;
			}
			return false;
		},
		Collision: function (matrix) {
			var dir = this.dir;
			if (dir === 0 && (this.y === 0 || matrix[this.y - 1][this.x] === 1)) {
				return true;
			} else if (dir === 1 && (this.x === COLS - 1 || matrix[this.y][this.x + 1] === 1)) {
				return true;
			} else if (dir === 2 && (this.y === ROWS - 1 || matrix[this.y + 1][this.x] === 1)) {
				return true;
			} else if (dir === 3 && (this.x === 0 || matrix[this.y][this.x - 1] === 1)) {
				return true;
			}
			return false;
		},
		move: function () {
			var dir = this.dir;
			if (dir === 0) {
				this.y--;
			} else if (dir === 1) {
				this.x++;
			} else if (dir === 2) {
				this.y++;
			} else if (dir === 3) {
				this.x--;
			}
		}
	};

	win.Bullet = Bullet;
})(window);