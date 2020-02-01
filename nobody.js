var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');
var get_currencies = require("./services/get_currencies.js");

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var db = require('./config/db.js');

//socket io another files

//1 Start initialUserData table contains request from Form and Users contains Data
require('./controllers/getAllData.js')(io);
require('./controllers/google_auto_login.js')(io);	//google login
require('./controllers/setRole.js')(io);		//setUsersRole
require('./controllers/searchCity.js')(io);		//main page searchCities
//Role 1 searching people //role 2 delivering people
require('./controllers/sendFormData.js')(io);	//send from Form UsersData table from role 1 and role 2
require('./controllers/getDetailsData.js')(io);	//
require('./controllers/message.js')(io);	//
require('./controllers/onlineUsers.js')(io);	//
require('./controllers/notification.js')(io);	//
require('./controllers/favorite.js')(io);	//
require('./controllers/setPhoneNumber.js')(io);	//
require('./controllers/authorization.js')(io);	//
require('./controllers/sendmail.js')(io);	//
require('./controllers/myrequest.js')(io);	//
require('./controllers/load_all_info.js')(io);	//
require('./controllers/setVideoUrl.js')(io);	//
require('./controllers/check_user_pay.js')(io);	//
require('./controllers/getmoney.js')(io);	//
require('./controllers/publicmodule.js')(io);	//
require('./controllers/adminController.js')(io);	//
//require('./controllers/managementPaypal.js')(io);	//




//socket io another files


//module.exports = connection;

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});


//connect to database

var checkob = require('./controllers/rest_checkobyavl.js');

app.use('/service', [checkob]);
//connect to database

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    //console.log('user disconnected');
  });

  // socket.on('chat message2', function(msg){

  // 	console.log('message: ' + msg);

  // 	io.emit('chat message2', msg);


  // });





});



//time to send
var time_message_obj = {
	"time":7,
	"minutes":0,
	"seconds":0,
}

// var time_message_obj2 = {
// 	"time":15,
// 	"minutes":0,
// 	"seconds":0,
// }


//time to send


function setMessage_email(){

	request.get({url:'http://kazpoisk.kz/public_control/searchusersneirointellect'}, function(err,httpResponse,body){

					console.log(body);

				 })

			 	console.log("send_message");


}


// setInterval(function(){
//
//
// 	var date = new Date();
//
// 	var hour = date.getHours();
//
// 	var minutes = date.getMinutes();
//
// 	var seconds = date.getSeconds();
//
// 	if((time_message_obj["time"] == hour) && (time_message_obj['minutes'] == minutes) &&
// 	 (time_message_obj['seconds'] == seconds)){
		//setMessage_email();
//	}

	// if((time_message_obj2["time"] == hour) && (time_message_obj2['minutes'] == minutes) &&
	//  (time_message_obj2['seconds'] == seconds)){
	// 	setMessage_email();
	// }

	//console.log(hour + " : " + minutes + " : " + seconds);


// },1000);


setInterval(function(){

	var currencies = get_currencies.get_russian_currencies();
	console.log("currencies");

},3600000);

// },15000);


//Чтобы отправить событие всем, Socket.IO дает нам io.emit:

//io.emit('some event', { for: 'everyone' });

// Если вы хотите отправить сообщение всем, кроме определенного сокета, у нас есть broadcastфлаг:


// io.on('connection', function(socket){
//   socket.broadcast.emit('hi');
// });

//В этом случае, для простоты, мы отправим сообщение всем, включая отправителя.

//io.emit('chat message', msg);



http.listen(3002, function(){
  console.log('listening on *:3002');
});


//oauth

//id - 576874011707-msm2ukk539im8j2eb7g4r7nfai6t6kvi.apps.googleusercontent.com
//secret - dVZQNbA7gdgonbBNk0Nl3cLC
//api key - AIzaSyAx_uUJAVLwV39R89rVE4SscXjDan0i1cE
