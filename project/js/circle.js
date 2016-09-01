//获取屏幕宽高
function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}
//事件绑定
function bind(obj, ev, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(ev, fn, false);
	} else {
		obj.attachEvent('on' + ev, function() {
			fn.call(obj);
		});
	}
}
//滑屏事件
$.fn.Swipe=function(option){
	return this.each(function(){
		var _originX = 0;
		var _originY = 0;
		$(this).on('touchstart', function (e) {
			_originX = e.clientX || e.changedTouches[0].clientX;
			_originY = e.clientY || e.changedTouches[0].clientY;
		})
		$(this).on('touchmove',function(e){
			var moveX = (e.clientX || e.changedTouches[0].clientX) - _originX;
			var moveY = (e.clientY || e.changedTouches[0].clientY) - _originY;
			if(Math.abs(moveX) > Math.abs(moveY)){
				//e.preventDefault();
			}
		})

		$(this).on('touchend',function(e){
			var moveX = (e.clientX || e.changedTouches[0].clientX) - _originX;
			var moveY = (e.clientY || e.changedTouches[0].clientY) - _originY;
			if(Math.abs(moveX) > Math.abs(moveY)){
				if(moveX<-10){
					option.left && option.left();
				}else if(moveX>10){
					option.right && option.right();
				}
			}else{
				if(moveY<-10){
					option.up && option.up();
				}else if(moveY>10){
					option.down && option.down();
				}
			}

		})
	})
};
//图片宽高自适应
$.fn.Resize=function(scale){
	this.each(function(){
		$(this).css('height',$(this).width()*scale);
	});
};
//click事件消除延迟
$(function(){
	FastClick.attach(document.body);
});
//创建背景
function createBg(){
	var h =document.body.offsetHeight+'px',w=document.documentElement.clientWidth+'px';
	$oBg=$('<div class="oBg" style=" left:0; top:0; z-index:990; position:absolute; width:'+w+'; height:'+h+'"></div>');
	$("body").append($oBg);
	$('.oBg').on('touchstart touchmove touchend tap click', function(){
		$(this).css('opacity','0');
		$('.comment-box').hide();
		$('.comment-box').find('textarea').trigger('blur');
		$('.comment-box').find('textarea').blur();
		$(this).remove();	
	});
}
//吸顶条事件
function fixHeader(){
	var headerClone=$('#header').clone(true);
	headerClone.removeAttr('id').attr('id','headerClone');
	headerClone.css({
		opacity:1,
		position:'fixed',
		top:'0%',
		zIndex:980
	});
	$(('#header')).after(headerClone);
}

//底部条固定事件
function fixFooter(){
	$('.footer-disc').css({bottom:0});
	var scrollOld=document.documentElement.scrollTop||document.body.scrollTop;
	$(window).scroll(function(){
		var scrollNew=document.documentElement.scrollTop||document.body.scrollTop;
		var res=scrollNew-scrollOld;
		if(res>0){
			scrollOld=scrollNew;
			//console.log('向下',res);
			$('.footer-disc').css({bottom:'-25%'});
			$('.header-fix').css({bottom:'-25%'});
			/*$('.footer-disc').css({
				bottom:'0px',
				position:'absolute'
			});*/
		}else{
			scrollOld=scrollNew;
			//console.log('向上',res);
			$('.footer-disc').css({bottom:0});
			$('.header-fix').css({bottom:0});
			/*$('.footer-disc').css({
				bottom:'0',
				position:'fixed'
			});*/
		}
	});
}
//新闻分享页底部条固定事件
function headerFix(){
	$(window).scroll(function(){
		var scrollNew=document.documentElement.scrollTop||document.body.scrollTop;
		if(scrollNew>400){
			$('.header-fix').css({bottom:0});
		}else{
			$('.header-fix').css({bottom:'-25%'});
		}
	});
}
//赞+1
function HotAdd(){
	$('.Hot-acc').each(function(){
		$(this).children('div').bind('click',function(){
			$(this).find('span').html($(this).find('span').html()-0+1);
			$(this).find('img').attr('src','images/Hot-acc-ico02.png');
			var oB='<b class="oB">+1</b>';
			$(this).find('span').after(oB);
			$('.oB').parent().css('position','relative');
			$(this).unbind('click');
		});
	});
}
//cookie操作（localStorage不兼容手机内置浏览器）
function addCookie(name,value,iDay){
	if(iDay){
		var oDate = new Date();
		oDate.setDate(oDate.getDate()+iDay);
		document.cookie=name+'='+value+"; EXPIRES="+oDate.toGMTString();
	}else{
		document.cookie=name+'='+value;
	}
}

function getCookie(name){
	var arr = document.cookie.split('; ');
	for(var i=0;i<arr.length;i++){
		var arr2 = arr[i].split('=');
		if(arr2[0]==name){
			return arr2[1];
		}
	}
}

function removeCookie(name){
	addCookie(name,'1',-10);
}