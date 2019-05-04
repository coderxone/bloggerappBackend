var multiple_db = require('../config/multiple_mysql.js');
var formHelper = require("../models/formHelpers.js");
var timeconverter = require("../models/timeconverter.js");

module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('setPhoneNumber', function (data) {

                   socket.join(data.email);
                   var phone = formHelper.cleanString(data.phonenumber);

                   multiple_db.query('UPDATE Users SET phone = ? WHERE email = ?', [phone,data.email], function (error, results, fields) {

                     io.sockets.in(data.email).emit('setPhoneNumber', {status: 'ok'});

                   });



              });



        });


};
