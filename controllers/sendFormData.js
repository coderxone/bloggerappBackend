var multiple_db = require('../config/multiple_mysql.js');
var formHelper = require("../models/formHelpers.js");
var Serialize = require('php-serialize');
var timeconverter = require("../models/timeconverter.js");
var cryptLibrary = require("../models/cryptLibrary.js");
var timeLibrary = require("../models/timeconverter.js");
var notificationBoxCentralMessages = require("../models/notificationBoxCentralMessages.js");


module.exports = function(io){


        io.on('connection', function(socket){

              socket.on('sendFormData', function (encrypt) {

                   var data = cryptLibrary.decrypt(encrypt);

                   socket.join(data.deviceid);

                   var type = data.data.type;

                   var timeNow = timeLibrary.newUnixTimeNow();

                   var insert = {};

                   if(type == 2){

                     var LocationData = JSON.parse(data.data.coord);
                     var locationPoints = LocationData.fullData;
                     var geometryLat = LocationData.geometry.lat;
                     var geometryLong = LocationData.geometry.lng;

                     insert  = {
                       url: formHelper.cleanString(data.data.url),
                       location_name:formHelper.cleanString(LocationData.title),
                       location_points:Serialize.serialize(locationPoints),//shifr
                       lat:geometryLat,
                       lng:geometryLong,
                       date: timeLibrary.convertToUnixjsGetTime(formHelper.cleanString(data.data.date)),
                       time: timeLibrary.convertToUnixjsGetTime(formHelper.cleanString(data.data.time)),
                       sum: formHelper.cleanString(data.data.amount),
                       description: formHelper.cleanText(data.data.description),
                       role:2,
                       email:data.email,
                       peoplecount:formHelper.cleanString(data.data.peopleCount),
                       subscribers:formHelper.cleanString(data.data.subscribers),
                       countvideo:formHelper.cleanString(data.data.countvideo),
                       gps:data.data.gps,
                       famous:data.data.famous,
                       companyName:formHelper.cleanString(data.data.companyName),
                       category:formHelper.cleanString(data.data.category),
                       businessAnswers:Serialize.serialize(data.data.businessAnswers),
                       type:type
                     };
                   }else if(type == 1){

                     var LocationData = JSON.parse(data.data.coord);
                     var locationPoints = LocationData.fullData;
                     var geometryLat = LocationData.geometry.lat;
                     var geometryLong = LocationData.geometry.lng;

                     insert  = {
                       url: formHelper.cleanString(data.data.url),
                       location_name:formHelper.cleanString(LocationData.title),
                       location_points:Serialize.serialize(locationPoints),//shifr
                       lat:geometryLat,
                       lng:geometryLong,
                       date: timeNow,
                       time: timeNow,
                       sum: formHelper.cleanString(data.data.amount),
                       description: formHelper.cleanText(data.data.description),
                       role:2,
                       email:data.email,
                       subscribers:formHelper.cleanString(data.data.subscribers),
                       companyName:formHelper.cleanString(data.data.companyName),
                       videourl:formHelper.cleanUrlString(data.data.videourl),
                       type:type
                     };

                   }else if(type == 3){

                     let automatic = data.data.automatic;
                     if(automatic){
                       automatic = 1;
                     }else{
                       automatic = 0;
                     }
                     insert  = {
                       url: 'company',
                       location_name:'temp',
                       location_points:Serialize.serialize('temp'),//shifr
                       lat:0,
                       lng:0,
                       date: timeNow,
                       time: timeNow,
                       sum: formHelper.cleanString(data.data.amount),
                       description: 'temp',
                       role:2,
                       email:'temp',
                       subscribers:0,
                       companyName:'temp',
                       videourl:'temp',
                       automatic:automatic,
                       type:type,
                     };
                   }else if(type == 4){

                     var LocationData = JSON.parse(data.data.coord);
                     var locationPoints = LocationData.fullData;
                     var geometryLat = LocationData.geometry.lat;
                     var geometryLong = LocationData.geometry.lng;

                     insert  = {
                       url: formHelper.cleanString(data.data.url),
                       location_name:formHelper.cleanString(LocationData.title),
                       location_points:Serialize.serialize(locationPoints),//shifr
                       lat:geometryLat,
                       lng:geometryLong,
                       description: formHelper.cleanText(data.data.description),
                       email:data.email,
                       subscribers:formHelper.cleanString(data.data.subscribers),
                       companyName:formHelper.cleanString(data.data.companyName),
                       videourl:formHelper.cleanUrlString(data.data.videourl),
                       type:1
                     };
                   }else if(type == 5){
                       var LocationData = JSON.parse(data.data.coord);
                       var locationPoints = LocationData.fullData;
                       var geometryLat = LocationData.geometry.lat;
                       var geometryLong = LocationData.geometry.lng;

                       insert  = {
                         url: formHelper.cleanString(data.data.url),
                         location_name:formHelper.cleanString(LocationData.title),
                         location_points:Serialize.serialize(locationPoints),//shifr
                         lat:geometryLat,
                         lng:geometryLong,
                         description: formHelper.cleanText(data.data.description),
                         email:data.email,
                         peoplecount:formHelper.cleanString(data.data.peopleCount),
                         subscribers:formHelper.cleanString(data.data.subscribers),
                         countvideo:formHelper.cleanString(data.data.countvideo),
                         gps:data.data.gps,
                         famous:data.data.famous,
                         companyName:formHelper.cleanString(data.data.companyName),
                         category:formHelper.cleanString(data.data.category),
                         businessAnswers:Serialize.serialize(data.data.businessAnswers),
                         type:2
                       };
                   }



                    if(type == 1 || type == 2){
                      var query = multiple_db.query('INSERT INTO UsersData SET ?', insert, function (error, results, fields) {
                        if (error){
                           //console.log(error);
                        }


                        var encrypt = cryptLibrary.encrypt({status:"ok",insertId:results.insertId,type:1});

                        io.sockets.in(data.deviceid).emit('sendFormData',encrypt );

                      });
                    }else if(type == 3){


                      const stepOne = (insert) => {
                        return new Promise((resolve) => {
                          var query = multiple_db.query('INSERT INTO UsersData SET ?', insert, function (error, results, fields) {
                              resolve(results.insertId);
                          });
                        })
                      }

                      const stepTwo = (creator,UsersDataId) => {

                        return new Promise((resolve) => {

                            let obj = {
                              UsersDataId:UsersDataId,
                              email:creator.email,
                              userId:creator.id
                            }
                            var query = multiple_db.query('INSERT INTO UsersDataCreators SET ?', obj, function (error, results, fields) {
                                resolve("ok");
                            });
                        })
                      }

                      const requestStepTwoWithList = async (list,UsersDataId) => {
                          return await Promise.all(list.map(item => stepTwo(item,UsersDataId)))
                      }


                      const run = async (tableOneData,creators) => {
                        const insertId = await stepOne(tableOneData);
                        let result;
                        if(creators.length > 0){
                           result = await requestStepTwoWithList(creators,insertId);
                        }else{
                          result = [];
                        }


                        return {usersInserted:result.length,insertId:insertId};
                      }

                      run(insert,data.data.creators).then(response => {
                          var encrypt = cryptLibrary.encrypt({status:"ok",insertId:response.insertId,type:3});
                          io.sockets.in(data.deviceid).emit('sendFormData',encrypt );
                      });





                    }else if(type == 4){
                      let updateId = parseInt(data.data.updateId);

                      multiple_db.query('UPDATE UsersData SET ? WHERE id =' + updateId, insert , function (error, results, fields) {


                        var encrypt = cryptLibrary.encrypt({status:"ok",insertId:updateId,type:4});
                        io.sockets.in(data.deviceid).emit('sendFormData',encrypt);


                      });
                    }else if(type == 5){
                      let updateId = parseInt(data.data.updateId);

                      multiple_db.query('UPDATE UsersData SET ? WHERE id =' + updateId, insert , function (error, results, fields) {

                        var encrypt = cryptLibrary.encrypt({status:"ok",insertId:updateId,type:5});
                        io.sockets.in(data.deviceid).emit('sendFormData',encrypt);

                      });
                    }







              });


              socket.on('setPaymentDb', function (encrypt) {

                   var data = cryptLibrary.decrypt(encrypt);

                   socket.join(data.deviceid);
                   var insertId = data.insertId;
                   var email = data.email;
                   var transactionData = data.transactionData;

                   // var sendObject = {
                   //      "insertId":insertId,
                   //      "transactionId":transactionId,
                   //      "orderId":orderId,
                   //      "payerID":payerID,
                   //      "payerEmail":payerEmail,
                   //      "given_name":given_name,
                   //      "surname":surname,
                   //      "amount":amount
                   //    }

                   multiple_db.query('UPDATE UsersData SET pay_status = ? WHERE id = ?', [1,insertId], function (error, results, fields) {

                    if(transactionData.type == "payment"){
                        var insert  = {
                          transactionId: transactionData.transactionId,
                          orderId:transactionData.orderId,
                          unix_time:timeLibrary.convertPayPalDateToUnix(transactionData.create_time),
                          payerID:transactionData.payerID,
                          email:transactionData.payerEmail,
                          given_name:transactionData.given_name,
                          surname:transactionData.surname,
                          amount:transactionData.amount
                        };


                        var query = multiple_db.query('INSERT INTO transactions SET ?', insert, function (error, results, fields) {

                          if(error){
                            console.log(error);
                          }

                          io.sockets.in(data.deviceid).emit('setPaymentDb', cryptLibrary.encrypt({status:"ok"}));

                        });
                    }else if(transactionData.type == "subscription"){

                      let insert = {
                        "insertId":insertId,
                        "billingToken":transactionData.billingToken,
                        "facilitatorAccessToken":transactionData.facilitatorAccessToken,
                        "orderID":transactionData.orderID,
                        "paymentID":transactionData.paymentID,
                        "subscriptionID":transactionData.subscriptionID,
                        "email":email,
                        "amount":transactionData.amount,
                        "date":timeLibrary.newUnixTimeNow()
                      }
                      //xxx

                      var query = multiple_db.query('INSERT INTO paypal_subscriptions SET ?', insert, function (error, results, fields) {

                        if(error){
                          console.log(error);
                        }

                        io.sockets.in(data.deviceid).emit('setPaymentDb', cryptLibrary.encrypt({status:"ok"}));

                      });

                    }




                   });




              });


              socket.on('checkPayments', function (encrypt) {

                   var data = cryptLibrary.decrypt(encrypt);
                   socket.join(data.deviceid);
                   var checkid = data.id;

                   var montharray = new Array();//filtration copy
                   var monthcount = new Array();//count array

                   multiple_db.query('SELECT * FROM UsersData WHERE pay_status = ? AND id = ?', [1,checkid], function (error, results, fields) {


                     if(results.length > 0){

                       for(var i = 0;i < results.length;i++){
                         results[i].month = timeconverter.getunixMonth(results[i].date);
                         var CurrentMonth = timeconverter.getcurrentMonth();

                         var unixDate = timeconverter.getUnixDate(results[i].date);
                         var currentDate = timeconverter.getcurrentDate();

                         if(results[i].month == CurrentMonth){
                           results[i].monthVerified = true;
                         }else{
                           results[i].monthVerified = false;
                         }

                         if(unixDate == currentDate){
                           results[i].dateVerified = true;
                         }else{
                           results[i].dateVerified = false;
                         }



                         if(montharray.length > 0){
                           var fix = 0;
                           for(var j = 0;j < montharray.length;j++){
                             if(montharray[j].month == results[i].month){
                               fix = 1;
                               monthcount[j] = monthcount[j] + 1;
                             }
                           }

                           if(fix == 0){
                             montharray.push(results[i]);
                             monthcount.push(1);
                           }
                         }else{
                           montharray.push(results[i]);
                           monthcount.push(1);
                         }
                       }

                       //send push notification to every creator in the system about new request
                       //checkid
                       notificationBoxCentralMessages.sendNewTaskNotificationToAllBloggers(checkid);

                       io.sockets.in(data.deviceid).emit('checkPayments', cryptLibrary.encrypt({status: 'ok',count:results.length,montharray:montharray,monthcount:monthcount,data:results}));

                     }else{
                       io.sockets.in(data.deviceid).emit('checkPayments', cryptLibrary.encrypt({status: 'false'}));
                     }



                   });


              });



        });


};
