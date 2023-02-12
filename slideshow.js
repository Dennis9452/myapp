
var slides = new slideSwitch();
var slides = new slideTransistion();
var pictures = ["","http://s-epg01.tw.svc.litv.tv/pub/banner/drama.jpg?v=1581902359","http://s-epg01.tw.svc.litv.tv/pub/banner/show.jpg?v=1581902359","http://s-epg01.tw.svc.litv.tv/pub/banner/vod.jpg?v=1581902359"]
var imgs = document.getElementById("slideshow").getElementsByTagName("img");
function slideSwitch() {	    
		var slideshow=document.getElementById("slideshow"),
			imgs=slideshow.getElementsByTagName("img"), 
			pages=slideshow.getElementsByTagName("span"),
			current=0; 
		
		function slideOff() {
			imgs[current].style.display="none";
			pages[current].className="";
		}
		function slideOn() {
			imgs[current].style.display="block"; 
			pages[current].className="active";
		}
		 
		function changeSlide() { 
			slideOff(); 
			current++; 
			if(current >= imgs.length) current=0;
			slideOn(); 
		}
 
		var slideon=setInterval(changeSlide,3000);
		function stop(){
			clearInterval(slideon);
		}
		var start = function () {
		    if(current === length-1) current = 0;
		    pages[current].className = "";
		    imgs[current].style.display="none";
		    current=0;
		    pages[current].className = "active";
		    imgs[current].style.display="block";
		    slideon = setInterval(changeSlide,3000);
		}  
		return {
		    stop : stop,
		    start : start,
		    changeSlide : changeSlide
		}
	}
	
	function slideTransistion() {
		var cloneImg=$('#container img').first().clone();
	    $('#container').append(cloneImg);
		var slideshow=document.getElementById("slideshow"),
			imgs=slideshow.getElementsByTagName("img"), //得到图片们
			pages=slideshow.getElementsByTagName("span"),
			length=imgs.length,
			current=0; //current为当前活跃的图片编号
		 
		function changeSlide() { //切换图片的函数
			current++;
		
			if(current === length) {
				current=1;
				document.getElementById("container").style.left= 0 +"px";            
			}
			if(current === length - 1 ){
				pages[current-1].className = "";
				pages[0].className = "active";
			}
			else{
				pages[current].className = "active";
				pages[current - 1].className = "";
			}
			$('#container').animate({left:current*-921},1000);
		}
 
		var slideon=setInterval(changeSlide,3000);
		function stop(){
			clearInterval(slideon);
		}
		var start = function () {
			if(current === length-1) current = 0;
	        pages[current].className = "";
	        current=0;
	        pages[current].className = "active";
	        document.getElementById("container").style.left= 0 +"px"; 
	        slideon = setInterval(changeSlide,3000);
		}  
		return {
		    stop : stop,
		    start : start,
		    changeSlide : changeSlide
		}
	}
function Carousel(banner) {
		var	bannerIndex = 0;
		var detail;
		var slideStart;

		function start(focusItem){
			detail = focusItem;
			banner.style.backgroundImage = detail.length > 0 ? "url(" + detail[bannerIndex].data + ")" : "";  
			if (detail.length > 1) {
				slideStart = setTimeout(changeSlide, detail[bannerIndex].duration*1000); 
			}
		}
		function changeSlide(){
			bannerIndex++;
			if (bannerIndex >= detail.length) { bannerIndex = 0; } 
			banner.style.backgroundImage = "url(" + detail[bannerIndex].data + ")";  
			slideStart = setTimeout(changeSlide, detail[bannerIndex].duration*1000);
		}

		function stop(){
			clearInterval(slideStart);
			bannerIndex = 0;
		}
		return {
			start : start,
			stop :stop
		};
	}
