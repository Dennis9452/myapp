// network state change event test
if (window.debug) {
    debug.isActivity = true;
    debug.isVisible = true;

    // var messageStore = '';
    function onOnlineStatus(event) {
        var message = SystemInfo.projectNum + ' OnlineStatusChangeAt ' + Date.now() + ',' + event.type;
        debug.log(message);

        // messageStore += '\n' + message;
        // if (event.type == 'online') {
        //     sendLog(messageStore);
        //     messageStore = '';
        // }
    }
    window.ononline = onOnlineStatus;
    window.onoffline = onOnlineStatus;
}

// function sendLog(msg) {
//     var xhr = new XMLHttpRequest();
//     xhr.open('POST', 'http://172.21.103.55:8888/log', true);
//     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     xhr.send(msg);
// }

(function () {
    var info = document.createElement("DIV");
    info.style.cssText =
        "font-size: 24px; color: white; text-Shadow : 2px 2px 2px black;" +
        "white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" +
        "border: 3px solid #0A0; border-radius: 5px; padding: 5px 15px; background: #464;" +
        "position: absolute; right: 15px; bottom: 15px; max-width: 80%;" +
        "z-index: 999;";
    info.textContent = "已載入script: nsce";
    document.body.appendChild(info);
}());
