var ncp = require('ncp').ncp;
var path = require('path');
const fs = require('fs');
var multiple_db = require('../config/multiple_mysql.js');

module.exports = {

     rangeSubscribers:function(min,max){

       min = Math.ceil(min);
       max = Math.floor(max);
       return Math.floor(Math.random() * (max - min + 1)) + min;

    },
     readablePrice:function(value){

       var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });

      return formatter.format(value);

      },

     readableNumber:function(value){

       var formatter = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(value);

       return formatter;

      },

      deletePictures:(deletePath) => {

        return new Promise((resolve) => {


          fs.unlink(deletePath, err => {
            if(err){
              resolve(false);
            }else{
              resolve(true);
            }
          });

        });

      },
      copuPicture:(inputPath,outPutPath) => {

        ncp.limit = 16;

        return new Promise((resolve) => {
          ncp(inputPath, outPutPath, function (err) {
           if (err) {
             resolve(false);
           }

           resolve(true);
           //console.log('done!');
          });
        })



      },
      getUserEmailByProjectId:(id) => {
        return new Promise(resolve => {
          multiple_db.query('SELECT * FROM `UsersData` WHERE `id` = ?', [id], function (error, results, fields) {

              resolve(results[0]);

              });
        });
      },

      closeCreatorTask:(projectId,email) => {
        multiple_db.query('UPDATE uniquenames SET status = ? WHERE user_email = ? AND project_id = ?', [5,email,projectId], function (error, results, fields) {
        });

        var insert  = { user_email: email,task_id:projectId,status:1};

        var query = multiple_db.query('INSERT INTO complete_task SET ?', insert, function (error, results, fields) {

        });
      },










}
