var multiple_db = require('../config/multiple_mysql.js');
var formHelper = require("../models/formHelpers.js");
var timeconverter = require("../models/timeconverter.js");
var notificationModel = require("../models/notificationModel.js");
var nodemailer = require('nodemailer');
var cryptLibrary = require("../models/cryptLibrary.js");
let systemCoreLogics = require('../models/systemCoreLogics.js');
let systemCoreLogicsAll = require('../models/systemCoreLogicsAll.js');
let systemCoreLogicsFinalCount = require('../models/systemCoreLogicsFinalCount.js');
let systemCoreLogicsPrice = require('../models/systemCoreLogicsPrice.js');
let instagramCore = require('../models/instagramCore.js');
let notificationBoxCentralMessages = require('../models/notificationBoxCentralMessages.js');

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

                     try{
                       console.log(result);
                       if(result.length > 0){
                         io.sockets.to(data.deviceid).emit('checkTasks', cryptLibrary.encrypt({status:"ok",result: result}));
                       }else{
                         io.sockets.to(data.deviceid).emit('checkTasks', cryptLibrary.encrypt({status:"false"}));
                       }
                     }catch(e){
                       
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

                   multiple_db.query('UPDATE complete_task SET status = ? WHERE task_id = ? AND user_email = ?;UPDATE usersvideo SET status = ? WHERE project_id = ? AND user_email = ?;UPDATE uniquenames SET status = ? WHERE project_id = ?', [status,task_id,user_email,status,task_id,user_email,3,task_id], function (error, results, fields) {


                     io.sockets.to(data.deviceid).emit('setTasks', cryptLibrary.encrypt({status:"ok",status:"ok"}));

                     //push_not
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

              socket.on('setTemporaryToken', function (encrypt) {

                   var data = cryptLibrary.decrypt(encrypt);
                   socket.join(data.deviceid);
                   var token = data.token;

                   multiple_db.query('SELECT * FROM `TempTokens` WHERE `token` = ?', [token], function (error, results, fields) {

                     if(results.length < 1){

                           var insert  = { token: token};

                           var query = multiple_db.query('INSERT INTO TempTokens SET ?', insert, function (error, results, fields) {

                              io.sockets.to(data.deviceid).emit('setTemporaryToken', cryptLibrary.encrypt({status:"ok"}));
                           });

                       }else{
                         io.sockets.to(data.deviceid).emit('setTemporaryToken', cryptLibrary.encrypt({status:"exist"}));
                       }


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


              socket.on('sendHtmlMail', function (encrypt) {

                   var data = cryptLibrary.decrypt(encrypt);

                   var deviceid = data.deviceid;
                   var sendMail = data.sendmail;
                   var htmlData = data.htmlData;
                   var title = data.title;
                   socket.join(deviceid);

                  // console.log(htmlData);


                  sendHtmlMessage(title,htmlData,sendMail);//(title,htmldata,sendemail)



                  io.sockets.to(deviceid).emit('sendHtmlMail', {status:"ok"});

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

              const sendHtmlMessage = async (title,htmldata,sendemail) => {
                   await notificationModel.sendHtmlMessage(title,"",htmldata,sendemail).then(function(result) {

                      console.log(result.response);

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


        const appCore = () => {
          //run every day to count day and close task for withdrawal
          timeconverter.run_every_day_at8am(7,10).then(res => {
              instagramCore.countDays();
              systemCoreLogicsPrice.updateDataCentralPrice();
          })//hour,minute
        }


        const test = () => {
            const token = "EAADZCHZCQRjJ4BALXN5O0cuAJqx5JsudoywsqKWmXbFpjhuTGIgZC8NZAS5rCqDN0drvlb0gYRNYNllJmHf9lABx1Dq9JyKtZCt0StmsYgYLcxsg9EsSRY7hcrh7fElGoCyyZA2Hu2OziZBK18KRRRbhZA9dasEE0YZBV7zXZCtl83YsBsGJKhFhFfcKInHgNJZCe7GBPAmMMQvRjpeVebwBESfYEtPRA2JKUgZD";
            //"17841401349212053",token
            //1 step
            //instagramCore.getAccounts(token);
            //2 step
            //instagramCore.getInstagramBusinessAccount("100882208840250",token);
            //3 step 17841401349212053
            //instagramCore.checkInstagramAccount("2clickorg@gmail.com");

            // systemCoreLogics.checkCoreFunction("testbl@gmail.com").then(result => {
            //   console.log(result);
            // });

            // systemCoreLogicsAll.checkCoreFunctionAll().then(result => {  //check all database and record check once a day
            //   console.log(result);
            // });

            //systemCoreLogicsFinalCount.finalCount(94,"hhh@gmail.com");//project_id,email //check with final step

            //calculate bloggers price
            //systemCoreLogicsPrice.test();
            //calculate bloggers price

            //timeconverter.run_every_day_at8am(7,10)//hour,minute

            // timeconverter.run_every_4_second().subscribe(res => {
            //
            // })

            //notificationBoxCentralMessages.sendNewTaskNotificationToAllBloggers(96);

            // instagramCore.trackVideo("https://www.instagram.com/tv/COW162iHJDT/?utm_medium=copy_link").then(res => {
            //   console.log(res);
            // });
            // instagramCore.trackVideo("https://www.instagram.com/p/CRfdvdoBw6J/?utm_source=ig_web_copy_link").then(res => {
            //   console.log(res);
            // });


          //  systemCoreLogicsPrice.updateDataCentralPrice();

          notificationBoxCentralMessages.sendNotificationToAllBloggersToCompleteProfile();




        }

        test();
        appCore();


        setInterval(function(){



          multiple_db.query('SELECT id,email FROM `Users` WHERE sendmail_status = 1 LIMIT 1;SELECT data FROM `EmailTasks` ORDER BY id DESC LIMIT 1;', function (error, result, fields) {

               if(result[0]){
                 if(result[0].length > 0){
                   var sendmail = result[0][0].email;
                   var updateid = result[0][0].id;
                   var sendtext = result[1][0].data;

                   //console.log(sendmail + "|" + sendtext);
                   //sendMessage("message from echohub.io",sendtext,sendmail);

                   multiple_db.query('UPDATE Users SET sendmail_status = ? WHERE id = ?', [2,updateid], function (error, results, fields) {


                   });

                 }
               }

          });


          //io.sockets.to(data.deviceid).emit('checkNewMessage', cryptLibrary.encrypt({count: resultstthree.length,details:resultstthree}));


        },2000);


};
