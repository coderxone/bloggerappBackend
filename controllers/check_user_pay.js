var db_multiple = require('../config/multiple_mysql.js');
var request = require('request');
var timeconverter = require("../models/timeconverter.js");
var Serialize = require('php-serialize');


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

                    payment_status = 1;

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



              socket.on('setCardData', function (data) {

                var email = data.email;

                socket.join(email);


                var location_point = data.location;
                var location_name = data.data.location;
                var address = data.data.address;
                var cardname = data.data.cardname;
                var cardnumber = data.data.cardnumber;
                var bankname = data.data.bankname;



                db_multiple.query('SELECT * FROM `carddata` WHERE `cardnumber` = ?', [cardnumber], function (error, results, fields) {

                  if(results.length > 0){
                      io.sockets.in(email).emit('setCardData',{status:"existcard"} );
                  }else{

                    var insert  = {
                      location_point: Serialize.serialize(location_point),
                      location_name:location_name,
                      address:address,
                      cardname:cardname,
                      cardname:cardname,
                      cardnumber:cardnumber,
                      user_email:email,
                      bankname:bankname
                    };

                    var query = db_multiple.query('INSERT INTO carddata SET ?', insert, function (error, results, fields) {

                      io.sockets.in(email).emit('setCardData',{status:"inserted"} );

                    });

                  }


                    });



              //


              });


              socket.on('checkCardData', function (data) {

                var email = data.email;

                socket.join(email);

                db_multiple.query('SELECT * FROM `carddata` WHERE `user_email` = ? ORDER BY `id` DESC', [email], function (error, results, fields) {

                    if(results.length > 0){
                        io.sockets.in(email).emit('checkCardData',{status:"ok",data:results} );
                    }else{
                        io.sockets.in(email).emit('checkCardData',{status:"noinfo"} );
                    }

                });


              });



              socket.on('deleteCard', function (data) {

                var email = data.email;
                var id = data.id;

                socket.join(email);

                db_multiple.query('DELETE FROM carddata WHERE id = ?', [id], function (error, results, fields) {


                    io.sockets.in(email).emit('deleteCard',{status:"ok",status:"deleted"} );


                });


              });



        });


};
