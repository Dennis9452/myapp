
(function(){
    var debug;
    if(SystemInfo.serverEnv == "staging" || SystemInfo.serverEnv == "dev") {
        debug = Trace.getInstance();
        debug.init();
        debug.isActivity = true;
        debug.isVisible = true;
        // var hotkeyHandle = HotkeyHandle.getInstance();
        // hotkeyHandle.addNewItems({4141:function(){
        // 	LocalDataHandler.del("accountInfo");
        // }});
    }

    var div = document.createElement("DIV");
    div.innerText = 'load successfully';
    div.style.zIndex = 1000;
    div.style.backgroundColor = "orange"
    avPlayerObj = document.getElementById("av-player");
    if(avPlayerObj !== null){
        avPlayerObj.addEventListener("timeupdate", function(e){
            debug.log(avPlayerObj.currentTime * 1000);
        });
    } 
    else {
        debug.log("no player")
    };
}())