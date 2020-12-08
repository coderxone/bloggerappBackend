var multiple_db = require('../config/multiple_mysql.js');
var formHelper = require("../models/formHelpers.js");
var Serialize = require('php-serialize');
var timeconverter = require("../models/timeconverter.js");
var cryptLibrary = require("../models/cryptLibrary.js");


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
                     url: formHelper.cleanString(data.title),
                     location_name:formHelper.cleanString(LocationData.title),
                     location_points:Serialize.serialize(locationPoints),//shifr
                     lat:geometryLat,
                     lng:geometryLong,
                     date: new Date(data.date).getTime(),
                     time: new Date(data.time).getTime(),
                     sum: formHelper.cleanString(data.data.amount),
                     description: formHelper.cleanString(data.data.description),
                     role:2,
                     email:data.email,
                     peoplecount:formHelper.cleanString(data.data.peopleCount),
                     subscribers:formHelper.cleanString(data.data.subscribers),
                     countvideo:formHelper.cleanString(data.data.peopleCount)
                   };



                     var query = multiple_db.query('INSERT INTO UsersData SET ?', insert, function (error, results, fields) {
                       if (error) throw error;

                       //console.log(results.insertId);
                       //console.log(fields);

                       io.sockets.in(data.deviceid).emit('sendFormData', {status:"ok",insertId:results.insertId});

                     });





              });


              socket.on('setPaymentDb', function (data) {

                   socket.join(data.email);
                   var id = data.id;

                   multiple_db.query('UPDATE UsersData SET pay_status = ? WHERE id = ?', [1,id], function (error, results, fields) {


                       io.sockets.in(data.email).emit('setPaymentDb', {status:"ok"});



                   });


              });


              socket.on('checkPayments', function (data) {

                   socket.join(data.email);

                   var montharray = new Array();//filtration copy
                   var monthcount = new Array();//count array

                   multiple_db.query('SELECT * FROM UsersData WHERE pay_status = ?', [1], function (error, results, fields) {


                     if(results.length > 0){

                       for(var i = 0;i < results.length;i++){
                         results[i].month = timeconverter.getunixMonth(results[i].date);

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

                       io.sockets.in(data.email).emit('checkPayments', {status: 'ok',count:results.length,montharray:montharray,monthcount:monthcount,data:results});

                     }else{
                       io.sockets.in(data.email).emit('checkPayments', {status: 'false'});
                     }



                   });


              });



        });


};
