var https = require('https');
process.env.PWD = process.cwd()
const path = require('path')
var https = require('https');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
var fs = require('fs');

var app = express();
app.use(cors());
app.use(express.static(process.env.PWD + '/public'));
app.set("view engine", "ejs");
var options = {
  key: fs.readFileSync('./server-key.pem'),
  ca: [fs.readFileSync('./cert.pem')],
  cert: fs.readFileSync('./server-cert.pem')
};

app.get('/',function(req,res){
	res.sendFile(path.join(__dirname,'./mobilePad.html'));
})
https.createServer(options, function (req, res) {
  res.writeHead(200);
  // res.end('hello world\n');
  console.log("https")
}).listen(3443,'127.0.0.1');