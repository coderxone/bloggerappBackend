var db_multiple = require('../config/multiple_mysql.js');
var request = require('request');


module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('load_all_info', function (data) {

                var device = data.device;

                socket.join(device);

                  var agent_tarif = 0;
                  var client_tarif = 0;
                  var bonus = 0;
                  var ru_currency = 0;

                  db_multiple.query('SELECT * FROM `tarif` LIMIT 1;SELECT * FROM `currency`;', function (error, results, fields) {

                    //console.log(results[0]);
                    agent_tarif = results[0][0].agent_tarif;
                    client_tarif = results[0][0].client_tarif;
                    bonus = results[0][0].bonus;

                    ru_currency = results[1][0].ru_kzt_russia;

                    io.sockets.in(device).emit('load_all_info',{agent_tarif:agent_tarif,client_tarif:client_tarif,bonus:bonus,ru_currency:ru_currency} );

                  });



              });



        });


};
