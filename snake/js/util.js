function $(el) {
	return /^#\S+/.test(el) ? document.querySelector(el) : document.querySelectorAll(el);
}
// 生成随机数
function getRandom(a, b) {
	let max = Math.max(a, b);
	let min = Math.min(a, b);
	return parseInt(Math.random() * (max - min)) + min;
}

// 绘制并填充圆角矩形
function fillRoundRect(ctx, x, y, width, height, radius, fillColor) {
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
}

// 绘制圆角矩形框
function drawRoundRectPath(ctx, width, height, radius) {
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
}