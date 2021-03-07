;
(function (win) {
	win.Land = function (level, plant) {
		this.level = level;
		this.plant = plant;

		this.extend(LANDS[this.level]);
	}

	Land.prototype = {
		create_at: null,
		kettle_at: null,
		needKettle: false,
		extend: function (obj) {
			var self = this;
			Object.keys(obj).forEach(function (key) {
				self[key] = obj[key];
			});
		},
		// 获取土地升级信息
		getNextLevelInfo: function () {
			return LANDS[this.level + 1];
		},
		// 土地升级
		levelUp: function () {
			this.level++;
			this.extend(LANDS[this.level]);
		},
		// 获取植物信息
		getPlant: function () {
			if (this.plant === null) {
				return null;
			}
			var plant_at = this.plant.plant_at;
			var growth = this.plant.growth;
			var increase = 100;
			// 施肥，生长期减少
			if (this.fertilizered) {
				increase -= 15;
			}
			// 干旱，生长期增加
			if (this.plant.isRipe) {
				increase += 15;
			}
			growth = ~~(growth * (increase / 100));
			var now = new Date;
			var stage = Math.floor((now - plant_at) / (growth / 6));
			if (stage >= 5) {
				stage = 5;
			}
			this.plant.stage = stage;
			this.plant.currentIcon = this.plant.icon[5 - stage];

			var expire = plant_at.getTime() + growth - now;
			if (expire <= 0) {
				expire = 0;
				this.plant.isRipe = true;
			}
			this.plant.expire = formatTime(expire);

			return this.plant;
		},
		// 获取土地洒水信息
		getKettleInfo: function () {
			var now = new Date;
			if (now - this.kettle_at > 12 * 60 * 60 * 1000) {
				this.needKettle = true;
			}
			return this.needKettle;
		},
		// 土地洒水
		kettle: function () {
			this.kettle_at = new Date;
			this.needKettle = false;
		}
	}
})(window);

function formatTime(mss) {
	var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((mss % (1000 * 60)) / 1000);
	return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2);
}

function pad(m, n) {
	var len = m.toString().length;
	while (len < n) {
		m = '0' + m;
		len++;
	}
	return m;
}