var multiple_db = require('../config/multiple_mysql.js');
var formHelper = require("../models/formHelpers.js");
var timeconverter = require("../models/timeconverter.js");
var cryptLibrary = require("../models/cryptLibrary.js");

module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('setRegistration', function (encryptData) {

                  var data = cryptLibrary.decrypt(encryptData);

                  socket.join(data.deviceid);

                  //console.log(data);

                   var email = formHelper.cleanString(data.email);
                   var password = formHelper.cleanString(data.password);


                   multiple_db.query('SELECT * FROM `Users` WHERE `email` = ? LIMIT 1', [email], function (error, results, fields) {

                     if(results.length > 0){
                            var database_pass = results[0].password;
                            var database_email = results[0].email;
                            var role = results[0].role;
                            var validate_pass = false;

                            if(database_pass == password){
                              validate_pass = true;
                            }

                            io.sockets.in(data.deviceid).emit('setRegistration', cryptLibrary.encrypt({status: 'olduser',password:validate_pass,role:role}));
                         }else{
                           var insert  = { email: email,password:password};

                           var query = multiple_db.query('INSERT INTO Users SET ?', insert, function (error, results, fields) {
                             if (error) throw error;

                             io.sockets.in(data.deviceid).emit('setRegistration', cryptLibrary.encrypt({status: 'newuser'}));

                           });
                         }


                       });



              });

              socket.on('setRestorePassword', function (encryptData) {


                   var data = cryptLibrary.decrypt(encryptData);

                   socket.join(data.deviceid);

                   //console.log(data);
                   var email = formHelper.cleanString(data.email);


                   multiple_db.query('SELECT * FROM `Users` WHERE `email` = ? LIMIT 1', [email], function (error, results, fields) {

                     if(results.length > 0){
                            //results[0].password
                              //send new email
                              io.sockets.in(data.deviceid).emit('setRestorePassword', cryptLibrary.encrypt({status: 'correct',data:results[0]}));


                         }else{
                              io.sockets.in(data.deviceid).emit('setRestorePassword', cryptLibrary.encrypt({status: 'usernotfound'}));
                         }


                       });



              });



        });


};
