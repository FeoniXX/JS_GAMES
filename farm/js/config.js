const PLANTS_MAP = [
	[
		{ "x": 0, "y": 0, "width": 96, "height": 99 },
		{ "x": 96, "y": 0, "width": 103, "height": 99 },
		{ "x": 199, "y": 0, "width": 96, "height": 99 },
		{ "x": 295, "y": 0, "width": 95, "height": 99 },
		{ "x": 390, "y": 0, "width": 97, "height": 99 },
		{ "x": 487, "y": 0, "width": 100, "height": 99 }
	],
	[
		{ "x": 587, "y": 0, "width": 96, "height": 99 },
		{ "x": 683, "y": 0, "width": 100, "height": 99 },
		{ "x": 783, "y": 0, "width": 96, "height": 99 },
		{ "x": 879, "y": 0, "width": 98, "height": 99 },
		{ "x": 977, "y": 0, "width": 98, "height": 99 },
		{ "x": 1075, "y": 0, "width": 98, "height": 99 }
	],
	[
		{ "x": 0, "y": 99, "width": 96, "height": 98 },
		{ "x": 96, "y": 99, "width": 103, "height": 98 },
		{ "x": 199, "y": 99, "width": 96, "height": 98 },
		{ "x": 295, "y": 99, "width": 95, "height": 98 },
		{ "x": 390, "y": 99, "width": 97, "height": 98 },
		{ "x": 487, "y": 99, "width": 100, "height": 98 }
	],
	[
		{ "x": 587, "y": 99, "width": 96, "height": 98 },
		{ "x": 683, "y": 99, "width": 100, "height": 98 },
		{ "x": 783, "y": 99, "width": 96, "height": 98 },
		{ "x": 879, "y": 99, "width": 98, "height": 98 },
		{ "x": 977, "y": 99, "width": 98, "height": 98 },
		{ "x": 1075, "y": 99, "width": 98, "height": 98 }
	],
	[
		{ "x": 0, "y": 197, "width": 96, "height": 96 },
		{ "x": 96, "y": 197, "width": 103, "height": 96 },
		{ "x": 199, "y": 197, "width": 96, "height": 96 },
		{ "x": 295, "y": 197, "width": 95, "height": 96 },
		{ "x": 390, "y": 197, "width": 97, "height": 96 },
		{ "x": 487, "y": 197, "width": 100, "height": 96 }
	],
	[
		{ "x": 587, "y": 197, "width": 96, "height": 96 },
		{ "x": 683, "y": 197, "width": 100, "height": 96 },
		{ "x": 783, "y": 197, "width": 96, "height": 96 },
		{ "x": 879, "y": 197, "width": 98, "height": 96 },
		{ "x": 977, "y": 197, "width": 98, "height": 96 },
		{ "x": 1075, "y": 197, "width": 98, "height": 96 }
	],
	[
		{ "x": 0, "y": 293, "width": 96, "height": 95 },
		{ "x": 96, "y": 293, "width": 103, "height": 95 },
		{ "x": 199, "y": 293, "width": 96, "height": 95 },
		{ "x": 295, "y": 293, "width": 95, "height": 95 },
		{ "x": 390, "y": 293, "width": 97, "height": 95 },
		{ "x": 487, "y": 293, "width": 100, "height": 95 }
	],
	[
		{ "x": 587, "y": 293, "width": 96, "height": 95 },
		{ "x": 683, "y": 293, "width": 100, "height": 95 },
		{ "x": 783, "y": 293, "width": 96, "height": 95 },
		{ "x": 879, "y": 293, "width": 98, "height": 95 },
		{ "x": 977, "y": 293, "width": 98, "height": 95 },
		{ "x": 1075, "y": 293, "width": 98, "height": 95 }
	],
	[
		{ "x": 0, "y": 388, "width": 96, "height": 101 },
		{ "x": 96, "y": 388, "width": 103, "height": 101 },
		{ "x": 199, "y": 388, "width": 96, "height": 101 },
		{ "x": 295, "y": 388, "width": 95, "height": 101 },
		{ "x": 390, "y": 388, "width": 97, "height": 101 },
		{ "x": 487, "y": 388, "width": 100, "height": 101 }
	],
	[
		{ "x": 587, "y": 388, "width": 96, "height": 101 },
		{ "x": 683, "y": 388, "width": 100, "height": 101 },
		{ "x": 783, "y": 388, "width": 96, "height": 101 },
		{ "x": 879, "y": 388, "width": 98, "height": 101 },
		{ "x": 977, "y": 388, "width": 98, "height": 101 },
		{ "x": 1075, "y": 388, "width": 98, "height": 101 }
	],
	[
		{ "x": 0, "y": 489, "width": 96, "height": 100 },
		{ "x": 96, "y": 489, "width": 103, "height": 100 },
		{ "x": 199, "y": 489, "width": 96, "height": 100 },
		{ "x": 295, "y": 489, "width": 95, "height": 100 },
		{ "x": 390, "y": 489, "width": 97, "height": 100 },
		{ "x": 487, "y": 489, "width": 100, "height": 100 }
	],
	[
		{ "x": 587, "y": 489, "width": 96, "height": 100 },
		{ "x": 683, "y": 489, "width": 100, "height": 100 },
		{ "x": 783, "y": 489, "width": 96, "height": 100 },
		{ "x": 879, "y": 489, "width": 98, "height": 100 },
		{ "x": 977, "y": 489, "width": 98, "height": 100 },
		{ "x": 1075, "y": 489, "width": 98, "height": 100 }
	],
	[
		{ "x": 0, "y": 589, "width": 96, "height": 94 },
		{ "x": 96, "y": 589, "width": 103, "height": 94 },
		{ "x": 199, "y": 589, "width": 96, "height": 94 },
		{ "x": 295, "y": 589, "width": 95, "height": 94 },
		{ "x": 390, "y": 589, "width": 97, "height": 94 },
		{ "x": 487, "y": 589, "width": 100, "height": 94 }
	],
	[
		{ "x": 587, "y": 589, "width": 96, "height": 94 },
		{ "x": 683, "y": 589, "width": 100, "height": 94 },
		{ "x": 783, "y": 589, "width": 96, "height": 94 },
		{ "x": 879, "y": 589, "width": 98, "height": 94 },
		{ "x": 977, "y": 589, "width": 98, "height": 94 },
		{ "x": 1075, "y": 589, "width": 98, "height": 94 }
	],
	[
		{ "x": 0, "y": 683, "width": 96, "height": 98 },
		{ "x": 96, "y": 683, "width": 103, "height": 98 },
		{ "x": 199, "y": 683, "width": 96, "height": 98 },
		{ "x": 295, "y": 683, "width": 95, "height": 98 },
		{ "x": 390, "y": 683, "width": 97, "height": 98 },
		{ "x": 487, "y": 683, "width": 100, "height": 98 }
	],
	[
		{ "x": 587, "y": 683, "width": 96, "height": 98 },
		{ "x": 683, "y": 683, "width": 100, "height": 98 },
		{ "x": 783, "y": 683, "width": 96, "height": 98 },
		{ "x": 879, "y": 683, "width": 98, "height": 98 },
		{ "x": 977, "y": 683, "width": 98, "height": 98 },
		{ "x": 1075, "y": 683, "width": 98, "height": 98 }
	],
	[
		{ "x": 0, "y": 781, "width": 96, "height": 97 },
		{ "x": 96, "y": 781, "width": 103, "height": 97 },
		{ "x": 199, "y": 781, "width": 96, "height": 97 },
		{ "x": 295, "y": 781, "width": 95, "height": 97 },
		{ "x": 390, "y": 781, "width": 97, "height": 97 },
		{ "x": 487, "y": 781, "width": 100, "height": 97 }
	],
	[
		{ "x": 587, "y": 781, "width": 96, "height": 97 },
		{ "x": 683, "y": 781, "width": 100, "height": 97 },
		{ "x": 783, "y": 781, "width": 96, "height": 97 },
		{ "x": 879, "y": 781, "width": 98, "height": 97 },
		{ "x": 977, "y": 781, "width": 98, "height": 97 },
		{ "x": 1075, "y": 781, "width": 98, "height": 97 }
	],
	[
		{ "x": 0, "y": 878, "width": 96, "height": 99 },
		{ "x": 96, "y": 878, "width": 103, "height": 99 },
		{ "x": 199, "y": 878, "width": 96, "height": 99 },
		{ "x": 295, "y": 878, "width": 95, "height": 99 },
		{ "x": 390, "y": 878, "width": 97, "height": 99 },
		{ "x": 487, "y": 878, "width": 100, "height": 99 }
	],
	[
		{ "x": 587, "y": 878, "width": 96, "height": 99 },
		{ "x": 683, "y": 878, "width": 100, "height": 99 },
		{ "x": 783, "y": 878, "width": 96, "height": 99 },
		{ "x": 879, "y": 878, "width": 98, "height": 99 },
		{ "x": 977, "y": 878, "width": 98, "height": 99 },
		{ "x": 1075, "y": 878, "width": 98, "height": 99 }
	]
];

