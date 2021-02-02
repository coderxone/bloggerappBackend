var db_multiple = require('../config/multiple_mysql.js');
var request = require('request');
var timeconverter = require("../models/timeconverter.js");
var formHelper = require("../models/formHelpers.js");
var short = require('short-uuid');
var cryptLibrary = require("../models/cryptLibrary.js");
var timeLibrary = require("../models/timeconverter.js");



module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('getAllData', function (encryptData) {//role 2 promote role

                var data = cryptLibrary.decrypt(encryptData);

                var device = data.device;
                var role = data.role;
                var email = data.email;

                //console.log(data);

                socket.join(email);

                //console.log(data);


                  db_multiple.query("SELECT * FROM `UsersData` WHERE email = ? AND role = ? ORDER BY id DESC; SELECT * FROM `Users` WHERE email = ?;",[email,role,email], function (error, results, fields) {
                  // connected!
                  //console.log(results);
                  for(var i = 0;i < results[0].length;i++){
                    results[0][i].date = timeconverter.timeConverter_us_date(results[0][i].date);
                    results[0][i].time = timeconverter.timeConverter_us_time(results[0][i].time);
                  }


                    io.sockets.in(email).emit('getAllData',cryptLibrary.encrypt({sdata:results[0],userdata:results[1],message:data.message}) );
                  });



              });


              socket.on('getAllDataE', function (encrypt) {//role 1 for employeer
                // lat:this.latitude,
                // long:this.longitude,
                //console.log(data);
                var data = cryptLibrary.decrypt(encrypt);

                var f_lat = data.lat;
                var f_long = data.long;
                var device = data.device;
                var role = 2; //show promote records
                var email = data.email;

                if(email == ''){
                  return false;
                }

                socket.join(email);


                var distance = 10;
                var trycount = 0;
                var minsearchPoint = 1;
                var searchdistance = 10;



                function searchNearMe(){
                                                  //0                                                                                                                                                                                                                                                                                                                                             //1                                   //2                                             //3
                    db_multiple.query('SELECT *, ( 6371 * acos( cos( radians(" ' + f_lat + ' ") ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(" ' + f_long + ' ") ) + sin( radians(" '+ f_lat +' ") ) * sin( radians( lat ) ) ) ) AS distance FROM UsersData HAVING distance < ' + distance + ' AND role = ? AND pay_status = 1 AND status = 1 ORDER BY priority DESC; SELECT * FROM `Users` WHERE email = ?;SELECT * FROM `complete_task` WHERE `user_email` = ?;SELECT * FROM `UserApproveTasks` ORDER BY priority DESC;SELECT * FROM `complete_approve_task` WHERE `user_email` = ?;',[role,email,email,email], function (error, results, fields) {

            //check user approve status
            //console.log(results[1]);
            var approve_status = results[1][0].approvestatus;

            //check user approve status
                //task main model
                var jObject;

                //if(approve_status == 1){
                    if(results[0].length < minsearchPoint){

                        if(trycount > 20){
                          return false;
                        }
                        distance += searchdistance;
                        //console.log(distance);
                        searchNearMe();
                        trycount++;
                        return false;
                    }

                    for(var i = 0;i < results[0].length;i++){
                      results[0][i].date = timeconverter.timeConverter_us_date(results[0][i].date);
                      results[0][i].time = timeconverter.timeConverter_us_time(results[0][i].time);
                    }

                    var fix = 0;
                    var count = 0;

                    var deleteArray = new Array();

                      //find done task
                      for(var u = 0;u < results[2].length;u++){
                        for(var h = 0;h < results[0].length;h++){
                          if(results[0][h].id == results[2][u].task_id){
                            fix = 1;
                            count++;
                            deleteArray.push(results[0][h].id);
                          }
                        }
                      }
                      //find done task

                      if(fix == 1){

                          //if result length == 1 //search more
                          if(results[0].length == 1){
                            minsearchPoint++;
                            console.log(fix + "first ");
                            distance += searchdistance;
                            trycount++;
                            searchNearMe();
                            return false;
                          }

                          //if(result length == complete task //search more result
                          if(results[0].length == count){
                            minsearchPoint++;
                            console.log(fix + "-2");
                            distance += searchdistance;
                            trycount++;
                            searchNearMe();
                            return false;
                          }


                      }


                      //create new find array without completed task
                      var newsendarray = new Array();
                      //deleting from array


                      for(var b = 0;b < results[0].length;b++){

                        var fixf = 0;

                        for(var l = 0;l < deleteArray.length;l++){
                          if(results[0][b].id == deleteArray[l]){
                              fixf = 1;
                          }
                        }
                        if(fixf == 0){
                          newsendarray.push(results[0][b]);
                        }
                      }

                      //if found only 1 or lower then find more
                      if(newsendarray.length < 1){
                        minsearchPoint++;
                        console.log(fix + "-3");
                        distance += searchdistance;
                        trycount++;
                        searchNearMe();
                        return false;
                      }
                      //if found only 1 or lower then find more
                      //

                      //deleting from array

                      //console.log(newsendarray.length);

                      if(deleteArray.length > 0){
                            jObject = {
                              sdata:newsendarray,
                              userdata:results[1],
                              message:data.message,
                              findtask:results[2],
                              approvestatus:1,
                              distance:distance
                            };
                        }else{
                            jObject = {
                              sdata:results[0],
                              userdata:results[1],
                              message:data.message,
                              findtask:results[2],
                              approvestatus:1,
                              distance:distance
                            };
                        }

                        io.sockets.in(email).emit('getAllDataE', cryptLibrary.encrypt(jObject));

                      //task main model

                    // }else{  //approve status
                    //
                    //   var newsendarray = new Array();
                    //   //deleting from array
                    //
                    //
                    //   for(var b = 0;b < results[3].length;b++){
                    //
                    //     var fixf = 0;
                    //
                    //     for(var l = 0;l < results[4].length;l++){
                    //       if(results[3][b].id == results[4][l].task_id){
                    //           fixf = 1;
                    //       }
                    //     }
                    //     if(fixf == 0){
                    //       newsendarray.push(results[3][b]);
                    //     }
                    //   }
                    //
                    //
                    //     jObject = {
                    //       sdata:newsendarray,
                    //       userdata:results[1],
                    //       message:data.message,
                    //       findtask:results[2],
                    //       approvestatus:0
                    //     };
                    //
                    //     io.sockets.in(email).emit('getAllDataE', cryptLibrary.encrypt(jObject));
                    //
                    //
                    // }




                    });


                }

                searchNearMe();






              });



              socket.on('searchUsersData', function (data) {

                var device = data.device;
                var role = data.role;
                var email = data.email;

                socket.join(email);



                var search_number = formHelper.cleanString(data.searchnumber);


                      db_multiple.query("SELECT * FROM `UsersData` WHERE role = '" + role + "' AND email != '" + email + "' AND status = '1' AND fromPoint LIKE '%" + search_number + "%' OR toPoint LIKE '%" + search_number + "%' AND role = '" + role + "' AND email != '" + email + "' AND status = '1' ORDER BY id DESC", function (error, results, fields) {
                        // connected!
                        //console.log(results);
                        for(var i = 0;i < results.length;i++){
                          results[i].date = timeconverter.timeConverter_us_date(results[i].date);
                          results[i].time = timeconverter.timeConverter_us_time(results[i].time);
                        }

                        io.sockets.in(email).emit('searchUsersData',{sdata:results} );

                      });



                });


              socket.on('deleteRecord', function (data) {


                var email = data.email;
                var deleteid = data.id;

                socket.join(email);


                      db_multiple.query("DELETE FROM UsersData WHERE id = ?",[deleteid],function (error, results, fields) {

                        io.sockets.in(email).emit('deleteRecord',{status:"ok"} );

                      });



                });


              socket.on('makeHref', function (encrypt) {

                var data = cryptLibrary.decrypt(encrypt);

                var deviceid = data.deviceid;
                var email = data.email;
                socket.join(deviceid);

                var status = data.status;

                var project_id = data.id;
                var generatedId = short.generate();


                if(status == "check"){

                  db_multiple.query("SELECT * FROM `uniquenames` WHERE `project_id` = ? AND `user_email` = ?",[project_id,email], function (error, results, fields) {

                    if(results.length > 0){
                      //existing
                      io.sockets.in(deviceid).emit('makeHref',cryptLibrary.encrypt({status:"ok",url:results[0].hash}));
                    }


                  });
                }else if(status == "set"){
                  db_multiple.query("SELECT * FROM `uniquenames` WHERE `project_id` = ? AND `user_email` = ?",[project_id,email], function (error, results, fields) {

                    if(results.length > 0){
                      //existing
                      io.sockets.in(deviceid).emit('makeHref',cryptLibrary.encrypt({status:"ok",url:results[0].hash}) );

                    }else{
                      //insert
                      var insert  = { project_id: project_id,user_email:email,hash:generatedId};

                      var query = db_multiple.query('INSERT INTO uniquenames SET ?', insert, function (error, results, fields) {

                        //console.log(error);
                        io.sockets.in(deviceid).emit('makeHref',cryptLibrary.encrypt({status:"ok",url:generatedId}));

                      });
                    }


                  });
                }



                });








        });


};

//search formula

// from math import cos, asin, sqrt
//
// def distance(lat1, lon1, lat2, lon2):
//     p = 0.017453292519943295
//     a = 0.5 - cos((lat2-lat1)*p)/2 + cos(lat1*p)*cos(lat2*p) * (1-cos((lon2-lon1)*p)) / 2
//     return 12742 * asin(sqrt(a))
//
// def closest(data, v):
//     return min(data, key=lambda p: distance(v['lat'],v['lon'],p['lat'],p['lon']))
//
// tempDataList = [{'lat': 39.7612992, 'lon': -86.1519681},
//                 {'lat': 39.762241,  'lon': -86.158436 },
//                 {'lat': 39.7622292, 'lon': -86.1578917}]
//
// v = {'lat': 39.7622290, 'lon': -86.1519750}
// print(closest(tempDataList, v))
//search formula
