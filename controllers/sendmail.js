var multiple_db = require('../config/multiple_mysql.js');
var formHelper = require("../models/formHelpers.js");
var timeconverter = require("../models/timeconverter.js");
var nodemailer = require('nodemailer');
var cryptLibrary = require("../models/cryptLibrary.js");




module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('sendmail', function (encryptData) {

                    var data = cryptLibrary.decrypt(encryptData);

                   socket.join(data.deviceid);
                   var sendemail = formHelper.cleanString(data.sendemail);

                   //console.log(data);


                   multiple_db.query('SELECT * FROM `Users` WHERE `email` = ?', [sendemail], function (error, results, fields) {


                     if(results.length > 0){

                        var password = String(results[0].password);

                        var mailOptions = {
                            from: '2clickorg@gmail.com',
                            to: sendemail,
                            subject: 'Password Reminder from 2click.org',
                            text: 'your password \"' + password + '\"'
                        }


                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                              user: '2clickorg@gmail.com',
                              pass: 'googlehackA&'
                            }
                          });


                          transporter.sendMail(mailOptions, function (err, res) {
                              if(err){

                              } else {

                              }
                          })

                            io.sockets.in(data.deviceid).emit('sendmail', cryptLibrary.encrypt({status: 'sended'}));

                         }else{
                           io.sockets.in(data.deviceid).emit('sendmail', cryptLibrary.encrypt({status: 'notfound'}));
                         }

                       });




              });



        });


};
//648878
// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'electroninsuranse@gmail.com',
//       pass: 'googlehack7777'
//     }
//   });

//2clickorg@gmail.com
//electroninsuranse@gmail.com',
//                    //https://masashi-k.blogspot.com/2013/06/sending-mail-with-gmail-using-xoauth2.html
//
// //https://myaccount.google.com/lesssecureapps
// //https://accounts.google.com/b/0/DisplayUnlockCaptcha
// //https://www.youtube.com/watch?v=JJ44WA_eV8E
