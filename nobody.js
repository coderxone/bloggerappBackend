var express = require('express');
var fs = require('fs');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var cors = require('cors')
var get_currencies = require("./services/get_currencies.js");
var db = require('./config/db.js');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.options('*', cors());
app.use(cors());

var privateKey  = fs.readFileSync('certificates/echohub.key', 'utf8');
var certificate = fs.readFileSync('certificates/echohub.cert', 'utf8');
var ca = fs.readFileSync('certificates/echohub.ca-bundle', 'utf8');
var options = {
  key: privateKey,
  cert: certificate,
  ca:ca,
  requestCert: false,
  rejectUnauthorized: false
};

//var https = require('http').createServer(function(req,res){
var http = require('http').createServer(app,function(req,res){

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');


});

var https = require('https').createServer(options,app,function(req,res){

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');


});

var iohttp = require('socket.io')(http, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*", //or the specific origin you want to give access to,
            //"Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
          //  "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
});

var io = require('socket.io')(https, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*", //or the specific origin you want to give access to,
            //"Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
          //  "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
});

io.sockets.setMaxListeners(0);
iohttp.sockets.setMaxListeners(0);


//https
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
require('./controllers/subscribersCore.js')(io);	//
require('./controllers/updateUserData.js')(io);	//
require('./controllers/liveTimeDataController.js')(io);	//
//require('./controllers/managementPaypal.js')(io);	//
//https

//http
//1 Start initialUserData table contains request from Form and Users contains Data
require('./controllers/getAllData.js')(iohttp);
require('./controllers/google_auto_login.js')(iohttp);	//google login
require('./controllers/setRole.js')(iohttp);		//setUsersRole
require('./controllers/searchCity.js')(iohttp);		//main page searchCities
//Role 1 searching people //role 2 delivering people
require('./controllers/sendFormData.js')(iohttp);	//send from Form UsersData table from role 1 and role 2
require('./controllers/getDetailsData.js')(iohttp);	//
require('./controllers/message.js')(iohttp);	//
require('./controllers/onlineUsers.js')(iohttp);	//
require('./controllers/notification.js')(iohttp);	//
require('./controllers/favorite.js')(iohttp);	//
require('./controllers/setPhoneNumber.js')(iohttp);	//
require('./controllers/authorization.js')(iohttp);	//
require('./controllers/sendmail.js')(iohttp);	//
require('./controllers/myrequest.js')(iohttp);	//
require('./controllers/load_all_info.js')(iohttp);	//
require('./controllers/setVideoUrl.js')(iohttp);	//
require('./controllers/check_user_pay.js')(iohttp);	//
require('./controllers/getmoney.js')(iohttp);	//
require('./controllers/publicmodule.js')(iohttp);	//
require('./controllers/adminController.js')(iohttp);	//
require('./controllers/subscribersCore.js')(iohttp);	//
require('./controllers/updateUserData.js')(iohttp);	//
require('./controllers/liveTimeDataController.js')(iohttp);	//
//require('./controllers/managementPaypal.js')(io);	//
//http


//socket io another files


//module.exports = connection;

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

//connect to database

var checkob = require('./controllers/rest_checkobyavl.js');

app.use('/service', [checkob]);
//connect to database




//var checkob = require('./controllers/rest_checkobyavl.js');
var imageUpload = require('./routeControllers/imageUpload')(app);
var videoUpload = require('./routeControllers/videoUpload')(app);
//app.use('/image', [imageUpload]);


io.on('connection', function(socket){
  //console.log('a user connected');

  socket.on('disconnect', function(){
    //console.log("disconnected memory cleared");
    delete io;
  });




});

iohttp.on('connection', function(socket){
  //console.log('a user connected');

  socket.on('disconnect', function(){
    //console.log("disconnected memory cleared");
    delete iohttp;
  });




});




https.listen(3004, function(){
  console.log('listening on *:3004');
});

// http.listen(3002, function(){
//   console.log('listening on *:3002');
// });


//oauth

//id - 576874011707-msm2ukk539im8j2eb7g4r7nfai6t6kvi.apps.googleusercontent.com
//secret - dVZQNbA7gdgonbBNk0Nl3cLC
//api key - AIzaSyAx_uUJAVLwV39R89rVE4SscXjDan0i1cE
