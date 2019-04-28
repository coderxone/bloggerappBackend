var multiple_cityDb = require('../config/multiple_cityDb');
var formHelper = require("../models/formHelpers.js");

module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('searchCity', function (data) {

                   socket.join(data.deviceid);
                   var searchstring = formHelper.cleanString(data.search);

                   multiple_cityDb.query("SELECT * FROM `city` WHERE `Name` LIKE '%" + searchstring + "%' ORDER BY ID desc LIMIT 5", function (error, results, fields) {
                     if (error) throw error;
                   // connected!
                      //console.log(results);
                      io.sockets.in(data.deviceid).emit('searchCity', {data: results});
                   });



              });



        });


};
