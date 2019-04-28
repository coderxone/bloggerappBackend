var db_multiple = require('../config/multiple_mysql.js');
var request = require('request');


module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('setInsideState', function (data) {

                var device = data.device;

                socket.join(device);

                var inside_state = 'inside';
                var insideTime = new Date().getTime();
                var updateid = +data.id;

                //console.log(data);

                db_multiple.query('UPDATE Users SET people_state = ?,insideTime = ? WHERE id = ?;UPDATE TimesLogs SET insideTime = ? WHERE userId = ? ORDER BY id DESC LIMIT 1;', [inside_state,insideTime,updateid,insideTime,updateid], function (error, results, fields) {

                  //.log(results);
                  io.sockets.in(device).emit('setInsideState',{data:"ok"} );

                });



              });


              socket.on('setOutsideState', function (data) {

                var device = data.device;

                socket.join(device);

                var inside_state = 'outside';
                var insideTime = new Date().getTime();
                var updateid = +data.id;
                var roomid = +data.unitid;

                //console.log(data);

                var insert  = { outsideTime: insideTime,roomId:roomid,userId:updateid};

                db_multiple.query('UPDATE Users SET people_state = ?,insideTime = 0, outsideTime = ? WHERE id = ?;INSERT INTO TimesLogs SET ?;', [inside_state,insideTime,updateid,insert], function (error, results, fields) {

                  //console.log(error);
                  //console.log(results);
                  io.sockets.in(device).emit('setOutsideState',{data:"ok"} );

                });

              });



        });


};
