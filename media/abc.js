
(function(){
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