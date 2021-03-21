var db_multiple = require('../config/multiple_mysql.js');
var request = require('request');
var cryptLibrary = require("../models/cryptLibrary.js");
var config = require("../config/config.js");


module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('load_all_info', function (encrypt) {

                var data = cryptLibrary.decrypt(encrypt);

                var deviceId = data.deviceId;

                socket.join(deviceId);


                  var currency_usd = 0;
                  var alldata = 0;

                  db_multiple.query('SELECT * FROM `currency` LIMIT 1;SELECT * FROM `appParams` LIMIT 1;SELECT * FROM `social_network_list`;SELECT * FROM `categories`;', function (error, results, fields) {

                    //console.log(results[0]);
                    currency_usd = results[0][0].ru_usd;
                    alldata = results[1][0];
                    var socialNetworkList = results[2];
                    var categories = results[3];

                    // console.log(categories);

                    io.sockets.in(deviceId).emit('load_all_info',cryptLibrary.encrypt({currency_usd:currency_usd,alldata:alldata,socialNetworkList:socialNetworkList,categories:categories}));

                  });



              });



        });


};
