var multiple_db = require('../config/multiple_mysql.js');
var formHelper = require("../models/formHelpers.js");
var timeconverter = require("../models/timeconverter.js");
var notificationModel = require("../models/notificationModel.js");
var nodemailer = require('nodemailer');


module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('checkNewMessage', function (data) {

                   socket.join(data.email);

                   multiple_db.query('SELECT fromEmail,toEmail FROM Messages WHERE toEmail = ? AND read_status = ? ORDER BY id DESC', [data.email,0], function (error, resultstthree, fields) {

                        if(resultstthree){
                          if(resultstthree.length > 0){
                            io.sockets.to(data.email).emit('checkNewMessage', {count: resultstthree.length});
                          }
                        }

                   });

              });


              socket.on('setFirebaseToken', function (data) {

                   socket.join(data.email);
                   var token = data.token;

                   multiple_db.query('UPDATE Users SET firebaseToken = ? WHERE email = ?', [token,data.email], function (error, results, fields) {

                     if(results.changedRows == 1){
                       update_record = 1;
                     }

                     io.sockets.to(data.email).emit('setFirebaseToken', {status:"ok"});

                   });


              });


              socket.on('setWebFirebaseToken', function (data) {

                   socket.join(data.email);
                   var token = data.token;

                   multiple_db.query('UPDATE Users SET webtoken = ? WHERE email = ?', [token,data.email], function (error, results, fields) {

                     io.sockets.to(data.email).emit('setWebFirebaseToken', {status:"ok"});

                   });


              });

              socket.on('sendMail', function (data) {

                   socket.join(data.email);

                   multiple_db.query('UPDATE Users SET sendmail_status = ?;SELECT * FROM `EmailTasks` ORDER BY id DESC LIMIT 1', [1], function (error, results, fields) {

                     //console.log(results[1][0].data);
                     sendFPMtoTopicAndroid("breaking news",results[1][0].data);

                     io.sockets.to(data.email).emit('sendMail', {status:"ok"});

                   });


              });


              socket.on('subscribeToTopic', function (data) {

                   socket.join(data.email);

                   var token = data.token;
                   var topicName = data.topicName;

                     subscribeTopic(topicName,token);//topicName,token

                     io.sockets.to(data.email).emit('subscribeToTopic', {status:"ok"});



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

              const sendFPMtoTopicAndroid = async (title,body) => {
                   await notificationModel.sendFPMtoTopic("people",title,body,"dop1 from server","dop2 from server").then(function(result) {

                      console.log(result);

                  });
              };


              const subscribeTopic = async (topicName,token) => {
                   await notificationModel.subscribeTopic(topicName,token).then(function(result) {

                      console.log(result);

                  });
              };





        });

        const sendMessage = async (title,htmldata,sendemail) => {
             await notificationModel.sendMessage(title,htmldata,sendemail).then(function(result) {

                console.log(result.response);

            });
        };



        //sendMessage();
        //sendFirebasetoSingle();
        //sendFPMtoAllUsers();
        //sendFPMtoTopic();
        //sendWebFirebasetoSingle();
        //sendWebFPMtoAllUsers();


        setInterval(function(){



          multiple_db.query('SELECT id,email FROM `Users` WHERE sendmail_status = 1 LIMIT 1;SELECT data FROM `EmailTasks` ORDER BY id DESC LIMIT 1', function (error, result, fields) {

               if(result[0]){
                 if(result[0].length > 0){
                   var sendmail = result[0][0].email;
                   var updateid = result[0][0].id;
                   var sendtext = result[1][0].data;

                   //console.log(sendmail + "|" + sendtext);
                   sendMessage("message from 2click",sendtext,sendmail);

                   multiple_db.query('UPDATE Users SET sendmail_status = ? WHERE id = ?', [2,updateid], function (error, results, fields) {


                   });

                 }
               }

          });


        },2000);


};
