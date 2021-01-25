var multiple_db = require('../config/multiple_mysql.js');
var formHelper = require("../models/formHelpers.js");
var timeconverter = require("../models/timeconverter.js");
var cryptLibrary = require("../models/cryptLibrary.js");
var HelpLibrary = require("../models/helpers.js");

module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('subscriberCore', function (encryptData) {

                  var data = cryptLibrary.decrypt(encryptData);

                   socket.join(data.deviceid);
                   var amount = parseInt(data.amount);

                   multiple_db.query('SELECT * FROM appParams WHERE id = ?;', [1], function (error, results, fields) {

                      //minUsersSubscribers
                      //platform_percent
                      //min_pay_rate

                     if(results.length > 0){

                          //minimum video price which can set user is 200 from database
                       var videoPrice = parseFloat(results[0].pricevideo);

                       if(videoPrice < amount){
                         videoPrice = amount;
                       }


                       //now we are calculating platform percent and result price.
                       var percent = (videoPrice / 100) * parseInt(results[0].platform_percent);

                       var FirstCount = videoPrice - percent;
                       var SecondCount = FirstCount / parseFloat(results[0].min_pay_rate);
                       var ThirstCount = parseInt(SecondCount);

                       var countOfSubscribers = ThirstCount * HelpLibrary.rangeSubscribers(parseInt(results[0].minUsersSubscribers),parseInt(results[0].platformMaxSubscribers));

                       var readableData = HelpLibrary.readableNumber(countOfSubscribers);
                       //console.log(countOfSubscribers);

                       io.sockets.in(data.deviceid).emit('subscriberCore', cryptLibrary.encrypt({subscribersResult:readableData,originalNumber:countOfSubscribers,countOfBloggers:ThirstCount}));

                     }else{
                       io.sockets.in(data.deviceid).emit('subscriberCore', cryptLibrary.encrypt({status: 'false'}));

                     }

                   });



              });



        });


};
