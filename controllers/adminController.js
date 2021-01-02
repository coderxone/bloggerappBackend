var db_multiple = require('../config/multiple_mysql.js');
var request = require('request');
var cryptLibrary = require("../models/cryptLibrary.js");


module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('getAdminData', function (data) {

                var email = data.email;

                socket.join(email);

                  db_multiple.query('SELECT * FROM `Users`;SELECT * FROM `UsersData` ORDER BY `id` DESC;SELECT complete_task.user_email,UsersData.email,UsersData.url FROM `complete_task` INNER JOIN UsersData ON complete_task.task_id = UsersData.id;', function (error, results, fields) {

                    //console.log(results[0]);

                    io.sockets.in(email).emit('getAdminData',{users:results[0],orders:results[1],complete_task:results[2]});

                  });



              });

              socket.on('getUserData', function (encrypt) {

                var data = cryptLibrary.decrypt(encrypt);

                var checkemail = data.checkEmail;
                var deviceid = data.deviceid;

                socket.join(deviceid);


                  db_multiple.query('SELECT * FROM `Users` WHERE email = ?',[checkemail], function (error, results, fields) {

                    //console.log(results);
                    io.sockets.in(deviceid).emit('getUserData',cryptLibrary.encrypt({result:results[0]}));

                  });



              });


              socket.on('setRate', function (encrypt) {

                var data = cryptLibrary.decrypt(encrypt);

                var checkid = data.id;
                var deviceid = data.deviceid;
                var currentRate = data.rate;

                socket.join(deviceid);

                  db_multiple.query('SELECT * FROM `Users` WHERE id = ?',[checkid], function (error, results, fields) {

                    // 5 star - 252
                    // 4 star - 124
                    // 3 star - 40
                    // 2 star - 29
                    // 1 star - 33
                    //(5*252 + 4*124 + 3*40 + 2*29 + 1*33) / (252+124+40+29+33)
                    
                    var databaseRate = results[0].raiting_stars;
                    var rated_count = results[0].rated_count;

                    var ResultRate = databaseRate
                    countsOfPerson
                    theirs rate





                    io.sockets.in(deviceid).emit('setRate',cryptLibrary.encrypt({result:results[0]}));

                  });

              });

        });


};
