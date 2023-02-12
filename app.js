// At the top of your server.js
process.env.PWD = process.cwd()
var express = require('express');
var bodyParser = require('body-parser');
const http = require("http");
const https = require("https");
// var request = require("request");
const fs = require('fs');
const { resolve } = require('path');
let xmlFolder = './xmls/';


var app = express();

// Then
app.use(express.static(process.env.PWD + '/public'));
app.set("view engine", "ejs");

var jsonList = {'name':'deko','age':'24'};
var list = 
['angels.png','astros.png','athletics.png','brewers.png','cubs.png','dodgers.png','mets.png','nationals.png','pirates.png',
'rangers.png','redsox.png','tigers.png','yankees.png','athletics.png','brewers.png','cubs.png','dodgers.png','mets.png','nationals.png','pirates.png',
'rangers.png','brewers.png','cubs.png'];

var m3u8Video = "https://d3ujjf1689hb1a.cloudfront.net/v1/master/6a2999857be5fdeb9342686169b673c07b444750/4gtv-4gtv109/master.m3u8";

var router = express.Router();

//bodyParser.urlencoded解析form表單提交的資料
router.use(express.urlencoded({extended: false}));
// bodyParser.json解析json資料格式的
router.use(express.json());

// Add headers
router.use(function (req, res, next) {
	// console.log(req.headers);
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/',router)

router.get('/qrcodeUrlRequest',function(req, res){
	let responseJson = {
		qrcode: {
			animationType : "flip",
			size: 150,//Qrcode尺寸大小,  
			url: "https://www.facebook.com/",//qrcode網址,  
			//image: prefer not to use,
			startTime: 1,//qrcode出現時間, 
			duration: 30,//qrcode持續時間,
			qrcodeStyle:{
				style: "dots",//dots(default), Square
				color: "gray",
				backgroundColor: "rgba(154, 120, 195, 0.5)"//
			}
		},
		displayText: [
			{
				text : "text on a curve",
				textShow : 8,
				duration : 5,
			},
			{
				text : "secText showing",
				textShow : 10,
				duration : 5,
			}
		]
	}

	res.setHeader("content-type","application/json;charset=utf-8");
	res.send(JSON.stringify(responseJson));
})

router.get('/channel/log/:accID/:cdnName/:channelNum/:ProjectNum/:UA',function(req, res){
	console.log("file: ",req.headers);
	// console.log("systemInfo: ",req.params.systemInfo);
	var str = new Date(Date.now()).toLocaleString() + "||" + req.params.accID + "," +req.params.cdnName + "," +req.params.channelNum + "," +req.params.ProjectNum + "," + req.params.UA;
	// console.log(str);
	fs.appendFile('channelLog.txt', str + '\n', 'utf8', function(){
		// 儲存完成後的回撥函式
		console.log(str);
	});
	res.send();
	return;
})

router.get('/file/:fileName',function(req, res){
	console.log("file: ",req.params.fileName);
	// console.log("systemInfo: ",req.params.systemInfo);
	// res.setHeader("content-type","application/json;charset=utf-8");
	console.log(req.ip, new Date(Date.now()).toLocaleString());
	res.sendFile(process.env.PWD + '/public/'+req.params.fileName);
})

router.all('/tizen',function(req,res){
	// res.sendFile('./public/tizenEdenShow.json')
	fs.readFile("./public/testingTizen.json", "utf8", function(err, data){
	    if(err) throw err;
	    jsonData = JSON.parse(data);
	    // jsonData.expires = Math.ceil(Date.now()/1000+3600);
	    data = JSON.stringify(jsonData);
		res.setHeader("content-type","application/json;charset=utf-8");

	    //do operation on data that generates say resultArray;

	    console.log(req.ip,new Date(Date.now()).toLocaleString());
	    
	    res.send(data);

	    return ;
	 });
})
router.get('/absurdSQL',function(req,res){
	res.sendFile('./absurdSQL.html', { root: __dirname })
})
router.get('/rotate3d',function(req,res){
	res.sendFile('./rotate3D.html', { root: __dirname })
})
router.get('/indexedDB',function(req,res){
	res.sendFile('./indexedDB.html', { root: __dirname })
})
router.get('/calendar',function(req,res){
	res.sendFile('./calendar.html', { root: __dirname })
})
router.get('/calExample',function(req,res){
	res.sendFile('./calExample.html', { root: __dirname })
})
router.get('/',function(req,res){
	res.sendFile('./indexNew.html', { root: __dirname })
})
router.get('/qrcode',function(req,res){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.sendFile('./qrcode.html', { root: __dirname })
})
router.get('/qrcode_foodpanda',function(req,res){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.sendFile('./qrcode_foodpanda.html', { root: __dirname })
})
router.get('/qrcode_lancome',function(req,res){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.sendFile('./qrcode_lancome.html', { root: __dirname })
})
router.get('/test',function(req,res){
	res.sendFile('./video.html', { root: __dirname })
})
router.get('/9box',function(req,res){
	res.sendFile('./9box_object.html')
})
router.get('/logserver',function(req,res){
	res.sendFile('./LogServer.html')
})
router.get('/untitled',function(req,res){
	res.sendFile('./untitled.html', { root: __dirname })
})
router.post('/postJSON',function(req, res){
	// 物件轉換為字串
	var str_json = JSON.stringify(req.body); 
	fs.writeFile('graph.json', str_json, 'utf8', function(){
		// 儲存完成後的回撥函式
		console.log("儲存完成");
	});
	res.send(list);
	
});
router.post('/adMediaUrl',function(req, res){
	// 物件轉換為字串
	console.log(req.headers);
	console.log(req.body)
	var str_json = JSON.stringify(req.body); 
	// var useragent =  req.body.UA
	// var version = req.body.version
	fs.appendFile('adMediaUrl.txt', str_json + '\n', 'utf8', function(){
		// 儲存完成後的回撥函式
		console.log("adMediaUrl 儲存");
	});
});
router.post('/adid',function(req, res){
	// 物件轉換為字串
	// console.log(req.headers);
	console.log("ad:",req.body)
	// var str_json = JSON.stringify(req.body); 
	var version = JSON.stringify(req.body);
	fs.appendFile('samsungAd.txt', "ad: " + version + '\n', 'utf8', function(){
		// 儲存完成後的回撥函式
		console.log("ad儲存");
	});
	// res.send(JSON.stringify(jsonList));
});

router.post('/useragent',function(req, res){
	// 物件轉換為字串
	// console.log(req.headers);
	console.log(req.body)
	// var str_json = JSON.stringify(req.body); 
	var useragent =  req.body.UA
	var version = JSON.stringify(req.body);
	fs.appendFile('samsung.txt', version + ' : '+ useragent + '\n', 'utf8', function(){
		// 儲存完成後的回撥函式
		console.log("儲存");
	});
	// res.send(JSON.stringify(jsonList));
});

router.get('/accEvent/:name',function(req,res){
	var fileName = req.params.name;
	console.log(fileName);
	res.header("Content-Type",'application/json');
  	res.sendFile(process.env.PWD + '/public/'+ fileName);
})

router.get('/accInfo',function(req, res){
	// 物件轉換為字串
	// console.log(req.size);
	// console.log(req.query.frameId)
	var frameType = req.query.frameId;
	console.log(frameType)

	var jsonText = {
		"id": "53",
		"jsonrpc": "2.0",
		"result": [{
			"_id": "28",
			"client_id": "2A001996075CF2D4",
			"notice_type": "BILL",
			"notice_no": "28",
			"start_date": "2020-08-10T00:00:00Z",
			"end_date": "2020-08-30T00:00:00Z",
			"start_unix_time": 1597017600,
			"end_unix_time": 1598745600,
			"notice_message": "[頻道全餐]於 N天後 到期，請至 [購買/兌換]購買",
			"frame_id": "Launcher_Top",
			"action": null
		}]
	};
	if(frameType.indexOf("player") != -1){
		jsonText = {
			"id": "53",
			"jsonrpc": "2.0",
			"result": [{
				"_id": "28",
				"client_id": "2A001996075CF2D4",
				"notice_type": "BILL",
				"notice_no": "28",
				"start_date": "2020-08-10T00:00:00Z",
				"end_date": "2020-08-30T00:00:00Z",
				"start_unix_time": 1597017600,
				"end_unix_time": 1598745600,
				"notice_message": "[頻道全餐]於 N天後 到期",
				"frame_id": "player",
				"action": null
			}]
		};
	}
	console.log(jsonText)
	res.send(JSON.stringify(jsonText));
});

var count = 0;
router.get('/streaming.m3u8', function(req, res){
	//https://d3ujjf1689hb1a.cloudfront.net/v1/master/6a2999857be5fdeb9342686169b673c07b444750/4gtv-4gtv109/master.m3u8
	// let options = {
	// 	hostname: "integ.uidapi.com",
	// 	path: 'https://d3ujjf1689hb1a.cloudfront.net/v1/master/6a2999857be5fdeb9342686169b673c07b444750/4gtv-4gtv109/master.m3u8',
	// 	port:8443,
	// 	headers: { "Authorization": "Bearer WnlQ6cUEd4egikrg/ZYxj9hQdo6oA7nW+LhIBwsO0Kg=" }
	// };
	// console.log(req.body);
	var data = "";
	count ++;
	res.setHeader('content-type', 'application/x-mpegURL');

	// res.setHeader('content-type', 'text/plain; charset=utf-8');
	// res.setHeader('cache-control', 'no-cache, no-store');
	// res.setHeader('expires', '0');
	
	function init (){
		return new Promise(function(resolve, reject){
			// request({
			// 	// uri: "https://d3ujjf1689hb1a.cloudfront.net/v1/master/6a2999857be5fdeb9342686169b673c07b444750/4gtv-4gtv109/master.m3u8",
			// 	uri: "https://s-hebe.svc.litv.tv/hi/vod/KtL9gvtfeJI/4gtv-4gtv052-avc1_400000=5-mp4a_124000_zho=2.m3u8",
			// 	method: "GET",
			// 	timeout: 10000,
			// 	followRedirect: true,
			// 	maxRedirects: 10
			// 	}, function(error, response, body) {
			// 		if(error){
			// 			console.log(error)
			// 			reject(error);
			// 		}else{
			// 			data += body;
			// 			console.log(data)
			// 			resolve(data);
			// 		}
					
			// });
			
		})
	}
	init().then(function(data){
		// var domain = "https://d3ujjf1689hb1a.cloudfront.net/v1/manifest";
		console.log(data)
		var final = "";
		var str  = data.split("#EXTINF:4.0");
		
		
		str.forEach(function(data,index){
			
			if(data.indexOf(".ts") > -1 && index == 3){
				// var rep = data.replace(".ts","xwxadaw.ts");
				// final += rep;	
			}else if(data.indexOf(",\n") > -1){
				var rep = data.replace(",\n","#EXTINF:4.0,\n");
				final += rep;
			}
			else{
				final += data;
			}

		})
		// console.log(final)
		// console.log("count:"+count);
		// if(count > 10){
		// 	count = 0;
		// 	return res.sendStatus(403);
		// }else{
			return res.send(final);
		// }
		
		
	})
})

var time = new Date();
var minute = time.getMinutes();
router.get('/log',function(req, res){
	// 物件轉換為字串
	// input = req.query.input;
	console.log(req.query.input);
	// console.log(req.body)
	// var str_json = JSON.stringify(req.body); 
	// console.log(str_json)
	if(minute != time.getMinutes()){
		minute = time.getMinutes();
	}
	
	fs.appendFile("log/adLogger"+minute+".txt",req.query.input + '\n', 'utf8', function(){
		// 儲存完成後的回撥函式
		console.log(minute+"儲存");
	});
	res.send()
});

function onRequestXml(request, response) {
    console.log(`request origin: ${request.headers.origin}, url: ${request.url}`);
    let origin = request.headers.origin || '*';

    if (request.url.indexOf('/tracking') === 0) {
        response.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        });
        response.end();
    } else {
        let xmlFile = request.url;
        console.log(request.connection.remoteAddress)
        fs.readFile('./public/'+xmlFile, (err, data) => {
            let header = {
                'Access-Control-Allow-Origin': 'x',
                'Access-Control-Allow-Credentials': true
            };
            if (err) {
                response.writeHead(404, header);
                console.log('Not Found');
            } else {
                header['Content-Type'] = 'json/application';
                response.writeHead(200, header);
                response.write(data);
            }
            response.end();
        });
    }
}

function onRequestMedia(request, response) {
    console.log('media', request.headers);
    let mediaFile = request.url;
    fs.readFile('./'+mediaFile, (err, data) => {
        if (err) {
            response.writeHead(404);
        } else {
            response.writeHead(200, { "Content-Type": "video/mp4" });
            response.write(data);
        }
        response.end();
    });
}


var privateKey  = fs.readFileSync('./server.key', 'utf8');
var certificate = fs.readFileSync('./server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};
var httpsServer = https.createServer(credentials, app);


httpsServer.listen(8448,function () {
	console.log('Example app listening on port 8448!');
});
http.createServer(onRequestXml).listen(8888,function () {
  console.log('Example app listening on port 8888!');
});
http.createServer(onRequestMedia).listen(8887,function () {
  console.log('Example app listening on port 8887!');
});
app.listen(8800, function () {
  console.log('Example app listening on port 8800!');
});