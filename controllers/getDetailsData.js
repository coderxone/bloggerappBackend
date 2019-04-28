var db_multiple = require('../config/multiple_mysql.js');
var formHelper = require("../models/formHelpers.js");
var timeconverter = require("../models/timeconverter.js");

module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('getDetailData', function (data) {

                   socket.join(data.deviceid);

                   var id = data.id;

                   db_multiple.query('SELECT * FROM `UsersData` WHERE `id` = ?', [id], function (error, results, fields) {

                     if(results.length > 0){

                           results[0].date = timeconverter.timeConverter_us_date(results[0].date);
                           results[0].time = timeconverter.timeConverter_us_time(results[0].time);

                          var email = results[0].email;
                          var firstData = results[0];

                           db_multiple.query('SELECT * FROM `Users` WHERE `email` = ?', [email], function (error, resultstwo, fields) {

                             if(resultstwo.length > 0){
                                    var secondData = resultstwo[0];
                                    io.sockets.in(data.deviceid).emit('getDetailData', {UsersData: firstData,Users: secondData});
                                 }

                             });

                         }

                       });





              });



              socket.on('checkDetailsState', function (data) {

                   socket.join(data.deviceid);

                   var page_id = data.page_id;
                   var email = data.email;

                   db_multiple.query('SELECT * FROM `FavoritefromUsersData` WHERE `usersdata_page_Id` = ? AND email = ?', [page_id, email], function (error, results, fields) {

                     if(results.length > 0){
                            io.sockets.in(data.deviceid).emit('checkDetailsState', {state:true});
                         }else{
                           io.sockets.in(data.deviceid).emit('checkDetailsState', {state:false});
                         }

                       });

              });

              socket.on('enableFavoriteState', function (data) {

                   socket.join(data.deviceid);

                   var page_id = data.page_id;
                   var email = data.email;

                   db_multiple.query('SELECT * FROM `FavoritefromUsersData` WHERE `usersdata_page_Id` = ? AND email = ?', [page_id, email], function (error, results, fields) {

                     if(results.length < 1){

                       var insert  = { usersdata_page_Id: page_id,email:email};

                       var query = db_multiple.query('INSERT INTO FavoritefromUsersData SET ?', insert, function (error, results, fields) {
                         if (error) throw error;

                         io.sockets.in(data.deviceid).emit('enableFavoriteState', {state:true});

                       });

                         }
                       });

              });

              socket.on('disableFavoriteState', function (data) {

                   socket.join(data.deviceid);

                   var page_id = data.page_id;
                   var email = data.email;

                   db_multiple.query('SELECT * FROM `FavoritefromUsersData` WHERE `usersdata_page_Id` = ? AND email = ?', [page_id, email], function (error, results, fields) {

                     if(results.length > 0){

                            db_multiple.query('DELETE FROM FavoritefromUsersData WHERE usersdata_page_Id = ? AND email = ?',[page_id, email], function (error, results, fields) {
                              if (error) throw error;
                              io.sockets.in(data.deviceid).emit('disableFavoriteState', {state:true});
                            })

                         }

                       });

              });



        });


};
