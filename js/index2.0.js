var ul = document.querySelector(".carousel_box>ul"),
	carousel_box = document.querySelector(".carousel_box"),
	left_arrow = document.querySelector(".left_arrow"),
	right_arrow = document.querySelector(".right_arrow"),
	point_list = document.querySelectorAll(".point_box li"),
	now_index = last_index = 0,
	timer,
	is_run = false;

//左边箭头点击事件
left_arrow.addEventListener("click", function() {
	if(!is_run) {
		is_run = true;
		if(--now_index==-1){
			left_end_run();
		}else{
			run();
		}
		// (--now_index == -1) && (now_index = point_list.length - 1);
	}
})

//右边箭头点击事件
right_arrow.addEventListener("click", function() {
	if(!is_run) {
		is_run = true;
		if(++now_index == point_list.length){
			right_end_run();
		}else{
			run();
		}
	}
})

//轮播图的运行主函数
function run() {
	ul.style.transform = "translateX(-" + now_index + "00%)";
	point_list[last_index].classList.remove("active");
	point_list[now_index].classList.add("active");

	last_index = now_index;
	ul.addEventListener("transitionend", function() {
		is_run = false;
	})
}
//右边尽头函数
function right_end_run(){
	/**
	 * 1.克隆第一张放到最后
	 * 2.运行动画到克隆那一张
	 * 
	 * --动画执行完后
	 * 1.取消动画
	 * 2.将视口移动到第一张的位置
	 * 3.删除克隆那张
	 * 4.恢复动画
	 * 5.记录当前下标
	 * 6.小圆点的激活修改
	 * 7.修改动画运行判断
	 */
	var clone_li=ul.children[0].cloneNode(true);
	ul.appendChild(clone_li);
	ul.style.transform = "translateX(-" + now_index + "00%)";
	ul.addEventListener("transitionend",function(){
		now_index=0;
		ul.style.transition="none";
		ul.style.transform = "translateX(-" + now_index + "00%)";
		clone_li.remove();
		getComputedStyle(ul).transition;
		//提醒程序transition进行了一个属性的修改，以上代码以none状态运行
		ul.style.transition="";//恢复动画
		point_list[last_index].classList.remove("active");
		point_list[now_index].classList.add("active");
		last_index = now_index;
		is_run=false;
	},{
		once:true
	})
}
// 左边尽头函数
var clone_lastli=ul.children[point_list.length-1].cloneNode(true);
function left_end_run(){
	/**
	 * 1.克隆最后一张放到首位
	 * 2.关闭动画
	 * 3.调整视口位置，保证用户看到的是原来的第一张
	 */
		ul.style.transition="none";
		ul.insertBefore(clone_lastli,ul.firstElementChild);
		ul.style.transform = "translateX(-100%)";
		getComputedStyle(ul).transition;
		ul.style.transition="";
		ul.style.transform = "translateX(0)";
		ul.addEventListener("transitionend",left_end);
}
	function left_end(){
		now_index=point_list.length-1;
		ul.style.transition="none";
		ul.style.transform = "translateX(-"+now_index+"00%)";
		clone_lastli.remove();
		getComputedStyle(ul).transition;
		ul.style.transition="";//恢复动画
		point_list[last_index].classList.remove("active");
		point_list[now_index].classList.add("active");
		last_index = now_index;
		is_run=false;
		ul.removeEventListener("transitionend",left_end);
	}

/**
 * 通过闭包实现小圆点的切换
 */
for(var i = 0; i < point_list.length; i++) {
	(function(j) {
		point_list[j].addEventListener("click", function() {
			if(!is_run) {
				is_run = true;
				if(last_index != j) {
					now_index = j;
					run();
				}
			}
		})
	})(i)
}

/**
 * 自动轮播
 */
function autoplay() {
	timer = setInterval(function() {
		if(!is_run) {
			is_run = true;
			if(++now_index == point_list.length){
				right_end_run();
			}else{
				run();
			}
		}
	}, 1000)
}
autoplay();

/**
 * 鼠标移入,取消自动轮播
 */
carousel_box.addEventListener("mouseenter", function() {
	clearInterval(timer);
})

/**
 * 鼠标移出,开启自动轮播
 */
carousel_box.addEventListener("mouseleave", function() {
	autoplay();
})
