var multiple_db = require('../config/multiple_mysql.js');
var formHelper = require("../models/formHelpers.js");
var timeconverter = require("../models/timeconverter.js");
var notificationModel = require("../models/notificationModel.js");
var nodemailer = require('nodemailer');
var cryptLibrary = require("../models/cryptLibrary.js");


module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('checkNewMessage', function (encrypt) {

                  var data = cryptLibrary.decrypt(encrypt);

                   socket.join(data.deviceid);

                   multiple_db.query('SELECT fromEmail,toEmail,projectId,message FROM Messages WHERE toEmail = ? AND read_status = ? ORDER BY id DESC', [data.email,0], function (error, resultstthree, fields) {

                        if(resultstthree){
                          if(resultstthree.length > 0){
                            io.sockets.to(data.deviceid).emit('checkNewMessage', cryptLibrary.encrypt({count: resultstthree.length,details:resultstthree}));
                          }
                        }

                   });

              });

              socket.on('checkTasks', function (encrypt) {

                  var data = cryptLibrary.decrypt(encrypt);

                  var email = data.email;

                   socket.join(data.deviceid);

                   multiple_db.query('SELECT UsersData.email, complete_task.task_id FROM UsersData INNER JOIN complete_task ON UsersData.id=complete_task.task_id WHERE UsersData.email = ? AND complete_task.status = ? LIMIT 1;',[email,0], function (error, result, fields) {
                     //console.log(error);
                     console.log(result);
                     if(result.length > 0){
                       io.sockets.to(data.deviceid).emit('checkTasks', cryptLibrary.encrypt({status:"ok",result: result}));
                     }else{
                       io.sockets.to(data.deviceid).emit('checkTasks', cryptLibrary.encrypt({status:"false"}));
                     }


                   });

              });


              socket.on('setTasks', function (encrypt) {

                  var data = cryptLibrary.decrypt(encrypt);

                  var email = data.email;
                  var status = data.status;
                  var task_id = data.task_id;
                  var user_email = data.user_email;

                  console.log(data);

                   socket.join(data.deviceid);

                   multiple_db.query('UPDATE complete_task SET status = ? WHERE task_id = ? AND user_email = ?;UPDATE usersvideo SET status = ? WHERE project_id = ? AND user_email = ?', [status,task_id,user_email,status,task_id,user_email], function (error, results, fields) {


                     io.sockets.to(data.deviceid).emit('setTasks', cryptLibrary.encrypt({status:"ok",status:"ok"}));


                   });

              });


              socket.on('setFirebaseToken', function (encrypt) {

                   var data = cryptLibrary.decrypt(encrypt);
                   socket.join(data.deviceid);
                   var token = data.token;

                   multiple_db.query('UPDATE Users SET firebaseToken = ? WHERE email = ?', [token,data.email], function (error, results, fields) {

                     io.sockets.to(data.deviceid).emit('setFirebaseToken', cryptLibrary.encrypt({status:"ok"}));

                   });


              });


              socket.on('setWebFirebaseToken', function (encrypt) {

                   var data = cryptLibrary.decrypt(encrypt);

                   var deviceid = data.deviceid;

                   socket.join(deviceid);

                   var token = data.token;

                   multiple_db.query('UPDATE Users SET webtoken = ? WHERE email = ?', [token,data.email], function (error, results, fields) {

                     io.sockets.to(deviceid).emit('setWebFirebaseToken', cryptLibrary.encrypt({status:"ok"}));

                   });


              });

              socket.on('sendMail', function (encrypt) {

                   var data = cryptLibrary.decrypt(encrypt);
                   var deviceid = data.deviceid;

                   socket.join(deviceid);

                   multiple_db.query('UPDATE Users SET sendmail_status = ?;SELECT * FROM `EmailTasks` ORDER BY id DESC LIMIT 1', [1], function (error, results, fields) {

                     //console.log(results[1][0].data);
                     sendFPMtoTopicAndroid("breaking news",results[1][0].data);

                     io.sockets.to(deviceid).emit('sendMail', cryptLibrary.encrypt({status:"ok"}));

                   });


              });


              socket.on('subscribeToTopic', function (encrypt) {

                   var data = cryptLibrary.decrypt(encrypt);

                   var deviceid = data.deviceid;

                   socket.join(deviceid);

                   var token = data.token;
                   var topicName = data.topicName;

                  subscribeTopic(topicName,token);//topicName,token

                  io.sockets.to(deviceid).emit('subscribeToTopic', cryptLibrary.encrypt({status:"ok"}));

              });


              const sendFirebasetoSingleAndroid = async () => {
                   await notificationModel.sendFPMtoSingle("2clickorg@gmail.com","title test from server","body test from server","dop1 from server","dop2 from server").then(function(result) {

                      console.log(result);

                  });
              };

              const sendFPMtoAllUsersAndroid = async () => {
                   await notificationModel.sendFPMtoAllUsers("title test from server","body test from server","dop1 from server","dop2 from server").then(function(result) {

                      console.log(result);

                  });
              };

              //webfirebase

              const sendWebFirebasetoSingle = async () => {
                   await notificationModel.sendWebFPMtoSingle("2clickorg@gmail.com","title test from server","body test from server","http://localhost:8100/investor").then(function(result) {

                      console.log(result);

                  });
              };

              const sendWebFPMtoAllUsers = async () => {
                   await notificationModel.sendWebFPMtoAllUsers("title test from server","body test from server","http://localhost:8100/investor").then(function(result) {

                      console.log(result);

                  });
              };

              //webfirebase

              //send to topic
              const sendFPMtoTopicAndroid = async (title,body) => {
                   await notificationModel.sendFPMtoTopic("people",title,body,"dop1 from server","dop2 from server").then(function(result) {

                      console.log(result);

                  });
              };
              //send to topic


              const subscribeTopic = async (topicName,token) => {
                   await notificationModel.subscribeTopic(topicName,token).then(function(result) {

                      console.log(result);

                  });
              };


            //  sendFPMtoTopicAndroid("breaking news",'test');





        });

        const sendMessage = async (title,htmldata,sendemail) => {
             await notificationModel.sendMessage(title,htmldata,sendemail).then(function(result) {

                console.log(result.response);

            });
        };



        //sendMessage("message from echohub.io",'test','2clickorg@gmail.com');
        //sendMessage("message from echohub.io",'test','orazgulzhahan@gmail.com');
        //sendFirebasetoSingle();
        //sendFPMtoAllUsers();
        //sendFPMtoTopic();
        //sendWebFirebasetoSingle();
        //sendWebFPMtoAllUsers();



        setInterval(function(){



          multiple_db.query('SELECT id,email FROM `Users` WHERE sendmail_status = 1 LIMIT 1;SELECT data FROM `EmailTasks` ORDER BY id DESC LIMIT 1;', function (error, result, fields) {

               if(result[0]){
                 if(result[0].length > 0){
                   var sendmail = result[0][0].email;
                   var updateid = result[0][0].id;
                   var sendtext = result[1][0].data;

                   //console.log(sendmail + "|" + sendtext);
                   sendMessage("message from echohub.io",sendtext,sendmail);

                   multiple_db.query('UPDATE Users SET sendmail_status = ? WHERE id = ?', [2,updateid], function (error, results, fields) {


                   });

                 }
               }

          });


          //io.sockets.to(data.deviceid).emit('checkNewMessage', cryptLibrary.encrypt({count: resultstthree.length,details:resultstthree}));


        },2000);


};
