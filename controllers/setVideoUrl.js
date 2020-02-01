var multiple_db = require('../config/multiple_mysql.js');
var formHelper = require("../models/formHelpers.js");
var timeconverter = require("../models/timeconverter.js");

module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('setvideo', function (data) {

                   socket.join(data.email);

                   var url = data.url;
                   var project_id = data.project_id;
                   var user_email = data.email;
                   var date = timeconverter.getUnixtime();

                   multiple_db.query('SELECT * FROM `usersvideo` WHERE `url` = ?', [url], function (error, results, fields) {

                     if(results.length > 0){
                            io.sockets.in(data.email).emit('setvideo', {status: 'exist'});
                         }else{

                             var insert  = { url: url,	project_id:	project_id,user_email:user_email,date:date};

                             var query = multiple_db.query('INSERT INTO usersvideo SET ?', insert, function (error, results, fields) {

                               io.sockets.in(data.email).emit('setvideo', {status: 'inserted'});

                             });

                         }


                       });



              });


              socket.on('checkvideo', function (data) {

                   socket.join(data.email);
                   //timeconverter.getunixMonth
                   var project_id = data.project_id;
                   var user_email = data.email;
                   var montharray = new Array();//filtration copy
                   var monthcount = new Array();//count array

                   multiple_db.query('SELECT * FROM `usersvideo` WHERE `project_id` = ? AND `user_email` = ?', [project_id,user_email], function (error, results, fields) {

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

                       io.sockets.in(data.email).emit('checkvideo', {status: 'ok',count:results.length,montharray:montharray,monthcount:monthcount,data:results});
                     }else{
                       io.sockets.in(data.email).emit('checkvideo', {status: 'false'});
                     }



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









              socket.on('checkviews', function (data) {

                   socket.join(data.email);

                   var hash = data.hash;

                   multiple_db.query('SELECT * FROM `views` WHERE `hash` = ?', [hash], function (error, results, fields) {


                     io.sockets.in(data.email).emit('checkviews', {status: 'ok',count:results.length});


                       });



              });


              socket.on('setviews', function (data) {

                   socket.join(data.email);

                   var hash = formHelper.cleanString(data.hash);
                   var ip = data.ip;
                   var date = new Date().getTime();

                   multiple_db.query('SELECT uniquenames.project_id,UsersData.url FROM uniquenames INNER JOIN UsersData ON uniquenames.project_id = UsersData.id WHERE uniquenames.hash = ?', [hash], function (error, resultsmain, fields) {

                       if(resultsmain.length > 0){

                         var redirectUrl = resultsmain[0].url;
                           multiple_db.query('SELECT * FROM `views` WHERE `hash` = ? AND `ip` = ?', [hash,ip], function (error, results, fields) {

                             if(results.length > 0){
                               io.sockets.in(data.email).emit('setviews', {status: 'ixist',redirecturl:redirectUrl});
                             }else{
                               var insert  = { hash: hash,ip:ip,date:date};

                               var query = multiple_db.query('INSERT INTO views SET ?', insert, function (error, results, fields) {

                                // console.log(error);
                                 io.sockets.in(data.email).emit('setviews', {status: 'inserted',redirecturl:redirectUrl});

                               });
                             }



                               });
                       }

                   });

              });


              socket.on('closeorders', function (data) {

                   socket.join(data.email);
                   var update_id = data.id;
                   var approvetask = data.approvetask;

                   if(approvetask == 0){
                     var insert  = { user_email: data.email,task_id:update_id};

                     var query = multiple_db.query('INSERT INTO complete_task SET ?', insert, function (error, results, fields) {

                       io.sockets.in(data.email).emit('closeorders', {status: 'updated'});

                     });
                   }else if(approvetask == 1){

                     multiple_db.query('SELECT * FROM `UserApproveTasks`;SELECT * FROM `complete_approve_task` WHERE user_email = ?;', [data.email], function (error, results, fields) {

                        var commonTasks = results[0].length;
                        var userCompleteTasks = results[1].length;
                        var action = commonTasks - (userCompleteTasks + 1);

                        if((action == 0) && (commonTasks > userCompleteTasks)){
                              console.log("need insert and update");
                              var insert  = { user_email: data.email,task_id:update_id};

                              var query = multiple_db.query('INSERT INTO complete_approve_task SET ?', insert, function (error, results, fields) {

                                multiple_db.query('UPDATE Users SET approvestatus = ? WHERE email = ?', [1,data.email], function (error, results, fields) {

                                    io.sockets.in(data.email).emit('closeorders', {status: 'updated'});

                                });

                              });

                        }else if((action > 0) && (commonTasks > userCompleteTasks)){
                            console.log("need insert");
                            var insert  = { user_email: data.email,task_id:update_id};

                            var query = multiple_db.query('INSERT INTO complete_approve_task SET ?', insert, function (error, results, fields) {

                              io.sockets.in(data.email).emit('closeorders', {status: 'updated'});

                            });
                        }
                       // if(results.length > 0){
                       //
                       //     }
                       console.log(commonTasks);
                       console.log(userCompleteTasks);


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
