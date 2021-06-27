var multiple_db = require('../config/multiple_mysql.js');
var formHelper = require("../models/formHelpers.js");
var timeconverter = require("../models/timeconverter.js");
var cryptLibrary = require("../models/cryptLibrary.js");
var HelpLibrary = require("../models/helpers.js");

module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('bloggerCore', function (encryptData) {

                  var data = cryptLibrary.decrypt(encryptData);

                   socket.join(data.deviceid);

                   //let email = data.email;
                   let email = "hhh@gmail.com";

                   // io.sockets.in(data.deviceid).emit('subscriberCore', cryptLibrary.encrypt({subscribersResult:readableData,originalNumber:countOfSubscribers,countOfBloggers:ThirstCount,NewCheckingAmount:NewCheckingAmount}));
                   //accountAge
                   multiple_db.query('SELECT * FROM followersCount;SELECT * FROM followersViews;SELECT * FROM Users WHERE email = ? LIMIT 1;SELECT * FROM countryPrices;', [email], function (error, results, fields) {

                     //0 id followersCount
                     let followersCountData = result[0];
                     //1 followersViews
                     let followersViews = result[1];
                     //2 users
                     let userData = result[2];
                     //3 countryPrices
                     let countryPriceData = result[3];


                       //io.sockets.in(data.deviceid).emit('subscriberCore', cryptLibrary.encrypt({status: 'false'}));

                   });





              });



        });


};
