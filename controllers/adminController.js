var db_multiple = require('../config/multiple_mysql.js');
var request = require('request');
var cryptLibrary = require("../models/cryptLibrary.js");
var FormHelper = require("../models/formHelpers.js");
var Serialize = require('php-serialize');
let systemCoreLogicsPrice = require('../models/systemCoreLogicsPrice.js');

module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('getAdminData', function (encrypt) {

                var data = cryptLibrary.decrypt(encrypt);
                var email = data.email;

                socket.join(email);

                  db_multiple.query('SELECT * FROM `Users` ORDER BY `id` DESC;SELECT * FROM `UsersData` ORDER BY `id` DESC;SELECT complete_task.user_email,UsersData.email,UsersData.url FROM `complete_task` INNER JOIN UsersData ON complete_task.task_id = UsersData.id;', function (error, results, fields) {

                    for(var i = 0;i < results[0].length;i++){
                      if(results[0][i].socialNetworks != null){
                        results[0][i].socialNetworks = Serialize.unserialize(results[0][i].socialNetworks);
                      }else{
                        results[0][i].socialNetworks = 0;
                      }

                      if(results[0][i].ssn != null){
                        results[0][i].ssn = Serialize.unserialize(results[0][i].ssn);
                      }else{
                        results[0][i].ssn = 0;
                      }


                    }


                    io.sockets.in(email).emit('getAdminData',cryptLibrary.encrypt({users:results[0],orders:results[1],complete_task:results[2]}));

                  });



              });

              socket.on('ApproveUser', function (encrypt) {

                var data = cryptLibrary.decrypt(encrypt);
                var email = data.email;
                var action = data.action;
                var id = data.id;

                socket.join(email);

                db_multiple.query('UPDATE Users SET verified = ? WHERE id = ?', [action,id], function (error, results, fields) {

                  systemCoreLogicsPrice.updateDataCentralPrice();
                  io.sockets.in(email).emit('ApproveUser',cryptLibrary.encrypt({"status":"ok"}));

                });

              });


              socket.on('getUserData', function (encrypt) {

                var data = cryptLibrary.decrypt(encrypt);

                var checkemail = data.checkEmail;
                var deviceid = data.deviceid;

                socket.join(deviceid);


                  db_multiple.query('SELECT * FROM `Users` WHERE email = ?',[checkemail], function (error, results, fields) {

                    let profileObj = results[0];

                    if(profileObj.socialNetworks != null){
                      profileObj.socialNetworks = Serialize.unserialize(profileObj.socialNetworks);
                    }
//xxx
                    io.sockets.in(deviceid).emit('getUserData',cryptLibrary.encrypt({result:profileObj}));

                  });



              });

              socket.on('updateUserDataField', function (encrypt) {

                try{
                  var data = cryptLibrary.decrypt(encrypt);

                  var deviceId = data.deviceId;
                  var email = data.email;
                  var includedData = data.data;

                  socket.join(deviceId);

                  var updateData = [


                    FormHelper.cleanString(includedData.firstName),
                    FormHelper.cleanString(includedData.lastName),
                    FormHelper.cleanString(includedData.bio),
                    email
                  ];

                  db_multiple.query('UPDATE Users SET firstName = ?,lastName = ?,bio = ? WHERE email = ?', updateData, function (error, results, fields) {

                    io.sockets.in(deviceId).emit('updateUserDataField',cryptLibrary.encrypt({status:"ok"}));


                  });
                }catch(e){

                }





              });


              socket.on('checkRate', function (encrypt) {

                var data = cryptLibrary.decrypt(encrypt);

                var checkid = data.id;
                var deviceid = data.deviceid;
                var currentRate = data.data.rate;
                var currentUserId = data.data.userId;
                var rateMessage = FormHelper.inputFilter(data.data.text);

                socket.join(deviceid);

                  db_multiple.query('SELECT Users.number_of_task,Users.raiting_stars,raiting.rate FROM `Users` INNER JOIN raiting ON Users.id = raiting.userid WHERE Users.id = ?',[currentUserId], function (error, results, fields) {

                    //console.log(results);
                    // 5 star - 252
                    // 4 star - 124
                    // 3 star - 40
                    // 2 star - 29
                    // 1 star - 33
                    //(5*252 + 4*124 + 3*40 + 2*29 + 1*33) / (252+124+40+29+33)
                    if(results.length > 0){
                          var CollectArray = new Array();
                          var countArray = new Array();
                          var count = 0;

                          var obj = {
                            rate:0,
                            count:count,
                            position:countArray
                          }

                          for(var i = 0;i < results.length;i++){
                              for(var j = 0;j < results.length;j++){
                                  if(results[i].rate == results[j].rate){

                                        var found = 0;
                                        for(var k = 0;k < CollectArray.length;k++){
                                          if(CollectArray[k].rate == results[i].rate){

                                            var fountInsertPosition = 0;
                                            for(var o = 0; o < CollectArray[k].position.length;o++){
                                              if(CollectArray[k].position[o] == i){
                                                fountInsertPosition = 1;
                                              }
                                            }

                                            if(fountInsertPosition == 0){
                                              CollectArray[k].count += 1;
                                              CollectArray[k].position.push(i);
                                            }

                                            found = 1;

                                          }
                                        }

                                        if(found == 0){

                                          countArray.push(i);

                                          obj = {
                                            rate:results[i].rate,
                                            count:1,
                                            position:countArray
                                          }
                                          CollectArray.push(obj);
                                        }
                                  }
                              }
                          }

                          var multipleSum = 0;
                          var CountSum = 0;

                          for(var p = 0;p < CollectArray.length;p++){
                              multipleSum += CollectArray[p].rate * CollectArray[p].count;
                              CountSum += CollectArray[p].count;
                          }

                          var result = multipleSum / CountSum;
                          var fixedResult = result.toFixed(1);


                          db_multiple.query('UPDATE Users SET raiting_stars = ? WHERE id = ?', [fixedResult,currentUserId], function (error, results, fields) {

                            io.sockets.in(deviceid).emit('setRate',cryptLibrary.encrypt({result:"ok"}));


                          });
                    }









                  });

              });



              socket.on('setRate', function (encrypt) {

                var data = cryptLibrary.decrypt(encrypt);

                var checkid = data.id;
                var deviceid = data.deviceid;
                var currentRate = data.data.rate;
                var currentUserId = data.data.userId;
                var rateMessage = data.data.text;

                socket.join(deviceid);

                db_multiple.query('SELECT * FROM `raiting` WHERE `userid` = ?', [currentUserId], function (error, results, fields) {

                  if(results.length > 0){
                      io.sockets.in(deviceid).emit('setRate',cryptLibrary.encrypt({status:"exist_user"}));
                  }else{
                    var insert  = { userid: currentUserId,rate:currentRate,text:rateMessage};

                    db_multiple.query('INSERT INTO raiting SET ?', insert, function (error, results, fields) {

                      io.sockets.in(deviceid).emit('setRate',cryptLibrary.encrypt({status:"ok"}));

                    });
                  }


                    });



              });

        });


};
