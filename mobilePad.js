(function(){
	// if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		createNumPad();
		createArrowKey();
		addListener();
	// } //可以換成http地址}

	
	function addListener(){
		document.getElementById("up").addEventListener("touchend",function(){keytd("up")})
		document.getElementById("down").addEventListener("touchend",function(){keytd("down")})
		document.getElementById("left").addEventListener("touchend",function(){keytd("left")})
		document.getElementById("right").addEventListener("touchend",function(){keytd("right")})
	}
	

	function createNumPad(){
		var numPad = document.createElement("div");
		// numPad.style.cssText="height: 200px;width: 120px;text-align: center;float:left;"
		numPad.classList.add("numPad");

		for(var i=1; i<=10;i++){
			var num = document.createElement("div");
			num.class = "num";
			num.id = "num" + i;
			// num.innerHTML = i;
			num.classList.add("num")
			num.style.cssText = "background: url('/numbers/" + i + ".png')";
			// .style.cssText = "height: 30px;width: 30px;display: inline-block;border: dotted 1px deepskyblue;"
			if(i == 10) {
				num.id ="num0";
				num.style.cssText = "background: url('/numbers/0.png')";
				// num.innerHTML = "0";
			}

			numPad.appendChild(num);	
		}
		
		document.body.appendChild(numPad);  

		for(var j = 0;j <= 9; j++){
			document.getElementById("num" + j).addEventListener("touchend", function(){
		    		alert("Hello World "+this.id);
			});
		}
	}


	function createArrowKey(){
		var arrowKey = document.createElement("div");
		var back = document.createElement("div");
		var enter = document.createElement("div");
		var up = document.createElement("div");
		var left = document.createElement("div");
		var down = document.createElement("div");
		var right = document.createElement("div");


		arrowKey.classList.add("arrowPad");
		back.classList.add("arrow");
		enter.classList.add("arrow");
		up.classList.add("arrow");
		left.classList.add("arrow");
		down.classList.add("arrow");
		right.classList.add("arrow");

		// up.innerHTML="上"
		// left.innerHTML="左"
		// down.innerHTML="下"
		// right.innerHTML="右"

		back.id="back"
		enter.id="enter"
		up.id="up"
		left.id="left"
		down.id="down"
		right.id="right"

		back.style.cssText="background-image: url('/back.png')"
		enter.style.cssText="background-image: url('/enter.png')"
		up.style.cssText="background-image: url('/up.png')"
		left.style.cssText="background-image: url('/left.png')"
		down.style.cssText="background-image: url('/down.png')"
		right.style.cssText="background-image: url('/right.png')"

		arrowKey.appendChild(back);
		arrowKey.appendChild(up);
		arrowKey.appendChild(enter); 
		arrowKey.appendChild(left); 
		arrowKey.appendChild(down);
		arrowKey.appendChild(right); 

		document.body.appendChild(arrowKey);  
	}
}());