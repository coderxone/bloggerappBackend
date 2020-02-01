var multiple_db = require('../config/multiple_mysql.js');
var formHelper = require("../models/formHelpers.js");
var timeconverter = require("../models/timeconverter.js");

module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('checkTask', function (data) {

                   socket.join(data.email);

                   multiple_db.query('SELECT UsersData.url FROM UsersData INNER JOIN complete_task ON UsersData.id = complete_task.task_id WHERE complete_task.user_email = ? AND complete_task.payed = ?;', [data.email,0], function (error, results, fields) {

                     if(results.length > 0){
                            io.sockets.in(data.email).emit('checkTask', {status: 'ok',data:results});
                         }else{
                           io.sockets.in(data.email).emit('checkTask', {status: 'false'});
                         }

                       });



              });


              socket.on('checkPayout', function (data) {

                   socket.join(data.email);

                   multiple_db.query('SELECT * FROM `payout` WHERE `user_email` = ? AND status = ?', [data.email,0], function (error, results, fields) {

                     if(results.length > 0){
                            io.sockets.in(data.email).emit('checkPayout', {status: 'existrequest'});
                         }else{

                           var date = timeconverter.getUnixtime();
                           var sum = data.sum;

                           var insert  = { user_email: data.email,date:date,sum:sum};

                           var query = multiple_db.query('INSERT INTO payout SET ?', insert, function (error, results, fields) {

                             io.sockets.in(data.email).emit('checkPayout', {status: 'ok'});

                           });

                         }

                       });



              });



        });


};
