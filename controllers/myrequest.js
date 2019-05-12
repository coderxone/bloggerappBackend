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



        });


};
