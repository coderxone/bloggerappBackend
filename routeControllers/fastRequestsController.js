var timeconverter = require("../models/timeconverter.js");
var config = require("../config/config.js");
var db_multiple = require('../config/multiple_mysql.js');
var cryptLibrary = require("../models/cryptLibrary.js");



const exportConst = function(app){

  // Home page route.

  app.post('/requestFetchNewsData', async function (req, res, next) {
    
             var data = cryptLibrary.decrypt(req.body.data);

            let id = data.id;

            db_multiple.query('SELECT * FROM `news` WHERE `id` = ?', [id], function (error, results, fields) {

            if(results.length > 0){
                results[0].date = timeconverter.countPassedTimeFromUnix(results[0].date);
                res.json(cryptLibrary.encrypt({status:"ok",results:results}));
            }else{
                res.status(400).send({ error: ex });
            }
            
            });

    })

    //other routes..
}

module.exports = exportConst;
