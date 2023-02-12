/**
 *Trace is Singleton
 *@author HT
 *
 *ex:
 *	var debug = Trace.getInstance();								<--取得實體
 *
 *		debug.init();												<--初始化
 *		debug.log("Any message");									<--顯示訊息
 *		
 *		debug.targetServer = "http://172.21.101.104/asTrace/"		<--存log的位址
 *		debug.isAutoSend = true;									<--自動將log存到指定位置。(不建議)
 *		debug.isAutoSend = false;									<--取消自動將log存到指定位置。(預設)
 *		debug.toggleAutoSend();										<--取消/自動將log存到指定位置。
 *		debug.send();												<--將目前所有的log存到指定位置。
 *			
 *		debug.isVisible = false;									<--隱藏
 *		debug.isVisible = true;										<--顯示
 *		debug.toggleVisible();										<--隱藏/顯示 切換
 *		
 *		debug.isActivity = false;									<--取消log
 *		debug.isActivity = true;									<--啟用log
 *		debug.toggleActivity();										<--取消log/啟用log 切換
 *		
 *		debug.clear();												<--清除log
 *		
 *	var hotKey = {													<--不用全部重新指定，只給需要改變得即可。
 *			toggleVisible	:123,
 *			clear			:456,
 *			toggleActivity	:222,
 *			scrollDown		:78,
 *			scrollUp		:90
 *		}
 *		debug.setHotKey(hotKey);									<--改變HotKey設定
 *		
 *----------------------------------------------------------------------	
 *note:HotKey 預設值為
 *		toggleVisible	:3447
 *		clear			:34476
 *		toggleActivity	:3452
 *		scrollDown		:36
 *		scrollUp		:41
 *		send			:3434
 *		toggleAutoSend	:3433
 * 
 */
