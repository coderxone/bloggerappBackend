var db_multiple = require('../config/multiple_mysql.js');
var request = require('request');
var cryptLibrary = require("../models/cryptLibrary.js");


module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('setRole', function (encrypt) {

                var data = cryptLibrary.decrypt(encrypt);
                //console.log(data);

                var device = data.deviceid;
                var email = data.email;
                var role = data.data.role;

                socket.join(device);

                db_multiple.query('UPDATE Users SET role = ? WHERE email = ?', [role,email], function (error, results, fields) {

                  console.log(results);
                //  if(results.changedRows == 1){
                      io.sockets.in(device).emit('setRole',cryptLibrary.encrypt({status:"ok",role:role,email:email}));
                //  }


                });



              });



        });


};
