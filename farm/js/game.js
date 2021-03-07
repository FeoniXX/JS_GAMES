;
(function (win, doc) {
	win.$ = function (el) {
		return /^#\S+/.test(el) ? doc.querySelector(el) : doc.querySelectorAll(el);
	}

	win.Game = function (id) {
		this.canvas = $(id);
		this.ctx = this.canvas.getContext('2d');
		this.mapWidth = this.canvas.width;
		this.mapHeight = this.canvas.height;
	}

	Game.prototype = {
		cols: 6, // 列数
		rows: 4, // 行数
		spacing: 15, // 方格之间的间距
		grids: [], // 方格对象数组
		loadFailedCount: 0, // 图片加载失败数量
		loadSuccessCount: 0, // 图片加载成功数量
		// 需要加载的图片
		imgPaths: {
			board: 'images/board.png',
			seed: 'images/seed.png',
			fertilizer: 'images/fertilizer.png',
			kettle: 'images/kettle.png',
			hand: 'images/hand.png',
			handAll: 'images/hand-all.png',
			shovel: 'images/shovel.png',
			plants: 'images/plants.png',
			levelUp: 'images/levelUp.png'
		},
		// 已加载的图片对象集合
		imageObjList: {},
		nickname: '',
		exp: 0,
		totalExp: 100,
		level: 1,
		money: 1000,
		// 鼠标所在的土地
		cursorStayLand: null,
		cursor: {
			icon: 'null',
			seed: -1,
			x: 800,
			y: 480
		},
		// 初始化
		init: function () {
			// 计算小方块宽度
			this.width = (this.mapWidth - (this.cols + 1) * this.spacing) / this.cols;
			// 计算小方块高度
			this.height = (this.mapHeight - (this.rows + 1) * this.spacing) / this.rows;
			$('#land-tip').style.width = this.width + 'px';
			$('#land-tip').style.height = this.height + 'px';
			var loginUser = this.login();
			var data = null;
			if (loginUser !== null) {
				this.nickname = loginUser;
				data = localStorage.getItem(loginUser);
			}
			if (data === null) {
				data = {
					level: 1,
					exp: 0,
					money: 1000,
					lands: []
				};
			} else {
				data = JSON.parse(data);
				this.level = data.level;
				this.exp = data.exp;
				this.money = data.money;
			}
			var tempDataLands = [];
			// 初始化方块数组
			for (var row = 0; row < this.rows; row++) {
				this.grids[row] = [];
				tempDataLands[row] = [];
				for (var col = 0; col < this.cols; col++) {
					var x = col * this.width + this.spacing * (col + 1);
					var y = row * this.height + this.spacing * (row + 1);
					var land = null;
					if (data.lands.length > 0) {
						var item = data.lands[row][col];
						land = item.plant !== null ? new Land(item.level, new Plant(item.plant.level, new Date(item.plant.plant_at))) : new Land(item.level, null);
						land.create_at = new Date(item.create_at);
						land.kettle_at = new Date(item.kettle_at);
						land.fertilizered = item.fertilizered || false;
						tempDataLands[row].push(item);
					} else {
						tempDataLands[row][col] = {
							level: 0,
							create_at: null,
							kettle_at: null,
							plant: null,
							fertilizered: false
						};
						land = new Land(0, null);
					}
					land.extend({
						x: x,
						y: y
					});
					this.grids[row][col] = land;
				}
			}

			data.lands = deepCopyMatrix(tempDataLands);
			localStorage.setItem(loginUser, JSON.stringify(data));
			this.data = data;
			this.totalExp = this.calcTotalExp(this.level);

			this.updateNickname();
			this.updateExp();
			this.updateLevel();
			this.updateMoney();
		},
		login: function () {
			var nickname = localStorage.getItem('loginUser');
			while (nickname === null) {
				nickname = prompt("请输入您的昵称：");
			}
			localStorage.setItem('loginUser', nickname);
			return nickname;
		},
		start: function () {
			this.loadImage();
		},
		draw: function () {
			// 清空原有内容
			this.ctx.clearRect(0, 0, this.mapWidth, this.mapHeight);
			var isFirstLv0Land = 0;
			for (var row = 0; row < this.rows; row++) {
				for (var col = 0; col < this.cols; col++) {
					var land = this.grids[row][col];
					var x = land.x; // 得到土地方块x坐标
					var y = land.y; // 得到土地方块y坐标
					var plant = land.getPlant(); // 得到土地方块种植的植物
					var bgColor = land.color; // 得到土地方块背景色
					// 绘制土地方块
					this.fillRoundRect(this.ctx, x, y, this.width, this.height, 10, bgColor);

					if (plant !== null) {
						var icon = plant.currentIcon;
						var sX = icon.x;
						var sY = icon.y;
						var sWidth = icon.width;
						var sHeight = icon.height;
						var dWidth = this.width * 0.65;
						var dHeight = this.height * 0.65;
						var dX = x + (this.width - dWidth) / 2;
						var dY = y + (this.height - dHeight) / 2;
						this.ctx.drawImage(this.imageObjList.plants, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);
						if (plant.isRipe) {
							var image = this.imageObjList.handAll;
							var sWidth = image.width;
							var sHeight = image.height;
							var dWidth = sWidth * 0.2;
							var dHeight = sHeight * 0.2;
							var dX = x + this.width - dWidth - 10;
							var dY = y + 10;
							this.ctx.drawImage(image, 0, 0, sWidth, sHeight, dX, dY, dWidth, dHeight);
						}
					}

					land.isFirstLv0Land = false;
					if (land.level === 0 && isFirstLv0Land === 0) {
						land.isFirstLv0Land = true;
						isFirstLv0Land++;
						this.ctx.drawImage(this.imageObjList.board, 0, 0, 154, 220, x + 18, y + 15, 115 * 0.65, 101 * 0.65);
					}
				}
			}
			this.updateLandStatus();

			if (this.cursor.icon !== 'null') {
				var image = this.imageObjList[this.cursor.icon];
				var width = image.width;
				var height = image.height;
				var x = this.cursor.x;
				var y = this.cursor.y;
				this.ctx.drawImage(image, 0, 0, width, height, x, y, 50, 50);
			}
		},
		// 绘制并填充圆角矩形
		fillRoundRect: function (ctx, x, y, width, height, radius, fillColor) {
			// 圆的直径必然要小于矩形的宽高
			if (2 * radius > width || 2 * radius > height) {
				return false;
			}
			ctx.save();
			ctx.translate(x, y);
			// 绘制圆角矩形的各个边
			this.drawRoundRectPath(ctx, width, height, radius);
			ctx.fillStyle = fillColor || "#000"; // 设置画笔颜色
			ctx.fill();
			ctx.restore();
		},
		// 绘制圆角矩形框
		drawRoundRectPath: function (ctx, width, height, radius) {
			ctx.beginPath(0);
			// 从右下角顺时针绘制，弧度从0到1/2PI
			ctx.arc(width - radius, height - radius, radius, 0, Math.PI / 2);
			// 矩形下边线
			ctx.lineTo(radius, height);
			// 左下角圆弧，弧度从1/2PI到PI
			ctx.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);
			// 矩形左边线
			ctx.lineTo(0, radius);
			// 左上角圆弧，弧度从PI到3/2PI
			ctx.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2);
			// 上边线
			ctx.lineTo(width - radius, 0);
			// 右上角圆弧
			ctx.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2);
			// 右边线
			ctx.lineTo(width, height - radius);
			ctx.closePath();
		},
		// 加载图片资源
		loadImage: function () {
			var self = this;
			var img = this.imgPaths;
			Object.keys(img).forEach(function (key) {
				var imageObj = new Image();
				imageObj.src = img[key];
				imageObj.onload = function () {
					self.imageObjList[key] = imageObj;
					self.loadSuccessCount++;
					self.updateLoading();
				}
				imageObj.onerror = function () {
					self.loadFailedCount++;
					self.updateLoading();
				}
			});
		},
		// 资源加载进度
		updateLoading: function () {
			var self = this;
			var length = Object.keys(this.imgPaths).length;
			if (this.loadFailedCount + this.loadSuccessCount >= length) {
				setTimeout(function () {
					self.init();
					$('#loading').style.display = 'none';
				}, 1000);
				setInterval(this.draw.bind(this), 1000);
			}
			var percent = Math.floor((this.loadFailedCount + this.loadSuccessCount) / length * 100) + '%';
			$('#load-tip').innerText = '资源加载中... ' + percent;
			$('#load-bar').style.width = percent;
		},
		// 更新昵称显示
		updateNickname: function () {
			$('#nickname').innerText = this.nickname;
		},
		// 更新经验值显示
		updateExp: function () {
			if (this.exp >= this.totalExp) {
				this.level++;
				this.exp -= this.totalExp;
				this.totalExp = this.calcTotalExp(this.level);
				this.updateLevel();
			}
			this.data.exp = this.exp;
			var percent = Math.floor(this.exp / this.totalExp * 100) + '%';
			$('#exp-tip').innerText = this.exp + ' / ' + this.totalExp;
			$('#exp-bar').style.width = percent;
		},
		// 计算升级所需经验
		calcTotalExp: function (lv) {
			if (lv === 1) {
				return 100;
			}
			if (lv === 2) {
				return 120;
			}
			return this.calcTotalExp(lv - 1) + 20 * lv;
		},
		// 更新等级显示
		updateLevel: function () {
			$('#level').innerText = this.level;
			this.data.level = this.level;
		},
		// 更新金币显示
		updateMoney: function () {
			$('#money').innerText = this.money;
			this.data.money = this.money;
		},
		// 更新土地状态显示
		updateLandStatus: function () {
			if (this.cursorStayLand === null) {
				return;
			}
			var content = [];
			var plant = this.cursorStayLand.getPlant();
			var needKettle = this.cursorStayLand.getKettleInfo();
			content.push(
				'<div class="land-tip-item">', plant.name, '</div>',
				'<div class="land-tip-item">距离成熟还剩</div>',
				'<div class="land-tip-item">', plant.expire, '</div>',
				'<div class="land-tip-item">第', (plant.stage + 1), '阶段</div>',
				'<div class="land-tip-item">', (plant.isRipe ? '已成熟' : '未成熟'),
				'&emsp;',
				(plant.isRipe ? '不可施肥' :
					(this.cursorStayLand.fertilizered ? '已施肥' : '可施肥')
				),
				'</div>',
				'<div class="land-tip-item">', (needKettle ? '土壤干旱' : '土壤湿润'), '</div>'
			);
			$('#land-tip').innerHTML = content.join('');
		}
	}
})(window, document);


