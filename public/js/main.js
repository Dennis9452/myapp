(function () {
	
	$(document).ready(function(){
		
			debug = Trace.getInstance();
			debug.init();
			debug.isActivity = true;
			debug.isVisible = true;
		
	});

	window.onerror = function(errorMsg, url, lineNumber, colNo, error){
		
			if(typeof(debug) !== "undefined"){
				debug.log("---- Error ----");
				debug.log(errorMsg);
				debug.log(url);
				debug.log(lineNumber);
				//debug.log((error.stack.toString));
				debug.log("---------------");
			}
		
	};

    /**
     * Displays logging information on the screen and in the console.
     * @param {string} msg - Message to log.
     */
    function log(msg) {
        var logsEl = document.getElementById('logs');

        if (msg) {
            // Update logs
            console.log('[PlayerAvplay]: ' + msg);
            logsEl.innerHTML += msg + '<br />';
        } else {
            // Clear logs
            logsEl.innerHTML = '';
        }

        logsEl.scrollTop = logsEl.scrollHeight;
    }

    var player;

    // flag to monitor UHD toggling
    var uhdStatus = false;

    /**
     * Register keys used in this application
     */
    function registerKeys() {
    	debug.log("registerKeys");
        var usedKeys = [
                        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
                        'ChannelDown', 'ChannelUp', 
                        'ColorF0Red', 'ColorF1Green', 'ColorF2Yellow', 'ColorF3Blue',
                        'Info', 'Exit',
                        'MediaFastForward', 'MediaPause', 'MediaPlay', 'MediaPlayPause', 'MediaRecord', 'MediaRewind', 'MediaStop'];


        usedKeys.forEach(
            function (keyName) {
                tizen.tvinputdevice.registerKey(keyName);
            }
        );
    }


    /**
     * Handle input from remote
     */
    function registerKeyHandler() {
    	debug.log("registerKeyHandler");
        document.addEventListener('keydown', function (e) {
        	document.getElementById("logs").innerText = e.keyCode;
            switch (e.keyCode) {
                case 13:    // Enter
                    player.toggleFullscreen();
                    break;
                case 415:   // MediaPlay
		    player.play();
		    break;
                case 19:    // MediaPause
                    player.pause();
                    break;
                case 413:   // MediaStop
                    player.stop();
                    break;
                case 417:   // MediaFastForward
                    player.ff();
                    break;
                case 412:   // MediaRewind
                    player.rew();
                    break;
                case 48: //Key 0
                	document.getElementById("logs").innerText = "red";
                    log();
                    break;
                case 49: //Key 1
                    setUhd();
                    break;
                case 50: //Key 2
                    player.getTracks();
                    break;
                case 51: //Key 3
                    player.getProperties();
                    break;
                case 10009: // Return
                    if (webapis.avplay.getState() !== 'IDLE' && webapis.avplay.getState() !== 'NONE') {
                        player.stop();
                    }
                    tizen.application.getCurrentApplication().hide();
                    break;
                default:
                    log("Unhandled key");
            }
        });
    }

    /**
     * Display application version
     */
    function displayVersion() {
    	debug.log("displayVersion");
        var el = document.createElement('div');
        el.id = 'version';
        el.innerHTML = 'ver: ' + tizen.application.getAppInfo().version;
        document.body.appendChild(el);
    }

    /**
     * Enabling uhd manually in order to play uhd streams
     */
    function setUhd() {
        if (!uhdStatus) {
            if (webapis.productinfo.isUdPanelSupported()) {
                log('4k enabled');
                uhdStatus = true;
            } else {
                log('this device does not have a panel capable of displaying 4k content');
            }

        } else {
            log('4k disabled');
            uhdStatus = false;
        }
        player.setUhd(uhdStatus);
    }

    function setHls(){
        if (Hls.isSupported()) {
          const video = document.getElementById('video');
          const hls = new Hls();
          hls.attachMedia(video);

          hls.on(Hls.Events.MEDIA_ATTACHED, function () {
            debug.log("video and hls.js are now bound together !");
            hls.loadSource("/streaming");
          });
          hls.on(Hls.Events.ERROR, function(event, data){
            console.log(event, data)
            if (data.fatal) {
                console.log(data.details)
            }
          })

        }
    }


    /**
     * Function initialising application.
     */
    window.onload = function () {
    	debug.log("start");
        setHls();
        if (window.tizen === undefined) {
            log('This application needs to be run on Tizen device');
            return;
        }else log("ready to start~!!!!");

        // displayVersion();
        // registerKeys();
        // registerKeyHandler();

        
        /**
         * Player configuration object.
         *
         * @property {String}    url                     - content url
         * @property {HTML Element} player           - application/avplayer object
         * @property {HTML Div Element} controls     - player controls
         * @property {HTLM Div Element} info         - place to display stream info
         */
        var config = {
            url: "/streaming",
            player: document.getElementById('av-player'),
            controls: document.querySelector('.video-controls'),
            info: document.getElementById('info'),
            logger: log //Function used for logging

            /*Smooth Streaming examples*/
            //			url:
            // 'http://playready.directtaps.net/smoothstreaming/SSWSS720H264/SuperSpeedway_720.ism/Manifest',
            // url: 'http://playready.directtaps.net/smoothstreaming/TTLSS720VC1/To_The_Limit_720.ism/Manifest'
        };


        //Check the screen width so that the AVPlay can be scaled accordingly
        tizen.systeminfo.getPropertyValue(
            "DISPLAY",
            function (display) {
                log("The display width is " + display.resolutionWidth);
                config.resolutionWidth = display.resolutionWidth;

                // initialize player - loaded from videoPlayer.js
                player = new VideoPlayer(config);
                player.open(config.url);
                registerMouseEvents();
            },
            function(error) {
            	debug.log(error);
                log("An error occurred " + error.message);
            }
        );

    }
}());
