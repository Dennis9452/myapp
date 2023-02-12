
function Simid() {
    var nop = function(){};
    var _parent = window.parent;
    var _waitResList = {};
    var _nextMessageId = 0;
    var _sessionId = "";
    var _startCreativeCb = nop;
    var _mediaEndCb = nop;
    var waitRes = [
        "SIMID:Creative:getMediaState",
        "SIMID:Creative:reportTracking",
        // "SIMID:Creative:requestChangeVolume",
        // "SIMID:Creative:requestExitFullscreen",
        // "SIMID:Creative:requestFullscreen",
        "SIMID:Creative:requestSkip",
        // "SIMID:Creative:requestStop",
        // "SIMID:Creative:requestPause",
        // "SIMID:Creative:requestPlay",
        // "SIMID:Creative:requestChangeAdDuration",
        "createSession"
    ];
    var resolveMessage = [
        "SIMID:Player:adSkipped",
        "SIMID:Player:adStopped",
        "SIMID:Player:appBackgrounded",
        "SIMID:Player:fatalError",
        "SIMID:Player:init",
        "SIMID:Player:startCreative",
    ];

    function genUuid() {
        var r = typeof window.crypto != "undefined" && typeof window.crypto == "function" ?
            () => crypto.getRandomValues(new Uint8Array(1))[0] :
            () => (Math.random() * 256) | 0;
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g,
            c => (c ^ r() & 15 >> c / 4).toString(16)
        );
    }

    function handleProtocolMessage(e) {
        const data = JSON.parse(e.data);

        switch (data.type) {
            case 'resolve':
            case 'reject':
                var {
                    messageId,
                    value
                } = data.args;

                if (messageId in _waitResList) {
                    _waitResList[messageId][data.type](value);
                    delete _waitResList[messageId];
                }
                break;
            case "SIMID:Player:startCreative":
                _startCreativeCb();
                break;
            case "SIMID:Media:ended":
                _mediaEndCb();
                break;
        }
        if (resolveMessage.indexOf(data.type) > -1) {
            resolve(data.messageId);
        }
    }

    function resolve(messageId, value) {
        const resolveArgs = {
            'messageId': messageId,
            'value': value,
        };
        sendMessage('resolve', resolveArgs);
    }

    // function reject(errorCode, message) {
    //     const resolveArgs = {
    //         'errorCode': errorCode,
    //         'message': message,
    //     };
    //     sendMessage('reject', resolveArgs);
    // }

    function sendMessage(type, args) {
        const messageId = _nextMessageId++;
        const message = {
            'type': type,
            'sessionId': _sessionId,
            'messageId': messageId,
            'timestamp': Date.now(),
            'args': args || {},
        };

        _parent.postMessage(JSON.stringify(message), '*');
        let isNeedResp = (waitRes.indexOf(type) > -1);
        return isNeedResp ?
            new Promise(
                (resolve, reject) => _waitResList[messageId] = {
                    resolve,
                    reject
                }) :
            Promise.resolve();
    }

    function getMediaState() {
        return sendMessage("SIMID:Creative:getMediaState")
    }

    function createSession() {
        _sessionId = genUuid();
        return sendMessage("createSession");
    }

    function requestSkip() {
        return sendMessage("SIMID:Creative:requestSkip");
    }

    // function requestStop() {
    //     return sendMessage("SIMID:Creative:requestStop");
    // }

    function reportTracking(urls) {
        return sendMessage("SIMID:Creative:reportTracking", {
            trackingUrls: urls
        });
    }

    window.addEventListener("message", handleProtocolMessage, false);
    getMediaState();

    this.createSession = createSession;
    this.requestSkip = requestSkip;
    // this.requestStop = requestStop;
    this.reportTracking = reportTracking;

    this.onStartCreative = cb => _startCreativeCb = cb;
    this.onMediaEnded = cb => _mediaEndCb = cb;
}