window.onload = function () {
	var game = new Game('#canvas');
	game.start();

	var toolItem = $('.tool-item');
	for (var i = 0; i < toolItem.length; i++) {
		var item = toolItem[i];
		item.onclick = function () {
			showToolbox(this.getAttribute('title'));
			game.draw();
		}
	}

	$('#close-toolbox').onclick = function () {
		hideToolbox();
	}

	$('#canvas').addEventListener('mousemove', function (e) {
		landEventManager('mousemove', e);
	});

	$('#canvas').addEventListener('click', function (e) {
		landEventManager('click', e);
	});

	function landEventManager(event, e) {
		e = e || window.event;
		var x = e.clientX;
		var y = e.clientY;
		var offsetTop = $('#canvas').offsetTop;
		var offsetLeft = $('#main').offsetLeft;
		x -= offsetLeft;
		y -= offsetTop;
		var lands = game.grids;
		var data = game.data;
		var dataLands = data.lands;

		if (event === 'mousemove') {
			$('#land-tip').style.display = 'none';
			game.cursorStayLand = null;
		}

		for (var row = 0; row < game.rows; row++) {
			for (var col = 0; col < game.cols; col++) {
				item = lands[row][col];
				if (x >= item.x && x <= game.width + item.x && y >= item.y && y < game.height + item.y) {
					if (event === 'mousemove') {
						if (item.level === 0 || item.plant === null || game.cursor.icon !== 'null') {
							continue;
						}
						game.cursorStayLand = item;
						game.updateLandStatus();
						$('#land-tip').style.display = 'block';
						$('#land-tip').style.top = (item.y + offsetTop) + 'px';
						$('#land-tip').style.left = (item.x) + 'px';
					}
					if (event === 'click') {
						// 过滤操作
						if (['null', 'seed', 'fertilizer', 'kettle', 'hand', 'handAll', 'shovel', 'levelUp'].indexOf(game.cursor.icon) === -1) {
							return;
						}
						// 开垦土地
						if (game.cursor.icon === 'null' && item.level === 0) {
							var landNextLevelInfo = item.getNextLevelInfo();
							var cost = landNextLevelInfo.cost;
							var needLevel = row * game.cols + col + 1;
							if (!item.isFirstLv0Land) {
								return;
							}
							if (!confirm('开垦新地块需要' + cost + '金币，需要LV.' + needLevel + '等级，确定开垦吗？')) {
								return;
							}
							if (cost > game.money) {
								alert('金币不足，无法开垦新地块');
								return;
							}
							if (game.level < needLevel) {
								alert('等级不足，无法开垦新地块');
								return;
							}
							item.create_at = new Date;
							item.kettle_at = new Date;
							item.levelUp();
							game.money -= cost;
							game.updateMoney();
							dataLands[row][col].create_at = item.create_at;
							dataLands[row][col].kettle_at = item.kettle_at;
							dataLands[row][col].level = item.level;
						}
						// 种植
						if (game.cursor.icon === 'seed' && item.level > 0) {
							if (item.plant !== null) {
								alert('此块地已经种植作物，不要重复种植');
								return;
							}
							var seed = PLANTS[game.cursor.seed];
							if (game.money < seed.cost) {
								alert('种植' + seed.name + '需要' + seed.cost + '金币，你的金币不足，无法种植');
								return;
							}
							item.plant = new Plant(game.cursor.seed, new Date);
							game.money -= seed.cost;
							game.updateMoney();
							dataLands[row][col].plant = {
								level: item.plant.level,
								plant_at: item.plant.plant_at
							};
						}
						// 施肥
						if (game.cursor.icon === 'fertilizer' && item.level > 0) {
							if (item.plant === null) {
								alert('未种植作物，不能施肥');
								return;
							}
							if (item.fertilizered) {
								alert('已施肥，不能重复施肥');
								return;
							}
							if (item.plant.isRipe) {
								alert('作物已成熟，不能施肥');
								return;
							}
							if (game.money < 1000) {
								alert('施肥需要花费1000金币，金币不足');
								return;
							}
							game.money -= 1000;
							game.updateMoney();
							item.fertilizered = true;
							dataLands[row][col].fertilizered = true;
							alert('施肥成功');
						}
						// 洒水
						if (game.cursor.icon === 'kettle' && item.level > 0) {
							if (item.getKettleInfo()) {
								item.kettle();
								dataLands[row][col].kettle_at = item.kettle_at;
								alert('洒水成功');
							} else {
								alert('土壤湿润，不需要洒水');
								return;
							}
						}
						// 收取
						if (game.cursor.icon === 'hand' && item.level > 0) {
							if (item.plant === null) {
								alert('未种植作物，不能收取');
								return;
							}
							if (!item.plant.isRipe) {
								alert('作物未成熟，不能收取');
								return;
							}
							var increase = item.increase;
							// 施肥，增产
							if (item.fertilizered) {
								increase += 15;
							}
							// 干旱，减产
							if (item.getKettleInfo()) {
								increase -= 15;
							}
							game.money += ~~(item.plant.harvest * (1 + increase / 100));
							game.exp += item.plant.exp;
							game.updateExp();
							game.updateMoney();
							item.plant = null;
							item.fertilizered = false;
							dataLands[row][col].plant = null;
							dataLands[row][col].fertilizered = false;
						}
						// 收取全部
						if (game.cursor.icon === 'handAll' && item.plant !== null) {
							handAll();
						}
						// 铲除
						if (game.cursor.icon === 'shovel' && item.plant !== null) {
							if (confirm('铲除后无法恢复，确定要铲除吗？')) {
								item.plant = null;
								dataLands[row][col].plant = null;
							}
						}
						// 升级土地
						if (game.cursor.icon === 'levelUp' && item.level > 0) {
							levelUp(row, col);
						}
						// 更新数据
						localStorage.setItem(game.nickname, JSON.stringify(data));
						return;
					}
				}
			}
		}
		game.cursor.x = x - 25;
		game.cursor.y = y - 35;
		game.draw();
	}

	function showToolbox(action) {
		switch (action) {
			case '种子':
				game.cursor.icon = 'null';
				showSeed();
				break;
			case '施肥':
				game.cursor.icon = 'fertilizer';
				break;
			case '洒水':
				game.cursor.icon = 'kettle';
				break;
			case '单个收取':
				game.cursor.icon = 'hand';
				break;
			case '收取全部':
				game.cursor.icon = 'handAll';
				break;
			case '铲除':
				game.cursor.icon = 'shovel';
				break;
			case '升级土地':
				game.cursor.icon = 'levelUp';
				break;
			default:
				game.cursor.icon = 'null';
				break;
		}
		if (action !== '种子') {
			game.cursor.seed = -1;
		}
	}

	function hideToolbox() {
		$('#toolbox').style.display = 'none';
		$('#close-toolbox').style.display = 'none';
	}

	// 展示种子
	function showSeed() {
		var plants = PLANTS;
		var toolbox = $('#toolbox-content');
		var toolboxContent = [];
		plants.map(function (item, index) {
			toolboxContent.push(
				'<div class="toolbox-item">',
				'    <img src="images/', index, '.gif" class="icon left">',
				'    <div class="desc left">',
				'        <div class="desc-item">名称：', item.name, '</div>',
				'        <div class="desc-item">成本：', item.cost, '</div>',
				'        <div class="desc-item">收获：', item.harvest, '</div>',
				'        <div class="desc-item">经验：', item.exp, '</div>',
				'    </div>',
				'</div>'
			);
		});
		toolbox.innerHTML = toolboxContent.join('');
		var toolboxItem = $('.toolbox-item');
		for (var i = 0; i < toolboxItem.length; i++) {
			var item = toolboxItem[i];
			item.i = i;
			item.onclick = function () {
				for (var j = 0; j < toolboxItem.length; j++) {
					toolboxItem[j].classList.remove('active');
				}
				if (game.level - 1 < this.i) {
					game.cursor.icon = 'null';
					game.cursor.seed = -1;
					alert('当前等级不足，无法查看');
					return;
				}
				this.classList.add('active');
				game.cursor.icon = 'seed';
				game.cursor.seed = this.i;
			}
		}
		$('#toolbox').style.display = 'block';
		$('#close-toolbox').style.display = 'block';
	}

	// 收取全部
	function handAll() {
		var lands = game.grids;
		var data = game.data;
		var dataLands = data.lands;
		for (var row = 0; row < game.rows; row++) {
			for (var col = 0; col < game.cols; col++) {
				item = lands[row][col];
				if (item.plant !== null) {
					if (item.plant.isRipe) {
						var increase = item.increase;
						if (item.fertilizered) {
							increase += 15;
						}
						if (item.getKettleInfo()) {
							increase -= 15;
						}
						game.money += ~~(item.plant.harvest * (1 + increase / 100));
						game.exp += item.plant.exp;
						game.updateExp();
						game.updateMoney();
						item.plant = null;
						item.fertilizered = false;
						dataLands[row][col].plant = null;
						dataLands[row][col].fertilizered = false;
					}
				}
			}
		}
	}

	// 升级土地
	function levelUp(r, c) {
		var lands = game.grids;
		var data = game.data;
		var dataLands = data.lands;
		var land = lands[r][c];
		var info = land.getNextLevelInfo();
		if (info == undefined || item.level >= 5) {
			alert('等级已达上限');
			return;
		}
		if (!confirm(['升级需要', info.cost, '金币，确定升级吗？'].join(''))) {
			return;
		}
		if (info.cost > game.money) {
			alert('金币不足，升级失败');
			return;
		}
		for (var row = 0; row < game.rows; row++) {
			for (var col = 0; col < game.cols; col++) {
				item = lands[row][col];
				if (item.level === 0) {
					alert('需要先开垦完全部土地');
					return;
				}
			}
		}
		land.levelUp();
		game.money -= info.cost;
		game.updateMoney();
		dataLands[r][c].level = land.level;
		alert('土地升级成功，当前等级LV' + land.level);
	}
}

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
