var multiple_db = require('../config/multiple_mysql.js');
var formHelper = require("../models/formHelpers.js");
var timeconverter = require("../models/timeconverter.js");
var notificationBox = require("../models/notificationBox.js");
var cryptLibrary = require("../models/cryptLibrary.js");
let notificationBoxCentralMessages = require('../models/notificationBoxCentralMessages.js');

module.exports = function(io){


        io.on('connection', function(socket){

              socket.on('Message', function (encrypt) {

                   var data = cryptLibrary.decrypt(encrypt);

                   socket.join(data.email);

                   var projectId = data.projectId;
                   //console.log(socket.rooms);

                   if(data.message == "init"){
                     return false;
                   }

                   var date = new Date().getTime();

                   var message = formHelper.cleanString(data.message);

                   var insert  = { message: message,fromEmail:data.email,toEmail:data.sendemail,date:date,projectId:projectId};

                   var query = multiple_db.query('INSERT INTO Messages SET ?', insert, function (error, results, fields) {
                     if (error) throw error;

                   });

                   var date = timeconverter.timeConverter_us(new Date().getTime());


                   //send aadditional notifications
                   notificationBoxCentralMessages.sendHyperSingle(data.email,message,data.sendemail);
                   //send aadditional notifications

                   io.sockets.to(data.sendemail).emit('Message', cryptLibrary.encrypt({message: data.message,fromEmail:data.email,toEmail:data.sendemail,date:date}));

              });

              socket.on("getAllMessages",function(encrypt){

                    var data = cryptLibrary.decrypt(encrypt);

                    socket.join(data.deviceid);

                    var newArray = new Array();

                    multiple_db.query('SELECT * FROM `Messages` WHERE `fromEmail` = ? AND toEmail = ? OR `fromEmail` = ? AND toEmail = ? ORDER BY id DESC LIMIT 40', [data.email, data.sendemail,data.sendemail,data.email], function (error, results, fields) {

                      if(results.length > 0){

                              for(var i = results.length - 1;i > -1;i--){

                                if(results[i]){
                                  results[i].date = timeconverter.timeConverter_us(results[i].date);
                                  newArray.push(results[i]);
                                }

                              }
                              io.sockets.to(data.deviceid).emit('getAllMessages', cryptLibrary.encrypt({data: newArray}));
                          }


                        });


                        //for(var j = 0;j < newArray.length;j++){

                          multiple_db.query('UPDATE Messages SET read_status = ? WHERE `fromEmail` = ? AND toEmail = ?', [1, data.sendemail,data.email], function (error, results, fields) {

                          });
                        //}



              });


              socket.on("getAllContactsMessages",function(encrypt){

                    var data = cryptLibrary.decrypt(encrypt);
                    socket.join(data.deviceid);

                    var not_same_array = new Array();
                    multiple_db.query('SELECT Messages.id,Messages.date,Messages.message, Messages.fromEmail,Messages.toEmail, Users.image_url,Users.name,Users.online FROM Messages INNER JOIN Users ON Messages.toEmail = Users.email WHERE Messages.fromEmail = ? ORDER BY id DESC', [data.email], function (error, results, fields) {


                      if(results){

                         if(results.length > 0){

                            //filtration the same from 1 people
                            for(var i = 0;i < results.length;i++){

                              if(not_same_array.length > 0){

                                var fix = 0;
                                for(var j = 0;j < not_same_array.length;j++){
                                    if(results[i].toEmail == not_same_array[j].toEmail){

                                      fix = 1;

                                    }
                                }

                                if(fix == 0){

                                  if(data.email != results[i].toEmail){
                                    results[i].date = timeconverter.timeConverter_us_time(results[i].date); //date convertiong function
                                    results[i].count = 0;
                                    not_same_array.push(results[i]);
                                  }

                                }
                              }else{
                                results[i].date = timeconverter.timeConverter_us_time(results[i].date); //date convertiong function
                                results[i].count = 0;
                                not_same_array.push(results[i]);
                              }

                            }

                            multiple_db.query('SELECT Messages.id,Messages.date,Messages.message, Messages.fromEmail,Messages.toEmail, Users.image_url,Users.name,Users.online FROM Messages INNER JOIN Users ON Messages.fromEmail = Users.email WHERE Messages.toEmail = ? ORDER BY id DESC', [data.email], function (error, resultstwo, fields) {


                              for(var i = 0;i < resultstwo.length;i++){

                                if(not_same_array.length > 0){

                                  var fix = 0;
                                  for(var j = 0;j < not_same_array.length;j++){
                                    //filtruem odinakovih otpravitelei s predidushimi zapisyami and s novimi zapisyami
                                      if((resultstwo[i].fromEmail == not_same_array[j].toEmail) || (resultstwo[i].fromEmail == not_same_array[j].fromEmail)){

                                        fix = 1;

                                      }
                                  }

                                  if(fix == 0){

                                    if(data.email != resultstwo[i].fromEmail){
                                      resultstwo[i].date = timeconverter.timeConverter_us_time(resultstwo[i].date); //date convertiong function
                                      resultstwo[i].count = 0;
                                      not_same_array.push(resultstwo[i]);
                                    }

                                  }
                                }else{
                                  resultstwo[i].date = timeconverter.timeConverter_us_time(resultstwo[i].date); //date convertiong function
                                  resultstwo[i].count = 0;
                                  not_same_array.push(resultstwo[i]);
                                }

                              }

                            });


                            //filtration the same

                              //counting
                                  multiple_db.query('SELECT fromEmail,toEmail FROM Messages WHERE toEmail = ? AND read_status = ? ORDER BY id DESC', [data.email,0], function (error, resultstthree, fields) {

                                      for(var p = 0;p < not_same_array.length;p++){
                                        for(var o = 0;o < resultstthree.length;o++){
                                          if(not_same_array[p].toEmail == resultstthree[o].fromEmail){
                                              not_same_array[p].count += 1;
                                          }else if(not_same_array[p].fromEmail == resultstthree[o].fromEmail){ //and check new record
                                              not_same_array[p].count += 1;
                                          }
                                        }
                                      }

                                      io.sockets.to(data.deviceid).emit('getAllContactsMessages', cryptLibrary.encrypt({data: not_same_array}));

                                  });
                                //counting



                            }else{
                              ///-----------------------
                              multiple_db.query('SELECT Messages.id,Messages.date,Messages.message, Messages.fromEmail,Messages.toEmail, Users.image_url,Users.name,Users.online FROM Messages INNER JOIN Users ON Messages.fromEmail = Users.email WHERE Messages.toEmail = ? ORDER BY id DESC', [data.email], function (error, resultstwo, fields) {


                                for(var i = 0;i < resultstwo.length;i++){

                                  if(not_same_array.length > 0){

                                    var fix = 0;
                                    for(var j = 0;j < not_same_array.length;j++){
                                      //filtruem odinakovih otpravitelei s predidushimi zapisyami and s novimi zapisyami
                                        if((resultstwo[i].fromEmail == not_same_array[j].toEmail) || (resultstwo[i].fromEmail == not_same_array[j].fromEmail)){

                                          fix = 1;

                                        }
                                    }

                                    if(fix == 0){

                                      if(data.email != resultstwo[i].fromEmail){
                                        resultstwo[i].date = timeconverter.timeConverter_us_time(resultstwo[i].date); //date convertiong function
                                        resultstwo[i].count = 0;
                                        not_same_array.push(resultstwo[i]);
                                      }

                                    }
                                  }else{
                                    resultstwo[i].date = timeconverter.timeConverter_us_time(resultstwo[i].date); //date convertiong function
                                    resultstwo[i].count = 0;
                                    not_same_array.push(resultstwo[i]);
                                  }

                                }

                              });


                              //filtration the same

                                //counting
                                    multiple_db.query('SELECT fromEmail,toEmail FROM Messages WHERE toEmail = ? AND read_status = ? ORDER BY id DESC', [data.email,0], function (error, resultstthree, fields) {

                                        for(var p = 0;p < not_same_array.length;p++){
                                          for(var o = 0;o < resultstthree.length;o++){
                                            if(not_same_array[p].toEmail == resultstthree[o].fromEmail){
                                                not_same_array[p].count += 1;
                                            }else if(not_same_array[p].fromEmail == resultstthree[o].fromEmail){ //and check new record
                                                not_same_array[p].count += 1;
                                            }
                                          }
                                        }

                                        io.sockets.to(data.deviceid).emit('getAllContactsMessages', cryptLibrary.encrypt({data: not_same_array}));

                                    });
                                  //counting
                              ///-----------------------
                            }




                        }


                        });






              });



              socket.on("setReaded",function(encrypt){

                    var data = cryptLibrary.decrypt(encrypt);

                    socket.join(data.toEmail);

                    //{message: data.message,fromEmail:data.email,,date:date}

                    //console.log(data);

                        multiple_db.query('UPDATE Messages SET read_status = ? WHERE message = ? AND toEmail = ? AND fromEmail = ? ORDER BY id DESC LIMIT 1', [1,data.message,data.toEmail,data.fromEmail], function (error, results, fields) {

                          io.sockets.to(data.toEmail).emit('setReaded', cryptLibrary.encrypt({read_status:"ok"}));

                        });

              });

              function sendMessageFromSystem(smessage,fromEmailh,toEmail){

                var date = new Date().getTime();

                var message = formHelper.cleanString(smessage);

                var insert  = { message: message,fromEmail:fromEmailh,toEmail:toEmail,date:date };

                console.log(insert);

                var query = multiple_db.query('INSERT INTO Messages SET ?', insert, function (error, results, fields) {
                  if (error) throw error;

                });

                notificationBox.sendHyperSingle("new message from " + fromEmailh,"<a href='echohub.io'>" + smessage + "</a>",smessage,toEmail);

                var date = timeconverter.timeConverter_us(new Date().getTime());

                //io.sockets.in(data.sendemail).emit('Message', {msg: data.message});
                io.sockets.to(toEmail).emit('Message', cryptLibrary.encrypt({message: message,fromEmail:fromEmailh,toEmail:toEmail,date:date}));

              }


              socket.on("checkAutomaticMessages",function(encryptData){

                    var data = cryptLibrary.decrypt(encryptData);


                    socket.join(data.deviceId);
                    var email = data.email;

                    var role = data.role;
                    var type = data.type;

                    multiple_db.query('SELECT * FROM `sendmessages` WHERE `role` = ? AND type = ?', [role, type], function (error, results, fields) {

                      if(results.length > 0){
                              //console.log(results);
                              for(var j = 0;j < results.length;j++){
                                var sendStatus = results[j].status;
                                if(sendStatus == 1){
                                  sendMessageFromSystem(results[j].text,results[j].fromEmail,email);
                                }

                              }

                              io.sockets.to(data.deviceId).emit('checkAutomaticMessages', cryptLibrary.encrypt({status:"ok"}));
                          }


                        });

              });



        });


};
