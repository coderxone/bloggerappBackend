var db_multiple = require('../config/multiple_mysql.js');
var request = require('request');


module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('getAdminData', function (data) {

                var email = data.email;

                socket.join(email);


                  db_multiple.query('SELECT * FROM `Users`;SELECT * FROM `UsersData` ORDER BY `id` DESC;SELECT complete_task.user_email,UsersData.email,UsersData.url FROM `complete_task` INNER JOIN UsersData ON complete_task.task_id = UsersData.id;', function (error, results, fields) {

                    //console.log(results[0]);

                    io.sockets.in(email).emit('getAdminData',{users:results[0],orders:results[1],complete_task:results[2]});

                  });



              });



        });


};
