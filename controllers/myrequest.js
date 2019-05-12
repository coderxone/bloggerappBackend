var multiple_db = require('../config/multiple_mysql.js');
var formHelper = require("../models/formHelpers.js");
var timeconverter = require("../models/timeconverter.js");

module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('checkMyrequest', function (data) {

                   socket.join(data.email);


                   multiple_db.query('SELECT * FROM `UsersData` WHERE email = ? ORDER BY id DESC;', [data.email], function (error, results, fields) {

                     //console.log(error);
                     if(results){
                       for(var i = 0;i < results.length;i++){
                         results[i].date = timeconverter.timeConverter_us_date(results[i].date);
                         results[i].time = timeconverter.timeConverter_us_time(results[i].time);
                     }
                       io.sockets.to(data.email).emit('checkMyrequest', {data: results});
                     }

                       });

              });

              socket.on('setDeleteorUpdate', function (data) {

                   socket.join(data.email);

                   var id = data.id;
                   var status = data.status;

                   var updatestatus = 1;

                   if(status == 1){
                     updatestatus = 0;
                   }


                   multiple_db.query('UPDATE UsersData SET status = ? WHERE id = ?', [updatestatus,id], function (error, results, fields) {

                     if(results.changedRows == 1){
                     }

                     io.sockets.to(data.email).emit('setDeleteorUpdate', {status: "updated"});


                   });


              });



        });


};
