var multiple_db = require('../config/multiple_mysql.js');
var formHelper = require("../models/formHelpers.js");
var Serialize = require('php-serialize');
var timeconverter = require("../models/timeconverter.js");
var cryptLibrary = require("../models/cryptLibrary.js");
var timeLibrary = require("../models/timeconverter.js");


module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('sendFormData', function (encrypt) {

                   var data = cryptLibrary.decrypt(encrypt);

                   socket.join(data.deviceid);

                   var LocationData = JSON.parse(data.data.coord)

                   var locationPoints = LocationData.fullData;

                   var geometryLat = LocationData.geometry.lat;
                   var geometryLong = LocationData.geometry.lng;

                   // console.log(LocationData);
                   // return false;
                   //console.log(role);

                   var insert  = {
                     url: formHelper.cleanString(data.data.title),
                     location_name:formHelper.cleanString(LocationData.title),
                     location_points:Serialize.serialize(locationPoints),//shifr
                     lat:geometryLat,
                     lng:geometryLong,
                     date: timeLibrary.convertToUnixjsGetTime(formHelper.cleanString(data.data.date)),
                     time: timeLibrary.getUnixfromDate_Time(formHelper.cleanString(data.data.date + " " + data.data.time)),
                     sum: formHelper.cleanString(data.data.amount),
                     description: formHelper.cleanString(data.data.description),
                     role:2,
                     email:data.email,
                     peoplecount:formHelper.cleanString(data.data.peopleCount),
                     subscribers:formHelper.cleanString(data.data.subscribers),
                     countvideo:formHelper.cleanString(data.data.peopleCount)
                   };



                     var query = multiple_db.query('INSERT INTO UsersData SET ?', insert, function (error, results, fields) {
                       if (error){
                          console.log(error);
                       }

                       console.log(results.insertId);

                       var encrypt = cryptLibrary.encrypt({status:"ok",insertId:results.insertId});

                       io.sockets.in(data.deviceid).emit('sendFormData',encrypt );

                     });





              });


              socket.on('setPaymentDb', function (encrypt) {

                   var data = cryptLibrary.decrypt(encrypt);

                   socket.join(data.deviceid);
                   var insertId = data.insertId;
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

                       io.sockets.in(data.deviceid).emit('checkPayments', cryptLibrary.encrypt({status: 'ok',count:results.length,montharray:montharray,monthcount:monthcount,data:results}));

                     }else{
                       io.sockets.in(data.deviceid).emit('checkPayments', cryptLibrary.encrypt({status: 'false'}));
                     }



                   });


              });



        });


};
