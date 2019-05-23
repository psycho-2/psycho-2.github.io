/**
 * @classDescription 瓒呯骇Marquee锛屽彲鍋氬浘鐗囧鑸紝鍥剧墖杞崲
 * @author Aken Li(www.kxbd.com)
 * @date 2009-07-27
 * @dependence jQuery 1.3.2
 * @DOM
 *  	<div id="marquee">
 *  		<ul>
 *   			<li></li>
 *   			<li></li>
 *  		</ul>
 *  	</div>
 * @CSS
 *  	#marquee {width:200px;height:50px;overflow:hidden;}
 * @Usage
 *  	$('#marquee').kxbdSuperMarquee(options);
 * @options
 *		distance:200,//涓€娆℃粴鍔ㄧ殑璺濈
 *		duration:20,//缂撳姩鏁堟灉锛屽崟娆＄Щ鍔ㄦ椂闂达紝瓒婂皬閫熷害瓒婂揩锛屼负0鏃舵棤缂撳姩鏁堟灉
 *		time:5,//鍋滈】鏃堕棿锛屽崟浣嶄负绉�
 *		direction: 'left',//婊氬姩鏂瑰悜锛�'left','right','up','down'
 *		scrollAmount:1,//姝ラ暱
 *		scrollDelay:20//鏃堕暱锛屽崟浣嶄负姣
 *		isEqual:true,//鎵€鏈夋粴鍔ㄧ殑鍏冪礌闀垮鏄惁鐩哥瓑,true,false
 *		loop: 0,//寰幆婊氬姩娆℃暟锛�0鏃舵棤闄�
 *		btnGo:{left:'#goL',right:'#goR'},//鎺у埗鏂瑰悜鐨勬寜閽甀D锛屾湁鍥涗釜灞炴€eft,right,up,down鍒嗗埆瀵瑰簲鍥涗釜鏂瑰悜
 *		eventGo:'click',//榧犳爣浜嬩欢
 *		controlBtn:{left:'#goL',right:'#goR'},//鎺у埗鍔犻€熸粴鍔ㄧ殑鎸夐挳ID锛屾湁鍥涗釜灞炴€eft,right,up,down鍒嗗埆瀵瑰簲鍥涗釜鏂瑰悜
 *		newAmount:4,//鍔犻€熸粴鍔ㄧ殑姝ラ暱
 *		eventA:'mouseenter',//榧犳爣浜嬩欢锛屽姞閫�
 *		eventB:'mouseleave',//榧犳爣浜嬩欢锛屽師閫�
 *		navId:'#marqueeNav', //瀵艰埅瀹瑰櫒ID锛屽鑸狣OM:<ul><li>1</li><li>2</li><ul>,瀵艰埅CSS:.navOn
 *		eventNav:'click' //瀵艰埅浜嬩欢
 */
