var db_multiple = require('../config/multiple_mysql.js');
var request = require('request');


module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('load_all_info', function (data) {

                var email = data.email;

                socket.join(email);


                  var currency_usd = 0;
                  var alldata = 0;

                  db_multiple.query('SELECT * FROM `currency` LIMIT 1;SELECT * FROM `appParams` LIMIT 1;', function (error, results, fields) {

                    //console.log(results[0]);
                    currency_usd = results[0][0].ru_usd;
                    alldata = results[1][0];

                    io.sockets.in(email).emit('load_all_info',{currency_usd:currency_usd,alldata:alldata} );

                  });



              });



        });


};
