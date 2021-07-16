var multiple_db = require('../config/multiple_mysql.js');
var formHelper = require("../models/formHelpers.js");
var timeconverter = require("../models/timeconverter.js");
var cryptLibrary = require("../models/cryptLibrary.js");
var short = require('short-uuid');

module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('setRegistration', function (encryptData) {

                  var data = cryptLibrary.decrypt(encryptData);

                  socket.join(data.deviceid);

                  //console.log(data);

                   var email = formHelper.cleanString(data.email);
                   var password = formHelper.cleanString(data.password);
                   var name = formHelper.cleanString(data.name);
                   var picture = formHelper.cleanString(data.picture);
                   var social = data.social;
                   var facebookToken = data.facebookToken;
                   var googleToken = data.googleToken;

                   var socialUpdateOption = 0;
                   if(facebookToken == 0){
                     socialUpdateOption = 1;
                   }
                   if(googleToken == 0){
                     socialUpdateOption = 0;
                   }

                   var generatedLink = short.generate();

                   multiple_db.query('SELECT * FROM `Users` WHERE `email` = ? LIMIT 1', [email], function (error, results, fields) {

                     if(results.length > 0){
                            var database_pass = results[0].password;
                            var database_email = results[0].email;
                            var role = results[0].role;
                            var validate_pass = false;
                            var additionalData = results[0].firstName;

                            if(database_pass == password){
                              validate_pass = true;
                            }

                            if(social == 1){
                              validate_pass = true;
                            }

                            //picture update profile picture
                            multiple_db.query('UPDATE `Users` SET `image_url` = ? WHERE `email` = ?', [picture,email], function (error, results, fields) {
                                io.sockets.in(data.deviceid).emit('setRegistration', cryptLibrary.encrypt({status: 'olduser',password:validate_pass,role:role,additionalData:additionalData}));
                            });
                            //picture update profile picture

                            //update social token
                            if(socialUpdateOption == 0){
                              multiple_db.query('UPDATE `Users` SET `facebookAccessToken` = ? WHERE `email` = ?', [facebookToken,email], function (error, results, fields) {
                                  io.sockets.in(data.deviceid).emit('setRegistration', cryptLibrary.encrypt({status: 'olduser',password:validate_pass,role:role,additionalData:additionalData}));
                              });

                            }else{
                              multiple_db.query('UPDATE `Users` SET `googleAccessToken` = ? WHERE `email` = ?', [googleToken,email], function (error, results, fields) {
                                  io.sockets.in(data.deviceid).emit('setRegistration', cryptLibrary.encrypt({status: 'olduser',password:validate_pass,role:role,additionalData:additionalData}));
                              });
                            }
                            //update social token








                         }else{
                           var insert  = { email: email,password:password,name:name,image_url:picture,link:generatedLink,facebookAccessToken:facebookToken,googleAccessToken:googleToken};

                           var query = multiple_db.query('INSERT INTO Users SET ?', insert, function (error, results, fields) {
                             if (error) throw error;

                             io.sockets.in(data.deviceid).emit('setRegistration', cryptLibrary.encrypt({status: 'newuser',link:generatedLink,email:email}));

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


              socket.on('setconfirm', function (encryptData) {


                   var data = cryptLibrary.decrypt(encryptData);

                   socket.join(data.deviceid);

                   //console.log(data);
                   var hash = formHelper.cleanString(data.hash);
                   //console.log(hash);


                   multiple_db.query('UPDATE Users SET email_confirmed = ? WHERE link = ?', [1, hash], function (error, results, fields) {


                              io.sockets.in(data.deviceid).emit('setconfirm', cryptLibrary.encrypt({status: 'ok'}));


                       });



              });



        });


};
