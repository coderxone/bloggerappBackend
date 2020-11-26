var multiple_db = require('../config/multiple_mysql.js');
var formHelper = require("../models/formHelpers.js");
var timeconverter = require("../models/timeconverter.js");
var cryptLibrary = require("../models/cryptLibrary.js");

module.exports = function(io){

var users = {};

        io.on('connection', function(socket){


              socket.on('onlineUsers', function (encryptData) {

                   var data = cryptLibrary.decrypt(encryptData);

                   console.log(data);

                   socket.join(data.deviceid);
                   users[socket.id] = data.email;

                   var update_unix_time = new Date().getTime();

                   multiple_db.query('UPDATE Users SET online = ?, online_latest_time = ?,socketid = ? WHERE email = ?', [1,update_unix_time,socket.id,data.email], function (error, results, fields) {

                     if(results.changedRows == 1){
                       io.sockets.emit('onlineUsers', cryptLibrary.encrypt({status: 'online',username:users[socket.id]}));
                     }


                   });

              });


              socket.on('disconnect', function(){

                var update_unix_time = new Date().getTime();

                multiple_db.query('UPDATE Users SET online = ?, online_latest_time = ? WHERE socketid = ?', [0,update_unix_time,socket.id], function (error, results, fields) {
                    io.sockets.emit('onlineUsers', {status: 'offline',username:users[socket.id]});
                });

              });



        });


};
