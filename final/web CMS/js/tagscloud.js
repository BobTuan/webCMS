// JavaScript Document

var radius = 90;
var d      = 200;
//将pi按照180度等分，利用dtr可以将任意角度转化为0-2pi之间
var dtr    = Math.PI / 180;
var mcList = [];
//上一个标签的位置
var lasta = 1;
var lastb = 1;
var distr = true;
// 标签移动的速度
var tspeed        = 11;
var size          = 200;
var mouseX        = 0;
var mouseY        = 10;
var howElliptical = 1;
// 所有的标签
var aA = null;
// 标签的容器
var oDiv = null;
//初始化，向所有的标签添加鼠标事件，并且将每个标签添加到列表中
    window.onload = function ()
{
	var i    = 0;
	var oTag = null;
    //找到标签容器div
        oDiv = document.getElementById('tagscloud');
    //找到所有的标签列表
	    aA = oDiv.getElementsByTagName('a');
	for(i=0;i<aA.length;i++)
	{
        oTag = {};
        //设置当鼠标移入和移出某个标签上时的颜色改变事件	
		aA[i].onmouseover = (function (obj) {
			return function () {
				obj.on             = true;
				this.style.zIndex  = 9999;
				this.style.color   = '#fff';
				this.style.padding = '5px 5px';
				this.style.filter  = "alpha(opacity=100)";
				this.style.opacity = 1;
			}
		})(oTag)
		aA[i].onmouseout = (function (obj) {
			return function () {
				obj.on             = false;
				this.style.zIndex  = obj.zIndex;
				this.style.color   = '#fff';
				this.style.padding = '5px';
				this.style.filter  = "alpha(opacity=" + 100 * obj.alpha + ")";
				this.style.opacity = obj.alpha;
				this.style.zIndex  = obj.zIndex;
			}
		})(oTag)
		oTag.offsetWidth  = aA[i].offsetWidth;
		oTag.offsetHeight = aA[i].offsetHeight;
		mcList.push(oTag);
	}
    sineCosine( 0,0,0 );
    //设定每个标签的初始位置,使其呈现均匀分布
    positionAll();
    //递归调用更新函数，延迟的时间控制更新的快慢
	(function () {
            update();
            setTimeout(arguments.callee, 40);
        })();
};
//更新每个标签的位置
function update()
{
    // 这里的a，b，c都是0-360度的一个角度
	var a,     b, c = 0;
	    a     = (Math.min(Math.max(-mouseY, -size), size) / radius) * tspeed;
	    b     = (-Math.min(Math.max(-mouseX, -size), size) / radius) * tspeed;
	    lasta = a;
	    lastb = b;
        if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) {
            return;
        }
        sineCosine(a, b, c);
        for (var i = 0; i < mcList.length; i++) {
            if (mcList[i].on) {
                continue;
            }
            //绕x轴旋转
            var rx1 = mcList[i].cx;
            var ry1 = mcList[i].cy * ca + mcList[i].cz * (-sa);
            var rz1 = mcList[i].cy * sa + mcList[i].cz * ca;
            //绕y轴旋转
            var rx2 = rx1 * cb + rz1 * sb;
            var ry2 = ry1;
            var rz2 = rx1 * (-sb) + rz1 * cb;
            //绕z轴旋转
            var rx3 = rx2 * cc + ry2 * (-sc);
            var ry3 = rx2 * sc + ry2 * cc;
            var rz3 = rz2;

            // mcList[i].cx = rx3;
            // mcList[i].cy = ry3;
            // mcList[i].cz = rz3;
            mcList[i].cx = rx2;
            mcList[i].cy = ry2;
            mcList[i].cz = rz2;

            per = d / (d + rz3);
            //这里的x和y才控制标签的移动
            //x基本上不变化
            mcList[i].x      = (howElliptical * rx3 * per) - (howElliptical * 2);
            mcList[i].y      = ry3 * per;
            mcList[i].scale  = per;
            var    alpha     = per;
                   alpha     = (alpha - 0.6) * (10 / 6);
            mcList[i].alpha  = alpha * alpha * alpha - 0.2;
            mcList[i].zIndex = Math.ceil(100 - Math.floor(mcList[i].cz));
        }
        doPosition();
}
//计算每个标签的在原型区域的起始位置，利用均匀分布的思想
function positionAll()
{
	var phi   = 0;
	var theta = 0;
	var max   = mcList.length;
    for (var i = 0; i < max; i++) {
        // 找到每个标签的两个角度
        if (distr) {
            phi   = Math.acos(-1 + (2 * (i + 1) - 1) / max);
            theta = Math.sqrt(max * Math.PI) * phi;
        } else {
            phi   = Math.random() * (Math.PI);
            theta = Math.random() * (2 * Math.PI);
        }
        //r，rou，theta球坐标和直角坐标x、y、z的相互转换
        mcList[i].cx = radius * Math.cos(theta) * Math.sin(phi);
        mcList[i].cy = radius * Math.sin(theta) * Math.sin(phi);
        mcList[i].cz = radius * Math.cos(phi);
        // 只取x、y两个坐标对标签的位置进行设定
        aA[i].style.left = mcList[i].cx + oDiv.offsetWidth / 2 - mcList[i].offsetWidth / 2 + 'px';
        aA[i].style.top  = mcList[i].cy + oDiv.offsetHeight / 2 - mcList[i].offsetHeight / 2 + 'px';
    }
}
function doPosition()
{
    // 标签云的div的宽和高的一半
	var l = oDiv.offsetWidth / 2;
	var t = oDiv.offsetHeight / 2;
        for (var i = 0; i < mcList.length; i++) {
            // 找到没有被悬浮的标签
            if (mcList[i].on) {
                continue;
            }
            var aAs = aA[i].style;
            // 透明度大于0.1说明还在显示，反之就是超出了我们的区域设置隐藏
            if (mcList[i].alpha > 0.1) {
                if (aAs.display != '')
                    aAs.display = '';
            } else {
                if (aAs.display != 'none')
                    aAs.display = 'none';
                continue;
            }
            //更新移动后的位置
            aAs.left    = mcList[i].cx + l - mcList[i].offsetWidth / 2 + 'px';
            aAs.top     = mcList[i].cy + t - mcList[i].offsetHeight / 2 + 'px';
            aAs.filter  = "alpha(opacity=" + 100 * mcList[i].alpha + ")";
            aAs.zIndex  = mcList[i].zIndex;
            aAs.opacity = mcList[i].alpha;
        }
}
// 计算sin和cos的函数，sa表示sin a ca表示cos a
function sineCosine( a, b, c)
{
    // 这里的a*dtr只是将角度制转化为弧度制
	sa = Math.sin(a * dtr);
	ca = Math.cos(a * dtr);
	sb = Math.sin(b * dtr);
	cb = Math.cos(b * dtr);
	sc = Math.sin(c * dtr);
	cc = Math.cos(c * dtr);
}