/* var port = process.argv[2] || process.env.PORT || 8101;

var express = require('express');
var app = express();
var join = require('path').join;

var Gun = require('gun');
var gun = new Gun('https://guntestgiovanni.herokuapp.com/gun');

//gun.wsp(app);

var www = join(__dirname, 'www');
app.use(express.static(www));

app.listen(port, function () {
	console.log('Server started on port', port, 'with /gun');
}); */

'use strict';

var Gun = require('gun');
var http = require('http');
var port = process.env.PORT || 8081;
var fs = require('fs');

// Listens on /gun.js route.
var server = http.Server();

// Serves up /index.html
server.on('request', function (req, res) {
	if(Gun.serve(req, res)){ return }
	if (req.url === '/' || req.url === '/index.html') {
		fs.createReadStream('index.html').pipe(res);
	}
});

var gun = Gun({
	web: server // Handles real-time requests and updates.
});

server.listen(port, function () {
	console.log('\nApp listening on port', port);
});
