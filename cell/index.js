// 网格尺寸 50 * 50
const SIZE = 50;
var isStart = false;
var cvs = document.querySelector('#canvas');
var ctx = cvs.getContext('2d');
var cell = new Cell(ctx, SIZE);

cvs.width = SIZE * 10;
cvs.height = SIZE * 10;

// 画网格
for (var i = 0; i <= SIZE; i++) {
    ctx.beginPath();
    ctx.moveTo(i * 10, 0);
    ctx.lineTo(i * 10, SIZE * 10);
    ctx.stroke();
    ctx.moveTo(0, i * 10);
    ctx.lineTo(SIZE * 10, i * 10);
    ctx.stroke();
    ctx.closePath();
}

// 点击网格编辑地图
cvs.addEventListener('click', function (e) {
    if (isStart) {
        // 已经开始运行，直接返回，不作响应
        return;
    }
    // 计算点击的是哪一个小方格
    var i = parseInt(e.pageX / 10);
    var j = parseInt(e.pageY / 10);

    // 重复点击同一个小方格可以切换当前小方格对应的细胞生死状态
    cell.alive[j][i] = !cell.alive[j][i] & 1;
    cell.draw();
});

var start = document.querySelector('#btn-start');
var timer = null;
start.addEventListener('click', function () {
    if (isStart) {
        isStart = false;
        start.innerHTML = 'START';
        clearInterval(timer);
        return;
    }
    isStart = true;
    start.innerHTML = 'STOP';
    timer = setInterval(function () {
        cell.transform();
        cell.draw();
    }, 200);
});

var reset = document.querySelector('#btn-reset');
reset.addEventListener('click', function () {
    if (isStart) {
        alert('请先停止运行');
        return;
    }
    cell.init();
    cell.draw();
});

start.parentElement.style.left = SIZE * 10 + 20 + 'px';
