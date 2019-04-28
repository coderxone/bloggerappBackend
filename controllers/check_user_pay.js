var db_multiple = require('../config/multiple_mysql.js');
var request = require('request');
var timeconverter = require("../models/timeconverter.js");


module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('check_user_pay', function (data) {

                var device = data.device;

                socket.join(device);

                var check_phone = data.checkphone;

                //current time
                var current_unix_time = new Date().getTime();


                //current time

                db_multiple.query('SELECT * FROM `users_data` WHERE `phone` = ? AND check_pay = ? AND unix_time >= ? AND check_system = ? ORDER BY id desc', [check_phone, 1,current_unix_time,0], function (error, results, fields) {
                //db_multiple.query('SELECT * FROM `users_data` WHERE `phone` = ? AND check_pay = ?  ORDER BY id desc', [check_phone, 1], function (error, results, fields) {

                  var payment_status = 0;

                  if(results.length > 0){

                    //console.log(current_unix_time + "_" + results[0].unix_time);

                    //1550 8092 4685 0_1550 8078 2846 4

                    // if(current_unix_time > results[0].unix_time){
                    //   console.log("current >" + current_unix_time + ">");
                    // }else{
                    //   console.log("base >" + results[0].unix_time + ">");
                    // }
                    payment_status = 1;

                    //console.log(results[0].id);

                    results[0].unix_time = timeconverter.timeConverter_ru(results[0].unix_time);

                    //update database with system

                    var update_id = results[0].id;

                    db_multiple.query('UPDATE users_data SET check_system = ? WHERE id = ?', [1,update_id], function (error, results, fields) {

                      if(results.changedRows == 1){
                        console.log("updated");
                      }


                    });

                    //update database with system

                  }



                  io.sockets.in(device).emit('check_user_pay',{payment_status:payment_status,data:results[0]} );

                });
              //  io.sockets.in(device).emit('yandex_api',{data:data} );


              });



        });


};
