var multiple_db = require('../config/multiple_mysql.js');
var formHelper = require("../models/formHelpers.js");
var timeconverter = require("../models/timeconverter.js");

module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('setRegistration', function (data) {

                   socket.join(data.deviceid);

                   //console.log(data);

                   var email = formHelper.cleanString(data.email);
                   var name = formHelper.cleanString(data.name);
                   var password = formHelper.cleanString(data.password);


                   multiple_db.query('SELECT * FROM `Users` WHERE `email` = ? LIMIT 1', [email], function (error, results, fields) {

                     if(results.length > 0){
                            io.sockets.in(data.deviceid).emit('setRegistration', {status: 'olduser'});
                         }else{
                           var insert  = { email: email,name:name,password:password};

                           var query = multiple_db.query('INSERT INTO Users SET ?', insert, function (error, results, fields) {
                             if (error) throw error;

                             io.sockets.in(data.deviceid).emit('setRegistration', {status: 'newuser'});

                           });
                         }


                       });



              });

              socket.on('setLogin', function (data) {

                   socket.join(data.deviceid);

                   //console.log(data);

                   var email = formHelper.cleanString(data.email);
                   var password = formHelper.cleanString(data.password);


                   multiple_db.query('SELECT * FROM `Users` WHERE `email` = ? LIMIT 1', [email], function (error, results, fields) {

                     if(results.length > 0){

                            if(results[0].password == password){
                              io.sockets.in(data.deviceid).emit('setLogin', {status: 'correct',data:results[0]});
                            }else if(results[0].password != password){
                              io.sockets.in(data.deviceid).emit('setLogin', {status: 'notcorrect'});
                            }

                         }else{
                           io.sockets.in(data.deviceid).emit('setLogin', {status: 'usernotfound'});
                         }


                       });



              });



        });


};
