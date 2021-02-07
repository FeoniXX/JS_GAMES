;
(function (win) {
    function Food(x, y, width, height, color) {
        // 食物坐标
        this.x = x || 0;
        this.y = y || 0;
        // 食物属性
        this.width = width || 20;
        this.height = height || 20;
        this.color = color || 'green';
    }

    Food.prototype = {
        // 生成食物随机坐标
        randomXY: function (map, body) {
            // 随机生成坐标x,y的值
            var x = getRandom(0, map.width / this.width);
            var y = getRandom(0, map.height / this.height);
            // 防止食物随机直接出现在蛇身体上
            for (var i = 0; i < body.length; i++) {
                var bodyX = body[i].x;
                var bodyY = body[i].y;
                if (x === bodyX && y === bodyY) {
                    return this.randomXY(map, body);
                }
            }
            return { x, y };
        },
        // 生成新的食物
        generFood(map, body) {
            // 设置坐标x,y的值
            var { x, y } = this.randomXY(map, body);
            this.x = x * this.width;
            this.y = y * this.height;
        },
        // 绘制食物
        draw: function (ctx) {
            fillRoundRect(ctx, this.x, this.y, this.width, this.height, 10, this.color);
        }
    }

    win.Food = Food;
})(window);
