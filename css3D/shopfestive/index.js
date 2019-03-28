var container = document.getElementById('container');
var box = document.getElementById('box');
var arr = box.getElementsByTagName('div');
// 计算半径
var radius = calculateRadius(129, 20);
var audio = document.getElementById('audio');
// 多张图片赋值，散开半径距离，然后在延y轴转动
for (var i = 0; i < arr.length; i++) {
	arr[i].style.background = 'url("./img/p' + (i + 1) + '.png") no-repeat';
	arr[i].style.WebkitTransform = "rotateY(" + 360 / arr.length * i + 'deg) translatez(' + radius + 'px)';
}
function calculateRadius(length, totalNum) {
  return Math.round(length / (2 * Math.tan(Math.PI / totalNum))) - 3;
  /**
   * r = l / 2 / tan(du)
   * tan(du = 180 / totanum) 
   * r = l / (2 * tan(180 / totanum) )
   * 取四舍五入（r）即可
   */
}