function deepClone(object){ 
	if(object == null) return null; 
	if(("number boolean string undefined").indexOf((typeof object).toLowerCase()) >= 0) return object;
	if(object instanceof Array){ 
		var newArray = []; 
		for(var i=0;i<object.length;i++){ 
			newArray.push(arguments.callee(object[i])); 
		} 
		return newArray; 
	} 
	var obj = new Object(); 
	for(var property in object){ 
		obj[property] = arguments.callee(object[property]); 
	} 
	return obj; 
}
(function(){
    var domReady=function(a){function e(a){f(),c.add(a)}function f(){if(!c){if(c=i(),"complete"===a.readyState)return setTimeout(h,1);if(a.addEventListener)a.addEventListener("DOMContentLoaded",d,!1),window.addEventListener("load",h,!1);else if(a.attachEvent){a.attachEvent("onreadystatechange",d),window.attachEvent("onload",h);var b=!1;try{b=null==window.frameElement}catch(a){}a.documentElement.doScroll&&b&&g()}}}function g(){if(!b){try{a.documentElement.doScroll("left")}catch(a){return void setTimeout(g,1)}h()}}function h(){if(!b){if(!a.body)return setTimeout(h,1);b=!0,c.fire()}}function i(){var c,d,e,f,g,b=[],h={add:function(a){var g=b.length;b.push(a),d?f=b.length:c&&(e=g,h.fire())},fire:function(){for(c=!0,d=!0,g=e||0,e=0,f=b.length;g<f;g++)b[g].call(a);d=!1}};return h}var b,c,d;return a.addEventListener?d=function(){a.removeEventListener("DOMContentLoaded",d,!1),h()}:a.attachEvent&&(d=function(){"complete"===a.readyState&&(a.detachEvent("onreadystatechange",d),h())}),e}(window.document);
    
	Trace = {
		getInstance : getInstance
	}
	
	function trace(){
		var txtField;
		var oriTxt = "";
		
		var isInit = false;
		var isActivity = false;
		var isVisible = false;
		
		var nowScrollTop = 0;
		
		var hotkeyHandle = HotkeyHandle.getInstance();
		var hotkeyDataDefault = {
			toggleVisible	:3447,
			clear			:34476,
			toggleActivity	:3452,
			scrollDown		:36,
			scrollUp		:41,
			send			:3434,
			toggleAutoSend	:3433
		}
		
		var targetServer = "http://172.21.101.49/LTLGE00/logcat/write.php";
		var isAutoSend = false;
		var timeLabels = {};
		
		function send2(msg){
			if(targetServer == "") return;
			var logPath = targetServer + "?input="+msg;
			var xhReq = new XMLHttpRequest();
			xhReq.open("get",logPath,true);
			xhReq.onreadystatechange = function(){
				if(xhReq.readyState == 4) xhReq = null;
			}
			try{xhReq.send(null);}catch(e){}
		}
		
		trace.prototype.send = function(){
			send2(oriTxt.replace(new RegExp("\n","g"),">@<"));
		}
		
		trace.prototype.init = function(){
			if(isInit) return;
			txtField = document.createElement('div');
			txtField.style.cssText = "position:absolute;overflow:hidden;top:0px;left:0px;width:1280px;height:720px;font-size:15pt;word-wrap:break-word;color:#c0c0c0;pointer-events:none;z-index:999999";
			isInit = true;
			isActivity = true;
			isVisible = false;
            domReady(function(){
                document.body.appendChild(txtField);
            });
		}
		
		trace.prototype.log = function(msg){
			if(!isActivity) return;
            if(msg instanceof Error) msg = JSON.stringify(msg, ["message", "arguments", "type", "name"]);
			else if(typeof(msg) == "object") msg = JSON.stringify(msg);
			if(isAutoSend) send2(msg);
			oriTxt += msg + "\r\n";
			if(!isVisible) return;
			txtField.innerText = oriTxt;
			txtField.scrollTop = txtField.scrollHeight;
		}
		
		trace.prototype.time = function(label){
			var t = +new Date;
			if(typeof(label) === "undefined") return;
			timeLabels[label] = t;
		}
		
		trace.prototype.timeEnd = function(label){
			var t = +new Date;
			if(typeof(label) === "undefined") return;
			if(!(label in timeLabels)) return;
			var d = t - timeLabels[label];
			var msg = label + ": " + d + "ms";
			delete timeLabels[label];
			trace.prototype.log(msg);
			return msg;
		}
		
		trace.prototype.clear = function(){
			oriTxt = "";
			txtField.innerText = oriTxt;
		}
		
		trace.prototype.scrollUp = function(){
			txtField.scrollTop -= 20;
		}
		
		trace.prototype.scrollDown = function(){
			txtField.scrollTop += 20;
		}
		
		trace.prototype.toggleVisible = function(){
			if(!isInit) return;
			if(isVisible) {
				nowScrollTop = txtField.scrollTop;
				txtField.innerText = "";
			}else{
				txtField.innerText = oriTxt;
				txtField.scrollTop = nowScrollTop;
			}
			isVisible = !isVisible;
		}
		
		trace.prototype.toggleActivity = function(){
			isActivity = !isActivity;
		}
		
		trace.prototype.toggleAutoSend = function(){
			isAutoSend = !isAutoSend;
		}
		
		trace.prototype.setHotKey = function(obj){
			var oldHotKeyId = [];
			for(var p in hotkeyDataDefault){
				oldHotKeyId.push(hotkeyDataDefault[p]);
			}
			// console.log(oldHotKeyId);
			hotkeyHandle.deleteItems(oldHotKeyId);
			
			hotkeyDataDefault.toggleVisible  = obj.toggleVisible	|| hotkeyDataDefault.toggleVisible;
			hotkeyDataDefault.clear 		 = obj.clear 			|| hotkeyDataDefault.clear;
			hotkeyDataDefault.scrollDown 	 = obj.scrollDown 		|| hotkeyDataDefault.scrollDown;
			hotkeyDataDefault.scrollUp 		 = obj.scrollUp 		|| hotkeyDataDefault.scrollUp;
			hotkeyDataDefault.toggleActivity = obj.toggleActivity 	|| hotkeyDataDefault.toggleActivity;
			hotkeyDataDefault.send			 = obj.send 			|| hotkeyDataDefault.send;
			hotkeyDataDefault.toggleAutoSend = obj.toggleAutoSend 	|| hotkeyDataDefault.toggleAutoSend;
			
			var hotkeyData = {};
				hotkeyData[hotkeyDataDefault.toggleVisible]  = this.toggleVisible;
				hotkeyData[hotkeyDataDefault.clear] 		 = this.clear;
				hotkeyData[hotkeyDataDefault.scrollDown] 	 = this.scrollDown;
				hotkeyData[hotkeyDataDefault.scrollUp] 		 = this.scrollUp;
				hotkeyData[hotkeyDataDefault.toggleActivity] = this.toggleActivity;
				hotkeyData[hotkeyDataDefault.send] 			 = this.send;
				hotkeyData[hotkeyDataDefault.toggleAutoSend] = this.toggleAutoSend;
			
			hotkeyHandle.addNewItems(hotkeyData);
			
		}
		
		trace.prototype.__defineGetter__("isActivity", function(){
			return isActivity;
		});
		
		trace.prototype.__defineSetter__("isActivity", function(val){
			isActivity = val;
		});
		
		trace.prototype.__defineGetter__("isVisible", function(){
			return isVisible;
		});
		
		trace.prototype.__defineSetter__("isVisible", function(val){
			if(isVisible == val) return;
			
			if(isInit) {
				if(!val) {
					nowScrollTop = txtField.scrollTop;
					txtField.innerText = "";
				}else{
					txtField.innerText = oriTxt;
					txtField.scrollTop = nowScrollTop;
				}
			}
			
			isVisible = val;
		});
		
		trace.prototype.__defineGetter__("targetServer", function(){
			return targetServer;
		});
		
		trace.prototype.__defineSetter__("targetServer", function(val){
			targetServer = val;
		});
		
		trace.prototype.__defineGetter__("isAutoSend", function(){
			return isAutoSend;
		});
		
		trace.prototype.__defineSetter__("isAutoSend", function(val){
			isAutoSend = val;
		});
		
		this.setHotKey(hotkeyDataDefault);
		
		trace.instance = this;
	}
	
	function getInstance(){
		if (trace.instance == null) return new trace();
		else return trace.instance;
	}
})();


