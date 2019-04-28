var db_multiple = require('../config/multiple_mysql.js');
var request = require('request');
var timeconverter = require("../models/timeconverter.js");
var formHelper = require("../models/formHelpers.js");



module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('getAllData', function (data) {

                var device = data.device;
                var role = data.role;
                var email = data.email;

                socket.join(device);

                //console.log(data);


                  db_multiple.query("SELECT * FROM `UsersData` WHERE email != ? AND role = ? ORDER BY id desc; SELECT * FROM `Users` WHERE email = ?;",[email,role,email], function (error, results, fields) {
                  // connected!
                  //console.log(results);
                  for(var i = 0;i < results[0].length;i++){
                    results[0][i].date = timeconverter.timeConverter_us_date(results[0][i].date);
                    results[0][i].time = timeconverter.timeConverter_us_time(results[0][i].time);
                  }


                    io.sockets.in(device).emit('getAllData',{sdata:results[0],userdata:results[1],message:data.message} );
                  });






              });


              socket.on('searchUsersData', function (data) {

                var device = data.device;

                socket.join(device);

                var role = data.role;
                var email = data.email;

                var search_number = formHelper.cleanString(data.searchnumber);


                      db_multiple.query("SELECT * FROM `UsersData` WHERE role = '" + role + "' AND email != '" + email + "' AND fromPoint LIKE '%" + search_number + "%' OR toPoint LIKE '%" + search_number + "%' AND role = '" + role + "' AND email != '" + email + "' ORDER BY id desc", function (error, results, fields) {
                        // connected!
                        //console.log(results);
                        for(var i = 0;i < results.length;i++){
                          results[i].date = timeconverter.timeConverter_us_date(results[i].date);
                          results[i].time = timeconverter.timeConverter_us_time(results[i].time);
                        }


                        io.sockets.in(device).emit('searchUsersData',{sdata:results} );
                      });



                });


              socket.on('checkApartmentsPeople', function (data) {


                var startTime = timeconverter.getDateStart();
                var finishTime = timeconverter.getDateFinish();

                //console.log(startTime);

                var device = data.device;

                socket.join(device);

                var search_number = data.searchnumber;


                      db_multiple.query("SELECT * FROM `Users` WHERE roomId = '" + search_number + "';SELECT TimesLogs.insideTime,TimesLogs.outsideTime,TimesLogs.roomId,TimesLogs.userId,Users.firstName,Users.lastName FROM `TimesLogs` INNER JOIN Users ON TimesLogs.userId=Users.id WHERE TimesLogs.roomId = '" + search_number + "' AND TimesLogs.outsideTime >= '" + startTime + "' ORDER BY TimesLogs.id DESC;", function (error, results, fields) {
                        // connected!


                        for(var i = 0;i < results[0].length;i++){

                          if(results[0][i].insideTime != 0){
                            results[0][i].insideTime = timeconverter.timeConverter_us(results[0][i].insideTime);
                          }else{
                            results[0][i].insideTime = '';
                          }

                          if(results[0][i].outsideTime != 0){
                            results[0][i].outsideTime = timeconverter.timeConverter_us(results[0][i].outsideTime);
                          }else{
                            results[0][i].outsideTime = '';
                          }

                        }



                        for(var b = 0;b < results[1].length;b++){

                          if(results[1][b].insideTime != 0){
                            results[1][b].insideTime = timeconverter.timeConverter_us(results[1][b].insideTime);

                          }else{
                            results[1][b].insideTime = '';
                          }

                          if(results[1][b].outsideTime != 0){
                            results[1][b].outsideTime = timeconverter.timeConverter_us(results[1][b].outsideTime);

                          }else{
                            results[1][b].outsideTime = '';
                          }

                        }

                        //console.log(results[1]);
                        io.sockets.in(device).emit('checkApartmentsPeople',{sdata:results[0],timeLogs:results[1]} );

                      });



                });





        });


};
