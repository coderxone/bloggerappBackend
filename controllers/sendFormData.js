var multiple_db = require('../config/multiple_mysql.js');
var formHelper = require("../models/formHelpers.js");


module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('sendFormData', function (data) {

                   socket.join(data.deviceid);

                   var role = data.role;

                   if(role == 1){
                     role = 2;
                   }else if(role == 2){
                     role = 1;
                   }

                   var insert  = {
                     fromPoint: formHelper.cleanString(data.data.fromPlace),
                     toPoint:formHelper.cleanString(data.data.toPlace),
                     date: new Date(data.data.date).getTime(),
                     time: new Date(data.data.time).getTime(),
                     sum: formHelper.cleanString(data.data.amount),
                     weight: formHelper.cleanString(data.data.weight),
                     description: formHelper.cleanString(data.data.description),
                     role:role,
                     email:data.email
                   };

                   //console.log(insert);

                     var query = multiple_db.query('INSERT INTO UsersData SET ?', insert, function (error, results, fields) {
                       if (error) throw error;

                       io.sockets.in(data.deviceid).emit('sendFormData', {status:"ok"});

                     });





              });



        });


};
