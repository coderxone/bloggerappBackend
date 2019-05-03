var multiple_db = require('../config/multiple_mysql.js');
var formHelper = require("../models/formHelpers.js");
var timeconverter = require("../models/timeconverter.js");

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



        });


};
