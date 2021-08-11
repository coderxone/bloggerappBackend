var db_multiple = require('../config/multiple_mysql.js');
var request = require('request');
var cryptLibrary = require("../models/cryptLibrary.js");
var config = require("../config/config.js");
var Serialize = require('php-serialize');
var formHelper = require("../models/formHelpers.js");
let systemCoreLogics = require('../models/systemCoreLogics.js');

module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('updateUserData', function (encrypt) {

                var data = cryptLibrary.decrypt(encrypt);

                var deviceId = data.deviceId;
                var email = data.email;
                var includedData = data.data;

                socket.join(deviceId);

                //update db
                const UpdateDb = (includedData) => {
                  return new Promise(resolve => {

                    let checkssn = includedData.savetype.checkssn;
                    let socialcheck = includedData.savetype.socialcheck;

                    if((checkssn === true) && (socialcheck === true)){

                          var updateData = [
                            formHelper.cleanString(includedData.country),
                            Serialize.serialize(includedData.category),
                            formHelper.cleanString(includedData.age),
                            formHelper.cleanString(includedData.accountage),
                            formHelper.cleanString(includedData.firstName),
                            formHelper.cleanString(includedData.lastName),
                            formHelper.cleanString(includedData.nickName),
                            formHelper.cleanString(includedData.subscribers_count),
                            formHelper.cleanString(includedData.paypal),
                            Serialize.serialize(includedData.socialNetworks),
                            Serialize.serialize(includedData.ssn),
                            formHelper.cleanString(includedData.photo),
                            email
                          ];

                          db_multiple.query('UPDATE Users SET country = ?,category = ?,age = ?,accountAge = ?,firstName = ?,lastName = ?,nickName = ?,subscribers_count = ?,paypal = ?,socialNetworks = ?,ssn = ?,identityPicture = ? WHERE email = ?', updateData, function (error, results, fields) {

                            resolve(true);

                          });
                      }else if((checkssn === false) && (socialcheck === true)){
                          var updateData = [
                            formHelper.cleanString(includedData.country),
                            Serialize.serialize(includedData.category),
                            formHelper.cleanString(includedData.age),
                            formHelper.cleanString(includedData.accountage),
                            formHelper.cleanString(includedData.firstName),
                            formHelper.cleanString(includedData.lastName),
                            formHelper.cleanString(includedData.nickName),
                            formHelper.cleanString(includedData.subscribers_count),
                            formHelper.cleanString(includedData.paypal),
                            Serialize.serialize(includedData.socialNetworks),
                            Serialize.serialize(includedData.ssn),
                            email
                          ];

                          db_multiple.query('UPDATE Users SET country = ?,category = ?,age = ?,accountAge = ?,firstName = ?,lastName = ?,nickName = ?,subscribers_count = ?,paypal = ?,socialNetworks = ?,ssn = ? WHERE email = ?', updateData, function (error, results, fields) {

                            console.log(error)
                            resolve(true);

                          });
                      }else if((checkssn === false) && (socialcheck === false)){
                          var updateData = [
                            formHelper.cleanString(includedData.country),
                            Serialize.serialize(includedData.category),
                            formHelper.cleanString(includedData.age),
                            formHelper.cleanString(includedData.accountage),
                            formHelper.cleanString(includedData.firstName),
                            formHelper.cleanString(includedData.lastName),
                            formHelper.cleanString(includedData.paypal),
                            Serialize.serialize(includedData.ssn),
                            email
                          ];

                          db_multiple.query('UPDATE Users SET country = ?,category = ?,age = ?,accountAge = ?,firstName = ?,lastName = ?,paypal = ?,ssn = ? WHERE email = ?', updateData, function (error, results, fields) {

                            resolve(true);

                          });
                      }

                  })
                }
                //update db

                //running core function to count points
                const CountUserPoints = () => {
                  return new Promise(resolve => {
                    systemCoreLogics.checkCoreFunction(email).then(result => {
                      //console.log(result);
                      resolve(true);
                    });
                  })
                }

                //running core function to count points


                const StepByStep = async () => {
                  try{
                    const responseOne = await UpdateDb(includedData);
                    const responseTwo = await CountUserPoints(responseOne);
                    return responseTwo;
                  }catch(e){

                  }

                }

                StepByStep().then(response => {

                  io.sockets.in(deviceId).emit('updateUserData',cryptLibrary.encrypt({status:"ok"}));
                })


              });


              socket.on('setUserContacts', function (encrypt) {

                   var data = cryptLibrary.decrypt(encrypt);



                   var deviceid = data.deviceid;

                   socket.join(deviceid);





                   if(data.action == "checkstatus"){

                     if(data.type == "temp"){
                       db_multiple.query('SELECT `deviceid` FROM `Contacts` WHERE `deviceid` = ? LIMIT 1', [deviceid], function (error, results, fields) {

                         var devicestatus = 0;
                         if(results.length > 0){
                                checkingstatus = results[0].deviceid;
                             }

                             if(devicestatus == 0){
                               io.sockets.in(deviceid).emit('setUserContacts', cryptLibrary.encrypt({action: 'checkstatus',status:devicestatus,type:"temp"}));
                             }else{
                               io.sockets.in(deviceid).emit('setUserContacts', cryptLibrary.encrypt({action: 'checkstatus',status:devicestatus,type:"temp"}));
                             }


                           });
                     }else{

                       var email = data.email;

                       db_multiple.query('SELECT `contactstatus` FROM `Users` WHERE `email` = ? LIMIT 1;', [email], function (error, results, fields) {

                         var checkingstatus = 0;

                         console.log(checkingstatus);

                         if(results.length > 0){
                                checkingstatus = results[0].contactstatus;
                             }

                             if(checkingstatus == 0){
                               io.sockets.in(deviceid).emit('setUserContacts', cryptLibrary.encrypt({action: 'checkstatus',status:checkingstatus,type:"normal"}));
                             }else{
                               io.sockets.in(deviceid).emit('setUserContacts', cryptLibrary.encrypt({action: 'checkstatus',status:checkingstatus,type:"normal"}));
                             }


                           });
                     }



                   }else if(data.action == "setcontacts"){

                     var array = JSON.parse(data.array);

                     const serialized = Serialize.serialize(array);

                     if(data.type == "temp"){

                       db_multiple.query('SELECT `deviceid` FROM `Contacts` WHERE `deviceid` = ? LIMIT 1', [deviceid], function (error, results, fields) {

                         if(results.length < 1){

                             var insert  = { contacts: serialized,deviceid:deviceid};
                             db_multiple.query('INSERT INTO Contacts SET ?', insert, function (error, results, fields) {
                               io.sockets.in(data.deviceid).emit('setUserContacts', cryptLibrary.encrypt({action: 'setcontacts',status:'1',type:"temp"}));
                             });

                          }




                           });



                     }else{

                       var email = data.email;

                       db_multiple.query('UPDATE Users SET contacts = ?,contactstatus = ? WHERE email = ?', [serialized, 1, email], function (error, results, fields) {

                          io.sockets.in(data.deviceid).emit('setUserContacts', cryptLibrary.encrypt({action: 'setcontacts',status:'1',type:"normal"}));

                       });
                     }



                   }


              });

        });

};
