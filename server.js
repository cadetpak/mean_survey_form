// loads express module
var express = require('express');
//add this AFTER installing in body-parser
var bodyParser = require('body-parser');
// you need this to make paths ..
var path = require('path');
//invokes express 
var app = express();
// (The following must be set in THIS order RIGHT after var app = express(); -- A. Selects our port and listens)
var server = app.listen(8000, function() {
	console.log("Listening on port 8000!");
});
// B. Creates the IO variable
var io = require('socket.io').listen(server);
// C. Sets Sockets IO line (done!) now ALL of your Socket Code will go afterwards!
io.sockets.on('connection', function (socket) {
	// 2. when form is submitted and triggers socket in index.ejs, it will trigger posting_form function and pass 'data' ... 
	socket.on("posting_form", function (data){
		// creates random number
		var random_number = Math.floor((Math.random() * 1000) + 1);
		// 3.0  .. passed data then will be echoed and sent to socket.on 'updated_message' 
    	socket.emit('updated_message', {response: data});
    	//3.5 .. triggers random_number socket.on and passes the random_number we just generated as 'data'
    	socket.emit('random_number', {response: random_number});
	})
})
// need this to use body-parser
app.use(bodyParser.urlencoded());
// handles static content
app.use(express.static(path.join(__dirname, "./static")));
// sets up EJS and views folder
app.set('views', path.join(__dirname, 'views'));
// need for EJS
app.set('view engine', 'ejs');
// ROOT route, that renders index.ejs
app.get('/', function(req, res) {
	res.render('index');
})