(function($){

	$.fn.kxbdSuperMarquee = function(options){
		var opts = $.extend({},$.fn.kxbdSuperMarquee.defaults, options);
		
		return this.each(function(){
			var $marquee = $(this);//婊氬姩鍏冪礌瀹瑰櫒
			var _scrollObj = $marquee.get(0);//婊氬姩鍏冪礌瀹瑰櫒DOM
			var scrollW = $marquee.width();//婊氬姩鍏冪礌瀹瑰櫒鐨勫搴�
			var scrollH = $marquee.height();//婊氬姩鍏冪礌瀹瑰櫒鐨勯珮搴�
			var $element = $marquee.children(); //婊氬姩鍏冪礌
			var $kids = $element.children();//婊氬姩瀛愬厓绱�
			var scrollSize=0;//婊氬姩鍏冪礌灏哄
			var _type = (opts.direction == 'left' || opts.direction == 'right') ? 1:0;//婊氬姩绫诲瀷锛�1宸﹀彸锛�0涓婁笅
			var scrollId, rollId, isMove, marqueeId;
			var t,b,c,d,e; //婊氬姩鍔ㄧ敾鐨勫弬鏁�,t:褰撳墠鏃堕棿锛宐:寮€濮嬬殑浣嶇疆锛宑:鏀瑰彉鐨勪綅缃紝d:鎸佺画鐨勬椂闂达紝e:缁撴潫鐨勪綅缃�
			var _size, _len; //瀛愬厓绱犵殑灏哄涓庝釜鏁�
			var $nav,$navBtns;
			var arrPos = []; 
			var numView = 0; //褰撳墠鎵€鐪嬪瓙鍏冪礌
			var numRoll=0; //杞崲鐨勬鏁�
			var numMoved = 0;//宸茬粡绉诲姩鐨勮窛绂�

			//闃叉婊氬姩瀛愬厓绱犳瘮婊氬姩鍏冪礌瀹借€屽彇涓嶅埌瀹為檯婊氬姩瀛愬厓绱犲搴�
			$element.css(_type?'width':'height',10000);
			//鑾峰彇婊氬姩鍏冪礌鐨勫昂瀵�
			var navHtml = '<ul>';
			if (opts.isEqual) {
				_size = $kids[_type?'outerWidth':'outerHeight']();
				_len = $kids.length;
				scrollSize = _size * _len;
				for(var i=0;i<_len;i++){
					arrPos.push(i*_size);
					navHtml += '<li>'+ (i+1) +'</li>';
				}
			}else{
				$kids.each(function(i){
					arrPos.push(scrollSize);
					scrollSize += $(this)[_type?'outerWidth':'outerHeight']();
					navHtml += '<li>'+ (i+1) +'</li>';
				});
			}
			navHtml += '</ul>';
			
			//婊氬姩鍏冪礌鎬诲昂瀵稿皬浜庡鍣ㄥ昂瀵革紝涓嶆粴鍔�
			if (scrollSize<(_type?scrollW:scrollH)) return; 
			//鍏嬮殕婊氬姩瀛愬厓绱犲皢鍏舵彃鍏ュ埌婊氬姩鍏冪礌鍚庯紝骞惰瀹氭粴鍔ㄥ厓绱犲搴�
			$element.append($kids.clone()).css(_type?'width':'height',scrollSize*2);
			
			//杞崲瀵艰埅
			if (opts.navId) {
				$nav = $(opts.navId).append(navHtml).hover( stop, start );
				$navBtns = $('li', $nav);
				$navBtns.each(function(i){
					$(this).bind(opts.eventNav,function(){
						if(isMove) return;
						if(numView==i) return;
						rollFunc(arrPos[i]);
						$navBtns.eq(numView).removeClass('navOn');
						numView = i;
						$(this).addClass('navOn');
					});
				});
				$navBtns.eq(numView).addClass('navOn');
			}
			
			//璁惧畾鍒濆浣嶇疆
			if (opts.direction == 'right' || opts.direction == 'down') {
				_scrollObj[_type?'scrollLeft':'scrollTop'] = scrollSize;
			}else{
				_scrollObj[_type?'scrollLeft':'scrollTop'] = 0;
			}
			
			if(opts.isMarquee){
				//婊氬姩寮€濮�
				//marqueeId = setInterval(scrollFunc, opts.scrollDelay);
				marqueeId = setTimeout(scrollFunc, opts.scrollDelay);
				//榧犳爣鍒掕繃鍋滄婊氬姩
				$marquee.hover(
					function(){
						clearInterval(marqueeId);
					},
					function(){
						//marqueeId = setInterval(scrollFunc, opts.scrollDelay);
						clearInterval(marqueeId);
						marqueeId = setTimeout(scrollFunc, opts.scrollDelay);
					}
				);
				
				//鎺у埗鍔犻€熻繍鍔�
				if(opts.controlBtn){
					$.each(opts.controlBtn, function(i,val){
						$(val).bind(opts.eventA,function(){
							opts.direction = i;
							opts.oldAmount = opts.scrollAmount;
							opts.scrollAmount = opts.newAmount;
						}).bind(opts.eventB,function(){
							opts.scrollAmount = opts.oldAmount;
						});
					});
				}
			}else{
				if(opts.isAuto){
					//杞崲寮€濮�
					start();
					
					//榧犳爣鍒掕繃鍋滄杞崲
					$marquee.hover( stop, start );
				}
			
				//鎺у埗鍓嶅悗璧�
				if(opts.btnGo){
					$.each(opts.btnGo, function(i,val){
						$(val).bind(opts.eventGo,function(){
							if(isMove == true) return;
							opts.direction = i;
							rollFunc();
							if (opts.isAuto) {
								stop();
								start();
							}
						});
					});
				}
			}
			
			function scrollFunc(){
				var _dir = (opts.direction == 'left' || opts.direction == 'right') ? 'scrollLeft':'scrollTop';
				
				if(opts.isMarquee){
					if (opts.loop > 0) {
						numMoved+=opts.scrollAmount;
						if(numMoved>scrollSize*opts.loop){
							_scrollObj[_dir] = 0;
							return clearInterval(marqueeId);
						} 
					}
					var newPos = _scrollObj[_dir]+(opts.direction == 'left' || opts.direction == 'up'?1:-1)*opts.scrollAmount;
				}else{
					if(opts.duration){
						if(t++<d){
							isMove = true;
							var newPos = Math.ceil(easeOutQuad(t,b,c,d));
							if(t==d){
								newPos = e;
							}
						}else{
							newPos = e;
							clearInterval(scrollId);
							isMove = false;
							return;
						}
					}else{
						var newPos = e;
						clearInterval(scrollId);
					}
				}
				
				if(opts.direction == 'left' || opts.direction == 'up'){
					if(newPos>=scrollSize){
						newPos-=scrollSize;
					}
				}else{
					if(newPos<=0){
						newPos+=scrollSize;
					}
				}
				_scrollObj[_dir] = newPos;
				
				if(opts.isMarquee){
					marqueeId = setTimeout(scrollFunc, opts.scrollDelay);
				}else if(t<d){
					if(scrollId) clearTimeout(scrollId);
					scrollId = setTimeout(scrollFunc, opts.scrollDelay);
				}else{
					isMove = false;
				}
				
			};
			
			function rollFunc(pPos){
				isMove = true;
				var _dir = (opts.direction == 'left' || opts.direction == 'right') ? 'scrollLeft':'scrollTop';
				var _neg = opts.direction == 'left' || opts.direction == 'up'?1:-1;

				numRoll = numRoll +_neg;
				//寰楀埌褰撳墠鎵€鐪嬪厓绱犲簭鍙峰苟鏀瑰彉瀵艰埅CSS
				if(pPos == undefined&&opts.navId){
					$navBtns.eq(numView).removeClass('navOn');
					numView +=_neg;
					if(numView>=_len){
						numView = 0;
					}else if(numView<0){
						numView = _len-1;
					}
					$navBtns.eq(numView).addClass('navOn');
					numRoll = numView;
				}

				var _temp = numRoll<0?scrollSize:0;
				t=0;
				b=_scrollObj[_dir];
				//c=(pPos != undefined)?pPos:_neg*opts.distance;
				e=(pPos != undefined)?pPos:_temp+(opts.distance*numRoll)%scrollSize;
				if(_neg==1){
					if(e>b){
						c = e-b;
					}else{
						c = e+scrollSize -b;
					}
				}else{
					if(e>b){
						c =e-scrollSize-b;
					}else{
						c = e-b;
					}
				}
				d=opts.duration;
				
				//scrollId = setInterval(scrollFunc, opts.scrollDelay);
				if(scrollId) clearTimeout(scrollId);
				scrollId = setTimeout(scrollFunc, opts.scrollDelay);
			}
			
			function start(){
				rollId = setInterval(function(){
					rollFunc();
				}, opts.time*1000);
			}
			function stop(){
				clearInterval(rollId);
			}
			
			function easeOutQuad(t,b,c,d){
				return -c *(t/=d)*(t-2) + b;
			}
			
			function easeOutQuint(t,b,c,d){
				return c*((t=t/d-1)*t*t*t*t + 1) + b;
			}

		});
	};
	$.fn.kxbdSuperMarquee.defaults = {
		isMarquee:false,//鏄惁涓篗arquee
		isEqual:true,//鎵€鏈夋粴鍔ㄧ殑鍏冪礌闀垮鏄惁鐩哥瓑,true,false
		loop: 0,//寰幆婊氬姩娆℃暟锛�0鏃舵棤闄�
		newAmount:3,//鍔犻€熸粴鍔ㄧ殑姝ラ暱
		eventA:'mousedown',//榧犳爣浜嬩欢锛屽姞閫�
		eventB:'mouseup',//榧犳爣浜嬩欢锛屽師閫�
		isAuto:true,//鏄惁鑷姩杞崲
		time:5,//鍋滈】鏃堕棿锛屽崟浣嶄负绉�
		duration:50,//缂撳姩鏁堟灉锛屽崟娆＄Щ鍔ㄦ椂闂达紝瓒婂皬閫熷害瓒婂揩锛屼负0鏃舵棤缂撳姩鏁堟灉
		eventGo:'click', //榧犳爣浜嬩欢锛屽悜鍓嶅悜鍚庤蛋
		direction: 'left',//婊氬姩鏂瑰悜锛�'left','right','up','down'
		scrollAmount:1,//姝ラ暱
		scrollDelay:10,//鏃堕暱
		eventNav:'click'//瀵艰埅浜嬩欢
	};
	
	$.fn.kxbdSuperMarquee.setDefaults = function(settings) {
		$.extend( $.fn.kxbdSuperMarquee.defaults, settings );
	};
	
})(jQuery);














