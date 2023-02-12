
//playerTimer
(function(){
    var debug;
    
        debug = Trace.getInstance();
        debug.init();
        debug.isActivity = true;
        debug.isVisible = true;
        // var hotkeyHandle = HotkeyHandle.getInstance();
        // hotkeyHandle.addNewItems({4141:function(){
        // 	LocalDataHandler.del("accountInfo");
        // }});
    

    var wrapper = document.getElementsByClassName("wrapper")[0];
    var div = document.createElement("DIV");
    div.innerText = 'load successfully';
    div.style.zIndex = 1000;
    div.style.backgroundColor = "orange"
    div.style.position ="absolute";
    div.style.top = "0px";

    wrapper.appendChild(div)
    setTimeout(timer,2000);
    function timer() {
        avPlayerObj = document.getElementById("av-player");
        if(avPlayerObj !== null){
            debug.log("not null")
            avPlayerObj.addEventListener("timeupdate", function(e){
                debug.log( avPlayerObj.currentTime * 1000);
            });
        } 
        else {
            debug.log("no player")
        };
    }
    
}())