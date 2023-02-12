//var debug = Trace.getInstance();
//  debug.init();
//  debug.isActivity = true;
//  debug.isVisible = true;
//  
//window.onerror = function(msg, url, lineNo, colNo, error) {
//  debug.log("--- error ---");
//  debug.log(msg);
//  debug.log(url);
//  debug.log(lineNo);
//  debug.log(colNo);
//  debug.log(error.stack.replace(new RegExp("\n", 'g'), "; "));
//};

(function() {
    var EVN = "p";
    var ResourceOriginConfig = {
            d: "http://172.21.101.99:8080",
            s: "https://staging-webtv.svc.litv.tv",
            p: "https://webtv.svc.litv.tv"
        };
    window.ResourceOrigin = ResourceOriginConfig[EVN];
    var status = "";
    
    function init(){
        var deferred = $.Deferred();
        
        // tizen.tvinputdevice.registerKey('Exit');
        console.log("init");
        // handlAskExit();
        
        window.addEventListener("keydown", handlKeyBehavior, true);
        window.addEventListener("page-ready", onPageReady);
        
        var currentUrl = decodeURI(location.href);
        var query = "";
        
        if (currentUrl.indexOf("?") >= 0) {
            query = currentUrl.slice(currentUrl.indexOf("?") + 1);
            window.history.pushState({}, "LiTV", query);
        }
        
        deferred.resolve(query);
        return deferred.promise();
    }
    
    function getPage(path){
        var deferred = $.Deferred();
        console.log("getPage");
        core(0);
        function core(retryCount){
            var retryLimet = 3;
            $.ajax({
                url: window.ResourceOrigin + "/LTSMS04/" + path,
                context: document.body,
                timeout: 5000
            })
            .done(function(data){
                deferred.resolve(data);
            })
            .fail(function(jqXHR, textStatus, errorThrown){
                if(++retryCount <= retryLimet){
                    setTimeout(function(){
                        core(retryCount);
                    }, 300);
                }else{
                    deferred.reject("downloadPage fail ("+ errorThrown +")", jqXHR, textStatus, errorThrown);
                }
            });
        }
        
        return deferred.promise();
    }
    
    function render(pageHtml){
        var deferred = $.Deferred();
        console.log("render");
        var headNode = document.querySelector("head");
        var dynamicDom = document.createElement("HTML");
        dynamicDom.innerHTML = pageHtml;
        
        $.when(setupCSS(headNode, dynamicDom), downloadJavaScript(headNode, dynamicDom))
        .then(function(c, jsList){
            return setupDom(dynamicDom)
            .then(function(){
                return $.Deferred().resolve(jsList);
            });
        })
        .then(function(jsList){
            return setupJavaScript(jsList, headNode, dynamicDom);
        })
        .then(deferred.resolve)
        .fail(function(msg){
            deferred.reject(msg);
        });
        return deferred.promise();
    }
    
    function setupCSS(headNode, dynamicDom){
        console.log("setupCSS");
        var deferred = $.Deferred();
        var fragment = document.createDocumentFragment();
        var cssnum = document.styleSheets.length;
        Array.prototype.slice.call(dynamicDom.querySelectorAll("link[rel='stylesheet']"))
        .forEach(function(item){
            cssnum++;
            var link = document.createElement("LINK");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = window.ResourceOrigin + item.attributes.href.value;
            
            fragment.appendChild(link);
        });
        
        headNode.appendChild(fragment);
        
        var count = 0;
        var ti = setInterval(function() {
            if(cssnum == document.styleSheets.length){
                clearInterval(ti);
                deferred.resolve();
            }else{
                if(++count > 2000){
                    clearInterval(ti);
                    deferred.reject("setupCSS fail");
                }
            }
        }, 10);
        return deferred.promise();
    }
    
    function downloadJavaScript(headNode, dynamicDom){
        console.log("downloadJavaScript");
        var deferred = $.Deferred();
        //TODO html 裡的 javascript
        var javascriptPool = Array.prototype.slice.call(dynamicDom.querySelectorAll("script")).map(function(item, i){
            var _deferred = $.Deferred();
            console.log("item.attributes.src.value:",item.attributes.src.value);
            var url = window.ResourceOrigin + item.attributes.src.value;
            if(EVN == "d") url = addRandom(url);
            
            core(0);
            function core(count){
                console.log("downloadJavaScript url:",url);
                $.ajax({
                    url: url,
                    dataType: "text",
                    timeout: 3000
                })
                .then(function(r){
                    //debug.log(i + ": done");
                    _deferred.resolve(r);
                    return r;
                })
                .fail(function(jqXHR, textStatus, errorThrown){
                    console.log("downloadJavaScript fail",textStatus);
                    if(count >= 2){
                        _deferred.reject(jqXHR, textStatus, errorThrown);
                    }else{
                        core(++count);
                    }
                })
            }
            
            return _deferred.promise();
        });
        
        downloadJSManager(0);
        
        function downloadJSManager(count){
            $.when.apply($, javascriptPool).done(function(){
                deferred.resolve(Array.prototype.slice.call(arguments));
            }).fail(function(jqXHR, textStatus, errorThrown){
                if(count > 2){
                    deferred.reject("downloadJS fail: " + errorThrown);
                }else{
                    downloadJSManager(++count);
                }
            });
        }
        
        return deferred.promise();
    }
    
    function setupJavaScript(jsList, headNode, dynamicDom){
        var deferred = $.Deferred();
        var fragment = document.createDocumentFragment();
        
        jsList.forEach(function(result){
            var script = document.createElement("SCRIPT");
            script.type = "text/javascript";
            script.text = result;
            fragment.appendChild(script);
        });
        headNode.appendChild(fragment);
        
        deferred.resolve();
        return deferred.promise();
    }
    
    function setupDom(dynamicDom){
        var deferred = $.Deferred();
        var body = document.querySelector("body");
        var dynamicDomBody = dynamicDom.querySelector("body");
        Array.prototype.slice.call(dynamicDomBody.attributes).forEach(function(att){
            body.setAttribute(att.nodeName, att.nodeValue);
        });
        
        var fragment = document.createDocumentFragment();
        
        move();
        function move(){
            var c = dynamicDomBody.firstChild;
            if(c != null){
                fragment.appendChild(c);
                move();
            }
        }
        
        body.appendChild(fragment);
        deferred.resolve();
        return deferred.promise();
    }
    
    function onPageReady(){
        if(status !== "AskExit"){
            window.removeEventListener("keydown", handlKeyBehavior, true);
        }
        status = "complete";
        hideLoading();
    }
    
    function onAssetError(msg){
        status = "Error";
        document.querySelector(".assets_error_msg").classList.add("show");
        document.querySelector(".assets_error_msg .attach").textContent = msg;
        hideLoading();
    }
    
    function handlAskExit(){
        AskExit.onStatusChange(function(_status){
            console.log("AskExit  " + _status);
            switch (_status) {
            case "open":
                status = "AskExit";
                break;
            case "close":
                if(status == "complete"){
                    window.removeEventListener("keydown", handlKeyBehavior, true);
                }else if(status == "AskExit"){
                    status = "";
                }
                break;
            case "exit":
                exitApp();
                break;
            default:
                break;
            }
        });
    }
    
    function exitApp(){
        try{
            return window.tizen.application.getCurrentApplication().exit();
        }catch(e){
            console.log("the device is not Samsung Tizen TV");
        }
    }
    
    function handlKeyBehavior(e){
        e.stopPropagation();
        e.stopImmediatePropagation();
        e.preventDefault();
        
        if(status == "" && e.keyCode == 10182){
            AskExit.open();
            return;
        }
        
        if(status == "Error"){
            exitApp();
            return;
        }
        
        if(AskExit.isShow()){
            AskExit.keyBehavior(e.keyCode);
            return;
        }
    }
    
    function hideLoading(){
        document.querySelector(".slider").style.display = "none";
    }
    
    function addRandom(url){
        return ((url.indexOf("?") >= 0)? url += "&" : url += "?") + Math.random().toString(36).substring(2);
    }
    
    init()
    .then(getPage)
    .then(render)
    .fail(onAssetError);
}());
