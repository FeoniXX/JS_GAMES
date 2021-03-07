;
(function (win) {
	win.Plant = function (level, plant_at) {
		this.level = level;
		this.plant_at = plant_at;
		this.extend(PLANTS[level]);
	}

	Plant.prototype = {
		isRipe: false,
		extend: function (obj) {
			var self = this;
			Object.keys(obj).forEach(function (key) {
				self[key] = obj[key];
			});
		},
	}
})(window);