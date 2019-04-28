var multiple_db = require('../config/multiple_mysql.js');
var formHelper = require("../models/formHelpers.js");
var timeconverter = require("../models/timeconverter.js");

module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('shablon', function (data) {

                   socket.join(data.email);

                   io.sockets.in(data.email).emit('check_ob_action', {msg: 'test_message'});

              });



        });


};