const PLANTS = [
	{
		name: '萝卜',
		cost: 1,
		harvest: 5,
		exp: 10,
		growth: 5 * 60 * 1000,
		icon: PLANTS_MAP[0]
	},
	{
		name: '玫瑰',
		cost: 10,
		harvest: 100,
		exp: 20,
		growth: 10 * 60 * 1000,
		icon: PLANTS_MAP[1]
	},
	{
		name: '丝瓜',
		cost: 100,
		harvest: 500,
		exp: 30,
		growth: 15 * 60 * 1000,
		icon: PLANTS_MAP[2]
	},
	{
		name: '康乃馨',
		cost: 500,
		harvest: 1200,
		exp: 40,
		growth: 20 * 60 * 1000,
		icon: PLANTS_MAP[3]
	},
	{
		name: '苹果',
		cost: 1100,
		harvest: 2000,
		exp: 50,
		growth: 25 * 60 * 1000,
		icon: PLANTS_MAP[4]
	},
	{
		name: '西瓜',
		cost: 2000,
		harvest: 5000,
		exp: 60,
		growth: 30 * 60 * 1000,
		icon: PLANTS_MAP[5]
	},
	{
		name: '茄子',
		cost: 3000,
		harvest: 8000,
		exp: 70,
		growth: 35 * 60 * 1000,
		icon: PLANTS_MAP[6]
	},
	{
		name: '榴莲',
		cost: 5000,
		harvest: 12000,
		exp: 80,
		growth: 40 * 60 * 1000,
		icon: PLANTS_MAP[7]
	},
	{
		name: '凤梨',
		cost: 8000,
		harvest: 24000,
		exp: 90,
		growth: 45 * 60 * 1000,
		icon: PLANTS_MAP[8]
	},
	{
		name: '芒果',
		cost: 10000,
		harvest: 45000,
		exp: 100,
		growth: 50 * 60 * 1000,
		icon: PLANTS_MAP[9]
	},
	{
		name: '木瓜',
		cost: 15000,
		harvest: 55000,
		exp: 110,
		growth: 55 * 60 * 1000,
		icon: PLANTS_MAP[10]
	},
	{
		name: '葡萄',
		cost: 20000,
		harvest: 65000,
		exp: 120,
		growth: 60 * 60 * 1000,
		icon: PLANTS_MAP[11]
	},
	{
		name: '草莓',
		cost: 30000,
		harvest: 65000,
		exp: 130,
		growth: 65 * 60 * 1000,
		icon: PLANTS_MAP[12]
	},
	{
		name: '拐枣',
		cost: 40000,
		harvest: 80000,
		exp: 140,
		growth: 70 * 60 * 1000,
		icon: PLANTS_MAP[13]
	},
	{
		name: '土豆',
		cost: 50000,
		harvest: 100000,
		exp: 150,
		growth: 75 * 60 * 1000,
		icon: PLANTS_MAP[14]
	},
	{
		name: '枸杞',
		cost: 60000,
		harvest: 120000,
		exp: 160,
		growth: 80 * 60 * 1000,
		icon: PLANTS_MAP[15]
	},
	{
		name: '西红柿',
		cost: 70000,
		harvest: 140000,
		exp: 170,
		growth: 85 * 60 * 1000,
		icon: PLANTS_MAP[16]
	},
	{
		name: '牛油果',
		cost: 80000,
		harvest: 160000,
		exp: 180,
		growth: 90 * 60 * 1000,
		icon: PLANTS_MAP[17]
	},
	{
		name: '玉米',
		cost: 90000,
		harvest: 180000,
		exp: 190,
		growth: 95 * 60 * 1000,
		icon: PLANTS_MAP[18]
	},
	{
		name: '向日葵',
		cost: 100000,
		harvest: 200000,
		exp: 200,
		growth: 100 * 60 * 1000,
		icon: PLANTS_MAP[19]
	},
];

const LANDS = [
	{
		name: '未开垦土地',
		cost: 0,
		increase: 0,
		color: '#296342'
	},
	{
		name: '普通土地',
		cost: 100,
		increase: 0,
		color: '#ccc0b3'
	},
	{
		name: '红土地',
		cost: 10000,
		increase: 20,
		color: '#e24b0b'
	},
	{
		name: '黑土地',
		cost: 100000,
		increase: 40,
		color: '#666465'
	},
	{
		name: '金土地',
		cost: 1000000,
		increase: 60,
		color: '#efae23'
	},
	{
		name: '紫晶土地',
		cost: 10000000,
		increase: 80,
		color: '#a6c'
	}
];