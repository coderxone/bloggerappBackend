var multiple_db = require('../config/multiple_mysql.js');
var formHelper = require("../models/formHelpers.js");
var timeconverter = require("../models/timeconverter.js");

module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('checkFavorite', function (data) {

                   socket.join(data.email);


                   multiple_db.query('SELECT FavoritefromUsersData.id,FavoritefromUsersData.usersdata_page_id, UsersData.fromPoint,UsersData.toPoint,UsersData.date,UsersData.role,UsersData.sum, UsersData.time, UsersData.weight FROM FavoritefromUsersData INNER JOIN UsersData ON FavoritefromUsersData.usersdata_page_id = UsersData.id WHERE FavoritefromUsersData.email = ?', [data.email], function (error, results, fields) {

                     //console.log(error);
                     if(results){
                       for(var i = 0;i < results.length;i++){
                         results[i].date = timeconverter.timeConverter_us_date(results[i].date);
                         results[i].time = timeconverter.timeConverter_us_time(results[i].time);
                     }
                       io.sockets.to(data.email).emit('checkFavorite', {data: results});
                     }

                       });

              });



        });


};
