var db_multiple = require('../config/multiple_mysql.js');
var request = require('request');
var formHelper = require("../models/formHelpers.js");
var timeconverter = require("../models/timeconverter.js");
var cryptLibrary = require("../models/cryptLibrary.js");


module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('test_function', function (data) {

                var deviceid = data.deviceid;

                socket.join(deviceid);

                io.sockets.in(data.deviceid).emit('setRegistration', cryptLibrary.encrypt({status: 'olduser',password:validate_pass}));
              //  io.sockets.in(device).emit('yandex_api',{data:data} );


              });



        });


};
