window.onload = function() {
	// 获取容器对象
	var oDiv = document.getElementById('div1');
	// 获取所有的标签
	var aA = document.getElementsByTagName('a');
	var i  = 0;
	for (i = 0; i < aA.length; i++) {
		aA[i].pause = 1;
		aA[i].time  = null;
		// 对每个标签初始化
		initialize(aA[i]);
		aA[i].onmouseover = function() {
			this.pause = 0;
		};
		aA[i].onmouseout = function() {
			this.pause = 1;
		};
	}
	setInterval(starmove, 80);

	function starmove() {
		for (i = 0; i < aA.length; i++) {
			if (aA[i].pause) {
				domove(aA[i]);
			}
		}
	}

	function domove(obj) {
		if (obj.offsetTop <= -obj.offsetHeight) {
			obj.style.top = oDiv.offsetHeight + "px";
			initialize(obj);
		} else {
			obj.style.top = obj.offsetTop - obj.ispeed + "px";
		}
	}

	function initialize(obj) {
		// 确定左边距和尺寸以及定时器
		var iLeft     = parseInt(Math.random() * oDiv.offsetWidth);
		var itop      = parseInt(Math.random() * oDiv.offsetHeight);
		var scale     = Math.random() * 1 + 1;
		var iTimer    = parseInt(Math.random() * 1500);
		    obj.pause = 0;
		// 根据随机尺寸确定字体大小
		obj.style.fontSize = 8 * scale + 'px';
		// 超过边界的初始左边位置设定
		if ((iLeft - obj.offsetWidth) > 0) {
			obj.style.left = iLeft - obj.offsetWidth + "px";
		} else {
			obj.style.left = iLeft + "px";
		}
		if ((itop - obj.offsetHeight) > 0) {
			obj.style.top = itop - obj.offsetHeight + "px";
		} else {
			obj.style.top = itop + "px";
		}
		clearTimeout(obj.time);
		obj.time = setTimeout(function() {
			obj.pause = 1;
		}, iTimer);
		// 随机确定移动速度
		obj.ispeed = Math.ceil(Math.random() * 4) + 1;
	}
};