/**
 *HotkeyHandle is Singleton
 *@author HT
 *
 *ex:
 *	var hotkeyData = {
 *			111:function1,
 *			3245:function2,
 *			32456:function3
 *		}
 *
 *	var hotkeyHandle = HotkeyHandle.getInstance();	<--取得HotkeyHandle實體
 *		hotkeyHandle.addNewItems(hotkeyData);		<--增加hotkey項目。
 *		hotkeyHandle.addNewItems({222:function4});	<--可連續增加。
 *		hotkeyHandle.addNewItems({222:function5});	<--就算ID重複也沒關係，皆會執行(function4,function5都會執行)。
 *		hotKeyHandle.deleteItem(111);				<--刪除項目
 *		hotKeyHandle.deleteItems([111,3245]);		<--刪除多筆項目
 *      hotKeyHandle.subscribe( function(){console.log("next")},
 *                              function(){console.log("fail")},
 *                              function(){console.log("complete")}); <-- 訂閱狀態
 */
(function(){
	HotkeyHandle = {
		getInstance : getInstance
	}
	
	function hotkeyHandle(){
		var _funcMenu = {};
		var listId = [];
		var copyListId = [];
		var strId = -1;
		var timeoutId = 0;
		var hotkeyDetect = "";
		var isInit = false;
        var inProcess = false;
        var subscriber = {
            next:[], fail:[], complete:[]
        };
		
		function createListId(){
			listId = [];
			for(var p in _funcMenu){
				listId.push(String(p));
			}
			reset();
		}
		
		function keyListener(e){
			if (isCharDigit(e.keyName)) {
				judgment(e.keyName, ++strId);
			}else if(typeof e.key !== "undefined") {
                judgment(e.key, ++strId);
            }
		}
		
		function reset(){
			clearTimeout(timeoutId);
			strId = -1;
			hotkeyDetect = "";
			copyListId = deepClone(listId);
		}
		
		function judgment(key, charId){
			clearTimeout(timeoutId);
			if(copyListId.length <=0){
				reset();
				return;
			}
			hotkeyDetect += key;
			for (var i = 0; i < copyListId.length;i++ ) {
				if (copyListId[i].charAt(charId) != key) {
					copyListId.splice(i, 1);
					--i;
				}
			}
            
            if(copyListId.length > 0){
                subscriber.next.forEach(function(fn){
                    fn.apply();
                });
                inProcess = true;
            }
            
			switch(copyListId.length) {
				case 0:
                    if(inProcess == true){
                        subscriber.fail.forEach(function(fn){
                            fn.apply();
                        });
                        inProcess = false;
                    }
					reset();
					break;
				case 1:
					if(copyListId[0] == hotkeyDetect) timeoutId = setTimeout(doFunc, 500, 0);
					break;
				default:
					for (i = 0; i < copyListId.length;i++ ) {
						if(copyListId[i] == hotkeyDetect) timeoutId = setTimeout(doFunc, 500,i);
					}
			}
			
		}
		
		function doFunc(theId){
            inProcess = false;
            subscriber.complete.forEach(function(fn){
                fn.apply();
            });
			var theFunc = _funcMenu[copyListId[theId]];
			if(!theFunc.length) theFunc();
			else {
				for(var p in theFunc){
                    if(theFunc.hasOwnProperty(p)) continue;
					theFunc[p]();
				}
			}
			reset();
		}
		
		function concatObject(obj1,obj2){
			var tempObj = obj1;
			for(var p in obj2){
				if(!tempObj[p]) tempObj[p] = obj2[p];
				else{
					if(!tempObj[p].length) {
						var temp = tempObj[p];
						tempObj[p] = [];
						tempObj[p].push(temp);
						tempObj[p].push(obj2[p]);
					}else tempObj[p].push(obj2[p]);
				}
			}
			return tempObj;
		}
		
		hotkeyHandle.prototype.addNewItems = function(newMenu){
			if(!isInit){
				isInit = true;
				_funcMenu = newMenu;
				document.addEventListener('keydown', keyListener, true);
			}else _funcMenu = concatObject(_funcMenu, newMenu);
			createListId();
		};
		
		hotkeyHandle.prototype.deleteItem = function(itmeId){
			if(!_funcMenu[itmeId]) return;
			delete _funcMenu[itmeId];
			createListId();
		};
		
		hotkeyHandle.prototype.deleteItems = function(itemIds){
			var have = false;
			for(var p in itemIds){
				if(_funcMenu[itemIds[p]]) {
					delete _funcMenu[itemIds[p]];
					have = true;
				}
			}
			if(have) createListId();
		};
        
        hotkeyHandle.prototype.subscribe = function(next, fail, complete){
            if(typeof next === "function") subscriber.next.push(next);
            if(typeof fail === "function") subscriber.fail.push(fail);
            if(typeof complete === "function") subscriber.complete.push(complete);
        };
		
		hotkeyHandle.instance = this;
	}
	
	function getInstance(){
		if (hotkeyHandle.instance == null) return new hotkeyHandle();
		else return hotkeyHandle.instance;
	}
})();