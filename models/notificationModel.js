var moment = require('moment-timezone');
var request = require('request');
var Storage = require('node-storage');
var store = new Storage('./store/store.js');
var multiple_db = require('../config/multiple_mysql.js');
var nodemailer = require('nodemailer');


var admin = require('firebase-admin');
var serviceAccount = require('../store/fire.json');
var serviceGmailAccount = require('../store/echohubGmail.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://click-f1304.firebaseio.com"
});
//store.put('zapros', '2');
//var ball_store = store.get('ball_id');
//var liveurl = 'https://api.paypal.com'; //live

module.exports = {

     sendMessage:async function(title,message,toUser){

       return new Promise(function(resolve, reject) {
         //promise

             var mailOptions = {
                 from: 'info@echohub.io',
                 to: toUser,
                 subject: title,
                 text: message,
                 html: message
             }

          const connectMail = async () => {

               var transporter = nodemailer.createTransport({
                   host:'smtp.gmail.com',
                   port:465,
                   secure:true,
                   auth: {
                     type:'OAuth2',
                     user: 'info@echohub.io',
                     serviceClient:serviceGmailAccount.client_id,
                     privateKey:serviceGmailAccount.private_key
                   }
                 });

                 await transporter.verify();
                 await transporter.sendMail(mailOptions, function (err, res) {
                     if(err){
                         //console.log(err);
                         //console.log(err);
                     } else {
                      // console.log(res);

                     }
                 })

               }


               connectMail().then(response => {
                 resolve("ok");
               });


             // var transporter = nodemailer.createTransport({
             //     service: 'gmail',
             //     auth: {
             //       user: 'info@echohub.io',
             //       pass: 'gulzhahan1234567'
             //     }
             //   });




          //promise
        });


    },


     sendHtmlMessage:async function(title,message,HtmlMessage,toUser){

       return new Promise(function(resolve, reject) {
         //promise

             var mailOptions = {
                 from: 'info@echohub.io',
                 to: toUser,
                 subject: title,
                 text: message,
                 html: HtmlMessage
             }

          const connectMail = async () => {

               var transporter = nodemailer.createTransport({
                   host:'smtp.gmail.com',
                   port:465,
                   secure:true,
                   auth: {
                     type:'OAuth2',
                     user: 'info@echohub.io',
                     serviceClient:serviceGmailAccount.client_id,
                     privateKey:serviceGmailAccount.private_key
                   }
                 });

                 await transporter.verify();
                 await transporter.sendMail(mailOptions, function (err, res) {
                     if(err){
                         //console.log(err);
                         console.log(err);
                     } else {
                       console.log(res);

                     }
                 })

               }


               connectMail().then(response => {
                 resolve("ok");
               });


             // var transporter = nodemailer.createTransport({
             //     service: 'gmail',
             //     auth: {
             //       user: 'info@echohub.io',
             //       pass: 'gulzhahan1234567'
             //     }
             //   });




          //promise
        });


    },

     sendToAllMessage:async function(title,message,UserArray){

       return new Promise(function(resolve, reject) {
         //promise

          if(UserArray.length > 0){

            var mailOptions = {
                from: 'info@echohub.io',
                to: UserArray,
                subject: title,
                text: message,
                html: message
            }

            const connectMail = async () => {

                 var transporter = nodemailer.createTransport({
                     host:'smtp.gmail.com',
                     port:465,
                     secure:true,
                     auth: {
                       type:'OAuth2',
                       user: 'info@echohub.io',
                       serviceClient:serviceGmailAccount.client_id,
                       privateKey:serviceGmailAccount.private_key
                     }
                   });

                   await transporter.verify();
                   await transporter.sendMail(mailOptions, function (err, res) {
                       if(err){
                           //console.log(err);
                           console.log(err);
                       } else {
                         console.log(res);

                       }
                   })

                 }


                 connectMail().then(response => {
                   resolve("ok");
                 });



          }


          resolve("ok");

          //promise
        });


    },
     
    
    
    sendToAllMessageFromDB:async function(title,message){

       return new Promise(function(resolve) {
         //promise

         multiple_db.query('SELECT email FROM `Users`', function (error, results, fields) {

              let UserArray = [];

              for(let i = 0;i < results.length;i++){
                if(results[i].email != "ok" && results[i].email != " " && results[i].email != null && results[i].email != ""){
                  UserArray.push(results[i].email);
                }
              }
            

              if(UserArray.length > 0){

                var mailOptions = {
                    from: 'info@echohub.io',
                    to: UserArray,
                    subject: title,
                    text: message,
                    html: message
                }
    
                const connectMail = async () => {
    
                     var transporter = nodemailer.createTransport({
                         host:'smtp.gmail.com',
                         port:465,
                         secure:true,
                         auth: {
                           type:'OAuth2',
                           user: 'info@echohub.io',
                           serviceClient:serviceGmailAccount.client_id,
                           privateKey:serviceGmailAccount.private_key
                         }
                       });
    
                       await transporter.verify();
                       await transporter.sendMail(mailOptions, function (err, res) {
                           if(err){
                               //console.log(err);
                               console.log(err);
                           } else {
                             console.log(res);
    
                           }
                       })
    
                     }
    
    
                     connectMail().then(response => {
                       resolve("ok");
                     });
    
    
    
              }
    
    
              resolve("ok");

          });
          

          //promise
        });


    },


     sendFPMtoSingle:async function(sendemail,title,body,dopmessageone,dopmessagetwo){

       return new Promise(function(resolve, reject) {
         //promise

         multiple_db.query('SELECT * FROM `Users` WHERE `email` = ?', [sendemail], function (error, results, fields) {

           if(results.length > 0){

                    var registrationToken = '';

                    for(var i = 0;i < results.length;i++){
                        //not
                        if(results[i].firebaseToken != "not"){
                          registrationToken = results[i].firebaseToken;
                        }else{
                          resolve("not token");
                        }

                    }

                    var message = {
                            notification:{
                              title:title,
                              body:body
                            },
                             data: {
                               variableone: dopmessageone,
                               variabletwo: dopmessagetwo
                             },
                             token: registrationToken
                           };

                      if(registrationToken == ""){
                        return false;
                      }


                           admin.messaging().send(message)
                             .then((response) => {
                               // Response is a message ID string.
                               resolve(response);
                               console.log('Successfully sent message:', response);
                             })
                             .catch((error) => {
                               console.log('Error sending message:', error);
                             });


               }

             });





          //promise
        });

    },


     sendFPMtoAllUsers:async function(title,body,dopmessageone,dopmessagetwo){

       return new Promise(function(resolve) {
         //promise

         multiple_db.query('SELECT * FROM `Users`', function (error, results, fields) {

           if(results.length > 0){

                    var registrationToken = new Array();

                    for(var i = 0;i < results.length;i++){
                        //not
                        if(results[i].firebaseToken != "not" && results[i].firebaseToken != "" && results[i].firebaseToken != null){
                          registrationToken.push(results[i].firebaseToken);
                        }

                    }
                    
                    if(registrationToken.length > 0){
                      var message = {
                        notification:{
                          title:title,
                          body:body
                        },
                         data: {
                           variableone: dopmessageone,
                           variabletwo: dopmessagetwo
                         },
                         tokens: registrationToken
                       };
//xx
                       admin.messaging().sendMulticast(message)
                         .then((response) => {
                           // Response is a message ID string.
                           resolve(response);
                           console.log('Successfully sent message:', response);
                         })
                         .catch((error) => {
                           console.log('Error sending message:', error);
                         });
                    }else{
                      return false;
                    }

                    


               }

             });





          //promise
        });

    },

     sendFPMtoCurrentArrayToken:async function(title,body,dopmessageone,dopmessagetwo,array){

       return new Promise(function(resolve, reject) {

              if(array.length > 0){
                var message = {
                        notification:{
                          title:title,
                          body:body
                        },
                         data: {
                           variableone: dopmessageone,
                           variabletwo: dopmessagetwo
                         },
                         tokens: array
                       };

                       admin.messaging().sendMulticast(message)
                         .then((response) => {
                           // Response is a message ID string.
                           resolve(response);
                           console.log('Successfully sent message:', response);
                         })
                         .catch((error) => {
                           console.log('Error sending message:', error);
                         });
              }



          //promise
        });

    },


     sendWebFPMtoSingle:async function(sendemail,title,body,url){

       return new Promise(function(resolve, reject) {
         //promise

         multiple_db.query('SELECT * FROM `Users` WHERE `email` = ?', [sendemail], function (error, results, fields) {

           if(results.length > 0){

                    var registrationToken = '';

                    for(var i = 0;i < results.length;i++){
                        //not
                        if(results[i].webtoken != "not"){
                          registrationToken = results[i].webtoken;
                        }else{
                          resolve("not token");
                        }

                    }

                    if(registrationToken == ""){
                      return false;
                    }

                    var message = {
                            notification:{
                              title:title,
                              body:body
                            },
                            webpush: {
                                fcm_options: {
                                  link: url
                                }
                              },

                             token: registrationToken
                           };

                           admin.messaging().send(message)
                             .then((response) => {
                               // Response is a message ID string.
                               resolve(response);
                               console.log('Successfully sent message:', response);
                             })
                             .catch((error) => {
                               console.log('Error sending message:', error);
                             });


               }

             });





          //promise
        });

    },


     sendWebFPMtoAllUsers:async function(title,body,url){

       return new Promise(function(resolve) {
         //promise

            multiple_db.query('SELECT * FROM `Users`', function (error, results, fields) {

                if(results.length > 0){

                      var registrationToken = new Array();

                      for(var i = 0;i < results.length;i++){
                          //not
                        
                          if(results[i].webtoken != "not" && results[i].webtoken != "" && results[i].webtoken != null){
                            registrationToken.push(results[i].webtoken);
                          }

                      }

                      var message = {
                          notification:{
                            title:title,
                            body:body
                          },
                          webpush: {
                              fcm_options: {
                                link: url
                              }
                            },
                          tokens: registrationToken
                        };

                        admin.messaging().sendMulticast(message)
                          .then((response) => {
                            // Response is a message ID string.
                            resolve(response);
                            console.log('Successfully sent message:', response);
                          })
                          .catch((error) => {
                            console.log('Error sending message:', error);
                          });


                }else{
                  return false;
                }

             });


          //promise
        });

    },

     sendWebFPMtoAllUsersArray:async function(title,body,url,array){

       return new Promise(function(resolve, reject) {
         //promise

                if(array.length > 0){
                      var message = {
                              notification:{
                                title:title,
                                body:body
                              },
                          webpush: {
                              fcm_options: {
                                link: url
                              }
                            },
                           tokens: array
                         };

                         admin.messaging().sendMulticast(message)
                           .then((response) => {
                             // Response is a message ID string.
                             resolve(response);
                             console.log('Successfully sent message:', response);
                           })
                           .catch((error) => {
                             console.log('Error sending message:', error);
                           });
                }


          //promise
        });

    },


     sendFPMtoTopic:async function(topicName,title,body,dopmessageone,dopmessagetwo){

       return new Promise(function(resolve, reject) {
         //promise

                    var message = {
                            notification:{
                              title:title,
                              body:body
                            },
                             data: {
                               variableone: dopmessageone,
                               variabletwo: dopmessagetwo
                             },
                             topic: topicName
                           };

                           admin.messaging().send(message)
                             .then((response) => {
                               // Response is a message ID string.
                               resolve(response);
                               console.log('Successfully sent message:', response);
                             })
                             .catch((error) => {
                               console.log('Error sending message:', error);
                             });



          //promise
        });

    },

    subscribeTopic:async function(topicName,token){

      return new Promise(function(resolve, reject) {
        //promise
        var registrationTokens = [token];

        admin.messaging().subscribeToTopic(registrationTokens, topicName)
            .then(function(response) {
            // See the MessagingTopicManagementResponse reference documentation
            // for the contents of response.
            console.log('Successfully subscribed to topic:', response);
            resolve(response);
            })
            .catch(function(error) {
            console.log('Error subscribing to topic:', error);
            });
         //promise
       });

   }

}


//https://www.google.com/settings/security/lesssecureapps
