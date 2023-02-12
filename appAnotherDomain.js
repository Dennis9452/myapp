// At the top of your server.js
process.env.PWD = process.cwd()
var express = require('express');
var bodyParser = require('body-parser');
const http = require("http");
const fs = require('fs');
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

var router = express.Router();


// bodyParser.urlencoded解析form表單提交的資料
router.use(bodyParser.urlencoded({extended: false}));
// bodyParser.json解析json資料格式的
router.use(bodyParser.json());

// Add headers
router.use(function (req, res, next) {

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


router.get('/cnsDemo',function(req,res){
	res.sendfile('./cnsDemo.html')
})
router.get('/',function(req,res){
	res.sendfile('./indexNew.html')
})
router.get('/qrcode',function(req,res){
	res.sendfile('./qrcode.html')
})
router.get('/test',function(req,res){
	res.sendfile('./testing.html')
})
router.get('/9box',function(req,res){
	res.sendfile('./9box_object.html')
})
router.get('/logserver',function(req,res){
	res.sendfile('./LogServer.html')
})
router.get('/untitled',function(req,res){
	res.sendfile('./untitled.html')
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

router.post('/log',function(req, res){
	// 物件轉換為字串
	// input = req.query.input;
	// console.log(req);
	console.log(req.body)
	var str_json = JSON.stringify(req.body); 
	console.log(str_json)
	
	fs.appendFile("log/logger.txt",req.body.msg + '\n', 'utf8', function(){
		// 儲存完成後的回撥函式
		console.log("input 儲存");
	});
	res.send()
});

app.listen(8866, function () {
  console.log('Example app listening on port 8866!');
});