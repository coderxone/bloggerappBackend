var db_multiple = require('../config/multiple_mysql.js');
var request = require('request');
var cryptLibrary = require("../models/cryptLibrary.js");
var config = require("../config/config.js");
var Serialize = require('php-serialize');
var formHelper = require("../models/formHelpers.js");

module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('updateUserData', function (encrypt) {

                var data = cryptLibrary.decrypt(encrypt);

                var deviceId = data.deviceId;
                var email = data.email;
                var includedData = data.data;

                socket.join(deviceId);

                var updateData = [
                  formHelper.cleanString(includedData.country),
                  Serialize.serialize(includedData.category),
                  formHelper.cleanString(includedData.age),
                  formHelper.cleanString(includedData.firstName),
                  formHelper.cleanString(includedData.lastName),
                  formHelper.cleanString(includedData.nickName),
                  formHelper.cleanString(includedData.subscribers_count),
                  formHelper.cleanString(includedData.paypal),
                  Serialize.serialize(includedData.socialNetworks),
                  Serialize.serialize(includedData.ssn),
                  formHelper.cleanString(includedData.photo),
                  email
                ];

                db_multiple.query('UPDATE Users SET country = ?,category = ?,age = ?,firstName = ?,lastName = ?,nickName = ?,subscribers_count = ?,paypal = ?,socialNetworks = ?,ssn = ?,identityPicture = ? WHERE email = ?', updateData, function (error, results, fields) {

                  io.sockets.in(deviceId).emit('updateUserData',cryptLibrary.encrypt({status:"ok"}));


                });



              });

        });

};
