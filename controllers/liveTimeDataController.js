var db_multiple = require('../config/multiple_mysql.js');
var request = require('request');
var cryptLibrary = require("../models/cryptLibrary.js");
var config = require("../config/config.js");


module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('liveTimeData', function (encrypt) {

                var data = cryptLibrary.decrypt(encrypt);

                var deviceId = data.deviceId;

                socket.join(deviceId);

                db_multiple.query('SELECT * FROM Users WHERE role = ?', [1], function (error, results, fields) {


                  if(results.length > 0){

                    io.sockets.in(deviceId).emit('liveTimeData',cryptLibrary.encrypt({results:results}));

                  }

                });

              });



        });


};
