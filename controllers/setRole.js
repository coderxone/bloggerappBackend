var db_multiple = require('../config/multiple_mysql.js');
var request = require('request');


module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('setRole', function (data) {

                var device = data.device;

                socket.join(device);

                db_multiple.query('UPDATE Users SET role = ? WHERE email = ?', [data.role,data.email], function (error, results, fields) {

                //  if(results.changedRows == 1){
                      io.sockets.in(device).emit('setRole',{status:"ok",role:data.role,email:data.email} );
                //  }


                });



              });



        });


};
