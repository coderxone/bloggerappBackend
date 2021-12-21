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



var https = require('https').createServer(options,app,function(req,res){

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');


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

//https
//1 Start initialUserData table contains request from Form and Users contains Data
//try{
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
  require('./controllers/priceCore.js')(io);	//
  //require('./controllers/managementPaypal.js')(io);	//
// }catch(e){
//   console.log("controller exeption");
//   console.log(e);
// }

//https


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
require('./routeControllers/imageUpload')(app);
require('./routeControllers/videoUpload')(app);
require('./routeControllers/profileImageUpload')(app);
require('./routeControllers/profileBackgroundImageUpload')(app);
require('./routeControllers/newsUploadImage')(app);
require('./routeControllers/fastRequestsController.js')(app);
//app.use('/image', [imageUpload]);


io.on('connection', function(socket){
  //console.log('a user connected');

  socket.on('disconnect', function(){
    //console.log("disconnected memory cleared");
    delete io;
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
