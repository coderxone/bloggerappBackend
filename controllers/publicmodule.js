var multiple_db = require('../config/multiple_mysql.js');
var formHelper = require("../models/formHelpers.js");
var timeconverter = require("../models/timeconverter.js");

module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('checkInstructions', function (data) {

                   socket.join(data.email);

                   multiple_db.query('SELECT * FROM `instructions`', function (error, results, fields) {

                     if(results.length > 0){
                        io.sockets.in(data.email).emit('checkInstructions', {status: 'ok',data:results});
                     }else{
                        io.sockets.in(data.email).emit('checkInstructions', {status: 'false'});
                     }

                       });



              });


              socket.on('sendInvestData', function (data) {

                   socket.join(data.email);



                   var insert  = {
                     sum: formHelper.cleanString(data.sum),
                     stockprice:formHelper.cleanString(data.stockprice),
                     count:formHelper.cleanString(data.count),
                     useremail:formHelper.cleanString(data.email)
                   };



                     var query = multiple_db.query('INSERT INTO investors SET ?', insert, function (error, results, fields) {
                       if (error) throw error;

                       //console.log(results.insertId);
                       //console.log(fields);

                       io.sockets.in(data.email).emit('sendInvestData', {status:"ok",insertId:results.insertId});

                     });





              });



        });


};
