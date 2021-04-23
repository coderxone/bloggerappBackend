var multiple_db = require('../config/multiple_mysql.js');
var formHelper = require("../models/formHelpers.js");
var timeconverter = require("../models/timeconverter.js");
var cryptLibrary = require("../models/cryptLibrary.js");
var timeLibrary = require("../models/timeconverter.js");

module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('setvideo', function (encrypt) {

                   var data = cryptLibrary.decrypt(encrypt);

                   var deviceid = data.deviceid;
                   var url = formHelper.cleanUrlString(data.url);
                   var project_id = data.id;
                   var user_email = data.email;
                   var date = timeconverter.getUnixtime();
                   var videotype = data.videotype;
                   socket.join(deviceid);

                   multiple_db.query('SELECT * FROM `usersvideo` WHERE `url` = ? AND `type` = ? AND `project_id` = ?', [url,videotype,project_id], function (error, results, fields) {

                     if(results.length > 0){
                            io.sockets.in(deviceid).emit('setvideo', cryptLibrary.encrypt({status: 'exist'}));
                         }else{

                             var insert  = { url: url,	project_id:	project_id,user_email:user_email,date:date,type:videotype};

                             var query = multiple_db.query('INSERT INTO usersvideo SET ?', insert, function (error, results, fields) {

                               io.sockets.in(deviceid).emit('setvideo', cryptLibrary.encrypt({status: 'inserted'}));

                             });

                         }


                       });



              });



              socket.on('editvideo', function (encrypt) {

                   var data = cryptLibrary.decrypt(encrypt);

                   var deviceid = data.deviceid;
                   var url = formHelper.cleanUrlString(data.url);
                   var project_id = data.id;
                   var user_email = data.email;
                   var date = timeconverter.getUnixtime();
                   var videotype = data.videotype;
                   socket.join(deviceid);

                   multiple_db.query('UPDATE usersvideo SET url = ?,date = ? WHERE project_id = ? AND type = ? AND status = ?', [url,date,project_id,videotype,2], function (error, results, fields) {

                     if(results.changedRows == 1){
                       io.sockets.in(deviceid).emit('editvideo', cryptLibrary.encrypt({status: 'updated'}));
                     }else{
                       io.sockets.in(deviceid).emit('editvideo', cryptLibrary.encrypt({status: 'already'}));
                     }


                   });


              });

              socket.on('replacevideo', function (encrypt) {

                   var data = cryptLibrary.decrypt(encrypt);

                   var deviceid = data.deviceid;
                   var url = formHelper.cleanUrlString(data.url);
                   var project_id = data.id;
                   var user_email = data.email;
                   var date = timeconverter.getUnixtime();
                   var videotype = data.videotype;
                   socket.join(deviceid);

                   multiple_db.query('UPDATE usersvideo SET url = ?,date = ?,type = ?, status = ? WHERE id = ?', [url,date,videotype,2,project_id], function (error, results, fields) {

                     //console.log(results);

                     if(results.changedRows == 1){
                       io.sockets.in(deviceid).emit('replacevideo', cryptLibrary.encrypt({status: 'updated'}));
                     }else{
                       io.sockets.in(deviceid).emit('replacevideo', cryptLibrary.encrypt({status: 'already'}));
                     }


                   });


              });


              socket.on('checkvideo', function (encrypt) {


                   var data = cryptLibrary.decrypt(encrypt);
                   var deviceid = data.deviceid;

                   socket.join(deviceid);

                   //timeconverter.getunixMonth
                   //console.log(data);
                   var project_id = data.id;
                   var user_email = data.email;
                   var montharray = new Array();//filtration copy
                   var monthcount = new Array();//count array

                   multiple_db.query('SELECT * FROM `usersvideo` WHERE `project_id` = ? AND `user_email` = ? AND `status` = ?', [project_id,user_email,2], function (error, results, fields) {

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

                       io.sockets.in(data.deviceid).emit('checkvideo', cryptLibrary.encrypt({status: 'ok',count:results.length,montharray:montharray,monthcount:monthcount,data:results}));
                     }else{
                       io.sockets.in(data.deviceid).emit('checkvideo', cryptLibrary.encrypt({status: 'false'}));
                     }

                       });

              });


              socket.on('checkcurrentStatus', function (encrypt) {


                   var data = cryptLibrary.decrypt(encrypt);
                   var deviceid = data.deviceid;

                   socket.join(deviceid);

                   //timeconverter.getunixMonth
                   //console.log(data);
                   var project_id = data.project_id;
                   var user_email = data.email;


                   multiple_db.query('SELECT UsersData.id, UsersData.date,UsersData.description,UsersData.email,UsersData.time,UsersData.sum,UsersData.pay_status,UsersData.peoplecount,UsersData.subscribers,UsersData.url,UsersData.location_name,UsersData.location_points,UsersData.peoplecount,UsersData.countvideo,UsersData.lat,UsersData.lng,UsersData.gps,UsersData.famous,uniquenames.project_id,uniquenames.user_email,uniquenames.status,uniquenames.hash FROM uniquenames INNER JOIN UsersData ON uniquenames.project_id = UsersData.id WHERE uniquenames.user_email = ? AND uniquenames.project_id;SELECT execute_day FROM `appParams`;', [user_email,project_id], function (error, results, fields) {

                          var executeDay = results[1][0].execute_day;

                           if((results[0].length > 0) || (results[1].length > 0)){
                             for(var i = 0;i < results[0].length;i++){
                               results[0][i].date = timeconverter.timeConverter_us_date(results[0][i].date,executeDay);
                               results[0][i].time = timeconverter.timeConverter_us_time(results[0][i].time);
                             }

                               io.sockets.in(deviceid).emit('checkcurrentStatus', cryptLibrary.encrypt({data:results[0],status:"ok"}));
                           }

                       });

              });



              socket.on('checkBannedvideo', function (encrypt) {


                   var data = cryptLibrary.decrypt(encrypt);
                   var deviceid = data.deviceid;

                   socket.join(deviceid);

                   //timeconverter.getunixMonth
                   //console.log(data);
                   var project_id = data.id;
                   var user_email = data.email;
                   var montharray = new Array();//filtration copy
                   var monthcount = new Array();//count array

                   multiple_db.query('SELECT * FROM `usersvideo` WHERE `project_id` = ? AND `user_email` = ? AND `status` = ?', [project_id,user_email,3], function (error, results, fields) {

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

                       io.sockets.in(data.deviceid).emit('checkBannedvideo', cryptLibrary.encrypt({status: 'ok',count:results.length,montharray:montharray,monthcount:monthcount,data:results}));
                     }else{
                       io.sockets.in(data.deviceid).emit('checkBannedvideo', cryptLibrary.encrypt({status: 'false'}));
                     }

                       });

              });


              socket.on('checkAllBannedvideo', function (encrypt) {


                   var data = cryptLibrary.decrypt(encrypt);
                   var deviceid = data.deviceid;

                   socket.join(deviceid);

                   //timeconverter.getunixMonth
                   //console.log(data);
                   var user_email = data.email;
                   var montharray = new Array();//filtration copy
                   var monthcount = new Array();//count array

                   multiple_db.query('SELECT * FROM `usersvideo` WHERE `user_email` = ? AND `status` = ?', [user_email,3], function (error, results, fields) {

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

                       io.sockets.in(data.deviceid).emit('checkAllBannedvideo', cryptLibrary.encrypt({status: 'ok',count:results.length,montharray:montharray,monthcount:monthcount,data:results}));
                     }else{
                       io.sockets.in(data.deviceid).emit('checkAllBannedvideo', cryptLibrary.encrypt({status: 'false'}));
                     }

                       });

              });



              socket.on('checkvideoByProject', function (encrypt) {


                   var data = cryptLibrary.decrypt(encrypt);
                   var deviceid = data.deviceid;

                   socket.join(deviceid);
                   //console.log(data);

                   //timeconverter.getunixMonth

                   var project_id = data.data.project_id;
                   var user_email = data.email;
                   var montharray = new Array();//filtration copy
                   var monthcount = new Array();//count array
                    //console.log(project_id);

                   multiple_db.query('SELECT Users.raiting_stars, Users.approvestatus,Users.online,Users.image_url, usersvideo.id,usersvideo.url,usersvideo.project_id,usersvideo.user_email,usersvideo.date,usersvideo.status,usersvideo.type FROM Users INNER JOIN usersvideo ON usersvideo.user_email = Users.email WHERE usersvideo.project_id = ? AND usersvideo.status = ? OR usersvideo.project_id = ? AND usersvideo.status = ?;SELECT * FROM social_network_list;', [project_id,2,project_id,1], function (error, results, fields) {

                      if(error){
                        return false;
                      }



                     if(results[0].length > 0){

                       var filtratedArray = new Array();


                       for(var i = 0;i < results[0].length;i++){
                         results[0][i].month = timeconverter.getunixMonth(results[0][i].date);

                         if(montharray.length > 0){
                           var fix = 0;
                           for(var j = 0;j < montharray.length;j++){
                             if(montharray[j].month == results[0][i].month){
                               fix = 1;
                               monthcount[j] = monthcount[j] + 1;
                             }
                           }

                           if(fix == 0){
                             montharray.push(results[0][i]);
                             monthcount.push(1);
                           }
                         }else{
                           montharray.push(results[0][i]);
                           monthcount.push(1);
                         }


                         //filtration by user_email
                         var foundX = 0;

                         for(var b = 0;b < filtratedArray.length;b++){
                           if(filtratedArray[b].user_email == results[0][i].user_email){
                             foundX = 1;

                                //add count of task
                               filtratedArray[b].CountTasks += 1;

                               if(filtratedArray[b].CountTasks == results[1].length){
                                 filtratedArray[b].complete = 1;
                               }

                           }
                         }



                         if(foundX == 0){
                           //counting tasks
                           results[0][i].CountTasks = 1;
                           results[0][i].complete = 0;
                           results[0][i].taskList = results[1];

                           filtratedArray.push(results[0][i]);;
                         }




                         //filtration by user_email

                       }

                       console.log(filtratedArray);





                       io.sockets.in(data.deviceid).emit('checkvideoByProject', cryptLibrary.encrypt({status: 'ok',count:results[0].length,montharray:montharray,monthcount:monthcount,data:filtratedArray,taskList:results[1]}));
                     }else{
                       io.sockets.in(data.deviceid).emit('checkvideoByProject', cryptLibrary.encrypt({status: 'false'}));
                     }

                       });

              });


              socket.on('checkvideosByUser', function (encrypt) {

                   var data = cryptLibrary.decrypt(encrypt);

                   socket.join(data.deviceid);
                   //timeconverter.getunixMonth
                   //console.log(data);
                   var project_id = data.data.project_id;
                   var user_email = data.email;
                   var blogger_email = data.data.blogger_email;
                   var montharray = new Array();//filtration copy
                   var monthcount = new Array();//count array
                   //console.log(blogger_email);
                   //console.log(project_id);

                   multiple_db.query('SELECT * FROM `usersvideo` WHERE `project_id` = ? AND `user_email` = ? AND `status` = ?', [project_id,blogger_email,2], function (error, results, fields) {

                     //console.log(error);
                     //console.log(results);
                     if(results.length > 0){

                       //console.log(results);

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

                       io.sockets.in(data.deviceid).emit('checkvideosByUser', cryptLibrary.encrypt({status: 'ok',count:results.length,montharray:montharray,monthcount:monthcount,data:results}));
                     }else{
                       io.sockets.in(data.deviceid).emit('checkvideosByUser', cryptLibrary.encrypt({status: 'false'}));
                     }

                       });

              });



              socket.on('checkvideoApproved', function (encrypt) {

                   var data = cryptLibrary.decrypt(encrypt);

                   socket.join(data.deviceid);
                   //timeconverter.getunixMonth
                   //console.log(data);
                   var project_id = data.data.project_id;
                   var user_email = data.email;
                   var montharray = new Array();//filtration copy
                   var monthcount = new Array();//count array

                   multiple_db.query('SELECT * FROM `usersvideo` WHERE `project_id` = ? AND `status` = ?', [project_id,1], function (error, results, fields) {

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

                       io.sockets.in(data.deviceid).emit('checkvideoApproved', cryptLibrary.encrypt({status: 'ok',count:results.length,montharray:montharray,monthcount:monthcount,data:results}));
                     }else{
                       io.sockets.in(data.deviceid).emit('checkvideoApproved', cryptLibrary.encrypt({status: 'false'}));
                     }



                       });



              });



              socket.on('setBan', function (encrypt) {

                   var data = cryptLibrary.decrypt(encrypt);

                   socket.join(data.deviceid);
                   //timeconverter.getunixMonth
                   //console.log(data);
                   var update_id = data.id;
                   var projectId = data.projectId;

                   multiple_db.query('UPDATE usersvideo SET status = ? WHERE id = ?;UPDATE uniquenames SET status = ? WHERE project_id = ?;', [3,update_id,1,projectId], function (error, results, fields) {

                       io.sockets.in(data.deviceid).emit('setBan', cryptLibrary.encrypt({status: 'ok'}));

                   });



              });



              socket.on('checkvideoinvest', function (data) {

                   socket.join(data.email);
                   //timeconverter.getunixMonth
                   var user_email = data.email;
                   var montharray = new Array();//filtration copy
                   var monthcount = new Array();//count array

                   multiple_db.query('SELECT * FROM `usersvideo`', function (error, results, fields) {

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

                       io.sockets.in(data.email).emit('checkvideoinvest', {status: 'ok',count:results.length,montharray:montharray,monthcount:monthcount,data:results});
                     }else{
                       io.sockets.in(data.email).emit('checkvideoinvest', {status: 'false'});
                     }



                       });



              });









              socket.on('checkviews', function (encrypt) {

                   var data = cryptLibrary.decrypt(encrypt);
                   socket.join(data.deviceid);
                   var project_id = data.project_id;

                   multiple_db.query('SELECT uniquenames.hash FROM `uniquenames` WHERE `project_id` = ?;', [project_id], function (error, results, fields) {

                      if(results.length > 0){
                        var hash = results[0].hash;

                        multiple_db.query('SELECT * FROM `views` WHERE `hash` = ?', [hash], function (error, results, fields) {


                              io.sockets.in(data.deviceid).emit('checkviews', cryptLibrary.encrypt({status: 'ok',count:results.length}));


                            });
                      }

                       });



              });


              socket.on('setviews', function (encrypt) {

                  var data = cryptLibrary.decrypt(encrypt);

                   socket.join(data.deviceid);

                   var hash = formHelper.cleanString(data.hash);
                   var ip = data.ip;
                   var date = new Date().getTime();

                   multiple_db.query('SELECT uniquenames.project_id,UsersData.url FROM uniquenames INNER JOIN UsersData ON uniquenames.project_id = UsersData.id WHERE uniquenames.hash = ?', [hash], function (error, resultsmain, fields) {

                       if(resultsmain.length > 0){

                         var redirectUrl = resultsmain[0].url;
                           multiple_db.query('SELECT * FROM `views` WHERE `hash` = ? AND `ip` = ?', [hash,ip], function (error, results, fields) {

                             if(results.length > 0){
                               io.sockets.in(data.deviceid).emit('setviews', cryptLibrary.encrypt({status: 'ok',redirecturl:redirectUrl}));
                             }else{
                               var insert  = { hash: hash,ip:ip,date:date};

                               var query = multiple_db.query('INSERT INTO views SET ?', insert, function (error, results, fields) {

                                // console.log(error);
                                 io.sockets.in(data.deviceid).emit('setviews', cryptLibrary.encrypt({status: 'ok',redirecturl:redirectUrl}));

                               });
                             }


                               });
                       }

                   });

              });


              socket.on('declineorder', function (encrypt) {

                  var data = cryptLibrary.decrypt(encrypt);

                   socket.join(data.deviceid);

                   var project_id = data.project_id;
                   var email = data.email;
                   var text = data.text;


                   const deleteFromUniqTable = new function () {
                      return new Promise((resolve, reject) => {

                          multiple_db.query('DELETE FROM uniquenames WHERE project_id = ?;',[project_id], function (error, results, fields) {

                              resolve("ok");

                          });

                        });
                   };

                   const deleteFromUserVideoTable = new function () {
                      return new Promise((resolve, reject) => {

                          multiple_db.query('DELETE FROM usersvideo WHERE project_id = ?;',[project_id], function (error, results, fields) {

                              resolve("ok");

                          });

                        });
                   };

                   const deleteFromCompleteTaskTable = new function () {
                      return new Promise((resolve, reject) => {

                          multiple_db.query('DELETE FROM complete_task WHERE task_id = ?;',[project_id], function (error, results, fields) {

                              resolve("ok");

                          });

                        });
                   };

                   const CheckInsertedTaskTable = new function () {
                      return new Promise((resolve, reject) => {

                        var insert  = { user_email: email,task_id:project_id,text:text};

                        var query = multiple_db.query('SELECT * FROM rejected_task WHERE user_email = ? AND task_id', [email,project_id], function (error, results, fields) {

                            if(results.length > 0){
                              resolve("false");
                            }else{
                              resolve("ok");
                            }


                        });

                        });
                   };

                   const InsertFromRejected_taskTaskTable = new function () {
                      return new Promise((resolve, reject) => {

                        var insert  = { user_email: email,task_id:project_id,text:text};

                        var query = multiple_db.query('INSERT INTO rejected_task SET ?', insert, function (error, results, fields) {

                            resolve("ok");

                        });

                        });
                   };

                   const StepFunction = async function(){
                      try {
                          const actionOne = await deleteFromUniqTable();
                          const actionTwo = await deleteFromUserVideoTable();
                          const actionThree = await deleteFromCompleteTaskTable();
                          const actionFour = await CheckInsertedTaskTable();
                          if(actionFour == "ok"){
                            const actionFive = await InsertFromRejected_taskTaskTable();
                          }

                          return "ok";
                      }catch (e){
                          //handle errors as needed
                      }
                   };

                   StepFunction().then(response => {
                     console.log(response);
                     io.sockets.in(data.deviceid).emit('declineorder', cryptLibrary.encrypt({status: 'ok'}));
                   })



              });


              socket.on('closeorders', function (encrypt) {

                  var data = cryptLibrary.decrypt(encrypt);

                  var deviceid = data.deviceid;
                   socket.join(deviceid);
                   var update_id = data.id;
                   var approvetask = data.approvetask;

                   if(approvetask == 0){

                     multiple_db.query('SELECT * FROM `complete_task` WHERE `task_id` = ? AND user_email = ?', [update_id, data.email], function (error, results, fields) {

                       if(results.length > 0){

                             multiple_db.query('UPDATE uniquenames SET status = ? WHERE user_email = ? AND project_id = ?', [2,data.email,update_id], function (error, results, fields) {

                                 io.sockets.in(deviceid).emit('closeorders', cryptLibrary.encrypt({status: 'updated',currentStatus:0}));

                             });

                           }else{
                             var insert  = { user_email: data.email,task_id:update_id,status:approvetask};

                             var query = multiple_db.query('INSERT INTO complete_task SET ?', insert, function (error, results, fields) {

                               multiple_db.query('UPDATE uniquenames SET status = ? WHERE user_email = ? AND project_id = ?', [2,data.email,update_id], function (error, results, fields) {

                                 io.sockets.in(deviceid).emit('closeorders', cryptLibrary.encrypt({status: 'updated',currentStatus:0}));


                               });



                             });
                           }

                         });


                   }else if(approvetask == 1){

                     multiple_db.query('SELECT * FROM `UserApproveTasks`;SELECT * FROM `complete_approve_task` WHERE user_email = ?;', [data.email], function (error, results, fields) {

                        var commonTasks = results[0].length;
                        var userCompleteTasks = results[1].length;
                        var action = commonTasks - (userCompleteTasks + 1);

                        if((action == 0) && (commonTasks > userCompleteTasks)){
                              //console.log("need insert and update");
                              var insert  = { user_email: data.email,task_id:update_id};

                              var query = multiple_db.query('INSERT INTO complete_approve_task SET ?', insert, function (error, results, fields) {

                                multiple_db.query('UPDATE Users SET approvestatus = ? WHERE email = ?', [1,data.email], function (error, results, fields) {

                                    io.sockets.in(deviceid).emit('closeorders', cryptLibrary.encrypt({status: 'updated'}));

                                });

                              });

                        }else if((action > 0) && (commonTasks > userCompleteTasks)){
                            //console.log("need insert");
                            var insert  = { user_email: data.email,task_id:update_id};

                            var query = multiple_db.query('INSERT INTO complete_approve_task SET ?', insert, function (error, results, fields) {

                              io.sockets.in(deviceid).emit('closeorders', cryptLibrary.encrypt({status: 'updated'}));

                            });
                        }
                       // if(results.length > 0){
                       //
                       //     }
                       //console.log(commonTasks);
                       //console.log(userCompleteTasks);


                         });


                   }else if(approvetask == 4){
                     multiple_db.query('SELECT * FROM `rejected_task` WHERE `task_id` = ? AND user_email = ?', [update_id, data.email], function (error, results, fields) {

                       if(results.length > 0){
                              io.sockets.in(deviceid).emit('closeorders', cryptLibrary.encrypt({status: 'updated',currentStatus:0}));
                           }else{
                             var insert  = { user_email: data.email,task_id:update_id,status:approvetask};

                             var query = multiple_db.query('INSERT INTO rejected_task SET ?', insert, function (error, results, fields) {

                               io.sockets.in(deviceid).emit('closeorders', cryptLibrary.encrypt({status: 'updated',currentStatus:0}));

                             });
                           }

                         });
                   }



                   // multiple_db.query('UPDATE complete_task SET status = ? WHERE id = ?', [2,update_id], function (error, results, fields) {
                   //
                   //   io.sockets.in(data.email).emit('closeorders', {status: 'updated'});
                   //
                   //
                   // });

              });



        });


};
