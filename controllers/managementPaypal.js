var multiple_db = require('../config/multiple_mysql.js');
var formHelper = require("../models/formHelpers.js");
var timeconverter = require("../models/timeconverter.js");
var paypalModel = require("../models/paypalModel.js");

module.exports = function(io){


      const getToken = async () => {
         await paypalModel.getToken().then(function(result) {

            console.log(result);
            getProfile();

        });
      }

      getToken();

      const getProfile = async () => {
         await paypalModel.getProfile().then(function(result) {

            console.log(result);

        });
      }




};
