var multiple_db = require('../config/multiple_mysql.js');
var formHelper = require("../models/formHelpers.js");
var timeconverter = require("../models/timeconverter.js");
var nodemailer = require('nodemailer');
var cryptLibrary = require("../models/cryptLibrary.js");
var notificationBox = require("../models/notificationBox.js");




module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('sendmail', function (encryptData) {

                    var data = cryptLibrary.decrypt(encryptData);

                   socket.join(data.deviceid);
                   var sendemail = formHelper.cleanString(data.sendemail);
                   var html = data.html;


                        var title = "Password Reminder from echohub.io";

                        notificationBox.sendSingleEmail(title,html,sendemail);

                        io.sockets.in(data.deviceid).emit('sendmail', cryptLibrary.encrypt({status: 'sended'}));
                        //io.sockets.in(data.deviceid).emit('sendmail', cryptLibrary.encrypt({status: 'notfound'}));


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
